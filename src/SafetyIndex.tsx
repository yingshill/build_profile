import { type SafetyIndexLang as Lang } from './safety-index-i18n'
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
  DataTable,
  ConditionList,
} from './articles/content-types'
import { safetyIndexContent } from './safety-index-i18n'

const JSON_LD_EN = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Beyond Accuracy: Designing an Eval Framework for LLM-Assisted AML/KYC Compliance Screening',
  description: "Case study: how I designed the Safety Index System at Moody's Analytics — three metrics × three risk domains for LLM-assisted sanctions, adverse media, and PEP screening.",
  author: { '@type': 'Person', name: 'Elena Liu', url: 'https://elenaliu.io/about' },
  publisher: { '@type': 'Person', name: 'Elena Liu' },
  datePublished: '2024-08-01',
  keywords: 'AML/KYC,compliance screening,LLM evaluation,Precision Recall FPR,Safety Index,sanctions screening,adverse media,PEP,HITL,alert fatigue',
}

const JSON_LD_ZH = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: '超越准确率：为LLM辅助AML/KYC合规筛查设计评估框架',
  description: '案例研究：在Moody\'s Analytics设计Safety Index System——三指标×三风险领域，警报质量提升22%，处理时长降低15%。',
  author: { '@type': 'Person', name: 'Elena Liu', url: 'https://elenaliu.io/about' },
  publisher: { '@type': 'Person', name: 'Elena Liu' },
  datePublished: '2024-08-01',
  keywords: 'AML/KYC,合规筛查,LLM评估,精确率召回率误报率,Safety Index,制裁名单,负面媒体,PEP,人机协作',
}

export default function SafetyIndex({ lang = 'en' }: { lang?: Lang }) {
  const t = safetyIndexContent[lang]
  const s = t.sections

  useArticleSeo({
    lang,
    slug: t.slug,
    altSlug: t.altSlug,
    title: t.seo.title,
    description: t.seo.description,
    publishedTime: '2024-08-01',
    articleTags: 'AML/KYC,compliance screening,LLM evaluation,Precision Recall FPR,Safety Index,HITL',
    jsonLd: lang === 'zh' ? JSON_LD_ZH : JSON_LD_EN,
    xDefaultSlug: 'safety-index',
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
        authorBio={lang === 'zh' ? "Trust & Safety PM · Moody's Analytics" : "Trust & Safety PM · Moody's Analytics"}
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
        {/*  WHY ACCURACY FAILS                                              */}
        {/* ================================================================ */}
        <H2 id="why-accuracy-fails">{s.whyAccuracyFails.heading}</H2>
        <Prose>{s.whyAccuracyFails.body}</Prose>
        <DataTable
          headers={[...s.whyAccuracyFails.tableHeaders]}
          rows={[...s.whyAccuracyFails.tableRows].map(r => [...r])}
          highlightColumn={3}
        />
        <p className="text-xs text-muted-foreground -mt-3 mb-6 italic">{s.whyAccuracyFails.tableNote}</p>

        {/* ================================================================ */}
        {/*  THE FRAMEWORK                                                   */}
        {/* ================================================================ */}
        <H2 id="the-framework">{s.theFramework.heading}</H2>
        <Prose>{s.theFramework.intro}</Prose>
        <StepList
          items={[...s.theFramework.steps].map(step => ({
            label: step.title,
            detail: step.body,
          }))}
        />
        <Callout>{s.theFramework.closing}</Callout>

        {/* ================================================================ */}
        {/*  THRESHOLD CALIBRATION                                           */}
        {/* ================================================================ */}
        <H2 id="calibration">{s.calibration.heading}</H2>
        <Prose>{s.calibration.intro}</Prose>
        <StepList
          items={[...s.calibration.steps].map(step => ({
            label: step.title,
            detail: step.body,
          }))}
        />
        <Prose>{s.calibration.domainNote}</Prose>

        {/* ================================================================ */}
        {/*  HITL INTEGRATION                                                */}
        {/* ================================================================ */}
        <H2 id="hitl">{s.hitl.heading}</H2>
        <Prose>{s.hitl.intro}</Prose>
        <ConditionList
          items={[...s.hitl.routing].map(r => ({
            condition: r.condition,
            action: r.action,
          }))}
        />
        <Prose>{s.hitl.scoreNote}</Prose>
        <Prose>{s.hitl.overturnNote}</Prose>

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

        {/* ================================================================ */}
        {/*  REFERENCES                                                      */}
        {/* ================================================================ */}
        <H2 id="references">{t.references.heading}</H2>
        <ul className="space-y-2 mb-8 list-none p-0">
          {[...t.references.items].map((ref, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                {ref.name}
              </a>
            </li>
          ))}
        </ul>
      </article>

      <ArticleFooter lang={lang} utmCampaign="safety-index" />
    </ArticleLayout>
  )
}
