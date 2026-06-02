import { StrictMode, lazy, Suspense, useState, useEffect, Component, type ReactNode, type ComponentType } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import GlobalNav from './GlobalNav.tsx'
import { articleRegistry, getZhSlugs } from './articles/registry'

const FloatingChat = lazy(() => import('./FloatingChat'))
const MusicToggle = lazy(() => import('./MusicToggle'))
const OpsDashboard = lazy(() => import('./ops/OpsDashboard'))
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'))
const AboutPage = lazy(() => import('./AboutPage'))
// Dev-only motion library catalog. import.meta.env.DEV is statically false in prod,
// so this is null there and the dynamic import is tree-shaken out of the build.
const MotionLab = import.meta.env.DEV ? lazy(() => import('./MotionLab')) : null

// Lazy-load article components from registry
const articleComponents: Record<string, React.LazyExoticComponent<ComponentType<{ lang: 'zh' | 'en' }>>> = {}
for (const article of articleRegistry) {
  articleComponents[article.id] = lazy(article.component)
}

class ChatErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

// Article chunk preload map: every article slug (zh + en) -> its lazy import thunk.
// Calling the thunk warms Vite's module cache so the lazy route resolves without a
// blank Suspense flash when the crossfade lands on a case-study page.
const articlePreloads: Record<string, () => Promise<unknown>> = {}
for (const article of articleRegistry) {
  articlePreloads[`/${article.slugs.zh}`] = article.component
  articlePreloads[`/${article.slugs.en}`] = article.component
}

/** Delegated hover/focus preload for the lazy case-study routes — one document-level
 *  listener instead of wiring onMouseEnter onto every scattered <Link>. */
function useArticlePreload() {
  useEffect(() => {
    const warmed = new Set<string>()
    const handler = (e: Event) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      let path: string
      try { path = new URL(anchor.href, window.location.origin).pathname } catch { return }
      const thunk = articlePreloads[path]
      if (thunk && !warmed.has(path)) {
        warmed.add(path)
        thunk()
      }
    }
    document.addEventListener('pointerover', handler)
    document.addEventListener('focusin', handler)
    return () => {
      document.removeEventListener('pointerover', handler)
      document.removeEventListener('focusin', handler)
    }
  }, [])
}

/** Scroll handling on route change: reset to top, or scroll to hash + highlight.
 *  Rendered inside the keyed transition wrapper so it fires when the NEW page mounts
 *  (after the exit fade in mode="wait"), avoiding a visible scroll jump mid-transition.
 *  Re-runs on hash-only navigation since deps include hash + location.key. */
function ScrollManager({ hash, locationKey }: { hash: string; locationKey: string }) {
  useEffect(() => {
    if (hash) {
      // Hash scroll: multi-pass to handle async rendering + highlight on final pass
      const scroll = () => {
        const el = document.querySelector(hash)
        el?.scrollIntoView({ behavior: 'instant' })
        return el
      }
      const t1 = setTimeout(scroll, 50)
      const t2 = setTimeout(scroll, 300)
      const t3 = setTimeout(() => {
        const el = scroll()
        if (el instanceof HTMLElement) {
          el.classList.add('hash-highlight')
          el.addEventListener('animationend', () => el.classList.remove('hash-highlight'), { once: true })
        }
      }, 800)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [hash, locationKey])
  return null
}

/** Route-level crossfade. mode="wait" stops the tall scrolling pages from overlapping;
 *  initial={false} suppresses the enter animation on first load to match prerendered HTML
 *  (no hydration flash). Reduced-motion collapses durations to an instant cut. */
function AnimatedRoutes() {
  const location = useLocation()
  const reduce = useReducedMotion()
  useArticlePreload()

  const enter = reduce ? 0 : 0.2
  const leave = reduce ? 0 : 0.15

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: enter, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: leave, ease: 'easeOut' } }}
      >
        <ScrollManager hash={location.hash} locationKey={location.key} />
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<App />} />
            <Route path="/en" element={<App />} />
            <Route path="/ops" element={<OpsDashboard />} />
            <Route path="/zh" element={<AboutPage lang="zh" />} />
            <Route path="/about" element={<AboutPage lang="en" />} />
            <Route path="/privacidad" element={<PrivacyPolicy lang="zh" />} />
            <Route path="/privacy" element={<PrivacyPolicy lang="en" />} />
            {MotionLab && <Route path="/motion-lab" element={<MotionLab />} />}
            {articleRegistry.map((article) => {
              const ArticleComponent = articleComponents[article.id]
              return [
                <Route key={`${article.id}-zh`} path={`/${article.slugs.zh}`} element={<ArticleComponent lang="zh" />} />,
                <Route key={`${article.id}-en`} path={`/${article.slugs.en}`} element={<ArticleComponent lang="en" />} />,
              ]
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function GlobalChat() {
  const { pathname } = useLocation()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  if (!hydrated || pathname.startsWith('/ops')) return null

  const zhSlugs = getZhSlugs()
  const lang = zhSlugs.has(pathname) ? 'zh' : 'en'

  return (
    <ChatErrorBoundary>
      <Suspense fallback={null}>
        <FloatingChat lang={lang} />
      </Suspense>
    </ChatErrorBoundary>
  )
}

function GlobalMusic() {
  const { pathname } = useLocation()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  if (!hydrated || pathname.startsWith('/ops')) return null
  return (
    <Suspense fallback={null}>
      <MusicToggle />
    </Suspense>
  )
}

function ConditionalNav() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/ops')) return null
  return <GlobalNav />
}

// Console easter egg
const ASCII_ART = `\n ███████╗ █████╗ ███╗   ██╗████████╗██╗███████╗███████╗██████╗ \n ██╔════╝██╔══██╗████╗  ██║╚══██╔══╝██║██╔════╝██╔════╝██╔══██╗\n ███████╗███████║██╔██╗ ██║   ██║   ██║█████╗  █████╗  ██████╔╝\n ╚════██║██╔══██║██║╚██╗██║   ██║   ██║██╔══╝  ██╔══╝  ██╔══██╗\n ███████║██║  ██║██║ ╚████║   ██║   ██║██║     ███████╗██║  ██║\n ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝\n`
console.log(`%c${ASCII_ART}`, 'color: #f97316; font-size: 12px; font-family: monospace;')
console.log('%c Most people scroll. You inspect. I like that. ', 'background: #f97316; color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 3px;')
console.log('%cThe %cbest %cwork %cis %cinvisible.', 'color: #94a3b8; font-size: 13px;', 'color: #7e8d9d; font-size: 13px;', 'color: #687882; font-size: 13px;', 'color: #526268; font-size: 13px;', 'color: #3d4d52; font-size: 13px;')
console.log('%cYou just found some of it.', 'color: #94a3b8; font-size: 13px;')
console.log('%c Trust & Safety PM building AI systems → yingshiliu.j@gmail.com ', 'background: #f97316; color: #1a1a1a; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 3px;')

// Debug API for technical recruiters — type window.__elanaliu in console
Object.defineProperty(window, '__elanaliu', {
  value: Object.freeze({
    stack: 'React 19 + TypeScript + Vite + Tailwind v4 + Motion',
    llm: 'claude-sonnet-4-6 (streaming SSE)',
    render: 'Pre-rendered HTML + critical CSS inlined + client hydration',
    perf: () => { const n = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming; console.table({ TTFB: `${Math.round(n.responseStart - n.requestStart)}ms`, DOMContentLoaded: `${Math.round(n.domContentLoadedEventEnd - n.startTime)}ms`, Load: `${Math.round(n.loadEventEnd - n.startTime)}ms` }); },
    hire_me: 'yingshiliu.j@gmail.com',
  }),
  configurable: false,
})

function NotFound() {
  const { pathname } = useLocation()
  const isEn = pathname.startsWith('/en') || /^\/[a-z]+-[a-z]+-[a-z]+/.test(pathname)

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots) }
    robots.content = 'noindex, nofollow'
    document.title = '404 — Page not found | elenaliu.io'
    return () => { robots.content = 'index, follow' }
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-8xl font-display font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
        {isEn ? 'Page not found' : '页面未找到'}
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {isEn
          ? "The page you're looking for doesn't exist or has been moved."
          : '你要找的页面不存在或已被移动。'}
      </p>
      <Link
        to={isEn ? '/en' : '/'}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        {isEn ? '← Back to home' : '← 返回首页'}
      </Link>
    </div>
  )
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <ConditionalNav />
      <AnimatedRoutes />
      <GlobalChat />
      <GlobalMusic />
      <Analytics />
    </BrowserRouter>
  </StrictMode>
)

// Hydrate if pre-rendered content exists, createRoot for dev mode
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
