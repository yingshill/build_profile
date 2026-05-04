import { type ModerationOsLang as Lang } from './moderation-os-i18n'
import { useArticleSeo } from './articles/use-article-seo'
import {
  ArticleLayout,
  ArticleHeader,
  ArticleFooter,
  FaqSection,
  MetricsGrid,
} from './articles/components'
import {
  H2,
  Prose,
  Callout,
  Manifesto,
  StepList,
} from './articles/content-types'
import { moderationOsContent } from './moderation-os-i18n'

const JSON_LD_EN = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Operationalizing an LLM Moderation Platform',
  description: "Case study: how I turned Moody's Analytics' LLM moderation assistant from 'it exists' to 'it works' — consolidating 3 legacy tools, defining a Safety Index evaluation system, improving moderation accuracy 22%, reducing AHT 15%.",
  author: { '@type': 'Person', name: 'Elena Liu', url: 'https://elanaliu.io/about' },
  publisher: { '@type': 'Person', name: 'Elena Liu' },
  datePublished: '2024-08-01',
  keywords: 'LLM moderation,Trust and Safety,AI operations,content moderation,evaluation framework,Safety Index',
}

const JSON_LD_ZH = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '让LLM审核平台真正"生效"',
  description: '案例研究：在Moody\'s Analytics将LLM辅助审核系统从"存在"做到"生效"',
  author: { '@type': 'Person', name: 'Elena Liu', url: 'https://elanaliu.io/about' },
  publisher: { '@type': 'Person', name: 'Elena Liu' },
  datePublished: '2024-08-01',
  keywords: 'LLM内容审核,Trust and Safety,AI运营,评估框架,Safety Index',
}

export default function ModerationOs({ lang = 'en' }: { lang?: Lang }) {
  const t = moderationOsContent[lang]
  const s = t.sections

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    publishedTime: '2024-08-01',
    articleTags: 'LLM moderation,Trust and Safety,AI operations,content moderation,evaluation framework',
    jsonLd: lang === 'zh' ? JSON_LD_ZH : JSON_LD_EN,
    xDefaultSlug: 'moderation-os',
  })

  return (
    <ArticleLayout lang={lang}>
      <ArticleHeader
        lang={lang}
        kicker={t.header.kicker}
        h1={t.header.h1}
        subtitle={t.header.subtitle}
        date={t.header.date}
        dateISO="2024-08-01"
        readingTime={t.readingTime}
        authorName="Elena Liu"
        authorUrl="/about"
        authorBio={lang === 'zh' ? 'Trust & Safety PM · Moody\'s Analytics' : 'Trust & Safety PM · Moody\'s Analytics'}
      />

      <MetricsGrid items={t.heroMetrics} columns={4} compact />

      <Manifesto>{t.manifesto}</Manifesto>

      <Callout>{t.tldr}</Callout>

      <article className="prose-custom">
        {/* ================================================================ */}
        {/*  THE PROBLEM                                                     */}
        {/* ================================================================ */}
        <H2 id="the-problem">{s.theProblem.heading}</H2>
        <Prose>{s.theProblem.body}</Prose>
        <Callout>{s.theProblem.callout}</Callout>

        {/* ================================================================ */}
        {/*  WHAT I BUILT                                                    */}
        {/* ================================================================ */}
        <H2 id="what-i-built">{s.whatIBuilt.heading}</H2>
        <Prose>{s.whatIBuilt.intro}</Prose>
        <StepList
          items={[...s.whatIBuilt.steps].map(step => ({
            label: step.title,
            detail: step.body,
          }))}
        />

        {/* ================================================================ */}
        {/*  RESULTS                                                         */}
        {/* ================================================================ */}
        <H2 id="results">{s.results.heading}</H2>
        <MetricsGrid
          items={[...s.results.items].map(item => ({
            value: item.value,
            label: item.label,
            detail: item.desc,
          }))}
          columns={4}
        />

        {/* ================================================================ */}
        {/*  CLOSING                                                         */}
        {/* ================================================================ */}
        <H2 id="the-insight">{s.closing.heading}</H2>
        <blockquote className="border-l-4 border-primary pl-6 pr-4 py-3 text-lg italic font-display leading-snug text-foreground/90 mb-8">
          {s.closing.quote}
        </blockquote>

        {/* ================================================================ */}
        {/*  FAQ                                                             */}
        {/* ================================================================ */}
        <FaqSection
          heading={lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
          items={[...t.faq]}
        />
      </article>

      <ArticleFooter lang={lang} utmCampaign="moderation-os" />
    </ArticleLayout>
  )
}
