export type SafetyIndexLang = 'zh' | 'en'

export const safetyIndexContent = {
  zh: {
    slug: 'safety-index-zh',
    altSlug: 'safety-index',
    readingTime: '10 分钟阅读',
    seo: {
      title: 'AML/KYC合规筛查LLM评估框架设计 · Moody\'s Analytics案例 | Elena Liu',
      description: '案例研究：在Moody\'s Analytics为LLM辅助制裁名单/负面媒体/PEP筛查系统设计Safety Index评估框架——三指标×三领域，警报质量提升22%，处理时长降低15%。',
    },
    nav: {
      breadcrumbHome: '首页',
      breadcrumbCurrent: 'Safety Index',
    },
    header: {
      kicker: '案例研究 · AML/KYC运营 · Moody\'s Analytics',
      h1: '超越准确率：为LLM辅助合规筛查设计评估框架',
      subtitle: '单一准确率分数无法告诉你哪个风险领域在淹没分析师、哪个在放过真实威胁。这是我如何把三个指标乘以三个领域，让评估变得真正可执行。',
      badge: '生产环境落地',
      date: '2024年8月至今',
    },
    heroMetrics: [
      { value: '22%↑', label: '警报质量' },
      { value: '15%↓', label: '单次审查处理时长' },
      { value: '23%↓', label: '总队列处理时长' },
      { value: '3', label: '风险领域独立校准' },
    ],
    tldr: '大多数LLM辅助筛查系统的失败不是模型失败——而是测量失败。当我加入Moody\'s Analytics时，LLM筛查助手没有领域专属阈值，没有分类指标，也没有系统化的方式判断某次变更是否真的有效。Safety Index System改变了这一点。',
    manifesto: '你无法改善你没有测量的东西。但用一个单一准确率分数横跨容忍度截然不同的多个风险领域——比不测量更糟：它制造了虚假的确定性。',
    sections: {
      theProblem: {
        heading: '问题：合规筛查中的警报疲劳',
        body: '在AML/KYC合规领域，最难的问题不是抓住坏人——而是不要误报好人。在Moody\'s Analytics，我们的LLM辅助筛查工具对实体进行三类核查：制裁名单比对、负面媒体检索，以及政治公众人物（PEP）数据库核查。遗留系统的核心问题是：三个领域共用一套校准参数，且偏向召回率而非精确率。合规分析师淹没在误报之中——合法供应商被错误匹配到制裁名单，无害新闻被标记为负面媒体。\n\n更深层的问题：我们没有系统化的方式量化问题有多严重，也没有可靠信号判断任何调整是否有所改善。',
        callout: '误报率不只是运营问题，更是测量问题。',
      },
      whyAccuracyFails: {
        heading: '为什么单一准确率指标会失效',
        body: '跨制裁筛查、负面媒体和PEP筛查使用同一个准确率分数，不是信息，而是噪声。每个领域对误报与漏报的代价截然不同：',
        tableNote: '精确率/召回率的最优权衡因领域而异。单一准确率指标将这些差异压缩为噪声。',
        tableHeaders: ['风险领域', '误报代价', '漏报代价', '优先级'],
        tableRows: [
          ['制裁名单筛查', '入职延迟、运营摩擦', '合规违规、潜在罚款', '优先召回率'],
          ['负面媒体检索', '警报疲劳、真实信号被淹没', '声誉风险未被发现', '优先精确率'],
          ['PEP筛查', '客户摩擦、审查负荷增加', '合规敞口', '依上下文而定'],
        ] as readonly (readonly string[])[],
      },
      theFramework: {
        heading: 'Safety Index：三指标 × 三领域',
        intro: 'Safety Index System对每个风险领域追踪三个核心指标，构建一个3×3评估矩阵，取代单一准确率数字：',
        steps: [
          {
            title: '精确率（Precision）',
            body: '在所有被标记的警报中，真正匹配的占多大比例？精确率低意味着分析师在处理噪声，而非真实风险。',
          },
          {
            title: '召回率（Recall）',
            body: '在所有真正的匹配中，系统捕获了多大比例？召回率低意味着真实风险在悄悄溜过，这是合规敞口问题。',
          },
          {
            title: '误报率（FPR）',
            body: '合法实体被错误标记的概率是多少？即使精确率在总体上可以接受，某一领域的高误报率也会使审查队列饱和。误报率是运营负荷的直接衡量指标。',
          },
        ],
        closing: '每个领域拥有独立的阈值集。这一框架成为运营团队与AI Research团队之间的契约：任何低于阈值的领域都会触发结构化反馈回路，返回模型团队——不是笼统的抱怨，而是带有具体领域定位的具体指标。',
      },
      calibration: {
        heading: '阈值校准：如何设定并持续维护正确的阈值',
        intro: '设定领域专属阈值不是一次性工程。标准方法包含三个环节：',
        steps: [
          {
            title: '影子部署（Shadow Deployment）',
            body: '在推向生产之前，将新的阈值配置在历史标注数据上进行评估，与基线进行干净的对比，不影响分析师日常工作。',
          },
          {
            title: '金标准数据集验证',
            body: '维护一个经过人工标注的实体匹配样本集——包含已确认的真阳性和已确认的误报——用于对模型变更进行压力测试。每次政策定义更新时同步刷新。',
          },
          {
            title: '持续抽样核查',
            body: '定期对近期被自动排除的警报进行随机抽样，在模型漂移积累之前将其捕获。目标是发现聚合指标无法揭示的系统性失效模式。',
          },
        ],
        domainNote: '校准哲学因领域而异：制裁筛查优先召回率（漏掉一个真实匹配即构成合规违规）；负面媒体优先精确率（误报疲劳会淹没真实信号）；PEP阈值则依据交易上下文和实体类型动态调整。',
      },
      hitl: {
        heading: '人机协作：按置信度路由，而非按体量路由',
        intro: '并非每条警报都需要人工审查。路由逻辑如下：',
        routing: [
          { condition: '置信度高于阈值（高置信度真实匹配）', action: '自动升级至合规处理流程' },
          { condition: '置信度高于阈值（高置信度误报）', action: '自动排除——无需消耗分析师时间' },
          { condition: '置信度低于阈值（模糊匹配）', action: '附带LLM生成推理说明，路由至人工审查队列' },
        ],
        scoreNote: '置信度分数是一个复合信号：实体名称相似度（对名称变体、音译、缩写进行模糊匹配）结合LLM对上下文信号的综合评估——注册国家、实体类型、相关日期等。这与Moody\'s Compliance Catalyst等现代合规平台对警报相关性进行AI评分的逻辑一致，区别在于这里是作为评估系统而非仅作为生产过滤器使用。',
        overturnNote: '路由校准效果的滞后指标是分析师复议率。如果分析师频繁推翻高置信度的自动排除决定，说明阈值设置过于激进；如果自动升级的警报始终无需复核即可确认，说明阈值还没有捕获足够多的边界案例。',
      },
      results: {
        heading: '结果',
        items: [
          {
            value: '22%↑',
            label: '警报质量提升',
            desc: '领域专属阈值校准与更紧密的AI Research反馈回路共同驱动，真实匹配精确率提升',
          },
          {
            value: '15%↓',
            label: '单次审查处理时长降低',
            desc: '审查节点处更好的LLM辅助推理说明，缩短分析师决策时间',
          },
          {
            value: '23%↓',
            label: '总队列处理时长降低',
            desc: '高置信度自动路由在警报到达分析师队列前过滤掉大量误报',
          },
          {
            value: '×3',
            label: '风险领域独立校准',
            desc: '制裁名单、负面媒体、PEP各自拥有独立的精确率/召回率/误报率阈值',
          },
        ],
      },
      closing: {
        heading: '核心洞察',
        quote: 'Safety Index System不是模型质量指标——它是运营对齐工具。它在每天面对误报的合规分析师，与只看聚合准确率数字的AI Research团队之间，建立了一套共同语言。当两个团队都在看同一套领域专属的三维指标时，反馈回路才真正能够闭合。',
      },
    },
    references: {
      heading: '参考资料',
      items: [
        {
          name: 'Content Moderation by LLM: From Accuracy to Legitimacy — Springer Nature, 2025',
          url: 'https://link.springer.com/article/10.1007/s10462-025-11328-1',
        },
        {
          name: "Moody's Compliance Catalyst — AI-scored alert relevance for KYC/AML workflows",
          url: 'https://www.moodys.com/web/en/us/kyc/products/compliance-catalyst.html',
        },
        {
          name: "Moody's Maxsight™ Q3 2025 — Agentic AI in compliance screening",
          url: 'https://www.moodys.com/web/en/us/insights/compliance-tprm/what-gives-maxsight-q3-2025-update-as-agentic-ai-moves-from-promise-into-practices.html',
        },
        {
          name: 'LLM Evaluation Guide 2025: Metrics, Framework & Best Practices — xByte Solutions',
          url: 'https://www.xbytesolutions.com/llm-evaluation-metrics-framework-best-practices/',
        },
      ],
    },
    faq: [
      {
        q: '为什么要把误报率（FPR）和精确率分开追踪？它们不是在衡量同一件事吗？',
        a: '两者相关但在运营层面有本质区别。精确率衡量的是你标记的警报中正确的比例。误报率衡量的是你的整个负样本群体（合法实体）中被错误标记的比例。在真阳性率极低的领域——比如制裁筛查，大多数实体并不在任何名单上——精确率可能看起来尚可，但误报率依然高得无法接受。同时追踪两者，才能同时从分析师视角（精确率）和模型视角（误报率）看到问题。',
      },
      {
        q: '当政策变更导致"真实匹配"的定义改变时，如何处理？',
        a: '政策变更是金标准数据集需要刷新的主要原因。当触发匹配的定义发生变化——新的制裁名单、更新的负面媒体判定标准、扩展的PEP范围——历史标注可能与当前政策产生偏差。正确的处理顺序：先更新金标准数据集的标注，再对新的基准进行阈值重新校准，最后再部署。跳过这个顺序，就是在对一个已经不存在的政策进行校准。',
      },
      {
        q: '在大规模场景下，领域专属校准最难的部分是什么？',
        a: '保持领域边界的清晰度。在实际操作中，单一实体的筛查结果可能携带跨领域信号——一个出现在PEP名单上的实体可能同时有负面媒体记录。决定哪个领域的阈值适用，以及如何处理多领域标记，需要在校准之前就完成明确的政策设计。这个框架只有在上游领域分类已经清晰定义的前提下才能有效运作。',
      },
      {
        q: '这篇文章和Moderation OS案例研究是什么关系？',
        a: 'Safety Index System是更大范围Moderation OS工作的一个组成部分。Moderation OS描述了完整的落地过程：整合3套遗留工具、部署LLM助手、构建赋能层。本文深入探讨其中一个具体层面——让整个系统可测量的评估框架。如果你想了解完整的项目背景，Moderation OS案例研究有详细描述。',
      },
    ],
  },
  en: {
    slug: 'safety-index',
    altSlug: 'safety-index-zh',
    readingTime: '10 min read',
    seo: {
      title: 'Designing an Eval Framework for LLM-Assisted AML/KYC Screening · Moody\'s Analytics | Elena Liu',
      description: "Case study: how I designed the Safety Index System at Moody's Analytics — three metrics × three risk domains for LLM-assisted sanctions, adverse media, and PEP screening. 22% alert quality improvement, 15% AHT reduction.",
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Safety Index',
    },
    header: {
      kicker: "Case Study · AML/KYC Ops · Moody's Analytics",
      h1: 'Beyond Accuracy: Designing an Eval Framework for LLM-Assisted Compliance Screening',
      subtitle: "A single accuracy score can't tell you which risk domain is drowning analysts and which is letting real threats through. Here's how three metrics times three domains made evaluation actually actionable.",
      badge: 'Production',
      date: 'Aug 2024 – Present',
    },
    heroMetrics: [
      { value: '22%↑', label: 'alert quality' },
      { value: '15%↓', label: 'AHT per review task' },
      { value: '23%↓', label: 'total queue throughput time' },
      { value: '3', label: 'risk domains calibrated' },
    ],
    tldr: "Most LLM-assisted screening failures aren't model failures — they're measurement failures. When I joined Moody's Analytics, the LLM screening assistant had no domain-specific thresholds, no per-category metrics, and no systematic way to know whether any change made things better or worse. The Safety Index System changed that.",
    manifesto: "You can't improve what you don't measure. But a single accuracy score across risk domains with fundamentally different tolerances is worse than no measurement at all — it creates false confidence.",
    sections: {
      theProblem: {
        heading: 'The Problem: Alert Fatigue in AML/KYC Screening',
        body: "In AML/KYC compliance, the hardest problem isn't catching bad actors — it's not crying wolf. At Moody's Analytics, our LLM-assisted screening tool reviewed entities against sanctions lists, adverse media sources, and PEP (politically exposed persons) databases. The legacy approach had one calibration across all three domains: optimized for recall, not precision. Compliance analysts were drowning in false positives — legitimate vendors incorrectly matched to sanctions entries, benign news articles surfaced as adverse media.\n\nThe deeper problem: we had no systematic way to quantify how bad it was, and no reliable signal for whether any change made things better.",
        callout: "The false positive rate wasn't just an operational problem. It was a measurement problem.",
      },
      whyAccuracyFails: {
        heading: 'Why Accuracy Alone Fails',
        body: 'A single accuracy score across sanctions screening, adverse media, and PEP gives you noise, not information. Each domain has a fundamentally different cost structure for false positives versus false negatives:',
        tableNote: 'The right precision/recall tradeoff differs by domain. A single accuracy metric flattens this into noise.',
        tableHeaders: ['Risk Domain', 'False Positive Cost', 'False Negative Cost', 'Priority'],
        tableRows: [
          ['Sanctions screening', 'Delayed onboarding, operational friction', 'Regulatory violation, potential fines', 'Recall-first'],
          ['Adverse media', 'Alert fatigue, real signals buried', 'Reputational risk undetected', 'Precision-first'],
          ['PEP screening', 'Customer friction, increased review load', 'Compliance exposure', 'Context-dependent'],
        ] as readonly (readonly string[])[],
      },
      theFramework: {
        heading: 'The Safety Index: Three Metrics × Three Domains',
        intro: 'The Safety Index System tracks three metrics per risk domain — a 3×3 evaluation grid that replaces the single accuracy number:',
        steps: [
          {
            title: 'Precision',
            body: 'Of all flagged alerts, what fraction are true matches? Low precision means analysts are processing noise instead of real risk.',
          },
          {
            title: 'Recall',
            body: 'Of all true matches, what fraction did the system catch? Low recall means real risk is slipping through undetected — the compliance exposure problem.',
          },
          {
            title: 'False Positive Rate (FPR)',
            body: 'How often are legitimate entities incorrectly flagged? Even when aggregate Precision is acceptable, a high FPR in one domain can saturate the review queue. FPR is the direct measure of analyst time waste.',
          },
        ],
        closing: 'Each domain gets its own threshold set. This framework functions as the contract between ops and AI Research: any domain that drops below threshold triggers a structured feedback loop back to the model team — not a general complaint, but a specific metric with a specific domain.',
      },
      calibration: {
        heading: 'Threshold Calibration: How to Set — and Maintain — the Right Thresholds',
        intro: "Setting per-domain thresholds isn't a one-time exercise. The standard approach has three components:",
        steps: [
          {
            title: 'Shadow deployment',
            body: 'Evaluate new threshold configurations against historical labeled data before pushing to production. Clean comparison against baseline with no analyst disruption.',
          },
          {
            title: 'Golden dataset validation',
            body: 'Maintain a curated set of labeled entity matches — confirmed true positives and confirmed false positives — used to stress-test model changes. Refreshed whenever policy definitions change.',
          },
          {
            title: 'Ongoing spot-check sampling',
            body: 'Regular random sampling of recent auto-dismissed alerts to catch model drift before it compounds. The goal: surface systematic failure patterns that aggregate metrics miss.',
          },
        ],
        domainNote: 'The calibration philosophy differed by domain: sanctions screening prioritized Recall (a missed true match is a regulatory violation); adverse media prioritized Precision (false positive fatigue buries real signals); PEP thresholds were calibrated by transaction context and entity type.',
      },
      hitl: {
        heading: 'HITL Integration: Routing by Confidence, Not by Volume',
        intro: 'Not every alert needs human review. The routing model:',
        routing: [
          { condition: 'Confidence above threshold (high-confidence true match)', action: 'Auto-escalate for compliance action' },
          { condition: 'Confidence above threshold (high-confidence false positive)', action: 'Auto-dismiss — no analyst time required' },
          { condition: 'Confidence below threshold (ambiguous match)', action: 'Route to human analyst queue with LLM-generated reasoning' },
        ],
        scoreNote: "The confidence score is a composite signal: entity name similarity (fuzzy matching on name variants, transliterations, and abbreviations) combined with LLM-assessed contextual signals — country of incorporation, entity type, relevant dates. This is consistent with how modern compliance platforms approach match reasoning, including Moody's Compliance Catalyst's AI-scored alert relevance and the Maxsight Screening Agent's reasoning display — applied here as an evaluation system, not just a production filter.",
        overturnNote: "The lagging indicator that routing calibration is working: analyst overturn rate. If analysts are regularly overturning high-confidence auto-dismissals, the threshold is too aggressive. If auto-escalations are consistently confirmed without review, the threshold isn't catching enough edge cases.",
      },
      results: {
        heading: 'Results',
        items: [
          {
            value: '22%↑',
            label: 'alert quality',
            desc: 'True match precision across domains, driven by per-domain threshold calibration and tighter AI Research feedback loops',
          },
          {
            value: '15%↓',
            label: 'AHT per review task',
            desc: 'Better LLM-assisted reasoning at the point of review reduced analyst decision time',
          },
          {
            value: '23%↓',
            label: 'total queue throughput time',
            desc: 'High-confidence auto-routing removed a significant fraction of false positives before they reached the analyst queue',
          },
          {
            value: '×3',
            label: 'risk domains calibrated',
            desc: 'Sanctions, adverse media, and PEP — each with independent Precision/Recall/FPR thresholds',
          },
        ],
      },
      closing: {
        heading: 'The Insight',
        quote: "The Safety Index System isn't a model quality metric — it's an operational alignment tool. It creates a shared language between compliance analysts who see false positives every day and AI Research teams who see aggregate accuracy numbers. When both groups are looking at the same three metrics per domain, the feedback loop actually closes.",
      },
    },
    references: {
      heading: 'References',
      items: [
        {
          name: 'Content Moderation by LLM: From Accuracy to Legitimacy — Springer Nature, 2025',
          url: 'https://link.springer.com/article/10.1007/s10462-025-11328-1',
        },
        {
          name: "Moody's Compliance Catalyst — AI-scored alert relevance for KYC/AML workflows",
          url: 'https://www.moodys.com/web/en/us/kyc/products/compliance-catalyst.html',
        },
        {
          name: "Moody's Maxsight™ Q3 2025 — Agentic AI in compliance screening",
          url: 'https://www.moodys.com/web/en/us/insights/compliance-tprm/what-gives-maxsight-q3-2025-update-as-agentic-ai-moves-from-promise-into-practices.html',
        },
        {
          name: 'LLM Evaluation Guide 2025: Metrics, Framework & Best Practices — xByte Solutions',
          url: 'https://www.xbytesolutions.com/llm-evaluation-metrics-framework-best-practices/',
        },
      ],
    },
    faq: [
      {
        q: "Why track FPR separately from Precision? Aren't they measuring the same thing?",
        a: "They're related but operationally different. Precision tells you the ratio of your flagged alerts that are correct. FPR tells you what fraction of your entire negative population — legitimate entities — are being incorrectly flagged. In a domain with a very small true positive rate, like sanctions screening where most entities aren't on any list, Precision can look acceptable while FPR is still unacceptably high. Tracking both forces you to see the problem from the analyst's perspective (Precision) and the model's perspective (FPR).",
      },
      {
        q: 'How do you handle policy changes that shift what counts as a true match?',
        a: "Policy changes are the main reason golden datasets need to be refreshed. When the definition of what triggers a match changes — a new sanctions list, updated adverse media criteria, expanded PEP scope — historical labels can become misaligned with current policy. The correct sequence: update the golden dataset labels first, re-baseline thresholds against the new ground truth, then deploy. Without this order, you're calibrating against a policy that no longer exists.",
      },
      {
        q: "What's the hardest part of per-domain calibration at scale?",
        a: "Keeping domain boundaries clean. In practice, a single entity screening result can have signals that span domains — an entity on a PEP list might also have adverse media. Deciding which domain's threshold applies, and how to handle multi-domain flags, requires explicit policy design before you can do meaningful calibration. The framework only works if domain categories are well-defined upstream.",
      },
      {
        q: 'How does this connect to the Moderation OS case study?',
        a: "The Safety Index System was one component of the broader Moderation OS work. Moderation OS describes the full operationalization: unifying 3 legacy tools, deploying the LLM assistant, building the enablement layer. This article goes deeper on one specific layer — the evaluation framework that made the system measurable. If you want the full project context, the Moderation OS case study covers it.",
      },
    ],
  },
} as const
