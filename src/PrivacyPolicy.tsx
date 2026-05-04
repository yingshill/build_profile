import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArticleLayout } from './articles/components'

const content = {
  zh: {
    title: '隐私政策',
    lastUpdated: '最后更新：2026年4月',
    intro: '本政策说明您访问 elanaliu.io 时数据的收集和使用方式。',
    sections: [
      {
        heading: '收集哪些数据',
        items: [
          '聊天机器人消息：当您与 Elena 的 AI 助手互动时，消息会被处理以生成回复。不会请求或存储个人身份信息。',
          '使用分析：收集匿名浏览数据（访问页面、访问时长、设备类型）用于改善网站体验。',
        ],
      },
      {
        heading: '数据如何使用',
        items: [
          '聊天机器人消息仅用于生成关于 Elena Liu 职业经历的上下文回复。',
          '匿名化的对话记录用于提升回复质量。',
          '分析数据用于了解使用模式并改善网站性能。',
        ],
      },
      {
        heading: '第三方服务',
        items: [
          'Anthropic (Claude)：处理聊天机器人消息以生成回复。',
          'Vercel：托管网站并收集匿名使用分析数据。',
        ],
      },
      {
        heading: 'Cookie 与本地存储',
        body: '本网站不使用追踪 Cookie 或第三方 Cookie。仅使用浏览器 localStorage 存储界面偏好（视觉主题）。不存储个人信息。',
      },
      {
        heading: '无用户账户',
        body: '本网站无需注册或登录。网站不收集姓名、电子邮件或密码。',
      },
      {
        heading: '联系方式',
        body: '如有任何隐私相关问题，请联系：',
        email: 'yingshiliu.j@gmail.com',
      },
    ],
    backHome: '返回首页',
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: April 2026',
    intro: 'This policy describes how data is collected and used when you visit elanaliu.io.',
    sections: [
      {
        heading: 'What data is collected',
        items: [
          "Chatbot messages: when you interact with Elena's AI assistant, messages are processed to generate responses. No personally identifiable information is requested or stored.",
          'Usage analytics: anonymous browsing data (pages visited, duration, device) is collected to improve the site.',
        ],
      },
      {
        heading: 'How data is used',
        items: [
          "Chatbot messages are used exclusively to generate contextual responses about Elena Liu's professional experience.",
          'Anonymized conversation traces are used to improve response quality.',
          'Analytics data is used to understand usage patterns and improve site performance.',
        ],
      },
      {
        heading: 'Third parties',
        items: [
          'Anthropic (Claude): processes chatbot messages to generate responses.',
          'Vercel: hosts the website and collects anonymous usage analytics.',
        ],
      },
      {
        heading: 'Cookies and local storage',
        body: 'This site does not use tracking cookies or third-party cookies. Only browser localStorage is used for interface preferences (visual theme). No personal information is stored.',
      },
      {
        heading: 'No user accounts',
        body: 'This site does not require registration or login. No names, emails, or passwords are collected through the website.',
      },
      {
        heading: 'Contact',
        body: 'For any privacy-related inquiries, you can write to:',
        email: 'yingshiliu.j@gmail.com',
      },
    ],
    backHome: 'Back to home',
  },
} as const

interface PrivacySection {
  heading: string
  items?: readonly string[]
  body?: string
  email?: string
}

export default function PrivacyPolicy({ lang = 'en' }: { lang?: 'zh' | 'en' }) {
  const t = content[lang]

  useEffect(() => {
    document.title = `${t.title} | elanaliu.io`

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, nofollow'

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonical) canonical.href = `https://elanaliu.io/${lang === 'zh' ? 'privacidad' : 'privacy'}`

    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (desc) desc.content = lang === 'zh'
      ? 'elanaliu.io 隐私政策。聊天机器人与网站数据的收集和使用方式。'
      : 'Privacy policy for elanaliu.io. How chatbot and website data is collected and used.'

    return () => {
      robots.content = 'index, follow'
    }
  }, [lang, t.title])

  return (
    <ArticleLayout lang={lang}>
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
          {t.title}
        </h1>
        <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
      </header>

      <article className="prose-custom">
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
          {t.intro}
        </p>

        {(t.sections as readonly PrivacySection[]).map((section, i) => (
          <section key={i} className="mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {section.heading}
            </h2>

            {section.items && (
              <ul className="space-y-2 mb-4">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base text-muted-foreground">
                    <span className="text-primary font-bold shrink-0 mt-0.5">{'●'}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.body && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            )}

            {section.email && (
              <p className="mt-2">
                <a
                  href={`mailto:${section.email}`}
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {section.email}
                </a>
              </p>
            )}
          </section>
        ))}

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to={lang === 'zh' ? '/' : '/en'}
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            {'← '}{t.backHome}
          </Link>
        </div>
      </article>
    </ArticleLayout>
  )
}
