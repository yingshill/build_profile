import { type FlipMlLang as Lang } from './flip-ml-i18n'
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
  StepList,
} from './articles/content-types'
import { flipMlContent } from './flip-ml-i18n'

const JSON_LD_EN = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Automating Content Triage with ML Pipelines',
  description: 'Case study: automated 65% of Tier-1 content reports at Flip using ML classifiers, improving moderator decision speed 12%; built Python classification system at LeanData expanding automation coverage 35%.',
  author: { '@type': 'Person', name: 'Elena Liu', url: 'https://elenaliu.io/about' },
  publisher: { '@type': 'Person', name: 'Elena Liu' },
  datePublished: '2024-01-01',
  keywords: 'ML content moderation,Trust and Safety,content triage,machine learning,data governance,Python classification',
}

const JSON_LD_ZH = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '用ML自动化内容分级流水线',
  description: '案例研究：在Flip用ML分类器自动化处理65%的一线内容报告，审核员决策速度提升12%；在LeanData构建Python自动化分类系统，覆盖率提升35%。',
  author: { '@type': 'Person', name: 'Elena Liu', url: 'https://elenaliu.io/about' },
  publisher: { '@type': 'Person', name: 'Elena Liu' },
  datePublished: '2024-01-01',
  keywords: 'ML内容审核,Trust and Safety,内容分级,机器学习,数据治理,Python自动分类',
}

export default function FlipMl({ lang = 'en' }: { lang?: Lang }) {
  const t = flipMlContent[lang]
  const s = t.sections

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    publishedTime: '2024-01-01',
    articleTags: 'ML content moderation,Trust and Safety,content triage,machine learning,data governance',
    jsonLd: lang === 'zh' ? JSON_LD_ZH : JSON_LD_EN,
    xDefaultSlug: 'ml-pipeline',
  })

  return (
    <ArticleLayout lang={lang}>
      <ArticleHeader
        lang={lang}
        kicker={t.header.kicker}
        h1={t.header.h1}
        subtitle={t.header.subtitle}
        date={t.header.date}
        dateISO="2024-01-01"
        readingTime={t.readingTime}
        authorName="Elena Liu"
        authorUrl="/about"
        authorBio="Trust & Safety PM · Flip · LeanData"
      />

      <MetricsGrid items={t.heroMetrics} columns={4} compact />

      <Callout>{t.tldr}</Callout>

      <article className="prose-custom">
        {/* ================================================================ */}
        {/*  FLIP                                                            */}
        {/* ================================================================ */}
        <H2 id="flip">{s.flip.heading}</H2>
        <Prose>{s.flip.context}</Prose>

        <h3 className="text-lg font-semibold mt-6 mb-2">{s.flip.problemHeading}</h3>
        <Prose>{s.flip.problem}</Prose>

        <h3 className="text-lg font-semibold mt-6 mb-2">{s.flip.solutionHeading}</h3>
        <StepList
          items={[...s.flip.steps].map(step => ({
            label: step.title,
            detail: step.body,
          }))}
        />

        <MetricsGrid
          items={[...s.flip.results].map(item => ({
            value: item.value,
            label: item.label,
            detail: item.desc,
          }))}
          columns={4}
        />

        {/* ================================================================ */}
        {/*  LEANDATA                                                        */}
        {/* ================================================================ */}
        <H2 id="leandata">{s.leandata.heading}</H2>
        <Prose>{s.leandata.context}</Prose>

        <h3 className="text-lg font-semibold mt-6 mb-2">{s.leandata.problemHeading}</h3>
        <Prose>{s.leandata.problem}</Prose>

        <h3 className="text-lg font-semibold mt-6 mb-2">{s.leandata.solutionHeading}</h3>
        <StepList
          items={[...s.leandata.steps].map(step => ({
            label: step.title,
            detail: step.body,
          }))}
        />

        <MetricsGrid
          items={[...s.leandata.results].map(item => ({
            value: item.value,
            label: item.label,
            detail: item.desc,
          }))}
          columns={4}
        />

        {/* ================================================================ */}
        {/*  CLOSING                                                         */}
        {/* ================================================================ */}
        <H2 id="closing">{s.closing.heading}</H2>
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

      <ArticleFooter lang={lang} utmCampaign="ml-pipeline" />
    </ArticleLayout>
  )
}
