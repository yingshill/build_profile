import type { ComponentType } from 'react'

export interface ArticleSeo {
  title: string
  description: string
}

export interface ArticleSeoMeta {
  datePublished: string
  dateModified: string
  keywords: string[]
  articleType: 'Article' | 'TechArticle'
  articleTags: string
  images: string[]
  about: Array<Record<string, string>>
  extra?: Record<string, string>
  citation?: Array<{ '@type': string; name: string; url: string }>
  isBasedOn?: Record<string, unknown>
  mentions?: Array<Record<string, string | string[] | Record<string, string>>>
  discussionUrl?: string
  relatedLink?: string
  communityUrl?: string
  video?: Record<string, unknown>
  subjectOf?: Record<string, unknown>
}

export interface ArticleConfig {
  id: string
  slugs: { zh: string; en: string }
  titles: { zh: string; en: string }
  seo: { es: ArticleSeo; en: ArticleSeo }
  sectionLabels: { zh: Record<string, string>; en: Record<string, string> }
  type: 'collab' | 'case-study' | 'bridge'
  /** Absolute OG image URL for prerender (social cards: LinkedIn, Twitter) */
  ogImage?: string
  /** Hero image path for JSON-LD / GEO (what AI search engines see). Falls back to ogImage if not set. */
  heroImage?: string
  component: () => Promise<{ default: ComponentType<{ lang: 'zh' | 'en' }> }>
  /** x-default hreflang slug (defaults to ES slug) */
  xDefaultSlug?: string
  /** Whether this article is ready for RAG indexing (default: false) */
  ragReady?: boolean
  /** Path to i18n content file relative to project root (required when ragReady=true) */
  i18nFile?: string
  /** SEO metadata for prerender JSON-LD + article meta tags */
  seoMeta?: ArticleSeoMeta
}

export const articleRegistry: ArticleConfig[] = [
  {
    id: 'moderation-os',
    slugs: { zh: 'moderation-os-zh', en: 'moderation-os' },
    titles: { zh: 'Moderation OS', en: 'Moderation OS' },
    seo: {
      es: {
        title: 'LLM内容审核平台落地实战 · Moody\'s Analytics案例研究 | Elena Liu',
        description: '案例研究：在Moody\'s Analytics将LLM辅助审核系统从"存在"做到"生效"——整合3套遗留工具、建立Safety Index评估体系。',
      },
      en: {
        title: 'Operationalizing an LLM Moderation Platform · Moody\'s Analytics Case Study | Elena Liu',
        description: "Case study: how I turned Moody's Analytics' LLM moderation assistant from 'it exists' to 'it works' — consolidating 3 legacy tools, defining a Safety Index evaluation system.",
      },
    },
    sectionLabels: {
      zh: {
        'the-problem': '问题',
        'what-i-built': '我做了什么',
        'results': '结果',
        'the-insight': '核心洞察',
        'faq': '常见问题',
      },
      en: {
        'the-problem': 'The Problem',
        'what-i-built': 'What I Built',
        'results': 'Results',
        'the-insight': 'The Insight',
        'faq': 'FAQ',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/moderation-os-i18n.ts',
    component: () => import('../ModerationOs.tsx'),
    xDefaultSlug: 'moderation-os',
  },
  {
    id: 'ml-pipeline',
    slugs: { zh: 'ml-pipeline-zh', en: 'ml-pipeline' },
    titles: { zh: 'ML内容分级流水线', en: 'ML Content Triage Pipeline' },
    seo: {
      es: {
        title: 'ML内容分级流水线 · Flip案例研究 | Elena Liu',
        description: '案例研究：在Flip用ML分类器自动化处理65%的一线内容报告，审核员决策速度提升12%；在LeanData构建Python自动化分类系统，覆盖率提升35%。',
      },
      en: {
        title: 'ML Content Triage Pipeline · Flip Case Study | Elena Liu',
        description: 'Case study: automated 65% of Tier-1 content reports at Flip using ML classifiers, improving moderator decision speed 12%; built Python classification system at LeanData expanding automation coverage 35%.',
      },
    },
    sectionLabels: {
      zh: {
        'flip': 'Flip',
        'leandata': 'LeanData',
        'closing': '核心洞察',
        'faq': '常见问题',
      },
      en: {
        'flip': 'Flip',
        'leandata': 'LeanData',
        'closing': 'The Through-Line',
        'faq': 'FAQ',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/flip-ml-i18n.ts',
    component: () => import('../FlipMl.tsx'),
    xDefaultSlug: 'ml-pipeline',
  },
  {
    id: 'safety-index',
    slugs: { zh: 'safety-index-zh', en: 'safety-index' },
    titles: { zh: 'Safety Index：AML/KYC评估框架', en: 'Safety Index: AML/KYC Eval Framework' },
    seo: {
      es: {
        title: 'AML/KYC合规筛查LLM评估框架设计 · Moody\'s Analytics | Elena Liu',
        description: '案例研究：在Moody\'s Analytics为LLM辅助制裁名单/负面媒体/PEP筛查系统设计Safety Index评估框架——三指标×三领域，警报质量提升22%。',
      },
      en: {
        title: "Designing an Eval Framework for LLM-Assisted AML/KYC Screening · Moody's Analytics | Elena Liu",
        description: "Case study: how I designed the Safety Index System at Moody's Analytics — three metrics × three risk domains for LLM-assisted sanctions, adverse media, and PEP screening. 22% alert quality improvement.",
      },
    },
    sectionLabels: {
      zh: {
        'the-problem': '问题',
        'why-accuracy-fails': '准确率为何失效',
        'the-framework': 'Safety Index框架',
        'calibration': '阈值校准',
        'hitl': '人机协作',
        'results': '结果',
        'the-insight': '核心洞察',
        'faq': '常见问题',
        'references': '参考资料',
      },
      en: {
        'the-problem': 'The Problem',
        'why-accuracy-fails': 'Why Accuracy Fails',
        'the-framework': 'The Framework',
        'calibration': 'Threshold Calibration',
        'hitl': 'HITL Integration',
        'results': 'Results',
        'the-insight': 'The Insight',
        'faq': 'FAQ',
        'references': 'References',
      },
    },
    type: 'case-study',
    ragReady: true,
    i18nFile: 'src/safety-index-i18n.ts',
    component: () => import('../SafetyIndex.tsx'),
    xDefaultSlug: 'safety-index',
  },

]

// Derived maps for GlobalNav and routing
export function getAltPaths(): Record<string, string> {
  const map: Record<string, string> = {
    '/': '/en',
    '/en': '/',
    '/zh': '/about',
    '/about': '/zh',
    '/privacidad': '/privacy',
    '/privacy': '/privacidad',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.zh}`] = `/${article.slugs.en}`
    map[`/${article.slugs.en}`] = `/${article.slugs.zh}`
  }
  return map
}

export function getPageTitles(): Record<string, string> {
  const map: Record<string, string> = {
    '/': 'Elena Liu · 信任与安全项目经理',
    '/en': 'Elena Liu · Trust & Safety PM',
    '/zh': 'Sobre Mí',
    '/about': 'About',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.zh}`] = article.titles.zh
    map[`/${article.slugs.en}`] = article.titles.en
  }
  return map
}

export function getSectionLabels(): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {}
  for (const article of articleRegistry) {
    map[`/${article.slugs.zh}`] = article.sectionLabels.zh
    map[`/${article.slugs.en}`] = article.sectionLabels.en
  }
  return map
}

/** All ES slugs (for lang detection: if pathname matches an ES slug → lang is 'es') */
export function getZhSlugs(): Set<string> {
  const slugs = new Set<string>(['/', '/privacidad', '/zh'])
  for (const article of articleRegistry) {
    slugs.add(`/${article.slugs.zh}`)
  }
  return slugs
}
