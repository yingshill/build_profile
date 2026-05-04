export type FlipMlLang = 'zh' | 'en'

export const flipMlContent = {
  zh: {
    slug: 'ml-pipeline-zh',
    altSlug: 'ml-pipeline',
    readingTime: '6 分钟阅读',
    seo: {
      title: 'ML内容分级流水线 · Flip案例研究 | Elena Liu',
      description: '案例研究：在Flip用ML分类器自动化处理65%的一线内容报告，审核员决策速度提升12%；在LeanData构建Python自动化分类系统，覆盖率提升35%。',
    },
    nav: {
      breadcrumbHome: '首页',
      breadcrumbCurrent: 'ML内容流水线',
    },
    header: {
      kicker: '案例研究 · 数据运营 · Flip + LeanData',
      h1: '用ML自动化内容分级流水线',
      subtitle: '手动处理无法跟上规模化。我设计了分类系统，让机器处理65%的常规决策，让人专注于真正需要判断的边缘案例。',
      badge: '生产环境落地',
      date: '2020 – 2024',
    },
    heroMetrics: [
      { value: '65%', label: '一线报告自动化（Flip）' },
      { value: '12%↑', label: '审核员决策速度（Flip）' },
      { value: '35%↑', label: '自动化覆盖率（LeanData）' },
      { value: '30%↓', label: '手动对账错误（LeanData）' },
    ],
    tldr: '在Flip，手动内容报告处理已成为审核团队的瓶颈——随着平台增长，一线报告量超出了人工分级能力。在LeanData，缺乏标准化分类体系导致跨团队数据口径不一致，治理成本持续攀升。两个项目的核心逻辑相同：先定义清晰的分类标准，再用自动化处理结构化案例，让人力聚焦于真正需要判断的边缘情况。',
    sections: {
      flip: {
        heading: 'Flip：自动化一线内容分级',
        context: 'Flip是二手商品平台。随着平台增长，用户上报的内容违规案例（Tier-1报告）量级持续攀升，人工处理速度跟不上增长。审核员被大量结构化、规律性的案例占用，无法集中处理真正复杂的边缘情况。',
        problemHeading: '问题：规模与人工处理的张力',
        problem: '大多数Tier-1报告遵循可预测的模式——特定类别的违规内容在文本信号、元数据和用户行为特征上高度相似。人工逐一处理是成本最高、价值最低的方式。',
        solutionHeading: '方案：ML分类器 + 人在回路',
        steps: [
          {
            number: '01',
            title: '数据分析与特征工程',
            body: '分析历史报告数据，识别高置信度可自动化的违规类别。提取文本特征（TF-IDF）、元数据信号（商品类别、账龄、历史违规记录）和行为特征，构建训练集。',
          },
          {
            number: '02',
            title: '分类模型训练与阈值校准',
            body: '基于Python（Scikit-learn）训练多类分类器。关键决策：针对不同违规类别设置差异化置信度阈值——高置信度案例自动处置，低置信度案例路由到人工审核队列。',
          },
          {
            number: '03',
            title: '人在回路设计',
            body: '自动化不是替代人工，而是精准分流。分类器处理可预测的结构化案例，审核员集中处理真正需要上下文判断的复杂案例。建立反馈机制，将人工纠正作为模型持续优化的信号。',
          },
          {
            number: '04',
            title: 'GenAI政策执行工具试点',
            body: '支持GenAI内容政策执行工具的试点上线，协助定义评估指标、收集审核员反馈、文档化政策边界。为后续在Moody\'s Analytics落地LLM审核系统提供了直接的方法论基础。',
          },
        ],
        results: [
          { value: '65%', label: '一线报告自动化', desc: '结构化、高置信度案例由分类器直接处置，无需人工介入' },
          { value: '12%↑', label: '审核员决策速度', desc: '审核员专注于复杂边缘案例，平均处理时长缩短' },
        ],
      },
      leandata: {
        heading: 'LeanData：数据治理与自动分类',
        context: 'LeanData是B2B收入运营SaaS公司。作为数据治理分析师，核心问题是：跨团队的数据分类标准不统一，导致下游分析结果不可信、数据对账成本高。',
        problemHeading: '问题：分类混乱导致治理失效',
        problem: '缺乏统一的分类体系，各团队按自己的理解对数据打标签，导致同一实体在不同系统中有不同的分类，对账时产生大量手动纠错工作。',
        solutionHeading: '方案：JSON分类标准 + Python自动化',
        steps: [
          {
            number: '01',
            title: 'JSON分类体系标准化',
            body: '与各业务团队协作，定义统一的分类标准和字段规范，输出JSON Schema作为跨系统的单一数据契约。消除了各团队"自由发挥"分类的根源。',
          },
          {
            number: '02',
            title: 'Python自动分类系统',
            body: '基于标准化的分类体系，用Python（Scikit-learn）构建自动分类管道，处理结构化输入数据。将自动化覆盖率从初始水平提升35%，大幅减少人工打标签的工作量。',
          },
          {
            number: '03',
            title: '数据质量监控框架',
            body: '建立持续监控机制，追踪分类一致性、异常分类率和覆盖率缺口。为团队提供可操作的数据质量看板，而非只有事后报告。',
          },
        ],
        results: [
          { value: '35%↑', label: '自动化覆盖率', desc: 'Python分类管道处理结构化输入，替代手动打标签' },
          { value: '30%↓', label: '手动对账错误', desc: '统一分类标准消除了跨系统数据口径不一致' },
        ],
      },
      closing: {
        heading: '核心洞察',
        quote: '自动化不是替代判断，而是把判断用在刀刃上。清晰的分类标准 + 高置信度自动处置 + 人工聚焦边缘案例——这套方法论在内容分级、数据治理和LLM审核平台上是通用的。',
      },
    },
    faq: [
      {
        q: '这与Moody\'s Analytics的LLM审核工作有何关联？',
        a: 'Flip的ML分级流水线是Moody\'s Analytics工作的直接前驱：两者都涉及"如何设计分类系统，让自动化处理结构化案例、人工处理边缘案例"。在Flip积累的特征工程、阈值校准和HITL设计经验，直接应用于后来Safety Index System的框架设计。',
      },
      {
        q: 'ML分类器如何避免误判导致的False Positive问题？',
        a: '关键在于差异化阈值设计：不同违规类别的误判成本不同，高风险类别（如欺诈、未成年人保护）设置更保守的阈值，宁可路由到人工也不自动处置。低风险重复性类别设置激进阈值。这与后来在Moody\'s建立Safety Index System时追踪False Positive Rate的逻辑完全一致。',
      },
      {
        q: '这些经验如何迁移到卖家信任或广告主完整性场景？',
        a: '核心方法论完全可迁移：卖家信任场景同样需要分类标准（哪些卖家行为触发审核）、自动化覆盖率和边缘案例的人工处理。广告主完整性场景需要相同的False Positive/False Negative权衡——误判合规广告主的成本极高，但漏放欺诈广告的成本同样不可接受。',
      },
    ],
  },
  en: {
    slug: 'ml-pipeline',
    altSlug: 'ml-pipeline-zh',
    readingTime: '6 min read',
    seo: {
      title: 'ML Content Triage Pipeline · Flip Case Study | Elena Liu',
      description: 'Case study: automated 65% of Tier-1 content reports at Flip using ML classifiers, improving moderator decision speed 12%; built Python classification system at LeanData expanding automation coverage 35%.',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'ML Content Pipeline',
    },
    header: {
      kicker: 'Case Study · Data Operations · Flip + LeanData',
      h1: 'Automating Content Triage with ML Pipelines',
      subtitle: "Manual processing can't scale. I designed classification systems that let machines handle 65% of routine decisions — so humans focus on the edge cases that actually need judgment.",
      badge: 'Production',
      date: '2020 – 2024',
    },
    heroMetrics: [
      { value: '65%', label: 'Tier-1 reports automated (Flip)' },
      { value: '12%↑', label: 'moderator decision speed (Flip)' },
      { value: '35%↑', label: 'automation coverage (LeanData)' },
      { value: '30%↓', label: 'manual reconciliation errors (LeanData)' },
    ],
    tldr: "At Flip, manual content report processing had become a bottleneck — as the platform grew, Tier-1 report volume outpaced the team's ability to triage manually. At LeanData, the absence of a standardized classification taxonomy meant inconsistent data across teams and rising governance costs. The core logic was the same in both cases: define clear classification standards, automate the structured cases, and route the genuinely ambiguous ones to human review.",
    sections: {
      flip: {
        heading: 'Flip: Automating Tier-1 Content Triage',
        context: "Flip is a peer-to-peer resale marketplace. As the platform grew, user-reported content violations (Tier-1 reports) scaled faster than the moderation team could process them manually. Moderators were spending most of their time on structured, predictable cases — leaving less capacity for the complex edge cases that actually required judgment.",
        problemHeading: 'The Problem: Scale vs. Manual Processing',
        problem: 'Most Tier-1 reports followed predictable patterns — specific violation categories showed consistent text signals, metadata patterns, and behavioral features. Processing them one-by-one was the highest-cost, lowest-value use of moderator time.',
        solutionHeading: 'The Solution: ML Classifiers + Human-in-the-Loop',
        steps: [
          {
            number: '01',
            title: 'Data Analysis and Feature Engineering',
            body: 'Analyzed historical report data to identify violation categories with high automation potential. Extracted text features (TF-IDF), metadata signals (item category, account age, prior violation history), and behavioral patterns to build the training set.',
          },
          {
            number: '02',
            title: 'Classifier Training and Threshold Calibration',
            body: 'Trained multi-class classifiers using Python and Scikit-learn. Key decision: differentiated confidence thresholds by violation category — high-confidence cases auto-resolved, low-confidence cases routed to the human review queue. The threshold calibration directly reflected the cost asymmetry between false positives and false negatives.',
          },
          {
            number: '03',
            title: 'Human-in-the-Loop Design',
            body: "Automation wasn't a replacement for judgment — it was a precision triage system. The classifier handled predictable, structured cases; moderators focused on the complex edge cases requiring contextual reasoning. Built a feedback loop where human corrections fed back into model improvement.",
          },
          {
            number: '04',
            title: 'GenAI Policy Enforcement Tool Pilot',
            body: "Supported the pilot launch of a GenAI-powered content policy enforcement tool — defining evaluation metrics, collecting structured moderator feedback, and documenting policy boundaries. This directly informed the methodology I later applied when operationalizing Moody's LLM moderation assistant.",
          },
        ],
        results: [
          { value: '65%', label: 'Tier-1 reports automated', desc: 'Structured, high-confidence cases resolved by classifier without human intervention' },
          { value: '12%↑', label: 'moderator decision speed', desc: 'Moderators focused on complex edge cases — average handle time decreased' },
        ],
      },
      leandata: {
        heading: 'LeanData: Data Governance and Auto-Classification',
        context: 'LeanData is a B2B revenue operations SaaS company. As a Data Governance Analyst, the core problem was inconsistent classification standards across teams — downstream analytics were unreliable and reconciliation costs were high.',
        problemHeading: 'The Problem: Taxonomy Fragmentation',
        problem: 'Without a unified classification schema, each team labeled data according to its own interpretation. The same entity could have different classifications across systems, generating constant manual reconciliation work and eroding trust in the data.',
        solutionHeading: 'The Solution: JSON Taxonomy + Python Automation',
        steps: [
          {
            number: '01',
            title: 'JSON Taxonomy Standardization',
            body: 'Collaborated with business teams to define unified classification standards and field specifications. Published a JSON Schema as the single data contract across systems — eliminating the root cause of each team doing its own ad-hoc labeling.',
          },
          {
            number: '02',
            title: 'Python Auto-Classification System',
            body: 'Built an automated classification pipeline in Python (Scikit-learn) against the standardized taxonomy to process structured input data. Expanded automation coverage by 35%, substantially reducing manual labeling workload.',
          },
          {
            number: '03',
            title: 'Data Quality Monitoring Framework',
            body: 'Established continuous monitoring for classification consistency, anomaly rates, and coverage gaps. Gave teams an actionable data quality dashboard rather than only post-hoc reports.',
          },
        ],
        results: [
          { value: '35%↑', label: 'automation coverage', desc: 'Python classification pipeline handles structured inputs, replacing manual labeling' },
          { value: '30%↓', label: 'manual reconciliation errors', desc: 'Unified taxonomy eliminated cross-system inconsistencies' },
        ],
      },
      closing: {
        heading: 'The Through-Line',
        quote: "Automation isn't about replacing judgment — it's about applying judgment where it matters. Consistent taxonomy + high-confidence auto-resolution + human focus on edge cases: this methodology transfers directly across content triage, data governance, and LLM moderation platforms.",
      },
    },
    faq: [
      {
        q: "How does this connect to the Moody's Analytics LLM moderation work?",
        a: "The Flip ML triage pipeline is the direct predecessor to the Moody's work: both involve designing a classification system where automation handles structured cases and humans handle edge cases. The feature engineering, threshold calibration, and HITL design at Flip fed directly into how I framed the Safety Index System — tracking Precision, Recall, and False Positive Rate as the operational contract.",
      },
      {
        q: 'How did you handle false positives in the classifier?',
        a: "Differentiated thresholds by violation category: the cost of a false positive varies by category — high-risk categories (fraud, underage protection) got conservative thresholds that route to human review; low-risk repetitive categories got aggressive thresholds for auto-resolution. This asymmetric calibration is the same logic behind tracking False Positive Rate as a separate metric in the Safety Index System.",
      },
      {
        q: 'How does this transfer to seller trust or advertiser integrity domains?',
        a: "Directly: seller trust requires the same classification taxonomy (which seller behaviors trigger review), automation coverage metrics, and edge-case routing. Advertiser integrity requires the same false positive/negative tradeoff — the cost of wrongly flagging a legitimate advertiser is high, but so is the cost of missing a fraudulent one. The methodology is domain-agnostic.",
      },
    ],
  },
} as const
