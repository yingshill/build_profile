export type ModerationOsLang = 'zh' | 'en'

export const moderationOsContent = {
  zh: {
    slug: 'moderation-os-zh',
    altSlug: 'moderation-os',
    readingTime: '8 分钟阅读',
    seo: {
      title: 'LLM内容审核平台落地实战 · Moody\'s Analytics案例研究 | Elena Liu',
      description: '案例研究：在Moody\'s Analytics将LLM辅助审核系统从"存在"做到"生效"——整合3套遗留工具、建立Safety Index评估体系、审核准确率提升22%、平均处理时长降低15%。',
    },
    nav: {
      breadcrumbHome: '首页',
      breadcrumbCurrent: '内容审核OS',
    },
    header: {
      kicker: '案例研究 · AI运营 · Moody\'s Analytics',
      h1: '让LLM审核平台真正"生效"',
      subtitle: '一个模型已经存在。团队不信任它，无法量化它，也没有统一使用它。我的工作不是构建AI——而是让AI系统真正运转起来。',
      badge: '生产环境落地',
      date: '2024年8月至今',
    },
    heroMetrics: [
      { value: '22%↑', label: '审核准确率' },
      { value: '15%↓', label: '平均处理时长' },
      { value: '40%↓', label: '审核员入职时间' },
      { value: '3→1', label: '工具整合' },
    ],
    tldr: '当我加入Moody\'s Analytics时，内容审核操作分散在三套独立的遗留工具中——没有统一的分类体系，没有性能追踪，也没有系统化的反馈回路。LLM辅助审核助手由工程团队构建完毕，但从未被真正落地：团队不信任它，无法量化它，也没有统一使用它。模型存在，但围绕它的系统不存在。',
    manifesto: '发布AI系统只是起点。让它真正生效——流程梳理、评估标准定义、反馈回路构建、团队赋能、影响量化——才是真正难的部分。这就是我做的事。',
    sections: {
      theProblem: {
        heading: '问题：模型存在，系统不存在',
        body: '当我加入Moody\'s Analytics时，内容审核操作分散在三套独立的遗留工具中——没有统一的分类体系，没有性能追踪，也没有系统化的反馈回路。LLM辅助审核助手已由工程团队构建完毕，但从未被真正落地运营。团队不信任它，无法量化它，也没有统一使用它。',
        callout: '模型存在，但围绕它的系统不存在。',
      },
      whatIBuilt: {
        heading: '我做了什么：四阶段落地',
        intro: '我将这次工作定义为产品发布，而非工具推广。工作分四个明确阶段：',
        steps: [
          {
            number: '01',
            title: '流程梳理',
            body: '端到端文档化现有工作流——决策发生在哪里、错误集中在哪里、延迟引入在哪里。这建立了共同基线，也暴露了AI系统需要弥合的差距。',
          },
          {
            number: '02',
            title: '评估框架',
            body: '在部署任何内容之前，先定义"生效"的含义。建立Safety Index System，跨决策类别追踪精确率、召回率和误报率——这是AI团队与运营团队之间关于"什么是好"的契约。',
          },
          {
            number: '03',
            title: '分阶段部署 + 反馈回路',
            body: '从一个审核团队试点开始，收集结构化反馈，以可行动的语言向AI Research团队汇报失败模式（"在Y上下文中对X类别触发过度"）。迭代后再进行全局推广。',
          },
          {
            number: '04',
            title: '赋能层',
            body: '构建针对非技术审核员定制的SOP、培训材料和工作流文档。任何新团队成员都能在无需工程团队介入的情况下达到满负荷生产力。',
          },
        ],
      },
      results: {
        heading: '结果',
        items: [
          {
            value: '22%↑',
            label: '审核准确率提升',
            desc: '由运营信号与模型迭代之间更紧密的反馈回路驱动',
          },
          {
            value: '15%↓',
            label: '平均处理时长降低',
            desc: '来自审核节点处更好的AI辅助决策支持',
          },
          {
            value: '40%↓',
            label: '入职时间缩短',
            desc: '结构化文档替代了以往由工程师主导的临时培训',
          },
          {
            value: '3→1',
            label: '工具整合',
            desc: '遗留工具整合为覆盖全球审核团队的统一AI平台',
          },
        ],
      },
      closing: {
        heading: '核心洞察',
        quote: '发布AI系统只是起点。让它真正生效——流程梳理、评估标准定义、反馈回路构建、团队赋能、影响量化——才是真正难的部分。这就是我做的事。',
      },
    },
    faq: [
      {
        q: '这个项目的最大挑战是什么？',
        a: '最大挑战不是技术，而是信任。团队已经有了一个LLM工具，但因为没有透明的评估标准，没有人知道它是否值得相信。建立Safety Index System——用精确率、召回率和误报率定义"生效"——是让团队从犹豫转变为采用的关键。',
      },
      {
        q: 'Safety Index System是如何设计的？',
        a: 'Safety Index System是运营团队与AI Research团队之间的契约，定义了跨决策类别的三个核心指标：精确率（标记的有多少是真正有问题的）、召回率（有多少真正有问题的被捕获）、误报率（正常内容被错误标记的比例）。每个指标都有阈值，任何低于阈值的类别都触发结构化反馈循环。',
      },
      {
        q: '这与广告主完整性或卖家信任场景有什么关联？',
        a: '相同的框架可以直接迁移：广告欺诈检测需要同样的精确率/召回率权衡（误报会损害合法广告主，漏报允许欺诈通过）；卖家信任场景需要同样的分阶段部署和反馈回路（一个类别的政策变更会影响整个市场生态）。让系统真正运转起来的方法论与领域无关。',
      },
    ],
  },
  en: {
    slug: 'moderation-os',
    altSlug: 'moderation-os-zh',
    readingTime: '8 min read',
    seo: {
      title: 'Operationalizing an LLM Moderation Platform · Moody\'s Analytics Case Study | Elena Liu',
      description: "Case study: how I turned Moody's Analytics' LLM moderation assistant from 'it exists' to 'it works' — consolidating 3 legacy tools, defining a Safety Index evaluation system, improving moderation accuracy 22%, reducing AHT 15%.",
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Moderation OS',
    },
    header: {
      kicker: "Case Study · AI Operations · Moody's Analytics",
      h1: 'Operationalizing an LLM Moderation Platform',
      subtitle: "The model existed. Teams didn't trust it, couldn't measure it, and weren't using it consistently. My job wasn't to build AI — it was to make the AI system actually work.",
      badge: 'Production',
      date: 'Aug 2024 – Present',
    },
    heroMetrics: [
      { value: '22%↑', label: 'moderation accuracy' },
      { value: '15%↓', label: 'avg handle time' },
      { value: '40%↓', label: 'onboarding time' },
      { value: '3→1', label: 'tools consolidated' },
    ],
    tldr: "When I joined Moody's Analytics, the content review operation ran across three separate legacy tools — no shared taxonomy, no performance tracking, and no systematic feedback loop. The LLM-based moderation assistant had been built by Engineering. But it hadn't been operationalized. Teams didn't trust it, couldn't measure it, and weren't using it consistently. The model existed; the system around it didn't.",
    manifesto: "Shipping an AI system is table stakes. Making it work — mapping the process, defining evaluation criteria, building the feedback loop, enabling the team, and measuring the impact — is the hard part. That's what I do.",
    sections: {
      theProblem: {
        heading: 'The Problem: The Model Existed. The System Didn\'t.',
        body: "When I joined Moody's Analytics, the content review operation ran across three separate legacy tools — no shared taxonomy, no performance tracking, and no systematic feedback loop between what moderators observed in production and what the AI research team iterated on. The LLM-based moderation assistant had been built by Engineering. But it hadn't been operationalized.",
        callout: "The model existed; the system around it didn't.",
      },
      whatIBuilt: {
        heading: 'What I Built: Four Phases',
        intro: 'I treated this as a product launch, not a tool rollout. The work had four distinct phases:',
        steps: [
          {
            number: '01',
            title: 'Process Mapping',
            body: 'I documented the existing workflow end-to-end — where decisions were made, where errors clustered, where latency was introduced. This created a shared baseline and exposed the gaps the AI system needed to close.',
          },
          {
            number: '02',
            title: 'Evaluation Framework',
            body: 'I defined what "working" meant before we deployed anything. I established a Safety Index System tracking Precision, Recall, and False Positive Rate across decision categories — the contract between the AI team and ops about what "good" looked like.',
          },
          {
            number: '03',
            title: 'Phased Deployment + Feedback Loops',
            body: 'Piloted with one review team, captured structured feedback, and surfaced failure patterns to AI Research in actionable terms ("over-triggering on X category in Y context"). Iterated before global rollout.',
          },
          {
            number: '04',
            title: 'Enablement Layer',
            body: 'Built SOPs, training materials, and workflow documentation tailored to non-technical reviewers. Any new team member could reach full productivity without Engineering involvement.',
          },
        ],
      },
      results: {
        heading: 'Results',
        items: [
          {
            value: '22%↑',
            label: 'moderation accuracy',
            desc: 'Driven by tighter feedback loops between operational signals and model updates',
          },
          {
            value: '15%↓',
            label: 'average handle time',
            desc: 'From better AI-assisted decision support at the point of review',
          },
          {
            value: '40%↓',
            label: 'onboarding time',
            desc: 'Structured documentation replaced ad hoc Engineering-led training',
          },
          {
            value: '3→1',
            label: 'tools consolidated',
            desc: 'Legacy tools consolidated into a unified AI platform across global review teams',
          },
        ],
      },
      closing: {
        heading: 'The Insight',
        quote: "Shipping an AI system is table stakes. Making it work — mapping the process, defining evaluation criteria, building the feedback loop, enabling the team, and measuring the impact — is the hard part. That's what I do.",
      },
    },
    faq: [
      {
        q: 'What was the hardest part of this project?',
        a: "The hardest part wasn't technical — it was trust. The team already had an LLM tool, but without transparent evaluation criteria, nobody knew whether it was worth trusting. Establishing the Safety Index System — defining 'working' in terms of Precision, Recall, and False Positive Rate — was the unlock that shifted the team from hesitation to adoption.",
      },
      {
        q: 'How was the Safety Index System designed?',
        a: 'The Safety Index System is a contract between the ops team and AI Research that defines three core metrics across decision categories: Precision (of what was flagged, how much was actually problematic), Recall (of what was actually problematic, how much was caught), and False Positive Rate (how often normal content gets wrongly flagged). Each metric has a threshold, and any category below threshold triggers a structured feedback loop back to the model team.',
      },
      {
        q: 'How does this apply to advertiser integrity or seller trust domains?',
        a: "The same framework transfers directly: ad fraud detection requires the same precision/recall tradeoffs (false positives hurt legitimate advertisers, false negatives let fraud through); seller trust requires the same phased deployment and feedback loops (a policy change in one category ripples through the entire marketplace ecosystem). The methodology for making a system actually work is domain-agnostic.",
      },
    ],
  },
} as const
