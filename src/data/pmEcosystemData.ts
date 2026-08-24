import {
  AdjacentDomain,
  CompanyTarget,
  JobMatch,
  PMToolItem,
  PMSkillCategory,
  DomainConcept,
  AIConceptPM,
  OutreachTemplate,
  UserProfile,
  CareerMappingResult,
  ClarifyingQuestion
} from '../types';
import { resolveJobPortalUrls } from '../utils/jobPortalUtils';

export const INDIAN_LOCATIONS = [
  'Bengaluru',
  'Gurugram / Delhi-NCR',
  'Mumbai',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Noida',
  'Remote (India)',
  'Hybrid'
];

export const PM_TARGET_ROLES = [
  'Associate Product Manager (APM)',
  'Product Manager (Core)',
  'Senior Product Manager (SPM)',
  'Technical Product Manager (TPM)',
  'Growth Product Manager',
  'AI / GenAI Product Manager',
  'Platform / Infra Product Manager',
  'Founding PM / 0-to-1 PM',
  'Lead / Principal PM',
  'Group Product Manager (GPM)'
];

export const DEFAULT_DOMAINS = [
  'Fintech & Payments',
  'E-Commerce & Quick Commerce',
  'B2B SaaS & DevTools',
  'Mobility, Automotive & EVs',
  'AI / GenAI & DeepTech',
  'HealthTech & InsurTech',
  'Logistics & Supply Chain',
  'EdTech & Future of Work',
  'Consumer Tech & Social',
  'AgriTech & ClimateTech'
];

export const PROFILE_PRESETS: { name: string; description: string; profile: Partial<UserProfile> }[] = [
  {
    name: 'SDE to B2B SaaS PM',
    description: '4 yrs Backend Developer in Bengaluru transitioning to Technical/Platform PM in Enterprise SaaS.',
    profile: {
      fullName: 'Arjun Sharma',
      currentRole: 'Senior Backend Engineer',
      yearsExperience: 4,
      technicalSkills: ['Java', 'Microservices', 'AWS', 'System Design', 'PostgreSQL', 'REST APIs', 'Docker'],
      pmExperienceLevel: 'Aspiring / No PM Exp',
      currentIndustry: 'IT Services / Enterprise Software',
      targetDomain: 'B2B SaaS & DevTools',
      targetRoles: ['Technical Product Manager (TPM)', 'Platform / Infra Product Manager', 'Product Manager (Core)'],
      preferredLocations: ['Bengaluru', 'Remote (India)'],
      workMode: 'Hybrid',
      salaryExpectationINR: '28-36 LPA',
      careerGoal: 'Transition from backend engineering to B2B SaaS/DevTools PM. Leverage deep API, scalability, and architecture knowledge into developer-facing products.',
      companyStagePreference: 'growth',
      portfolioProjects: 'Built internal API rate-limiting gateway used by 12 client engineering squads; designed developer documentation portal with OpenAPI specs.',
      resumeText: '4 years backend engineering at Tier-1 IT/Product firm. Led API modernization, managed sprint backlogs with engineers, wrote technical specifications, and collaborated with US client stakeholders.',
      clarifyingAnswers: {
        'tech_depth': 'Strong system design, API workflows, and developer ergonomics.',
        'pm_motivation': 'Love prioritizing features and solving business problems over writing repetitive CRUD code.'
      }
    }
  },
  {
    name: 'Automotive Engineer to Mobility/EV PM',
    description: '5 yrs Automotive embedded/telematics engineer moving to EV software and Connected Vehicle PM.',
    profile: {
      fullName: 'Pooja Iyer',
      currentRole: 'Senior Automotive Systems Engineer',
      yearsExperience: 5,
      technicalSkills: ['CAN Protocol', 'Embedded C', 'Telematics', 'Battery Management Systems (BMS)', 'IoT', 'Python', 'Jira'],
      pmExperienceLevel: 'Aspiring / No PM Exp',
      currentIndustry: 'Automotive & Manufacturing',
      targetDomain: 'Mobility, Automotive & EVs',
      targetRoles: ['Product Manager (Core)', 'Technical Product Manager (TPM)', 'AI / GenAI Product Manager'],
      preferredLocations: ['Bengaluru', 'Pune', 'Chennai'],
      workMode: 'Hybrid',
      salaryExpectationINR: '26-34 LPA',
      careerGoal: 'Transition into Smart Mobility, Connected Vehicle Software, or EV Platform PM in leading Indian EV startups or OEM innovation labs.',
      companyStagePreference: 'all',
      portfolioProjects: 'Developed connected telematics dashboard for two-wheeler fleet diagnostics; wrote functional safety requirements under ISO 26262.',
      resumeText: '5 years working with automotive tier-1 suppliers and OEMs. Experienced in connected vehicle protocols, infotainment UI requirements, firmware over-the-air (FOTA) updates, and fleet analytics.',
      clarifyingAnswers: {}
    }
  },
  {
    name: 'FinTech Ops to FinTech PM',
    description: '3 yrs FinTech operations & risk analyst targeting Lending/Payments Core PM in Gurugram/Bengaluru.',
    profile: {
      fullName: 'Rohan Verma',
      currentRole: 'Senior Operations & Risk Analyst',
      yearsExperience: 3.5,
      technicalSkills: ['SQL', 'Tableau', 'Excel Modeling', 'UPI Flow Analysis', 'KYC Workflows', 'AML Regulations'],
      pmExperienceLevel: 'Associate PM (0-2 yrs)',
      currentIndustry: 'Fintech & Payments',
      targetDomain: 'Fintech & Payments',
      targetRoles: ['Product Manager (Core)', 'Growth Product Manager', 'Associate Product Manager (APM)'],
      preferredLocations: ['Bengaluru', 'Gurugram / Delhi-NCR', 'Mumbai'],
      workMode: 'Hybrid',
      salaryExpectationINR: '22-30 LPA',
      careerGoal: 'Move from operations, risk underwriting, and merchant onboarding into core Payments, Checkout, or Credit PM roles.',
      companyStagePreference: 'growth',
      portfolioProjects: 'Automated merchant risk scoring pipeline reducing onboarding turnaround time (TAT) by 42%; created PRD for instant refund settlement.',
      resumeText: 'Handled payment gateway reconciliation, merchant fraud detection, and partner bank integrations. Deep understanding of UPI, BBPS, AA (Account Aggregator), and RBI tokenization mandates.',
      clarifyingAnswers: {}
    }
  },
  {
    name: 'Senior PM to AI/GenAI Product Leader',
    description: '7 yrs PM looking to specialize as an AI PM / Lead PM in Indian AI labs and AI-first startups.',
    profile: {
      fullName: 'Deepika Nair',
      currentRole: 'Senior Product Manager',
      yearsExperience: 7,
      technicalSkills: ['Product Analytics', 'PRDs & Roadmaps', 'Prompt Engineering', 'RAG Architectures', 'LLM Evals', 'SQL', 'A/B Testing'],
      pmExperienceLevel: 'Senior PM (5-8 yrs)',
      currentIndustry: 'E-Commerce & Quick Commerce',
      targetDomain: 'AI / GenAI & DeepTech',
      targetRoles: ['AI / GenAI Product Manager', 'Lead / Principal PM', 'Group Product Manager (GPM)'],
      preferredLocations: ['Bengaluru', 'Remote (India)'],
      workMode: 'Hybrid',
      salaryExpectationINR: '45-60 LPA',
      careerGoal: 'Lead AI product squads building agentic workflows, conversational commerce, search reranking, and enterprise GenAI assistants.',
      companyStagePreference: 'growth',
      portfolioProjects: 'Shipped AI shopping assistant handling 2M+ monthly conversational queries; designed human-in-the-loop eval pipeline reducing hallucinations by 68%.',
      resumeText: '7 years scaling product at high-growth Indian unicorns. Led cross-functional teams of 18 (ML engineers, data scientists, designers, frontend devs). Track record of driving 24% revenue lift through algorithmic personalization.',
      clarifyingAnswers: {}
    }
  }
];

export const CORE_PM_TOOLS: PMToolItem[] = [
  {
    id: 'jira',
    name: 'Jira',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use Jira to structure sprints, track engineering task dependencies, and manage epic-to-story delivery workflows.',
    iconName: 'Kanban',
    sampleArtifact: 'Sprint board, Epics & Story issue types, Release burndown charts'
  },
  {
    id: 'confluence',
    name: 'Confluence',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use Confluence as a single source of truth for Product Requirement Documents (PRDs), decision logs (DACIs), and technical release notes.',
    iconName: 'FileText',
    sampleArtifact: 'PRD templates, System architecture briefs, Milestone sign-offs'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use Figma to review wireframes, annotate UX copy, inspect visual hierarchy, and test interactive design prototypes with users.',
    iconName: 'Layout',
    sampleArtifact: 'Clickable UX prototypes, User flow canvases, Design system tokens'
  },
  {
    id: 'miro',
    name: 'Miro / FigJam',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use Miro or FigJam for collaborative brainstorming, customer journey mapping, and visual sprint retrospectives with stakeholders.',
    iconName: 'PenTool',
    sampleArtifact: 'Affinity diagram, User Journey Map, Impact vs Effort 2x2 matrix'
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use Notion for fast-paced feature roadmapping, cross-functional launch playbooks, and structured user interview repository wikis.',
    iconName: 'BookOpen',
    sampleArtifact: 'Roadmap database with quarterly views, Customer feedback hub'
  },
  {
    id: 'productboard',
    name: 'Productboard / Aha!',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use Productboard or Aha! to aggregate customer feedback signals and score roadmap initiatives against strategic business drivers.',
    iconName: 'Target',
    sampleArtifact: 'Feature prioritization matrix with RICE scores, Strategic objective map'
  },
  {
    id: 'github',
    name: 'GitHub / GitLab',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use GitHub to monitor pull request milestones, review technical RFCs, and trace issue tracking directly to deployment commits.',
    iconName: 'GitBranch',
    sampleArtifact: 'Release tags, Pull Request reviews, Technical RFC discussions'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'core',
    categoryName: 'Core PM Toolkit',
    pmUsageSentence: 'Use Postman to test backend API endpoints, inspect request-response payloads, and validate third-party integration contracts.',
    iconName: 'Cpu',
    sampleArtifact: 'API Collections, Mock servers, Webhook test triggers'
  }
];

export const ANALYTICS_TOOLS: PMToolItem[] = [
  {
    id: 'sql',
    name: 'SQL (BigQuery / Snowflake / Postgres)',
    category: 'analytics',
    categoryName: 'Analytics & Experimentation',
    pmUsageSentence: 'Use SQL to independently query raw event tables, calculate multi-touch retention cohorts, and debug user drop-offs without waiting for data analysts.',
    iconName: 'Database',
    sampleArtifact: 'Funnel drop-off queries, L28 active user retention cohorts, ARPU segmentation'
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel / Amplitude',
    category: 'analytics',
    categoryName: 'Analytics & Experimentation',
    pmUsageSentence: 'Use event-based product analytics to map step-by-step onboarding funnels, inspect behavioral cohorts, and track feature adoption velocity.',
    iconName: 'TrendingUp',
    sampleArtifact: 'Signup-to-first-transaction funnel, Critical user path Sankey chart'
  },
  {
    id: 'statsig',
    name: 'Statsig / LaunchDarkly / Optimizely',
    category: 'analytics',
    categoryName: 'Analytics & Experimentation',
    pmUsageSentence: 'Use experimentation and feature flagging platforms to safely rollout phased releases and measure statistical significance (p-value, CUPED) on key metrics.',
    iconName: 'Split',
    sampleArtifact: 'A/B test variant allocation, Guardrail metric alerts, Rollout percentage killswitch'
  },
  {
    id: 'ga4',
    name: 'Google Analytics 4 (GA4)',
    category: 'analytics',
    categoryName: 'Analytics & Experimentation',
    pmUsageSentence: 'Use GA4 to evaluate top-of-funnel acquisition channels, organic vs paid campaign performance, and web-to-app conversion pathways.',
    iconName: 'BarChart3',
    sampleArtifact: 'UTM attribution reports, Landing page bounce & conversion rates'
  },
  {
    id: 'tableau',
    name: 'Tableau / Power BI / Metabase',
    category: 'analytics',
    categoryName: 'Analytics & Experimentation',
    pmUsageSentence: 'Use business intelligence dashboards to monitor high-level executive KPIs, daily active revenue, and regional performance trends.',
    iconName: 'PieChart',
    sampleArtifact: 'Executive North Star metric dashboard, City-level unit economics report'
  },
  {
    id: 'excel_modeling',
    name: 'Advanced Excel / Google Sheets',
    category: 'analytics',
    categoryName: 'Analytics & Experimentation',
    pmUsageSentence: 'Use spreadsheet modeling for unit economic sensitivity analysis, pricing tier simulations, and sizing market opportunities (TAM/SAM/SOM).',
    iconName: 'Table',
    sampleArtifact: 'Contribution Margin 3 (CM3) financial model, Feature ROI estimator'
  }
];

export const DOMAIN_SPECIFIC_TOOLS_MAP: Record<string, PMToolItem[]> = {
  'Fintech & Payments': [
    {
      id: 'metabase',
      name: 'Metabase / dbt',
      category: 'domain',
      categoryName: 'Domain Toolkit (Fintech)',
      pmUsageSentence: 'Use dbt and Metabase to build idempotent transaction ledger views, monitor payout settlement SLAs, and track chargeback rates.',
      iconName: 'Database',
      sampleArtifact: 'Settlement failure rate dashboard, UPI dispute turnaround tracker'
    },
    {
      id: 'postman_fintech',
      name: 'Postman + Webhook Simulator',
      category: 'domain',
      categoryName: 'Domain Toolkit (Fintech)',
      pmUsageSentence: 'Use API test suites to simulate banking core webhook responses, payment gateway timeouts, and NPCI switch callbacks.',
      iconName: 'Radio',
      sampleArtifact: 'Simulated 3DS challenge flows, Auto-debit mandate test suite'
    },
    {
      id: 'sentry_fintech',
      name: 'Sentry / Datadog APM',
      category: 'domain',
      categoryName: 'Domain Toolkit (Fintech)',
      pmUsageSentence: 'Use observability tools to track checkout API latency spikes, 5xx server errors, and payment gateway network drops in real-time.',
      iconName: 'Activity',
      sampleArtifact: 'P99 checkout latency alerts, Payment SDK crash reports'
    },
    {
      id: 'clevertap',
      name: 'CleverTap / MoEngage / WebEngage',
      category: 'domain',
      categoryName: 'Domain Toolkit (Fintech)',
      pmUsageSentence: 'Use customer engagement platforms to trigger automated nudges for drop-off recovery, KYC reminders, and personalized credit line offers.',
      iconName: 'Bell',
      sampleArtifact: 'Abandoned payment recovery workflow, Recurring SIP reminder campaigns'
    }
  ],
  'Mobility, Automotive & EVs': [
    {
      id: 'canalyzer',
      name: 'CANoe / CANalyzer / Vector',
      category: 'domain',
      categoryName: 'Domain Toolkit (Automotive)',
      pmUsageSentence: 'Use CAN bus diagnostics tools to monitor vehicle telemetry data, ECU message packets, and battery thermal sensor signals.',
      iconName: 'Cpu',
      sampleArtifact: 'Telematics data schema, BMS packet broadcast spec'
    },
    {
      id: 'ros',
      name: 'ROS2 / Foxglove Studio',
      category: 'domain',
      categoryName: 'Domain Toolkit (Automotive)',
      pmUsageSentence: 'Use robotics visualization tools to inspect real-time sensor streams (LiDAR, camera, IMU) for ADAS and autonomous navigation features.',
      iconName: 'Compass',
      sampleArtifact: '3D point-cloud trajectory logs, Perception sensor latency charts'
    },
    {
      id: 'mapbox',
      name: 'Mapbox / Google Maps Fleet Engine',
      category: 'domain',
      categoryName: 'Domain Toolkit (Automotive)',
      pmUsageSentence: 'Use geospatial map engines to optimize dynamic routing, vehicle ETA calculations, and geo-fencing for shared mobility fleets.',
      iconName: 'MapPin',
      sampleArtifact: 'EV charging station routing polygon, Dead-mileage reduction map'
    },
    {
      id: 'grafana_iot',
      name: 'Grafana + InfluxDB (Time-series)',
      category: 'domain',
      categoryName: 'Domain Toolkit (Automotive)',
      pmUsageSentence: 'Use time-series metric dashboards to monitor real-time vehicle fleet battery degradation, state-of-charge (SoC), and firmware health.',
      iconName: 'BarChart',
      sampleArtifact: 'Battery fleet degradation curves, FOTA update success tracker'
    }
  ],
  'B2B SaaS & DevTools': [
    {
      id: 'launchdarkly',
      name: 'LaunchDarkly / Statsig',
      category: 'domain',
      categoryName: 'Domain Toolkit (SaaS)',
      pmUsageSentence: 'Use feature flag platforms to gate premium enterprise tier features and manage tenant-specific beta rollouts smoothly.',
      iconName: 'ToggleRight',
      sampleArtifact: 'Enterprise plan entitlement flags, Beta customer whitelist'
    },
    {
      id: 'fullstory',
      name: 'FullStory / Hotjar / LogRocket',
      category: 'domain',
      categoryName: 'Domain Toolkit (SaaS)',
      pmUsageSentence: 'Use session replay tools to observe complex B2B workflow friction points, rage clicks, and workspace configuration errors.',
      iconName: 'Eye',
      sampleArtifact: 'Admin onboarding session replays, Dashboard error heatmaps'
    },
    {
      id: 'swagger',
      name: 'Swagger / ReadMe / Mintlify',
      category: 'domain',
      categoryName: 'Domain Toolkit (SaaS)',
      pmUsageSentence: 'Use API documentation platforms to manage developer onboarding experience, interactive code recipes, and SDK changelogs.',
      iconName: 'Code',
      sampleArtifact: 'OpenAPI 3.1 interactive specs, Multi-language SDK quickstart guides'
    },
    {
      id: 'churnzero',
      name: 'ChurnZero / Gainsight',
      category: 'domain',
      categoryName: 'Domain Toolkit (SaaS)',
      pmUsageSentence: 'Use customer success platforms to track account health scores, enterprise seat utilization, and renewal churn risks.',
      iconName: 'ShieldAlert',
      sampleArtifact: 'Account health scoring formula, Inactive license churn triggers'
    }
  ],
  'AI / GenAI & DeepTech': [
    {
      id: 'langfuse',
      name: 'Langfuse / LangSmith',
      category: 'domain',
      categoryName: 'Domain Toolkit (AI PM)',
      pmUsageSentence: 'Use LLM observability platforms to trace multi-agent tool execution steps, monitor token consumption costs, and log prompt latency.',
      iconName: 'Activity',
      sampleArtifact: 'Agent execution trace graph, Token cost per user session breakdown'
    },
    {
      id: 'deepeval',
      name: 'DeepEval / Ragas / Arize Phoenix',
      category: 'domain',
      categoryName: 'Domain Toolkit (AI PM)',
      pmUsageSentence: 'Use automated evaluation frameworks to benchmark RAG faithfulness, answer relevancy, and hallucination rates against golden test sets.',
      iconName: 'CheckCircle2',
      sampleArtifact: 'Golden eval benchmark matrix, RAG recall vs precision scorecards'
    },
    {
      id: 'labelbox',
      name: 'Labelbox / Argilla / Scale AI',
      category: 'domain',
      categoryName: 'Domain Toolkit (AI PM)',
      pmUsageSentence: 'Use data annotation platforms to manage Human-in-the-Loop (HITL) review queues, RLHF preference ratings, and edge-case dataset curation.',
      iconName: 'Users',
      sampleArtifact: 'Annotation guidelines document, Inter-annotator agreement metrics'
    },
    {
      id: 'pinecone_console',
      name: 'Vector DB Console (Pinecone / Qdrant / Weaviate)',
      category: 'domain',
      categoryName: 'Domain Toolkit (AI PM)',
      pmUsageSentence: 'Use vector database management consoles to inspect hybrid search indexing, embedding dimensionality, and chunk retrieval metadata.',
      iconName: 'Layers',
      sampleArtifact: 'Knowledge base chunking strategy, Metadata filtering schema'
    }
  ]
};

export const AI_PM_CONCEPTS_LIST: AIConceptPM[] = [
  {
    id: 'llm_apis',
    topic: 'LLMs & LLM APIs (Tokens, Context Windows, Models)',
    category: 'Fundamentals',
    pmDefinition: 'Large Language Models are probabilistic next-token predictors exposed via APIs. PMs must understand tokenization (1 token ≈ 0.75 words in English; higher for Indic languages), context window limits, and model tiers (e.g., Flash vs Pro).',
    whyPMMustKnow: 'Model selection directly determines unit economics, user-perceived speed, and reasoning depth for your feature.',
    pmTradeoffOrMetric: 'Trade-off: High reasoning model (e.g., Gemini Pro) = high latency & cost vs Fast model (e.g., Gemini Flash) = sub-second response & 10x cheaper.',
    indiaUseCases: 'Flipkart customer query routing, Sarvam AI Indic language models, Krutrim conversational bots.'
  },
  {
    id: 'prompt_eng',
    topic: 'Prompt Engineering & System Instructions',
    category: 'Fundamentals',
    pmDefinition: 'Structuring instructions, constraints, output schemas (JSON mode), and few-shot examples that guide the model to produce consistent, brand-aligned responses without code changes.',
    whyPMMustKnow: 'Serves as the initial "product spec" for model behavior. Fast prototyping mechanism before fine-tuning.',
    pmTradeoffOrMetric: 'Metric: Prompt compliance rate, JSON schema validity rate, token overhead per request.',
    indiaUseCases: 'CleverTap automated campaign copy generation, Meesho seller catalog title generator.'
  },
  {
    id: 'rag',
    topic: 'RAG (Retrieval-Augmented Generation) & Chunking',
    category: 'Architecture & RAG',
    pmDefinition: 'A pattern that retrieves relevant domain data from external databases and injects it into the LLM prompt context before generation, preventing out-of-date or hallucinated answers.',
    whyPMMustKnow: 'Essential for grounding AI in private enterprise knowledge, internal policies, and real-time inventory without fine-tuning.',
    pmTradeoffOrMetric: 'Trade-off: Chunk size (256 vs 1024 tokens) — small chunks provide precise search but lose context; large chunks preserve context but dilute vector similarity.',
    indiaUseCases: 'HDFC Bank virtual assistant reading loan policy PDFs, Razorpay documentation search.'
  },
  {
    id: 'embeddings_vectordb',
    topic: 'Embeddings & Vector Databases (Pinecone, Qdrant)',
    category: 'Architecture & RAG',
    pmDefinition: 'Dense mathematical vector representations of text/multimodal data where semantic closeness is measured via cosine distance. Stored and queried via specialized vector indices (HNSW).',
    whyPMMustKnow: 'Powers semantic search, recommendation engines, and high-recall knowledge retrieval across multi-million item catalogs.',
    pmTradeoffOrMetric: 'Metric: Approximate Nearest Neighbor (ANN) search latency (P95 < 20ms), Index recall rate.',
    indiaUseCases: 'Swiggy dish search by intent ("something spicy for dinner"), Myntra visual image match.'
  },
  {
    id: 'ai_agents_tool_calling',
    topic: 'AI Agents & Tool Calling (Function Calling)',
    category: 'Architecture & RAG',
    pmDefinition: 'Equipping an LLM with external APIs/tools (e.g., booking an Uber, checking bank balance, sending email) where the model autonomously reasons when and with what arguments to invoke tools.',
    whyPMMustKnow: 'Transforms AI from a conversational chatbot into an actionable copilot that executes multi-step workflows on behalf of users.',
    pmTradeoffOrMetric: 'Trade-off: Autonomous execution vs Security & error cascades. Requires strict argument validation & retry limits.',
    indiaUseCases: 'MakeMyTrip flight booking agent, Zepto automated order rescheduling bot.'
  },
  {
    id: 'mcp',
    topic: 'Model Context Protocol (MCP)',
    category: 'Architecture & RAG',
    pmDefinition: 'An open protocol standardizing how AI models securely connect to local and remote data sources, tools, and enterprise environments without bespoke API connectors.',
    whyPMMustKnow: 'Enables plug-and-play interoperability between internal microservices, dev tools, and AI agents.',
    pmTradeoffOrMetric: 'Key Benefit: Eliminates repetitive custom API integration code for each new AI tool.',
    indiaUseCases: 'Enterprise internal tech stack integrations, Postman AI assistant connecting to API repositories.'
  },
  {
    id: 'ai_evals',
    topic: 'AI Evaluation & Golden Datasets (Evals)',
    category: 'Evaluation & Quality',
    pmDefinition: 'The systematic practice of running automated test suites of 200–1,000+ curated question-answer pairs (Golden Sets) to quantitatively score model performance before deploying changes.',
    whyPMMustKnow: 'In traditional software you have unit tests; in AI PM you MUST have Evals. Without evals, you cannot safely update prompts, models, or RAG pipelines.',
    pmTradeoffOrMetric: 'Key Metrics: Faithfulness score, Answer Relevancy, G-Eval score (LLM-as-a-judge), Toxicity rate.',
    indiaUseCases: 'CRED customer service QA benchmarking, Innovaccer clinical summary accuracy checks.'
  },
  {
    id: 'hallucination_mitigation',
    topic: 'Hallucination Mitigation & Guardrails',
    category: 'Evaluation & Quality',
    pmDefinition: 'Techniques to prevent models from generating plausible-sounding falsehoods. Includes strict temperature settings, source citations, semantic caching, and NeMo/Llama Guard rail policies.',
    whyPMMustKnow: 'Hallucinations in high-stakes domains (Fintech, Health, Legal) lead to regulatory non-compliance, financial loss, and severe brand damage.',
    pmTradeoffOrMetric: 'Metric: Hallucination rate (<0.5% target in fintech), Fallback to human rate.',
    indiaUseCases: 'Zerodha trading advisory compliance filters, Practo medical summary guardrails.'
  },
  {
    id: 'retrieval_quality',
    topic: 'Retrieval Quality (Precision, Recall & Rerankers)',
    category: 'Evaluation & Quality',
    pmDefinition: 'Evaluating whether the RAG pipeline fetched the exact correct source chunk (Recall@K) and re-ordering results using Cross-Encoder Rerankers (e.g., Cohere/BGE Reranker) before feeding to the LLM.',
    whyPMMustKnow: 'If the retrieved context is garbage, the LLM will generate garbage ("Garbage In, Garbage Out"). 80% of RAG errors are retrieval errors, not model errors.',
    pmTradeoffOrMetric: 'Metric: Mean Reciprocal Rank (MRR), Normalized Discounted Cumulative Gain (NDCG@5).',
    indiaUseCases: 'LegalTech case law search (e.g. IndiaKanoon AI), Insurance policy coverage search.'
  },
  {
    id: 'latency_token_cost',
    topic: 'Latency, TTFT & Inference Cost Economics',
    category: 'Economics & Ops',
    pmDefinition: 'Time-to-First-Token (TTFT), tokens-per-second, and total cost per interaction (Input Token Cost + Output Token Cost + Vector DB + Compute).',
    whyPMMustKnow: 'A feature that costs ₹8 per conversation is unsustainable for a consumer app with ₹3 average revenue per user. PMs must build the unit economic model.',
    pmTradeoffOrMetric: 'Metric: TTFT (<800ms for UI snappiness via streaming), Blended Cost per Active User (CPAU).',
    indiaUseCases: 'Swiggy quick search streaming UI, PhonePe voice payments token budgeting.'
  },
  {
    id: 'data_privacy_dpdp',
    topic: 'Data Privacy, Security & India DPDP Act',
    category: 'Economics & Ops',
    pmDefinition: 'Ensuring Personally Identifiable Information (PII, Aadhaar, PAN, phone numbers) is masked/anonymized before hitting third-party LLM providers. Adhering to India’s Digital Personal Data Protection (DPDP) Act 2023.',
    whyPMMustKnow: 'Failure to protect user data can trigger regulatory fines up to ₹250 Crores in India and contractual breaches.',
    pmTradeoffOrMetric: 'Requirement: Zero-data retention enterprise agreements, on-prem/local VPC deployment for sensitive banking data.',
    indiaUseCases: 'Aadhaar masking in KYC pipelines, FinTech customer chat data residency compliance.'
  },
  {
    id: 'hitl_workflows',
    topic: 'Human-in-the-Loop (HITL) & Fallback UX',
    category: 'Economics & Ops',
    pmDefinition: 'Designing product experiences where AI handles high-confidence, repetitive tasks (80%) and seamlessly hands off low-confidence or high-risk cases to human agents with full context.',
    whyPMMustKnow: 'No AI model is 100% reliable. The PM’s craftsmanship is in the graceful degradation and fallback experience.',
    pmTradeoffOrMetric: 'Metric: Human escalation rate, First Contact Resolution (FCR) with AI assist, Agent CSAT.',
    indiaUseCases: 'Urban Company customer dispute resolution, Tata 1mg prescription verification.'
  }
];

export const PM_SKILLS_DATA: PMSkillCategory[] = [
  {
    category: 'Execution',
    skills: [
      {
        name: 'PRD & Technical Specifications',
        description: 'Writing unambiguous Product Requirement Documents with clear problem statements, non-goals, user personas, edge cases, and acceptance criteria.',
        importanceScore: 5,
        targetProficiency: 'Expert',
        sampleDeliverable: 'Comprehensive PRD for 1-Click Instant Checkout with failure state handling & telemetry spec.',
        interviewQuestion: 'Walk me through how you structure a PRD for an asynchronous payment reconciliation system. How do you define edge cases?'
      },
      {
        name: 'Prioritization Frameworks (RICE / MoSCoW)',
        description: 'Quantitatively ranking competing product initiatives against Reach, Impact, Confidence, and Effort to maximize team velocity and business ROI.',
        importanceScore: 5,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Quarterly roadmap prioritization matrix with quantified confidence scores and engineering estimates.',
        interviewQuestion: 'You have 10 critical bugs, a compliance deadline from RBI, and a feature requested by the CEO. How do you prioritize sprint allocation?'
      },
      {
        name: 'Roadmap & Dependency Management',
        description: 'Aligning multi-quarter product milestones across mobile, backend, platform, and external third-party vendor dependencies.',
        importanceScore: 4,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Gantt-style Outcome-based Roadmap linked to OKRs rather than just feature dates.',
        interviewQuestion: 'Your team depends on a platform team API that gets delayed by 6 weeks. How do you safeguard your product launch date?'
      },
      {
        name: 'Release & Rollout Management',
        description: 'Executing staged rollouts (1% -> 5% -> 25% -> 100%), canary deployments, kill-switch triggers, and operational go-live readiness.',
        importanceScore: 4,
        targetProficiency: 'Proficient',
        sampleDeliverable: 'Launch Runbook detailing monitoring alarms, rollback thresholds, and internal support enablement.',
        interviewQuestion: 'Describe a time a major production release caused an unexpected drop in user conversion. What was your immediate mitigation protocol?'
      }
    ]
  },
  {
    category: 'Data',
    skills: [
      {
        name: 'North Star & L1/L2 Metric Trees',
        description: 'Deconstructing high-level company goals into input and output metrics (e.g., North Star = Monthly Transacting Users; L1 = Activation Rate, Retention, Frequency; L2 = Search CTR, Cart Abandonment).',
        importanceScore: 5,
        targetProficiency: 'Expert',
        sampleDeliverable: 'Metric tree diagram connecting engineering SLAs to business bottom-line revenue.',
        interviewQuestion: 'Define the metric tree for Swiggy Instamart or Zepto. What is the North Star and what are the 3 critical input metrics?'
      },
      {
        name: 'Funnel & Cohort Analysis',
        description: 'Tracking user conversion drop-offs across sequential product steps and analyzing retention decay curves across weekly/monthly sign-up cohorts.',
        importanceScore: 5,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Cohort retention matrix identifying the "Aha! moment" threshold that drives Day-30 retention.',
        interviewQuestion: 'If Day-7 retention is flat at 40% but Day-30 retention drops to 12%, how would you investigate where users are losing value?'
      },
      {
        name: 'SQL & Data Wrangling',
        description: 'Writing complex SQL queries with joins, window functions, and aggregations to independently validate product hypotheses.',
        importanceScore: 4,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Query repo for tracking checkout failure codes by mobile OS version and bank issuer.',
        interviewQuestion: 'Write or explain a query to find the top 5% most active merchants by transaction volume over the last 90 rolling days.'
      },
      {
        name: 'A/B Testing & Experimentation Statistics',
        description: 'Formulating testable hypotheses, calculating sample size requirements, understanding minimum detectable effect (MDE), and avoiding p-hacking.',
        importanceScore: 5,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Pre-experiment sizing document with statistical power calculations and secondary guardrail metrics.',
        interviewQuestion: 'Your A/B test variant shows a 4% lift in click-through-rate with p=0.08 after 5 days. Do you ship it or keep running? Why?'
      }
    ]
  },
  {
    category: 'Customer',
    skills: [
      {
        name: 'User Discovery & Customer Interviews',
        description: 'Conducting non-leading user interviews using "The Mom Test" principles to uncover root customer pain points, habits, and unarticulated needs.',
        importanceScore: 5,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Synthesized User Insights Deck with verbatim quotes, pain frequency ranking, and persona archetypes.',
        interviewQuestion: 'How do you ask questions to a Tier-2 Indian shopkeeper without asking them speculative questions like "Would you pay for this app?"'
      },
      {
        name: 'Jobs-to-be-Done (JTBD) Framework',
        description: 'Defining functional, emotional, and social jobs users hire your product to accomplish, along with competing alternatives they "fire".',
        importanceScore: 4,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'JTBD matrix contrasting incumbent manual habits against proposed digital product workflows.',
        interviewQuestion: 'What is the real "Job-to-be-Done" when an Indian millennial opens CRED vs opening their standard bank app?'
      },
      {
        name: 'Usability Testing & Feedback Loops',
        description: 'Observing real users navigate Figma prototypes or live builds to identify cognitive friction, unclear mental models, and navigation traps.',
        importanceScore: 4,
        targetProficiency: 'Proficient',
        sampleDeliverable: 'Usability test report highlighting SUS (System Usability Scale) score improvements.',
        interviewQuestion: 'You observe 4 out of 5 test users fail to find the filter button on your new search page. What is your redesign iteration?'
      }
    ]
  },
  {
    category: 'Strategy',
    skills: [
      {
        name: 'Market & Competitive Landscape Mapping',
        description: 'Analyzing competitor moat structures, distribution advantages, pricing models, and identifying white-space opportunities in the Indian ecosystem.',
        importanceScore: 4,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Comprehensive 4Cs (Customer, Company, Competitors, Collaborators) strategic market assessment.',
        interviewQuestion: 'How would you evaluate whether Zepto should enter pharmaceuticals delivery in India? What are the regulatory and operational moats?'
      },
      {
        name: 'Monetization & Pricing Strategy',
        description: 'Designing sustainable pricing tiers, take rates, freemium conversion loops, and subscription models that match willingness-to-pay.',
        importanceScore: 4,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Pricing sensitivity analysis (Van Westendorp model) and gross margin impact simulation.',
        interviewQuestion: 'How should an Indian B2B SaaS company price for domestic Indian SMBs vs US enterprise clients?'
      },
      {
        name: 'Growth Loops & Flywheels',
        description: 'Architecting self-reinforcing acquisition, activation, and referral loops that compound user growth without relying solely on paid performance marketing.',
        importanceScore: 5,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Growth loop blueprint mapping viral invitation cycles, content SEO loops, and habit loops.',
        interviewQuestion: 'Map out the core growth flywheel of Meesho or Swiggy. Where does the loop break when moving to Tier-3 towns?'
      }
    ]
  },
  {
    category: 'Leadership',
    skills: [
      {
        name: 'Influence Without Authority',
        description: 'Rallying cross-functional engineering, design, legal, marketing, and sales teams around a shared product vision without direct managerial control.',
        importanceScore: 5,
        targetProficiency: 'Expert',
        sampleDeliverable: 'Product Vision pitch deck and alignment memo for VP/CXO sign-off.',
        interviewQuestion: 'Your lead engineer strongly opposes a feature due to tech debt concerns, while sales says it will close a ₹50L deal. How do you resolve this?'
      },
      {
        name: 'Executive Communication & Trade-offs',
        description: 'Distilling complex technical realities and market data into concise, structured executive summaries for founders and CXOs.',
        importanceScore: 5,
        targetProficiency: 'Expert',
        sampleDeliverable: '1-page Executive Decision Memo with clear recommendation and explicit risk mitigations.',
        interviewQuestion: 'You have 3 minutes with the CEO in an elevator to pitch sunsetting a legacy product feature that generates 8% revenue. What do you say?'
      },
      {
        name: 'Conflict Resolution & Stakeholder Management',
        description: 'Navigating misaligned team priorities, managing stakeholder expectations transparently, and maintaining psychological safety during escalations.',
        importanceScore: 4,
        targetProficiency: 'Advanced',
        sampleDeliverable: 'Stakeholder RACI matrix and quarterly expectation management cadence.',
        interviewQuestion: 'Describe a situation where a major partner bank changed their compliance requirement 1 week before your launch. How did you handle the team?'
      }
    ]
  }
];

export const INDIA_COMPANIES_DATABASE: Record<string, CompanyTarget[]> = {
  'Fintech & Payments': [
    {
      id: 'razorpay',
      name: 'Razorpay',
      domain: 'Fintech & Payments',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (Pre-IPO)',
      indiaPresence: 'Bengaluru HQ (Koramangala), Mumbai, Gurugram',
      whyItFits: 'Market leader in payment gateway, neo-banking (RazorpayX), and payroll. Ideal for PMs wanting deep API, developer tooling, and high-scale financial transaction systems.',
      potentialRoles: ['Product Manager - Payment Gateway', 'Technical PM - Developer Experience & APIs', 'Growth PM - RazorpayX Neo-banking'],
      fitLevel: 'High',
      techStackDomain: ['Payments', 'APIs', 'Banking Integrations', 'Risk & Fraud'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'High autonomy, metric-driven, strong engineering-PM collaboration, fast execution.',
      careersUrl: 'https://razorpay.com/jobs/',
      tier: 'B'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      domain: 'Fintech & Payments',
      stage: 'large',
      stageLabel: 'Tech Giant / Decacorn (Walmart Group)',
      indiaPresence: 'Bengaluru HQ (Bellandur), Mumbai, New Delhi',
      whyItFits: 'Controls ~48% of all UPI market share in India with 500M+ registered users. Excellent for PMs seeking consumer scale, Indus Appstore, lending, and insurance distribution.',
      potentialRoles: ['Senior PM - Consumer UPI & Payments', 'PM - Merchant Lending & Underwriting', 'Platform PM - Core Infra & Switch'],
      fitLevel: 'High',
      techStackDomain: ['UPI', 'Consumer App', 'Financial Services', 'Merchant QR'],
      hiringHubs: ['Bengaluru', 'Mumbai'],
      pmTeamCulture: 'Massive scale focus, rigorous data analytics, high uptime standards.',
      careersUrl: 'https://www.phonepe.com/careers/',
      tier: 'C'
    },
    {
      id: 'cred',
      name: 'CRED',
      domain: 'Fintech & Payments',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn',
      indiaPresence: 'Bengaluru HQ (Indiranagar)',
      whyItFits: 'Premium affluent consumer club with deep focus on UI craft, gamification, CRED Pay, CRED Cash, and luxury commerce. Great for PMs with strong design and engagement sensibilities.',
      potentialRoles: ['Product Manager - CRED Pay & Checkout', 'PM - CRED Garage (Vehicles)', 'Growth PM - Member Engagement & Monetization'],
      fitLevel: 'High',
      techStackDomain: ['Credit Cards', 'Luxury Commerce', 'Gamification', 'Lending'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Extreme craft and design focus, non-traditional product roadmapping, high aesthetic bar.',
      careersUrl: 'https://cred.club/careers',
      tier: 'B'
    },
    {
      id: 'groww',
      name: 'Groww',
      domain: 'Fintech & Payments',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn',
      indiaPresence: 'Bengaluru HQ (Vaishnavi Tech Park, Bellandur)',
      whyItFits: 'India’s #1 stockbroker by active NSE clients. Fast-paced innovation across Direct Mutual Funds, F&O trading, US Stocks, and Credit products.',
      potentialRoles: ['Product Manager - Stock Trading & Order Execution', 'PM - Wealth & Mutual Funds', 'Growth PM - User Onboarding & KYC'],
      fitLevel: 'High',
      techStackDomain: ['WealthTech', 'Brokerage', 'High-Frequency Trading', 'KYC'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Customer obsession, simple UI paradigms for complex financial instruments, data-heavy.',
      careersUrl: 'https://groww.in/careers',
      tier: 'B'
    },
    {
      id: 'paytm',
      name: 'Paytm (One97 Communications)',
      domain: 'Fintech & Payments',
      stage: 'large',
      stageLabel: 'Public Tech Giant (NSE Listed)',
      indiaPresence: 'Noida HQ, Bengaluru, Gurugram, Mumbai',
      whyItFits: 'Pioneer of Indian digital payments, soundbox audio devices, and merchant POS systems. Strong for hardware-software integration and merchant distribution PMs.',
      potentialRoles: ['Product Manager - Merchant Soundbox & IoT', 'PM - Travel & Ticketing', 'PM - QR & Payments Core'],
      fitLevel: 'Medium',
      techStackDomain: ['Soundbox IoT', 'Merchant QR', 'UPI', 'Commerce'],
      hiringHubs: ['Noida', 'Bengaluru'],
      pmTeamCulture: 'High-pressure execution, ground-level merchant empathy, rapid pivots.',
      careersUrl: 'https://paytm.com/careers',
      tier: 'C'
    },
    {
      id: 'jupiter',
      name: 'Jupiter Money',
      domain: 'Fintech & Payments',
      stage: 'early',
      stageLabel: 'Early-Stage / Scale-up (Series B/C)',
      indiaPresence: 'Bengaluru HQ (HSR Layout)',
      whyItFits: 'Neo-banking platform offering smart savings, salary accounts, on-demand credit, and automated mutual fund investments.',
      potentialRoles: ['Product Manager - Savings & Salary Accounts', 'Growth PM - Credit Card Activation', 'PM - Money Management & Insights'],
      fitLevel: 'High',
      techStackDomain: ['Neo-banking', 'Co-branded Credit Cards', 'Personal Finance'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Agile 0-to-1 culture, user empathy, frequent prototyping.',
      careersUrl: 'https://jupiter.money/careers/',
      tier: 'A'
    },
    {
      id: 'fi_money',
      name: 'Fi Money (Epifi)',
      domain: 'Fintech & Payments',
      stage: 'early',
      stageLabel: 'Early-Stage / Scale-up (Series C)',
      indiaPresence: 'Bengaluru HQ (Indiranagar)',
      whyItFits: 'Tech-first financial app for working professionals founded by ex-Googlers. Focus on smart deposits, mutual funds, peer comparisons, and conversational money tools.',
      potentialRoles: ['Product Manager - Wealth & Mutual Funds', 'PM - Credit & Co-branded Cards', 'Technical PM - Core Banking APIs'],
      fitLevel: 'High',
      techStackDomain: ['WealthTech', 'Core Banking', 'Conversational AI'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Google-style rigorous product thinking, structured documentation, high analytical rigor.',
      careersUrl: 'https://fi.money/careers',
      tier: 'A'
    },
    {
      id: 'slice',
      name: 'Slice (Merged with North East Small Finance Bank)',
      domain: 'Fintech & Payments',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (SFB License)',
      indiaPresence: 'Bengaluru HQ (Koramangala)',
      whyItFits: 'Transforming from a card fintech into a full-fledged scheduled commercial bank. Groundbreaking opportunity for PMs to build a modern digital bank from scratch.',
      potentialRoles: ['Product Manager - Core Digital Banking', 'PM - UPI & Payments', 'Risk & Fraud PM'],
      fitLevel: 'High',
      techStackDomain: ['Digital Banking', 'Credit', 'UPI 2.0', 'Underwriting'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Fast paced, ambitious, product-led banking disruption.',
      careersUrl: 'https://www.sliceit.com/careers',
      tier: 'B'
    },
    {
      id: 'mural_fintech_borderline',
      name: 'TCS Financial Solutions (BaNCS)',
      domain: 'Fintech & Payments',
      stage: 'large',
      stageLabel: 'IT Services / Enterprise Software',
      indiaPresence: 'Mumbai, Bengaluru, Chennai, Hyderabad',
      whyItFits: 'Legacy core banking system vendor powering PSU and global banks.',
      potentialRoles: ['Business Analyst / Functional Consultant', 'Product Specialist - Core Banking'],
      fitLevel: 'BORDERLINE',
      borderlineReason: 'Primarily services and customized client deployment contracts rather than fast-iterating consumer or modern product-led B2B SaaS fintech.',
      techStackDomain: ['Legacy Banking', 'COBOL / Java', 'Client Services'],
      hiringHubs: ['Mumbai', 'Chennai'],
      pmTeamCulture: 'Waterfall delivery, strict SLAs, client-driven scope rather than user discovery.',
      careersUrl: 'https://www.tcs.com/careers',
      tier: 'C'
    }
  ],
  'Mobility, Automotive & EVs': [
    {
      id: 'ather',
      name: 'Ather Energy',
      domain: 'Mobility, Automotive & EVs',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (Pre-IPO)',
      indiaPresence: 'Bengaluru HQ (IBC Knowledge Park, Bannerghatta Rd) & Hosur Plant',
      whyItFits: 'Pioneer of smart electric 2-wheelers (Ather 450X, Rizta) with AtherStack (dashboard OS, cloud telemetry, navigation, fast charging network Ather Grid). Perfect for software-hardware PMs.',
      potentialRoles: ['Product Manager - Connected Vehicle Software & Dashboard OS', 'PM - Ather Grid & Charging Infra', 'PM - Mobile App & Remote Telematics'],
      fitLevel: 'High',
      techStackDomain: ['Android Automotive', 'Telematics', 'Cloud IoT', 'BMS Software'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Hardware-software co-design, deep automotive engineering excellence, user ergonomics focus.',
      careersUrl: 'https://www.atherenergy.com/careers',
      tier: 'B'
    },
    {
      id: 'ola_electric',
      name: 'Ola Electric',
      domain: 'Mobility, Automotive & EVs',
      stage: 'large',
      stageLabel: 'Public EV Giant (BSE/NSE Listed)',
      indiaPresence: 'Bengaluru HQ (Koramangala & FutureFactory Krishnagiri)',
      whyItFits: 'India’s largest electric 2-wheeler manufacturer with MoveOS software, in-house cell manufacturing (Gigafactory), and autonomous technology roadmap.',
      potentialRoles: ['Product Manager - MoveOS Infotainment', 'PM - Fleet & Service Platform', 'Technical PM - In-house Battery Management Software'],
      fitLevel: 'High',
      techStackDomain: ['MoveOS', 'Connected Vehicles', 'Battery Analytics', 'Autonomous Tech'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Hyper-aggressive velocity, bold ambition, founder-led intensity.',
      careersUrl: 'https://www.olaelectric.com/careers',
      tier: 'C'
    },
    {
      id: 'ola_consumer',
      name: 'Ola Cabs (ANI Technologies)',
      domain: 'Mobility, Automotive & EVs',
      stage: 'large',
      stageLabel: 'Growth / Tech Giant',
      indiaPresence: 'Bengaluru HQ (Murugeshpalya)',
      whyItFits: 'Ride-hailing giant operating cabs, autos, and bikes across 250+ Indian cities with complex multi-sided marketplace matching algorithms.',
      potentialRoles: ['Product Manager - Driver Supply & Earnings', 'Growth PM - Rider Booking Conversion', 'Platform PM - Dynamic Pricing & Surge'],
      fitLevel: 'High',
      techStackDomain: ['Marketplace Matching', 'Routing & ETA', 'Dynamic Pricing', 'Safety & Telematics'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Marketplace dynamics, intense operational metric tracking, high algorithmic scale.',
      careersUrl: 'https://www.olacabs.com/careers',
      tier: 'C'
    },
    {
      id: 'rapido',
      name: 'Rapido',
      domain: 'Mobility, Automotive & EVs',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (Series E)',
      indiaPresence: 'Bengaluru HQ (HSR Layout), Hyderabad',
      whyItFits: 'Market leader in bike-taxis and zero-commission auto hailing, expanding rapidly into cab hailing against Uber and Ola.',
      potentialRoles: ['Product Manager - Captain (Driver) Lifecycle & Onboarding', 'PM - Ride Match & Dispatch Engine', 'Growth PM - Commuter Subscriptions & Passes'],
      fitLevel: 'High',
      techStackDomain: ['Bike Taxi', 'Auto Dispatch', 'Zero-Commission SaaS Model', 'Low-Bandwidth Mobile'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Frugal, rapid iteration, deep empathy for informal sector driver gig-workers.',
      careersUrl: 'https://rapido.workable.com/',
      tier: 'B'
    },
    {
      id: 'blusmart',
      name: 'BluSmart Mobility',
      domain: 'Mobility, Automotive & EVs',
      stage: 'growth',
      stageLabel: 'Growth / Scale-up',
      indiaPresence: 'Gurugram HQ & Bengaluru Operations Hub',
      whyItFits: 'India’s 100% all-electric ride-hailing and mega charging hub network with scheduled zero-cancellation rides.',
      potentialRoles: ['Product Manager - Fleet Charging & Mega-Hub Ops', 'PM - Rider Scheduling & Booking Flow', 'Technical PM - EV Telematics & Health'],
      fitLevel: 'High',
      techStackDomain: ['EV Fleet Ops', 'Charging Scheduling', 'Ride Booking', 'Driver Shift Mgmt'],
      hiringHubs: ['Gurugram', 'Bengaluru'],
      pmTeamCulture: 'Zero-cancellation quality obsession, green mobility mission, operational rigor.',
      careersUrl: 'https://blu-smart.com/careers',
      tier: 'B'
    },
    {
      id: 'uber_india',
      name: 'Uber India Tech Center',
      domain: 'Mobility, Automotive & EVs',
      stage: 'large',
      stageLabel: 'Tech Giant / Global MNC Hub',
      indiaPresence: 'Bengaluru Tech Center & Hyderabad Center of Excellence',
      whyItFits: 'Uber’s India engineering teams build high-impact global products including Rider/Driver Maps, High-Capacity Vehicles (Uber Shuttle), and Payments for global markets.',
      potentialRoles: ['Product Manager - High Capacity Transit (Uber Shuttle)', 'PM - Maps & Geolocation Quality', 'Senior PM - Global Driver Earnings'],
      fitLevel: 'High',
      techStackDomain: ['Global Marketplace', 'Transit Tech', 'Geospatial', 'High-Concurrence Microservices'],
      hiringHubs: ['Bengaluru', 'Hyderabad'],
      pmTeamCulture: 'World-class product standards, global stakeholder management, high analytical bar.',
      careersUrl: 'https://www.uber.com/in/en/careers/',
      tier: 'C'
    },
    {
      id: 'euler_motors',
      name: 'Euler Motors',
      domain: 'Mobility, Automotive & EVs',
      stage: 'early',
      stageLabel: 'Early-Stage / Series C',
      indiaPresence: 'New Delhi HQ & Bengaluru Tech Hub',
      whyItFits: 'Commercial 3-wheeler and 4-wheeler electric vehicles designed for India’s extreme payload, heat, and quick-commerce delivery demands.',
      potentialRoles: ['Product Manager - Commercial Fleet Telematics', 'PM - Fast Charging & Battery Swapping Software'],
      fitLevel: 'High',
      techStackDomain: ['Commercial EVs', 'Fleet Telematics', 'Thermal Management', 'B2B Logistics'],
      hiringHubs: ['New Delhi', 'Bengaluru'],
      pmTeamCulture: 'Practical, engineering-first, rapid hardware-software prototyping.',
      careersUrl: 'https://eulermotors.com/careers',
      tier: 'A'
    },
    {
      id: 'bosh_mobility_borderline',
      name: 'Bosch Global Software Technologies (BGSW)',
      domain: 'Mobility, Automotive & EVs',
      stage: 'large',
      stageLabel: 'Tier-1 Automotive Supplier / MNC GCC',
      indiaPresence: 'Bengaluru (Adugodi & Electronic City), Pune, Coimbatore, Hyderabad',
      whyItFits: 'World’s largest automotive Tier-1 supplier building ADAS, powertrain, and AUTOSAR software.',
      potentialRoles: ['Product Owner - ECU Platform', 'Software Project Manager - ADAS Sensors'],
      fitLevel: 'Medium',
      borderlineReason: 'While technically sophisticated, role is closer to Tier-1 client specification delivery and AUTOSAR compliance rather than end-user product management.',
      techStackDomain: ['AUTOSAR', 'ADAS', 'Powertrain', 'Tier-1 Embedded'],
      hiringHubs: ['Bengaluru', 'Pune'],
      pmTeamCulture: 'V-Model automotive standards (ASPICE, ISO 26262), structured governance, long release cycles.',
      careersUrl: 'https://www.bosch-softwaretechnologies.com/en/careers/',
      tier: 'C'
    }
  ],
  'B2B SaaS & DevTools': [
    {
      id: 'postman',
      name: 'Postman',
      domain: 'B2B SaaS & DevTools',
      stage: 'growth',
      stageLabel: 'Growth / Global Unicorn',
      indiaPresence: 'Bengaluru Tech Hub & Remote (India)',
      whyItFits: 'The undisputed global API platform used by 30M+ developers worldwide. Best-in-class product-led growth (PLG) and developer experience engineering.',
      potentialRoles: ['Product Manager - API Collaboration & Workspace', 'PM - Postman AI (Postbot) & Automation', 'PM - Enterprise Security & Governance'],
      fitLevel: 'High',
      techStackDomain: ['APIs', 'Developer Tools', 'PLG', 'Generative AI'],
      hiringHubs: ['Bengaluru', 'Remote (India)'],
      pmTeamCulture: 'Dev-first mindset, empathy for software engineers, high product craft and PLG focus.',
      careersUrl: 'https://www.postman.com/company/careers/',
      tier: 'B'
    },
    {
      id: 'browserstack',
      name: 'BrowserStack',
      domain: 'B2B SaaS & DevTools',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (Highly Profitable)',
      indiaPresence: 'Mumbai HQ & Bengaluru Tech Center',
      whyItFits: 'World’s leading software testing platform on the cloud, powering automated testing on 3,000+ real mobile devices and browsers.',
      potentialRoles: ['Product Manager - App Live & Automated Testing', 'PM - Percy (Visual Testing)', 'PM - Enterprise Growth & Self-Serve Funnels'],
      fitLevel: 'High',
      techStackDomain: ['Cloud Testing', 'Selenium/Appium', 'DevTools', 'Infrastructure'],
      hiringHubs: ['Mumbai', 'Bengaluru'],
      pmTeamCulture: 'Product-led growth, data-driven experimentation, strong developer focus.',
      careersUrl: 'https://www.browserstack.com/careers',
      tier: 'B'
    },
    {
      id: 'hasura',
      name: 'Hasura',
      domain: 'B2B SaaS & DevTools',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (Series C)',
      indiaPresence: 'Bengaluru Tech Center & Remote (India)',
      whyItFits: 'Instant GraphQL & REST APIs on all your databases with built-in authorization and caching. Pioneer in open-source to enterprise monetization.',
      potentialRoles: ['Product Manager - Data Connectors & Federation', 'PM - Hasura Cloud & Observability', 'Technical PM - Developer Experience'],
      fitLevel: 'High',
      techStackDomain: ['GraphQL', 'Database Engines', 'Open Source', 'Data APIs'],
      hiringHubs: ['Bengaluru', 'Remote (India)'],
      pmTeamCulture: 'Open source ethos, deep technical depth, global community focus.',
      careersUrl: 'https://hasura.io/careers/',
      tier: 'B'
    },
    {
      id: 'freshworks',
      name: 'Freshworks',
      domain: 'B2B SaaS & DevTools',
      stage: 'large',
      stageLabel: 'Public SaaS Giant (NASDAQ Listed)',
      indiaPresence: 'Chennai HQ & Bengaluru Tech Hub',
      whyItFits: 'India’s marquee public SaaS company offering Freshdesk (customer service), Freshservice (ITSM), and Freshsales (CRM) with Freddy AI integrations.',
      potentialRoles: ['Senior PM - Freshservice ITSM & Automation', 'PM - Freddy AI Copilot', 'Growth PM - Product-Led Onboarding'],
      fitLevel: 'High',
      techStackDomain: ['ITSM', 'Customer Support', 'CRM', 'GenAI Assist'],
      hiringHubs: ['Chennai', 'Bengaluru'],
      pmTeamCulture: 'Mature SaaS playbooks, strong customer empathy for SMB & mid-market, structured PM ladders.',
      careersUrl: 'https://www.freshworks.com/company/careers/',
      tier: 'C'
    },
    {
      id: 'chargebee',
      name: 'Chargebee',
      domain: 'B2B SaaS & DevTools',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn',
      indiaPresence: 'Chennai Tech HQ & Bengaluru',
      whyItFits: 'Leading subscription management and recurring billing platform powering fast-growing SaaS businesses globally.',
      potentialRoles: ['Product Manager - Subscription & Invoicing Engine', 'PM - Global Tax & Compliance Integrations', 'PM - Retention & Churn Prevention (Receivables)'],
      fitLevel: 'High',
      techStackDomain: ['Subscription Billing', 'FinTech SaaS', 'Accounting Integrations', 'Payment Routing'],
      hiringHubs: ['Chennai', 'Bengaluru'],
      pmTeamCulture: 'Complex workflow mastery, high reliability, customer-first enterprise problem solving.',
      careersUrl: 'https://www.chargebee.com/careers/',
      tier: 'B'
    },
    {
      id: 'innovaccer',
      name: 'Innovaccer',
      domain: 'B2B SaaS & DevTools',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (Health SaaS)',
      indiaPresence: 'Noida HQ, Bengaluru, Gurugram',
      whyItFits: 'Leading healthcare data activation platform connecting electronic health records (EHR) and generating clinical AI insights for US hospitals.',
      potentialRoles: ['Product Manager - Healthcare Data Cloud', 'PM - Sara AI Clinical Copilot', 'Technical PM - FHIR & Interoperability APIs'],
      fitLevel: 'High',
      techStackDomain: ['Health Data Cloud', 'FHIR Protocols', 'Clinical AI', 'Enterprise Analytics'],
      hiringHubs: ['Noida', 'Bengaluru'],
      pmTeamCulture: 'Deep domain immersion, mission-driven healthcare transformation, enterprise rigor.',
      careersUrl: 'https://innovaccer.com/careers',
      tier: 'B'
    },
    {
      id: 'devtron',
      name: 'Devtron Labs',
      domain: 'B2B SaaS & DevTools',
      stage: 'early',
      stageLabel: 'Early-Stage / Scale-up (Series A)',
      indiaPresence: 'Gurugram & Remote (India)',
      whyItFits: 'Open-source Kubernetes-native software delivery workflow and internal developer platform (IDP).',
      potentialRoles: ['Product Manager - Kubernetes CI/CD & Deployments', 'PM - Cloud Cost Optimization'],
      fitLevel: 'High',
      techStackDomain: ['Kubernetes', 'CI/CD', 'DevOps', 'Cloud Native'],
      hiringHubs: ['Gurugram', 'Remote (India)'],
      pmTeamCulture: 'DevOps-first, community-driven, lean fast-moving engineering team.',
      careersUrl: 'https://devtron.ai/careers',
      tier: 'A'
    }
  ],
  'AI / GenAI & DeepTech': [
    {
      id: 'sarvam_ai',
      name: 'Sarvam AI',
      domain: 'AI / GenAI & DeepTech',
      stage: 'early',
      stageLabel: 'Early-Stage / Frontier AI Lab (Series A - $41M)',
      indiaPresence: 'Bengaluru (Koramangala) & Chennai',
      whyItFits: 'India’s premier sovereign GenAI lab building Indic voice models, LLMs (Sarvam-1), translation, and voice-first agentic infrastructure for enterprise and government.',
      potentialRoles: ['Product Manager - Indic Voice & Speech APIs', 'PM - Enterprise Agent Platform', 'Technical PM - Model Infrastructure & Evals'],
      fitLevel: 'High',
      techStackDomain: ['Indic LLMs', 'Speech-to-Text', 'Voice Agents', 'RAG & Vector Search'],
      hiringHubs: ['Bengaluru', 'Chennai'],
      pmTeamCulture: 'Research-to-product intensity, cutting-edge AI breakthroughs, high technical bar.',
      careersUrl: 'https://www.sarvam.ai/careers',
      tier: 'A'
    },
    {
      id: 'krutrim',
      name: 'Krutrim AI',
      domain: 'AI / GenAI & DeepTech',
      stage: 'growth',
      stageLabel: 'Growth / Unicorn (Fastest to $1B valuation)',
      indiaPresence: 'Bengaluru (Koramangala)',
      whyItFits: 'Building India’s AI computing stack from custom silicon chips and AI cloud infrastructure to foundational multilingual LLMs and consumer assistants.',
      potentialRoles: ['Product Manager - Krutrim Cloud & GPU Marketplace', 'PM - Conversational Assistant & Multimodal Apps', 'Technical PM - AI Silicon & Compilers'],
      fitLevel: 'High',
      techStackDomain: ['AI Cloud', 'GPU Orchestration', 'Multilingual Models', 'Silicon SDKs'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Hyper-scale ambition, vertically integrated stack from chips to consumer apps.',
      careersUrl: 'https://krutrim.com/careers',
      tier: 'B'
    },
    {
      id: 'glance_inmobi',
      name: 'Glance (InMobi Group)',
      domain: 'AI / GenAI & DeepTech',
      stage: 'large',
      stageLabel: 'Tech Giant / Unicorn (Backed by Google & Jio)',
      indiaPresence: 'Bengaluru HQ (Bellandur)',
      whyItFits: 'AI-first lock screen platform serving 300M+ active smartphones with personalized interactive content, live shows, and Roposo commerce.',
      potentialRoles: ['Product Manager - AI Recommendation Engine & Personalization', 'PM - Lock Screen Interactive Games', 'Growth PM - User Habit & Lock Screen Retention'],
      fitLevel: 'High',
      techStackDomain: ['AI Recommendation', 'Live Streaming', 'Mobile Lock Screen UX', 'AdTech'],
      hiringHubs: ['Bengaluru'],
      pmTeamCulture: 'Consumer scale at 300M DAU, metric experimentation, fast algorithm iteration.',
      careersUrl: 'https://glance.com/careers',
      tier: 'C'
    },
    {
      id: 'yellow_ai',
      name: 'Yellow.ai',
      domain: 'AI / GenAI & DeepTech',
      stage: 'growth',
      stageLabel: 'Growth / Scale-up (Series C)',
      indiaPresence: 'Bengaluru HQ (HSR Layout) & Mumbai',
      whyItFits: 'Global generative AI customer service and agentic automation platform for banking, telecom, and retail enterprises.',
      potentialRoles: ['Product Manager - Dynamic Conversation Designer', 'PM - GenAI Voice Agents & Telephony', 'PM - Enterprise Analytics & Bot Evals'],
      fitLevel: 'High',
      techStackDomain: ['Conversational AI', 'Voice Bots', 'LLM Guardrails', 'Enterprise Integrations'],
      hiringHubs: ['Bengaluru', 'Mumbai'],
      pmTeamCulture: 'Enterprise customer obsession, rapid GenAI transformation, global client deployments.',
      careersUrl: 'https://yellow.ai/careers/',
      tier: 'B'
    },
    {
      id: 'mad_street_den',
      name: 'Mad Street Den (Vue.ai)',
      domain: 'AI / GenAI & DeepTech',
      stage: 'growth',
      stageLabel: 'Growth / Scale-up',
      indiaPresence: 'Chennai HQ & Bengaluru',
      whyItFits: 'Enterprise AI and computer vision leader transforming retail, fashion merchandising, and document intelligence with automated computer vision.',
      potentialRoles: ['Product Manager - Computer Vision & Visual Search', 'PM - Automated Catalog Intelligence', 'Technical PM - Model Training Pipelines'],
      fitLevel: 'High',
      techStackDomain: ['Computer Vision', 'Generative Imaging', 'E-Commerce AI', 'Data Pipelines'],
      hiringHubs: ['Chennai', 'Bengaluru'],
      pmTeamCulture: 'Pioneering AI since 2013, deep product thinking, balance of research and enterprise value.',
      careersUrl: 'https://vue.ai/company/careers.html',
      tier: 'B'
    }
  ]
};

export const VERIFIED_JOBS_INDIA: JobMatch[] = [
  {
    id: 'job-1',
    company: 'Razorpay',
    jobTitle: 'Product Manager - Core Payments & Checkout',
    location: 'Bengaluru (Koramangala) - Hybrid',
    domain: 'Fintech & Payments',
    experienceRequired: '2-5 Years',
    applicationUrl: 'https://razorpay.com/jobs/product-manager-payments',
    matchScore: 94,
    matchTier: 'Excellent match',
    whyItMatches: 'Perfect alignment for candidates with strong analytical, API, or engineering background looking to own high-throughput payment checkout experiences.',
    directExperience: ['API design workflows', 'SQL & data analytics', 'Sprint execution & PRD ownership'],
    transferableExperience: ['Backend systems knowledge', 'Stakeholder alignment across engineering and compliance'],
    skillGaps: ['Deep familiarity with RBI tokenization and payment gateway settlement nuances'],
    recommendation: 'Top recommendation. Highlight your experience in optimizing latency, reducing error states, and managing complex integrations in your application.',
    salaryRange: '₹28L - ₹38L + ESOPs',
    postedDate: 'Verified Current Opening',
    verified: true
  },
  {
    id: 'job-2',
    company: 'Ather Energy',
    jobTitle: 'Product Manager - Connected Vehicle OS & Telematics',
    location: 'Bengaluru (IBC Knowledge Park) - Onsite/Hybrid',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '3-6 Years',
    applicationUrl: 'https://www.atherenergy.com/careers',
    matchScore: 92,
    matchTier: 'Excellent match',
    whyItMatches: 'Ideal for candidates with embedded systems, IoT, or automotive telematics background transitioning to smart EV digital cockpits and consumer dashboard experiences.',
    directExperience: ['Telematics & CAN protocol understanding', 'IoT device communication', 'Feature prioritization'],
    transferableExperience: ['Automotive safety lifecycle knowledge', 'Hardware-software trade-off management'],
    skillGaps: ['Consumer mobile app engagement loops', 'Android Automotive UI design principles'],
    recommendation: 'Must-apply if targeting the EV and smart mobility revolution in India. Emphasize how your technical background helps you write precise telemetry requirements.',
    salaryRange: '₹26L - ₹36L + Stocks',
    postedDate: 'Verified Current Opening',
    verified: true
  },
  {
    id: 'job-3',
    company: 'Postman',
    jobTitle: 'Technical Product Manager - API Platform & Workspaces',
    location: 'Bengaluru / Remote (India)',
    domain: 'B2B SaaS & DevTools',
    experienceRequired: '3-7 Years',
    applicationUrl: 'https://www.postman.com/company/careers/',
    matchScore: 89,
    matchTier: 'Strong match',
    whyItMatches: 'Matches developers and TPMs who love developer tooling, REST/GraphQL protocols, and building developer-first collaboration workflows.',
    directExperience: ['REST, GraphQL, gRPC protocols', 'Developer workflows & Git integration', 'Technical PRD creation'],
    transferableExperience: ['Software engineering problem-solving', 'OpenAPI specifications & documentation'],
    skillGaps: ['Product-Led Growth (PLG) self-serve monetization metrics', 'User interview discovery for non-technical buyers'],
    recommendation: 'Strong match. Craft a teardown of a current Postman workspace feature and attach it with your outreach to the hiring manager.',
    salaryRange: '₹32L - ₹48L + US Equity',
    postedDate: 'Verified Current Opening',
    verified: true
  },
  {
    id: 'job-4',
    company: 'Sarvam AI',
    jobTitle: 'AI Product Manager - Enterprise Voice & Agents',
    location: 'Bengaluru (Koramangala) - Onsite',
    domain: 'AI / GenAI & DeepTech',
    experienceRequired: '2-5 Years',
    applicationUrl: 'https://www.sarvam.ai/careers',
    matchScore: 88,
    matchTier: 'Strong match',
    whyItMatches: 'Leading frontier opportunity to define how Indian enterprises interact with voice-first Indic LLMs, customer call automation, and banking copilots.',
    directExperience: ['AI/ML fundamentals', 'RAG and LLM tool calling concepts', 'Product specifications'],
    transferableExperience: ['Product analytics & customer empathy', 'Enterprise stakeholder management'],
    skillGaps: ['LLM automated eval pipelines (Ragas/DeepEval)', 'Speech token latency budgeting'],
    recommendation: 'High-growth frontier role. Focus on showing hands-on experience with LLM APIs, prompt engineering, and an understanding of Indic language nuances.',
    salaryRange: '₹30L - ₹45L + Generous Equity',
    postedDate: 'Verified Current Opening',
    verified: true
  },
  {
    id: 'job-5',
    company: 'Zepto',
    jobTitle: 'Product Manager - Supply Chain & Dark Store Automation',
    location: 'Bengaluru (Bellandur) - Onsite',
    domain: 'E-Commerce & Quick Commerce',
    experienceRequired: '2-5 Years',
    applicationUrl: 'https://www.zeptonow.com/careers',
    matchScore: 84,
    matchTier: 'Strong match',
    whyItMatches: 'Fast-paced execution role optimizing 10-minute picking, inventory batching, dark store layout algorithms, and rider dispatch.',
    directExperience: ['Data analytics (SQL, Cohorts)', 'Operational workflow design', 'A/B experimentation'],
    transferableExperience: ['Process optimization', 'Engineering sprint coordination'],
    skillGaps: ['Warehouse Management System (WMS) architecture', 'Ultra-fast dispatch math'],
    recommendation: 'Great opportunity for high-energy PMs who thrive in operational speed and relentless metric optimization.',
    salaryRange: '₹27L - ₹38L + ESOPs',
    postedDate: 'Verified Current Opening',
    verified: true
  },
  {
    id: 'job-6',
    company: 'Groww',
    jobTitle: 'Product Manager - Mutual Funds & Wealth Advisory',
    location: 'Bengaluru (Vaishnavi Tech Park) - Hybrid',
    domain: 'Fintech & Payments',
    experienceRequired: '3-6 Years',
    applicationUrl: 'https://groww.in/careers',
    matchScore: 78,
    matchTier: 'Good match',
    whyItMatches: 'Empowering first-time Indian investors with simplified goal-based investing, SIP automation, and portfolio rebalancing.',
    directExperience: ['Consumer onboarding funnels', 'Fintech regulations & KYC', 'Metrics analysis'],
    transferableExperience: ['User empathy & customer discovery', 'Roadmap governance'],
    skillGaps: ['AMFI and SEBI investment advisory compliance guidelines'],
    recommendation: 'Good match for PMs with strong consumer product instincts and an interest in wealth creation for Bharat.',
    salaryRange: '₹28L - ₹40L',
    postedDate: 'Verified Current Opening',
    verified: true
  },
  {
    id: 'job-7',
    company: 'Uber India Tech Center',
    jobTitle: 'Product Manager II - Maps & Transit Routing',
    location: 'Bengaluru / Hyderabad - Hybrid',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '4-7 Years',
    applicationUrl: 'https://www.uber.com/in/en/careers/',
    matchScore: 72,
    matchTier: 'Good match',
    whyItMatches: 'Building global geospatial routing, landmark navigation, and bus transit solutions from Indian tech centers for worldwide deployment.',
    directExperience: ['Technical product management', 'System architecture evaluation', 'Global stakeholder coordination'],
    transferableExperience: ['Engineering background', 'Quantitative optimization'],
    skillGaps: ['Geospatial indexing (H3/S2 geometry)', 'Large-scale graph routing algorithms'],
    recommendation: 'Strong brand name on resume with global exposure. Prepare for rigorous product sense and analytical case interviews.',
    salaryRange: '₹40L - ₹55L + RSU Grants',
    postedDate: 'Verified Current Opening',
    verified: true
  },
  {
    id: 'job-8',
    company: 'Infosys Finacle',
    jobTitle: 'Functional Product Owner - Core Banking Modernization',
    location: 'Bengaluru / Pune - Hybrid',
    domain: 'Fintech & Payments',
    experienceRequired: '5-8 Years',
    applicationUrl: 'https://www.infosys.com/careers',
    matchScore: 62,
    matchTier: 'Stretch',
    whyItMatches: 'Enterprise software position supporting traditional bank core migration to cloud microservices.',
    directExperience: ['Banking operations', 'Waterfall/Agile backlog maintenance'],
    transferableExperience: ['Requirements documentation'],
    skillGaps: ['Modern product discovery and PLG metrics'],
    recommendation: 'Consider as a secondary fallback if targeting IT consulting or enterprise services rather than fast-iterating tech products.',
    salaryRange: '₹18L - ₹25L',
    postedDate: 'Verified Current Opening',
    verified: true
  }
];

export const DOMAIN_KNOWLEDGE_BASE: Record<string, DomainConcept[]> = {
  'Fintech & Payments': [
    {
      id: 'upi_lifecycle',
      title: 'UPI 2.0 & AutoPay Mandates',
      conceptType: 'Workflow',
      description: 'Understanding the Unified Payments Interface 4-party model (Payer PSP, Remitter Bank, NPCI Switch, Beneficiary Bank, Payee PSP) and recurring AutoPay debit mandate execution under RBI rules.',
      realWorldIndianExample: 'PhonePe or Google Pay recurring SIP deductions and electricity bill auto-payments via NPCI Mandate Management System (MMS).',
      pmActionableTakeaway: 'A PM must build automated fallback retry logic for debit failures (e.g. at 6 AM, 12 PM, 6 PM) and handle bank downtime switches in real-time.'
    },
    {
      id: 'co_branded_cards',
      title: 'Co-Branded Credit Cards & FLDG Regulations',
      conceptType: 'Regulatory / Architecture',
      description: 'RBI First Loss Default Guarantee (FLDG) norms (capped at 5% of loan portfolio) and digital lending guidelines requiring direct loan disbursement to borrower bank accounts without fintech escrow pools.',
      realWorldIndianExample: 'Scapia with Federal Bank, Swiggy HDFC Credit Card, or OneCard with SBM/Federal Bank.',
      pmActionableTakeaway: 'Fintech PMs must design onboarding flows where the regulated banking partner performs the credit underwriting and KYC verification steps compliant with RBI audits.'
    },
    {
      id: 'pg_success_rates',
      title: 'Payment Gateway SR (Success Rate) & Smart Routing',
      conceptType: 'Metric / KPI',
      description: 'The percentage of initiated checkout transactions that successfully capture funds. Driven by dynamic routing across Razorpay, Cashfree, PayU, and Juspay depending on live bank server health.',
      realWorldIndianExample: 'Swiggy or Flipkart routing HDFC NetBanking traffic away from an impaired gateway to maintain 92%+ checkout success rate.',
      pmActionableTakeaway: 'Track SR by Payment Mode (UPI vs Card vs NetBanking vs EMI) and build client-side card health prediction to warn users before checkout.'
    },
    {
      id: 'account_aggregator',
      title: 'Account Aggregator (AA) Ecosystem (Sahamati)',
      conceptType: 'Regulatory / Architecture',
      description: 'Consent-based financial data-sharing framework licensed by RBI that replaces paper bank statements with encrypted real-time digital bank account data for instant loan underwriting.',
      realWorldIndianExample: 'CRED Cash or Navi using Finvu/Setu Account Aggregator to approve ₹2L personal loans in under 90 seconds.',
      pmActionableTakeaway: 'Design friction-free OTP consent screens that minimize user drop-offs during the multi-account discovery step.'
    },
    {
      id: 'kyc_c_kyc',
      title: 'V-KYC, C-KYC & Aadhaar Offline Verification (OKYC)',
      conceptType: 'Workflow',
      description: 'The regulatory customer onboarding pipeline in India including UIDAI Aadhaar XML extraction, liveness check, and Video KYC with human verification within 30 days.',
      realWorldIndianExample: 'Groww or Zerodha paperless demat account opening in under 5 minutes.',
      pmActionableTakeaway: 'Every extra field or delayed OTP in KYC reduces conversion by ~12%. PMs must optimize OCR auto-fill for PAN cards and fallback to DigiLocker.'
    },
    {
      id: 'chargeback_reconciliation',
      title: 'Dispute Resolution, Chargebacks & T+1 Settlement',
      conceptType: 'Trade-off',
      description: 'Managing the financial ledger discrepancy between payment authorization, settlement from merchant acquiring banks, and customer dispute chargeback windows under card network rules (Visa/Mastercard/RuPay).',
      realWorldIndianExample: 'Razorpay merchant dashboard showing daily gross settlement minus refund adjustments and MDR (Merchant Discount Rate).',
      pmActionableTakeaway: 'Balance instant merchant payouts against fraud reserves to prevent catastrophic merchant default losses.'
    }
  ],
  'Mobility, Automotive & EVs': [
    {
      id: 'ais_156_battery',
      title: 'AIS-156 & AIS-038 Rev 2 Battery Safety Norms',
      conceptType: 'Regulatory / Architecture',
      description: 'Stringent Indian government safety standards mandating thermal runaway detection, early audio-visual driver warnings 5 minutes prior to thermal events, IPX7 water ingress, and smart BMS data logging.',
      realWorldIndianExample: 'Ather 450X and Ola S1 battery packs passing rigorous monsoon water submersion and extreme heat testing.',
      pmActionableTakeaway: 'PMs defining battery management software must ensure telemetry can broadcast thermal alerts to cloud operations and push vehicle limp-home modes gracefully.'
    },
    {
      id: 'fota_updates',
      title: 'Firmware Over-The-Air (FOTA) Architecture & Rollback',
      conceptType: 'Workflow',
      description: 'Delivering encrypted binary OS and ECU firmware updates remotely via 4G/5G eSIM to vehicles in the field with dual-bank memory partitions to prevent vehicle bricking.',
      realWorldIndianExample: 'Ola MoveOS or Ather AtherStack pushing new cruise control, navigation, or regenerative braking features directly to parked scooters overnight.',
      pmActionableTakeaway: 'Design strict pre-condition safety checks (e.g. vehicle in Park, battery >30%, side-stand engaged) before triggering update installation.'
    },
    {
      id: 'range_estimation_math',
      title: 'Real-World TrueRange™ vs IDC (Indian Driving Cycle)',
      conceptType: 'Metric / KPI',
      description: 'The stark gap between certified lab test range (IDC) and real-world range influenced by pillion passenger weight, elevation gradients, throttle aggression, and ambient temperature.',
      realWorldIndianExample: 'Ather Energy displaying accurate "TrueRange" on the instrument cluster instead of misleading lab numbers, building high rider trust.',
      pmActionableTakeaway: 'A mobility PM must build algorithmic range estimation using historical rider riding style and topographic destination map data.'
    },
    {
      id: 'charging_station_protocols',
      title: 'OCPP (Open Charge Point Protocol) & Bharat DC-001',
      conceptType: 'Workflow',
      description: 'Standardized communication protocol between EV charging stations and Central Management Systems (CMS) handling user authentication, charging start/stop, and tariff billing.',
      realWorldIndianExample: 'BluSmart EV hubs or Ather Grid charging stations allowing app-based gun unlocking and automatic wallet deduction upon unplugging.',
      pmActionableTakeaway: 'Handle poor cellular connectivity at underground charging stations with offline Bluetooth fallback authentication.'
    },
    {
      id: 'telematics_iot_latency',
      title: 'MQTT & CAN Telematics Data Ingestion Pipeline',
      conceptType: 'Regulatory / Architecture',
      description: 'Streaming high-frequency vehicle telemetry (speed, SoC, GPS coordinates, error codes) over MQTT to cloud time-series databases while managing SIM card bandwidth costs.',
      realWorldIndianExample: 'Euler Motors or Bounce tracking commercial fleet health, vehicle location, and geofence boundary breaches in real-time.',
      pmActionableTakeaway: 'Implement edge-computing data compression so routine packets are sent every 10 seconds, but crash/tampering events transmit instantaneously at 100Hz.'
    }
  ],
  'B2B SaaS & DevTools': [
    {
      id: 'plg_aha_moment',
      title: 'Product-Led Growth (PLG) & The Time-to-Value (TTV) Funnel',
      conceptType: 'Workflow',
      description: 'Structuring the self-serve signup flow so a software developer or workspace admin experiences core product value within 3 minutes without talking to a sales rep.',
      realWorldIndianExample: 'Postman enabling a user to send their first API request in 30 seconds, or BrowserStack launching an instant interactive cloud browser.',
      pmActionableTakeaway: 'Remove mandatory credit card entry at signup and measure user onboarding by "Activated Accounts" (e.g. 3 collections created + 1 team invite sent) rather than just signups.'
    },
    {
      id: 'multi_tenant_isolation',
      title: 'Multi-Tenant Architecture, RBAC & SOC2 / ISO 27001',
      conceptType: 'Regulatory / Architecture',
      description: 'Designing enterprise database schemas where customer data is strictly isolated with role-based access control (Admin, Editor, Viewer, Guest) and audit logs compliant with SOC2 Type II.',
      realWorldIndianExample: 'Freshworks or Chargebee managing tens of thousands of global corporate accounts with tenant encryption keys and custom SAML/SSO.',
      pmActionableTakeaway: 'Build self-serve audit logging and enterprise Single Sign-On (Okta/Azure AD) early to unlock 6-figure enterprise deals.'
    },
    {
      id: 'ndr_and_seat_expansion',
      title: 'Net Dollar Retention (NDR) & Usage-Based Pricing',
      conceptType: 'Metric / KPI',
      description: 'The golden metric of SaaS measuring how much revenue grows from existing customers year-over-year after accounting for churn, upgrades, and seat expansion (>120% is top-tier).',
      realWorldIndianExample: 'Hasura or Postman expanding revenue as client engineering teams grow from 5 seats to 500 seats with higher API call tiers.',
      pmActionableTakeaway: 'Align your pricing model with customer value metric (e.g. active API calls, monitored servers, or resolution tickets) rather than arbitrary artificial feature paywalls.'
    }
  ],
  'AI / GenAI & DeepTech': [
    {
      id: 'eval_frameworks',
      title: 'Automated Evals & LLM-as-a-Judge Benchmarking',
      conceptType: 'Workflow',
      description: 'Creating comprehensive test datasets (Golden Sets) to evaluate model outputs across correctness, tone, hallucination, and safety before deploying model or prompt updates.',
      realWorldIndianExample: 'Sarvam AI testing Indic translation accuracy across Hindi, Tamil, Telugu, and Marathi against certified linguist benchmark datasets.',
      pmActionableTakeaway: 'Never push a prompt change or model migration (e.g. Flash to Pro) to production without a quantitative eval regression report showing zero degradation on core edge cases.'
    },
    {
      id: 'token_economics',
      title: 'Token Budgeting, TTFT & P95 Latency Slicing',
      conceptType: 'Metric / KPI',
      description: 'Calculating the exact marginal cost per user query and optimizing Time-To-First-Token (TTFT) via streaming chunk responses to maintain high UI responsiveness.',
      realWorldIndianExample: 'Swiggy AI dish recommendation streaming response words in <400ms rather than buffering for 4 seconds.',
      pmActionableTakeaway: 'Implement prompt caching (saving 50-80% on repeated system prompts) and trim conversation history using semantic summarization.'
    },
    {
      id: 'grounding_and_reranking',
      title: 'Hybrid Search (Dense + Sparse) & Cross-Encoder Reranking',
      conceptType: 'Regulatory / Architecture',
      description: 'Combining traditional BM25 keyword search with vector embeddings (Cosine similarity) and re-ranking the top 20 results using cross-encoders to ensure 98%+ retrieval accuracy.',
      realWorldIndianExample: 'Innovaccer clinical document search or HDFC Bank policy chatbot accurately locating clause 4.2 in a 300-page loan handbook.',
      pmActionableTakeaway: 'Always include source citation metadata and chunk confidence scores so the frontend can display verifiable footnote links to users.'
    }
  ]
};

export const OUTREACH_TEMPLATES_DATA: OutreachTemplate[] = [
  {
    id: 'recruiter_linkedin',
    type: 'recruiter',
    title: 'Recruiter / Talent Acquisition InMail',
    recipientRole: 'Technical Recruiter / PM Talent Lead',
    subjectLine: 'Application / Interest: {{TARGET_ROLE}} role at {{COMPANY_NAME}}',
    body: `Hi {{RECRUITER_NAME}},

I noticed {{COMPANY_NAME}} is expanding its Product team for {{TEAM_OR_DOMAIN}}. Given my {{YEARS_EXP}} years of experience in {{CURRENT_DOMAIN_OR_ROLE}} where I’ve focused on {{KEY_STRENGTH_1}} and {{KEY_STRENGTH_2}}, I’d love to explore how my background fits your team’s roadmap.

At my current role, I recently led {{NOTABLE_PROJECT_OR_IMPACT}}, which resulted in {{METRIC_OR_RESULT}}. I’ve been closely following {{COMPANY_NAME}}'s launch of {{COMPANY_PRODUCT_OR_FEATURE}} and believe my experience with {{TRANSFERABLE_SKILL}} would enable me to hit the ground running.

I have attached my resume and a brief portfolio overview. Would you be open to a brief 10-minute introductory conversation this week?

Best regards,
{{USER_NAME}}
{{PORTFOLIO_LINK_OR_LINKEDIN}}`,
    customizationTips: [
      'Keep it under 150 words.',
      'Replace the bracketed variables with concrete numbers (e.g. "reduced checkout drop-off by 24%").',
      'Mention a specific recent feature or announcement from the company.'
    ]
  },
  {
    id: 'peer_networking',
    type: 'networking',
    title: 'Peer PM / Engineering Lead Networking & Referral Pitch',
    recipientRole: 'Product Manager / Senior PM / Engineering Manager at Target Company',
    subjectLine: 'Quick question on Product culture at {{COMPANY_NAME}} / Coffee chat',
    body: `Hi {{PEER_NAME}},

Hope you’re having a great week! I came across your profile while reading about how the team at {{COMPANY_NAME}} approaches {{SPECIFIC_PRODUCT_AREA_OR_TECH}}.

I’m a {{CURRENT_ROLE}} with {{YEARS_EXP}} years of experience in {{CURRENT_DOMAIN}}, currently looking at PM opportunities in {{TARGET_DOMAIN}}. I really admired your team's execution on {{SPECIFIC_FEATURE_OR_SYSTEM}}.

I would love to learn more about the product development culture and engineering collaboration at {{COMPANY_NAME}}. If your schedule permits, could I steal 10 minutes of your time for a quick virtual coffee chat? 

Happy to share any insights from my work in {{YOUR_EXPERTISE_AREA}} as well!

Thanks so much,
{{USER_NAME}}`,
    customizationTips: [
      'Do NOT ask for a referral in the very first message. Build rapport first.',
      'Highlight genuine admiration for a specific technical or UX detail they worked on.',
      'Offer mutual value.'
    ]
  },
  {
    id: 'cold_pitch_teardown',
    type: 'cold_pitch',
    title: 'Hiring Manager "Proof of Work" Teardown Message',
    recipientRole: 'Director of Product / VP of Product / CPO',
    subjectLine: '3 Product observations & teardown for {{COMPANY_NAME}}’s {{FEATURE_NAME}}',
    body: `Hi {{HIRING_MANAGER_NAME}},

I’ve been an active user of {{COMPANY_NAME}} and have been studying your team’s recent iterations on {{FEATURE_NAME}}. 

I put together a quick 3-slide product teardown analyzing user friction points during {{SPECIFIC_USER_FLOW}} and modeled two potential hypotheses:
1. {{OBSERVATION_1}}: Modifying {{UX_OR_API_STEP}} could reduce drop-off by estimated {{ESTIMATED_LIFT_1}}.
2. {{OBSERVATION_2}}: Introducing {{AI_OR_SMART_FEATURE}} to automate {{MANUAL_STEP}}.

You can view the interactive breakdown here: {{TEARDOWN_LINK}}.

I have {{YEARS_EXP}} years of experience shipping {{RELEVANT_PRODUCT_TYPE}} at scale and would love to bring this problem-solving velocity to {{COMPANY_NAME}}’s Product team. 

Are you open to a 10-minute chat regarding how I can contribute to your upcoming quarterly roadmap?

Best,
{{USER_NAME}}`,
    customizationTips: [
      'This is the highest-converting outreach method for top product leaders in India.',
      'Create a 1-page Notion or Figma teardown link before sending.',
      'Show that you understand their business metrics and user pain points.'
    ]
  }
];

export const ADJACENT_DOMAINS_MAP: Record<string, AdjacentDomain[]> = {
  'Mobility, Automotive & EVs': [
    {
      id: 'adj_auto_sw',
      name: 'Automotive Software & OS',
      icon: 'Cpu',
      description: 'In-vehicle operating systems, Android Automotive, infotainment UI, and digital cockpit user experiences.',
      crossoverScore: 96,
      transferableHooks: ['ECU architecture', 'CAN bus communication', 'Safety-critical state machines'],
      sharedMechanics: ['FOTA updates', 'Driver distraction guidelines', 'Touch & voice multimodal inputs'],
      keyDifferentiators: ['Higher focus on consumer UI latency and graphic rendering performance.'],
      indiaMarketContext: 'High hiring demand at Ather (AtherStack), Ola Electric (MoveOS), and global tech GCCs in Bengaluru & Pune.'
    },
    {
      id: 'adj_connected_vehicles',
      name: 'Connected Vehicles & Fleet Telematics',
      icon: 'Radio',
      description: 'Cloud IoT data pipelines, real-time remote vehicle diagnostics, battery health monitoring, and geofencing.',
      crossoverScore: 94,
      transferableHooks: ['IoT telemetry streaming', 'MQTT protocols', 'Sensor data aggregation'],
      sharedMechanics: ['Time-series telemetry dashboards', 'Predictive maintenance alarms', 'Fleet analytics'],
      keyDifferentiators: ['Managing high cloud ingestion scale and mobile network bandwidth costs.'],
      indiaMarketContext: 'Massive growth across commercial B2B fleets (Euler, BluSmart, Tata Motors Fleet Edge).'
    },
    {
      id: 'adj_sdv',
      name: 'Software-Defined Vehicles (SDV)',
      icon: 'Layers',
      description: 'Decoupling vehicle hardware from cloud software architectures to enable continuous feature subscriptions over the vehicle lifecycle.',
      crossoverScore: 91,
      transferableHooks: ['Modular service-oriented architecture (SOA)', 'API contracts', 'Vehicle middleware'],
      sharedMechanics: ['Feature flags & entitlement gating', 'Digital twin simulations', 'Hardware abstraction layers (HAL)'],
      keyDifferentiators: ['Requires deep understanding of AUTOSAR Adaptive and cloud microservices.'],
      indiaMarketContext: 'Strategic priority for Mahindra, Tata Motors, and global R&D centers (Mercedes, Stellantis India).'
    },
    {
      id: 'adj_mobility_marketplaces',
      name: 'Smart Mobility & Ride Marketplaces',
      icon: 'Navigation',
      description: 'Multi-sided matching algorithms, dynamic pricing, driver supply incentives, and route optimization.',
      crossoverScore: 86,
      transferableHooks: ['Geospatial understanding', 'Fleet efficiency math', 'Real-world operational empathy'],
      sharedMechanics: ['Surge pricing algorithms', 'ETA prediction', 'Driver dispatch loops'],
      keyDifferentiators: ['Heavy focus on consumer retention, unit economics, and hyper-local regulations.'],
      indiaMarketContext: 'Dominated by Rapido, Uber India, Ola Cabs, and BluSmart across Tier 1 & 2 cities.'
    },
    {
      id: 'adj_industrial_ai',
      name: 'Industrial AI & Robotics',
      icon: 'Bot',
      description: 'Computer vision quality inspection, automated guided vehicles (AGVs), and smart factory automation.',
      crossoverScore: 82,
      transferableHooks: ['Sensor integration', 'Hardware testing loops', 'Factory assembly workflows'],
      sharedMechanics: ['Edge computing inference', 'Real-time fault classification', 'Camera calibration'],
      keyDifferentiators: ['Direct B2B manufacturing plant customer personas and high capex sales cycles.'],
      indiaMarketContext: 'Rapidly expanding in Tamil Nadu, Pune, and NCR manufacturing corridors.'
    },
    {
      id: 'adj_iot_hardware',
      name: 'IoT & Smart Hardware Devices',
      icon: 'Wifi',
      description: 'Consumer and industrial connected smart devices, firmware lifecycle, and edge-to-cloud synchronization.',
      crossoverScore: 84,
      transferableHooks: ['Firmware lifecycle', 'Hardware supply chain realities', 'BOM cost modeling'],
      sharedMechanics: ['Device pairing via BLE/Wi-Fi', 'Battery optimization', 'Hardware bug fixing constraints'],
      keyDifferentiators: ['Consumer unboxing experience and hardware warranty return loops.'],
      indiaMarketContext: 'Growing ecosystem with smart metering, soundboxes (Paytm/PhonePe), and wearables.'
    },
    {
      id: 'adj_b2b_saas_eng',
      name: 'Engineering & Simulation Software (B2B SaaS)',
      icon: 'Code2',
      description: 'CAD/CAM cloud collaboration, finite element analysis (FEA), and hardware engineering productivity tools.',
      crossoverScore: 79,
      transferableHooks: ['Engineering domain empathy', 'Complex 3D file formats', 'Simulation workflows'],
      sharedMechanics: ['Desktop to cloud migration', 'Enterprise seat licensing', 'API extensions'],
      keyDifferentiators: ['High-ACV enterprise sales cycles and deep domain technical specifications.'],
      indiaMarketContext: 'Presence of Siemens, Dassault Systèmes, and emerging cloud CAD startups in India.'
    },
    {
      id: 'adj_genai_mobility',
      name: 'AI / GenAI for Mobility & Assistants',
      icon: 'Sparkles',
      description: 'In-cabin conversational voice assistants, predictive navigation, and automated diagnostic troubleshooting bots.',
      crossoverScore: 80,
      transferableHooks: ['System integration', 'User context awareness', 'Voice UX in noisy cabins'],
      sharedMechanics: ['RAG on vehicle user manuals', 'Voice intent classification', 'Offline voice model fallback'],
      keyDifferentiators: ['Strict sub-second latency constraints without requiring constant 5G connectivity.'],
      indiaMarketContext: 'High innovation area for Ather, Sarvam AI, and Tata Elxsi.'
    }
  ],
  'Fintech & Payments': [
    {
      id: 'adj_fin_wealth',
      name: 'WealthTech & Digital Brokerages',
      icon: 'TrendingUp',
      description: 'Stock trading platforms, direct mutual funds, portfolio management, and robo-advisory tools.',
      crossoverScore: 95,
      transferableHooks: ['KYC/AML workflows', 'Bank mandate integrations', 'Regulatory compliance (SEBI)'],
      sharedMechanics: ['Real-time order books', 'P&L reporting dashboards', 'Push notification habit loops'],
      keyDifferentiators: ['High-frequency trading latency and capital market regulatory frameworks.'],
      indiaMarketContext: 'Powerhouses include Groww, Zerodha, Angel One, Upstox, and INDmoney.'
    },
    {
      id: 'adj_fin_lending',
      name: 'Digital Lending & Credit Underwriting',
      icon: 'CreditCard',
      description: 'Instant personal loans, Merchant Cash Advance (MCA), Buy-Now-Pay-Later (BNPL), and Account Aggregator underwriting.',
      crossoverScore: 94,
      transferableHooks: ['CIBIL credit bureau pulls', 'Bank statement parsing', 'Repayment collection loops'],
      sharedMechanics: ['Risk-based dynamic pricing', 'Loan origination systems (LOS)', 'FLDG risk management'],
      keyDifferentiators: ['Non-Performing Asset (NPA) management and strict debt recovery conduct codes.'],
      indiaMarketContext: 'Navi, KreditBee, MoneyView, Slice, and Bajaj Finserv Digital.'
    },
    {
      id: 'adj_fin_neobank',
      name: 'Neo-Banking & SME Financial OS',
      icon: 'Building2',
      description: 'Smart business current accounts, automated payroll, vendor payouts, and automated invoicing.',
      crossoverScore: 92,
      transferableHooks: ['Payment gateway integrations', 'Ledger reconciliation', 'Multi-bank APIs'],
      sharedMechanics: ['Role-based team permissions', 'Tax deduction at source (TDS) calculations', 'Virtual accounts'],
      keyDifferentiators: ['Serving SME founders with holistic business financial operations.'],
      indiaMarketContext: 'RazorpayX, Open.money, Jupiter, Fi Money.'
    },
    {
      id: 'adj_fin_insurtech',
      name: 'InsurTech & Embedded Protection',
      icon: 'ShieldCheck',
      description: 'Digital health, auto, and sachet life insurance with instant policy issuance and cashless claims processing.',
      crossoverScore: 88,
      transferableHooks: ['Underwriting risk algorithms', 'Payment gateways', 'Partner integrations'],
      sharedMechanics: ['Dynamic premium quotation', 'Claim fraud detection via AI', 'Annual renewal retention loops'],
      keyDifferentiators: ['IRDAI regulations and actuarial table modeling.'],
      indiaMarketContext: 'PolicyBazaar, Acko, Digit Insurance, Turtlemint.'
    },
    {
      id: 'adj_fin_b2b_saas',
      name: 'B2B FinTech SaaS & Subscription Billing',
      icon: 'Receipt',
      description: 'Recurring billing engines, global tax automation, revenue recognition, and ERP integrations.',
      crossoverScore: 89,
      transferableHooks: ['Payment tokenization', 'Webhook reliability', 'Multi-currency settlement'],
      sharedMechanics: ['Dunning management', 'Invoice generation', 'Accounting sync (NetSuite/QuickBooks)'],
      keyDifferentiators: ['Global enterprise B2B sales cycles and international cross-border compliance.'],
      indiaMarketContext: 'Chargebee, HyperSwitch (Juspay), Clear (ClearTax).'
    },
    {
      id: 'adj_fin_ai',
      name: 'AI in Fraud Detection & Financial Agents',
      icon: 'Sparkles',
      description: 'Real-time transaction anomaly detection, conversational banking assistants, and automated credit risk scoring.',
      crossoverScore: 87,
      transferableHooks: ['Transaction graph analysis', 'User verification logic', 'Financial data literacy'],
      sharedMechanics: ['RAG on bank transaction histories', 'Graph neural networks for fraud syndicates', 'Model explainability'],
      keyDifferentiators: ['Zero tolerance for false positives that block legitimate consumer payments.'],
      indiaMarketContext: 'High R&D investment across Razorpay, PhonePe, and Bureau.id.'
    }
  ]
};

export const DOMAIN_CONCEPTS_DATABASE = DOMAIN_KNOWLEDGE_BASE;

export const AI_PM_CONCEPTS = [
  {
    title: '1. Probabilistic vs Deterministic Software',
    category: 'Foundations',
    explanation: 'Traditional software runs on deterministic "if-then-else" code. LLMs and GenAI operate probabilistically on mathematical token distributions, meaning identical inputs can yield varying outputs.',
    whyItMattersForPM: 'PMs cannot write traditional fixed functional specs. You must design evaluation rubrics, confidence thresholds, and fallback pathways for when confidence is low.',
    pmDeliverableOrMetric: 'Deliverable: AI Confidence Rubric & Graceful Human Fallback Workflow.'
  },
  {
    title: '2. LLM APIs, Tokenization & Context Windows',
    category: 'Architecture',
    explanation: 'Text is processed as tokens (1 token ≈ 0.75 words in English; higher token ratios for Indic languages). Context windows limit how many tokens can be ingested and generated in a single session.',
    whyItMattersForPM: 'Token count directly drives API operational costs and latency. PMs must budget token limits for system prompts, chat history, and retrieval context.',
    pmDeliverableOrMetric: 'Metric: Cost per User Session (CPAU) & Time-to-First-Token (TTFT < 800ms).'
  },
  {
    title: '3. Prompt Engineering & System Instructions',
    category: 'Technique',
    explanation: 'Structuring system prompts with specific role personas, strict output JSON schemas, few-shot examples, and explicit constraints to guide model behavior without retraining.',
    whyItMattersForPM: 'Prompting is the quickest mechanism to prototype and validate AI features. It forms the core specification for backend LLM handlers.',
    pmDeliverableOrMetric: 'Deliverable: Version-Controlled System Prompt Specification & JSON Schema Contract.'
  },
  {
    title: '4. Retrieval-Augmented Generation (RAG)',
    category: 'Architecture',
    explanation: 'RAG fetches domain-specific context from private databases/documents and injects it into the prompt before generation, preventing hallucinations and keeping facts updated.',
    whyItMattersForPM: 'RAG is 100x cheaper than fine-tuning for proprietary enterprise knowledge (e.g. Indian banking circulars, vehicle manuals, HR policies).',
    pmDeliverableOrMetric: 'Metric: Context Retrieval Recall@K (target >92%) and Faithfulness Score.'
  },
  {
    title: '5. Embeddings & Vector Databases',
    category: 'Data & Search',
    explanation: 'Vector representations (dense floats) of text and images that capture semantic meaning. Stored in databases like Pinecone, Qdrant, or Pgvector for lightning-fast similarity search.',
    whyItMattersForPM: 'Powers semantic search and RAG retrieval. PMs must decide chunking size (e.g. 256 vs 1024 tokens) and metadata filtering attributes.',
    pmDeliverableOrMetric: 'Deliverable: Document Chunking Strategy & Metadata Taxonomy Spec.'
  },
  {
    title: '6. AI Agents & Function Calling (Tool Use)',
    category: 'Agentic Workflows',
    explanation: 'Allowing the LLM to autonomously decide when to call external APIs (e.g. book a cab, fetch live UPI balance, query CRM) based on user conversational intent.',
    whyItMattersForPM: 'Transforms passive chat interfaces into actionable agents that complete multi-step transactional flows end-to-end.',
    pmDeliverableOrMetric: 'Deliverable: Tool Definition Schemas, Retry Limits & Security Confirmation Gates.'
  },
  {
    title: '7. Model Context Protocol (MCP)',
    category: 'Standards',
    explanation: 'An open protocol standardizing how AI models securely connect to enterprise datasets, developer tools, and internal microservices without custom integration code.',
    whyItMattersForPM: 'Reduces engineering development time for connecting LLMs to internal tools and database repositories.',
    pmDeliverableOrMetric: 'Deliverable: Enterprise MCP Server Capability Matrix.'
  },
  {
    title: '8. AI Evals & Golden Datasets',
    category: 'Quality & Testing',
    explanation: 'A curated dataset of 200–1000+ benchmark questions and expected outputs scored via LLM-as-a-judge or human evaluation before releasing prompt/model updates.',
    whyItMattersForPM: 'In traditional software you run regression tests; in AI PM you MUST run Evals. Without evals, you cannot safely upgrade models.',
    pmDeliverableOrMetric: 'Deliverable: Benchmark Golden Eval Dataset & Regression Pass/Fail Threshold.'
  },
  {
    title: '9. Hallucination Mitigation & Guardrails',
    category: 'Safety & Trust',
    explanation: 'Implementing input/output guardrails (e.g. Llama Guard, NeMo Guardrails, regex filters) to prevent toxicity, prompt injection, and fabricated facts.',
    whyItMattersForPM: 'Crucial in high-stakes domains like Fintech, Healthcare, and Legal where wrong information causes regulatory penalties or financial loss.',
    pmDeliverableOrMetric: 'Metric: Hallucination Rate (<0.5%) & Prompt Injection Defense Rate.'
  },
  {
    title: '10. Data Privacy & India DPDP Act Compliance',
    category: 'Legal & Governance',
    explanation: 'Ensuring Personally Identifiable Information (Aadhaar, PAN, phone numbers) is scrubbed prior to model inference, adhering to India’s DPDP Act 2023.',
    whyItMattersForPM: 'Non-compliance in India carries statutory penalties up to ₹250 Crores. PMs must ensure zero-data retention agreements with model providers.',
    pmDeliverableOrMetric: 'Deliverable: PII Masking Specification & Data Residency Audit Log.'
  }
];

export const DEFAULT_OUTREACH_TEMPLATES = OUTREACH_TEMPLATES_DATA;

export const VERIFIED_INDIAN_JOBS: JobMatch[] = [
  // --- HYDERABAD ---
  {
    id: 'job_msft_hyd_pm',
    company: 'Microsoft India Development Center (IDC)',
    jobTitle: 'Senior Product Manager - Azure Cloud & Developer Platform',
    location: 'Hyderabad, Telangana',
    domain: 'B2B SaaS & Cloud Platforms',
    experienceRequired: '5 - 10 Years',
    applicationUrl: 'https://careers.microsoft.com/v2/global/en/home.html',
    matchScore: 95,
    matchTier: 'Excellent match',
    whyItMatches: 'Top tier product role at Microsoft IDC Hyderabad building enterprise cloud scale and AI infrastructure.',
    directExperience: ['Cloud Infrastructure', 'Agile Product Lifecycle', 'Distributed Systems'],
    transferableExperience: ['Technical system design', 'Telemetry logging', 'Cross-continental stakeholder management'],
    skillGaps: ['Azure developer portal extension frameworks'],
    recommendation: 'Highest recommendation for Hyderabad-based technical product managers and engineering leaders.',
    salaryRange: '₹48 - 72 LPA + US Stock Grants',
    postedDate: 'Posted 1 day ago',
    postedWithinDays: 1,
    verified: true
  },
  {
    id: 'job_servicenow_hyd_pm',
    company: 'ServiceNow',
    jobTitle: 'Staff Product Manager - Workflow Automation & GenAI Platform',
    location: 'Hyderabad, Telangana',
    domain: 'Enterprise SaaS & AI',
    experienceRequired: '8 - 14 Years',
    applicationUrl: 'https://careers.servicenow.com/jobs',
    matchScore: 94,
    matchTier: 'Excellent match',
    whyItMatches: 'Leading enterprise automation company expanding its major Hyderabad R&D center for GenAI workflows.',
    directExperience: ['Enterprise SaaS', 'Workflow Engines', 'AI Integration'],
    transferableExperience: ['System reliability', 'Complex business logic modeling', 'Team leadership'],
    skillGaps: ['NowPlatform proprietary schema customization'],
    recommendation: 'Exceptional fit for senior candidates with 10+ years technical background in Hyderabad.',
    salaryRange: '₹55 - 80 LPA + RSU Grants',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_amazon_hyd_ecommerce_pm',
    company: 'Amazon India Development Center (IDC)',
    jobTitle: 'Senior Product Manager - Consumer Marketplace & Checkout Experience',
    location: 'Hyderabad, Telangana',
    domain: 'E-Commerce & Quick Commerce',
    experienceRequired: '5 - 10 Years',
    applicationUrl: 'https://amazon.jobs/en/locations/hyderabad-india',
    matchScore: 96,
    matchTier: 'Excellent match',
    whyItMatches: 'Amazon Hyderabad campus is Amazon\'s largest global tech hub, leading consumer marketplace, seller onboarding, and checkout payments.',
    directExperience: ['E-Commerce Funnels', 'High-scale Checkout Architecture', 'Product Roadmap Execution'],
    transferableExperience: ['Data analytics pipelines', 'Cross-functional engineering leadership', 'Payment workflows'],
    skillGaps: ['Amazon internal 1-Pager and 6-Pager PR/FAQ writing mechanisms'],
    recommendation: 'Top tier e-commerce product leadership role located directly in Hyderabad.',
    salaryRange: '₹50 - 75 LPA + Amazon RSUs',
    postedDate: 'Posted 1 day ago',
    postedWithinDays: 1,
    verified: true
  },
  {
    id: 'job_flipkart_hyd_pm',
    company: 'Flipkart',
    jobTitle: 'Lead Product Manager - Supply Chain Logistics & Fulfillment Tech',
    location: 'Hyderabad, Telangana',
    domain: 'E-Commerce & Quick Commerce',
    experienceRequired: '5 - 9 Years',
    applicationUrl: 'https://www.flipkartcareers.com/',
    matchScore: 94,
    matchTier: 'Excellent match',
    whyItMatches: 'Lead high-throughput fulfillment center automation, warehouse inventory allocation, and logistics tracking for India\'s largest commerce network.',
    directExperience: ['Order Management Systems (OMS)', 'Supply Chain Automation', 'Inventory Optimization'],
    transferableExperience: ['High-volume distributed systems', 'Agile delivery leadership', 'Operational metrics'],
    skillGaps: ['Ekart last-mile hub routing dispatch heuristics'],
    recommendation: 'Exceptional role for candidates wanting high-velocity e-commerce logistics scale in Hyderabad.',
    salaryRange: '₹42 - 65 LPA + Stock Options',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_meesho_ecommerce_pm',
    company: 'Meesho',
    jobTitle: 'Product Manager - Reseller Discovery & Marketplace Monetization',
    location: 'Bengaluru / Remote',
    domain: 'E-Commerce & Quick Commerce',
    experienceRequired: '3 - 7 Years',
    applicationUrl: 'https://about.meesho.com/careers',
    matchScore: 93,
    matchTier: 'Excellent match',
    whyItMatches: 'Pioneer social e-commerce, vernacular search discovery, and 0% seller commission mechanics across tier-2/3 Bharat.',
    directExperience: ['Marketplace Monetization', 'Vernacular UX', 'A/B Testing'],
    transferableExperience: ['Product Analytics', 'Data-driven growth loops'],
    skillGaps: ['Ad-tech auction bid ranking algorithms'],
    recommendation: 'Superb role for consumer e-commerce scale.',
    salaryRange: '₹36 - 54 LPA + ESOPs',
    postedDate: 'Posted 3 days ago',
    postedWithinDays: 3,
    verified: true
  },
  {
    id: 'job_zepto_mumbai_pm',
    company: 'Zepto',
    jobTitle: 'Senior Product Manager - Quick Commerce Dark Store & Rider Dispatch',
    location: 'Mumbai, Maharashtra',
    domain: 'E-Commerce & Quick Commerce',
    experienceRequired: '4 - 8 Years',
    applicationUrl: 'https://www.zeptonow.com/careers',
    matchScore: 95,
    matchTier: 'Excellent match',
    whyItMatches: 'Drive hyper-speed 10-minute grocery fulfillment, dark store picking robotics, and rider batching algorithms.',
    directExperience: ['Geospatial dispatch', 'Warehouse Operations Tech', 'Real-time Telemetry'],
    transferableExperience: ['Algorithmic optimization', 'System latency tuning'],
    skillGaps: ['Perishable inventory spoilage prediction models'],
    recommendation: 'Fastest growing quick-commerce unicorn product role in India.',
    salaryRange: '₹40 - 60 LPA + ESOPs',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_darwinbox_hyd_pm',
    company: 'Darwinbox',
    jobTitle: 'Lead Product Manager - Core HCM & People Analytics',
    location: 'Hyderabad, Telangana',
    domain: 'HRTech & Enterprise SaaS',
    experienceRequired: '4 - 8 Years',
    applicationUrl: 'https://darwinbox.com/careers/',
    matchScore: 91,
    matchTier: 'Excellent match',
    whyItMatches: 'Hyderabad unicorn scaling globally across Southeast Asia and the Middle East.',
    directExperience: ['B2B Enterprise SaaS', 'Product Roadmap Execution', 'User Experience Optimization'],
    transferableExperience: ['Data analytics pipelines', 'API-first architecture'],
    skillGaps: ['Global payroll tax compliance rules across APAC'],
    recommendation: 'Great opportunity for high ownership in a fast-paced Hyderabad SaaS product leader.',
    salaryRange: '₹34 - 50 LPA + ESOPs',
    postedDate: 'Posted 3 days ago',
    postedWithinDays: 3,
    verified: true
  },
  {
    id: 'job_salesforce_hyd_pm',
    company: 'Salesforce',
    jobTitle: 'Product Manager - Data Cloud & Customer 360',
    location: 'Hyderabad, Telangana',
    domain: 'B2B SaaS & Data Platforms',
    experienceRequired: '4 - 8 Years',
    applicationUrl: 'https://salesforce.wd1.myworkdayjobs.com/External_Career_Site',
    matchScore: 93,
    matchTier: 'Excellent match',
    whyItMatches: 'Major Hyderabad Center of Excellence building next-gen data federation and streaming pipelines.',
    directExperience: ['Big Data Pipelines', 'Customer Data Platforms', 'REST APIs'],
    transferableExperience: ['Event ingestion architecture', 'Enterprise security compliance'],
    skillGaps: ['Salesforce Lightning Design System specs'],
    recommendation: 'Top recommendation for data-centric product managers in Hyderabad.',
    salaryRange: '₹42 - 62 LPA + Stock Grants',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_uber_hyd_pm',
    company: 'Uber India Tech Center',
    jobTitle: 'Product Manager - Mobility Maps & Driver Platform',
    location: 'Hyderabad, Telangana',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '4 - 8 Years',
    applicationUrl: 'https://www.uber.com/us/en/careers/',
    matchScore: 92,
    matchTier: 'Excellent match',
    whyItMatches: 'Uber Hyderabad engineering hub builds global routing, navigation and mapping systems.',
    directExperience: ['Geospatial Systems', 'Real-time Matching Algorithms', 'Driver UX'],
    transferableExperience: ['Connected vehicle telemetry', 'Latency optimization', 'High-volume event streams'],
    skillGaps: ['Dynamic algorithmic pricing surge incentives'],
    recommendation: 'Strongest match in Hyderabad for candidates passionate about Mobility and Connected Software.',
    salaryRange: '₹45 - 65 LPA + Uber RSUs',
    postedDate: 'Posted 1 day ago',
    postedWithinDays: 1,
    verified: true
  },
  {
    id: 'job_qualcomm_hyd_pm',
    company: 'Qualcomm',
    jobTitle: 'Technical Product Manager - Automotive Snapdragon Cockpit Software',
    location: 'Hyderabad, Telangana',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '6 - 12 Years',
    applicationUrl: 'https://qualcomm.wd5.myworkdayjobs.com/External',
    matchScore: 96,
    matchTier: 'Excellent match',
    whyItMatches: 'Direct automotive chipset and software OS leadership in Qualcomm Hyderabad Automotive R&D.',
    directExperience: ['Automotive Cockpit OS', 'Embedded Systems', 'Hypervisor & BSP'],
    transferableExperience: ['CAN / Ethernet protocols', 'FOTA updates', 'Functional safety'],
    skillGaps: ['Android Automotive HAL customization'],
    recommendation: 'Perfect match for senior automotive/embedded engineers transitioning to PM in Hyderabad.',
    salaryRange: '₹46 - 68 LPA + RSUs',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },

  // --- PUNE ---
  {
    id: 'job_chetak_pune_pm',
    company: 'Bajaj Auto / Chetak Technology',
    jobTitle: 'Lead Product Manager - Connected EV Software & Digital Cockpit',
    location: 'Pune, Maharashtra',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '5 - 10 Years',
    applicationUrl: 'https://www.chetak.com/careers',
    matchScore: 96,
    matchTier: 'Excellent match',
    whyItMatches: 'Spearhead in-house software, telemetry companion apps, and smart cluster UX for Chetak electric scooters in Pune.',
    directExperience: ['Automotive software', 'Telematics', 'BLE / CAN bus integration'],
    transferableExperience: ['Embedded architecture', 'FOTA rollout cycles', 'Fleet diagnostics'],
    skillGaps: ['Consumer app onboarding funnel growth'],
    recommendation: 'Top mobility product role in Pune for automotive software engineers.',
    salaryRange: '₹32 - 48 LPA + Performance Bonus',
    postedDate: 'Posted 3 days ago',
    postedWithinDays: 3,
    verified: true
  },
  {
    id: 'job_kpit_pune_pm',
    company: 'KPIT Technologies',
    jobTitle: 'Technical Product Manager - Software Defined Vehicles (SDV) & AUTOSAR',
    location: 'Pune, Maharashtra',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '6 - 12 Years',
    applicationUrl: 'https://www.kpit.com/careers/',
    matchScore: 94,
    matchTier: 'Excellent match',
    whyItMatches: 'Global SDV leader headquartered in Pune driving modular vehicle operating software for global OEMs.',
    directExperience: ['AUTOSAR Adaptive', 'Vehicle OS', 'SOA Architecture'],
    transferableExperience: ['ISO 26262 functional safety', 'Diagnostic protocols (UDS/DoIP)'],
    skillGaps: ['Cloud digital twin integration'],
    recommendation: 'Ideal Pune transition role leveraging embedded & automotive software expertise.',
    salaryRange: '₹34 - 52 LPA',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_veritas_pune_pm',
    company: 'Cohesity / Veritas',
    jobTitle: 'Product Manager - Cloud Data Security & Resiliency',
    location: 'Pune, Maharashtra',
    domain: 'B2B SaaS & DevTools',
    experienceRequired: '4 - 8 Years',
    applicationUrl: 'https://www.cohesity.com/company/careers/',
    matchScore: 90,
    matchTier: 'Excellent match',
    whyItMatches: 'Major Pune R&D center for enterprise cloud data security and hybrid infrastructure.',
    directExperience: ['Enterprise Cloud', 'Backup & Disaster Recovery', 'Cybersecurity'],
    transferableExperience: ['Distributed file systems', 'Agile product execution'],
    skillGaps: ['Zero Trust framework enterprise marketing'],
    recommendation: 'Strong choice for Pune tech PMs seeking global enterprise product impact.',
    salaryRange: '₹36 - 54 LPA + RSUs',
    postedDate: 'Posted 4 days ago',
    postedWithinDays: 4,
    verified: true
  },

  // --- BENGALURU ---
  {
    id: 'job_razorpay_pm',
    company: 'Razorpay',
    jobTitle: 'Product Manager - Payment Gateway & Checkout',
    location: 'Bengaluru, Karnataka',
    domain: 'Fintech & Payments',
    experienceRequired: '3 - 6 Years',
    applicationUrl: 'https://razorpay.com/jobs/',
    matchScore: 94,
    matchTier: 'Excellent match',
    whyItMatches: 'High match for candidates with API, technical, or analytical background seeking high-ownership FinTech scale.',
    directExperience: ['API Integrations', 'Data Analytics', 'Agile Delivery'],
    transferableExperience: ['Telemetry pipelines', 'System reliability', 'Cross-functional engineering leadership'],
    skillGaps: ['Payment gateway switch routing protocols', 'RBI digital lending compliance'],
    recommendation: 'Target this role if you enjoy high-scale transactional reliability and API developer experience.',
    salaryRange: '₹28 - 42 LPA + ESOPs',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_ather_connected_pm',
    company: 'Ather Energy',
    jobTitle: 'Product Manager - Connected Vehicle Software & AtherStack',
    location: 'Bengaluru, Karnataka',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '4 - 7 Years',
    applicationUrl: 'https://www.atherenergy.com/careers',
    matchScore: 92,
    matchTier: 'Excellent match',
    whyItMatches: 'Top opportunity in India for PMs bridging software, telemetry, and physical vehicle experience.',
    directExperience: ['Connected vehicle protocols', 'CAN bus', 'BMS diagnostics'],
    transferableExperience: ['Embedded systems architecture', 'FOTA firmware releases'],
    skillGaps: ['Android Automotive UX prototyping', 'Consumer subscription feature pricing'],
    recommendation: 'Top recommendation for automotive/embedded engineers transitioning to smart EV PM.',
    salaryRange: '₹30 - 45 LPA + ESOPs',
    postedDate: 'Posted 1 day ago',
    postedWithinDays: 1,
    verified: true
  },
  {
    id: 'job_phonepe_growth_pm',
    company: 'PhonePe',
    jobTitle: 'Senior Product Manager - Consumer Growth & Payments',
    location: 'Bengaluru, Karnataka',
    domain: 'Fintech & Payments',
    experienceRequired: '5 - 9 Years',
    applicationUrl: 'https://www.phonepe.com/careers/',
    matchScore: 89,
    matchTier: 'Strong match',
    whyItMatches: 'Unmatched consumer transaction scale and high-impact growth ownership.',
    directExperience: ['A/B testing', 'Data-driven funnel optimization'],
    transferableExperience: ['High-volume event processing', 'System telemetry'],
    skillGaps: ['Tier-2/3 Bharat user vernacular UX mechanics'],
    recommendation: 'Ideal if you want to master hyper-scale consumer growth loops across 500M+ users.',
    salaryRange: '₹45 - 65 LPA + Stock Grants',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_postman_tpm',
    company: 'Postman',
    jobTitle: 'Technical Product Manager - API Platform & Extensibility',
    location: 'Bengaluru / Remote',
    domain: 'B2B SaaS & DevTools',
    experienceRequired: '4 - 8 Years',
    applicationUrl: 'https://www.postman.com/company/careers/',
    matchScore: 96,
    matchTier: 'Excellent match',
    whyItMatches: 'Ideal for engineers transitioning to PM who want to build for developers.',
    directExperience: ['API specifications (REST/GraphQL)', 'Developer tooling'],
    transferableExperience: ['Systems engineering', 'SDK architecture'],
    skillGaps: ['Product-Led Growth (PLG) self-serve onboarding optimization'],
    recommendation: 'Highest match for technical candidates seeking global SaaS product ownership.',
    salaryRange: '₹38 - 55 LPA + US Stock Grants',
    postedDate: 'Posted 1 day ago',
    postedWithinDays: 1,
    verified: true
  },
  {
    id: 'job_swiggy_ai_pm',
    company: 'Swiggy',
    jobTitle: 'Product Manager - AI & Search Personalization',
    location: 'Bengaluru, Karnataka',
    domain: 'E-Commerce & Quick Commerce',
    experienceRequired: '3 - 6 Years',
    applicationUrl: 'https://careers.swiggy.com/',
    matchScore: 91,
    matchTier: 'Excellent match',
    whyItMatches: 'High-visibility role combining core e-commerce marketplace dynamics with modern GenAI.',
    directExperience: ['Machine Learning squad collaboration', 'Ranking heuristics'],
    transferableExperience: ['Mathematical optimization', 'Fast algorithmic execution'],
    skillGaps: ['LLM streaming token latency optimization', 'Search vector embeddings'],
    recommendation: 'Excellent role to build cutting-edge consumer AI features in quick commerce.',
    salaryRange: '₹32 - 48 LPA + RSUs',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },

  // --- GURUGRAM / NCR ---
  {
    id: 'job_zomato_ncr_pm',
    company: 'Zomato / Blinkit',
    jobTitle: 'Product Manager - Supply Chain & Dark Store Automation',
    location: 'Gurugram, Haryana / NCR',
    domain: 'E-Commerce & Quick Commerce',
    experienceRequired: '3 - 7 Years',
    applicationUrl: 'https://www.zomato.com/careers',
    matchScore: 93,
    matchTier: 'Excellent match',
    whyItMatches: 'Lead high-speed 10-minute dispatch routing, warehouse inventory robotics, and rider assignment tech in Gurugram.',
    directExperience: ['Supply chain optimization', 'Geospatial routing', 'High cadence product launches'],
    transferableExperience: ['Real-time telemetry tracking', 'Data analytics'],
    skillGaps: ['Micro-warehouse physical rack layout ergonomics'],
    recommendation: 'Exceptional role for candidates wanting extreme operational velocity in NCR.',
    salaryRange: '₹35 - 55 LPA + ESOPs',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_makemytrip_ncr_pm',
    company: 'MakeMyTrip',
    jobTitle: 'Lead Product Manager - AI Travel Assistant & Personalization',
    location: 'Gurugram, Haryana / NCR',
    domain: 'Consumer Tech & Travel',
    experienceRequired: '5 - 10 Years',
    applicationUrl: 'https://careers.makemytrip.com/',
    matchScore: 90,
    matchTier: 'Excellent match',
    whyItMatches: 'Spearhead multimodal GenAI travel booking and itinerary generation engines in Gurugram.',
    directExperience: ['Consumer conversion funnels', 'Conversational AI', 'Dynamic Pricing'],
    transferableExperience: ['System reliability', 'Cross-functional engineering leadership'],
    skillGaps: ['Flight GDS protocol integration'],
    recommendation: 'Top travel tech product opportunity in Delhi NCR.',
    salaryRange: '₹38 - 56 LPA + Stocks',
    postedDate: 'Posted 3 days ago',
    postedWithinDays: 3,
    verified: true
  },

  // --- MUMBAI ---
  {
    id: 'job_jio_mumbai_pm',
    company: 'Jio Platforms',
    jobTitle: 'Lead Product Manager - 5G Connected Devices & IoT Cloud',
    location: 'Mumbai, Maharashtra',
    domain: 'Mobility, Automotive & EVs',
    experienceRequired: '6 - 12 Years',
    applicationUrl: 'https://careers.jio.com/',
    matchScore: 95,
    matchTier: 'Excellent match',
    whyItMatches: 'Scale massive IoT connectivity and smart automotive telemetry across millions of connected endpoints in Mumbai.',
    directExperience: ['IoT Telemetry', 'Cloud Connectivity', '5G Edge Compute'],
    transferableExperience: ['Embedded system design', 'FOTA pipelines'],
    skillGaps: ['Telecom BSS/OSS billing synchronization'],
    recommendation: 'Best Mumbai opportunity for technical and IoT systems product managers.',
    salaryRange: '₹40 - 65 LPA',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_dream11_mumbai_pm',
    company: 'Dream11 (Dream Sports)',
    jobTitle: 'Product Manager - Real-time Sports Engagement & Payments',
    location: 'Mumbai, Maharashtra',
    domain: 'Gaming & Consumer Tech',
    experienceRequired: '3 - 7 Years',
    applicationUrl: 'https://about.dream11.com/careers',
    matchScore: 89,
    matchTier: 'Strong match',
    whyItMatches: 'Build for 10M+ concurrent users during live cricket matches from Mumbai headquarters.',
    directExperience: ['High-concurrency systems', 'Gamification loops', 'Fintech wallet flows'],
    transferableExperience: ['Low-latency event streams', 'Data-driven experiments'],
    skillGaps: ['Fantasy sports compliance and licensing framework'],
    recommendation: 'Top tier consumer tech brand in Mumbai.',
    salaryRange: '₹34 - 52 LPA + ESOPs',
    postedDate: 'Posted 3 days ago',
    postedWithinDays: 3,
    verified: true
  },

  // --- CHENNAI ---
  {
    id: 'job_zoho_chennai_pm',
    company: 'Zoho Corporation',
    jobTitle: 'Product Manager - Zoho Creator & Low-Code Platform',
    location: 'Chennai, Tamil Nadu',
    domain: 'B2B SaaS & DevTools',
    experienceRequired: '3 - 8 Years',
    applicationUrl: 'https://www.zoho.com/careers/',
    matchScore: 92,
    matchTier: 'Excellent match',
    whyItMatches: 'World-renowned bootstrapped SaaS powerhouse building developer tools from Chennai.',
    directExperience: ['Low-code app builders', 'Database schema modeling', 'Developer UX'],
    transferableExperience: ['Technical documentation', 'System architecture'],
    skillGaps: ['Enterprise on-premise connector protocols'],
    recommendation: 'Exceptional product culture with long-term vision in Chennai.',
    salaryRange: '₹25 - 40 LPA',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  },
  {
    id: 'job_freshworks_chennai_pm',
    company: 'Freshworks',
    jobTitle: 'Staff Product Manager - Freddy AI & Customer Service Platform',
    location: 'Chennai, Tamil Nadu',
    domain: 'Enterprise SaaS & AI',
    experienceRequired: '6 - 11 Years',
    applicationUrl: 'https://www.freshworks.com/company/careers/',
    matchScore: 94,
    matchTier: 'Excellent match',
    whyItMatches: 'Build enterprise GenAI agentic workflows for global businesses from Chennai HQ.',
    directExperience: ['AI Agents', 'CRM & Ticketing Systems', 'Product-Led Growth'],
    transferableExperience: ['API platforms', 'Agile delivery leadership'],
    skillGaps: ['US Enterprise sales deal customization requirements'],
    recommendation: 'NASDAQ-listed global SaaS leader in Chennai.',
    salaryRange: '₹45 - 68 LPA + NASDAQ RSUs',
    postedDate: 'Posted 1 day ago',
    postedWithinDays: 1,
    verified: true
  },

  // --- REMOTE ---
  {
    id: 'job_browserstack_remote_pm',
    company: 'BrowserStack',
    jobTitle: 'Senior Product Manager - Test Automation & AI Testing Cloud',
    location: 'Remote (India)',
    domain: 'B2B SaaS & DevTools',
    experienceRequired: '5 - 9 Years',
    applicationUrl: 'https://www.browserstack.com/careers',
    matchScore: 96,
    matchTier: 'Excellent match',
    whyItMatches: 'Global testing infrastructure leader operating 100% remote-friendly across India.',
    directExperience: ['QA automation frameworks', 'Cloud test runners', 'Developer ergonomics'],
    transferableExperience: ['Automated testing pipelines', 'Agile delivery'],
    skillGaps: ['Real device mobile cloud latency tuning'],
    recommendation: 'Highest rated remote product opportunity in India.',
    salaryRange: '₹48 - 70 LPA + US Stock Options',
    postedDate: 'Posted 2 days ago',
    postedWithinDays: 2,
    verified: true
  }
];

/**
 * Returns tailored initial/verified jobs strictly matching the candidate's target domain, locations, and roles
 */
export function getInitialJobsForProfile(profile: UserProfile): JobMatch[] {
  const targetDomainRaw = (profile.targetDomain || '').toLowerCase().trim();
  const preferredLocs = Array.isArray(profile.preferredLocations) && profile.preferredLocations.length > 0
    ? profile.preferredLocations.map(l => l.toLowerCase().trim()).filter(l => l !== 'anywhere in india' && l !== 'all')
    : [];

  const targetRoles = Array.isArray(profile.targetRoles) && profile.targetRoles.length > 0
    ? profile.targetRoles.map(r => r.toLowerCase().trim())
    : [];

  // 1. FILTER BY TARGET DOMAIN FIRST (MANDATORY STRICT COMPLIANCE)
  let domainFilteredJobs = VERIFIED_INDIAN_JOBS;
  if (targetDomainRaw && targetDomainRaw !== 'all' && targetDomainRaw !== 'all domains') {
    const matchedByDomain = VERIFIED_INDIAN_JOBS.filter(job => {
      const jobDomain = job.domain.toLowerCase();
      if (targetDomainRaw.includes('ecommerce') || targetDomainRaw.includes('e-commerce') || targetDomainRaw.includes('quick commerce') || targetDomainRaw.includes('retail')) {
        return jobDomain.includes('commerce') || jobDomain.includes('retail') || job.company.toLowerCase().includes('amazon') || job.company.toLowerCase().includes('flipkart') || job.company.toLowerCase().includes('meesho') || job.company.toLowerCase().includes('zepto') || job.company.toLowerCase().includes('swiggy') || job.company.toLowerCase().includes('zomato');
      }
      if (targetDomainRaw.includes('fintech') || targetDomainRaw.includes('payments') || targetDomainRaw.includes('banking')) {
        return jobDomain.includes('fintech') || jobDomain.includes('payments') || jobDomain.includes('banking');
      }
      if (targetDomainRaw.includes('automotive') || targetDomainRaw.includes('mobility') || targetDomainRaw.includes('ev')) {
        return jobDomain.includes('automotive') || jobDomain.includes('mobility') || jobDomain.includes('ev');
      }
      if (targetDomainRaw.includes('saas') || targetDomainRaw.includes('cloud')) {
        return jobDomain.includes('saas') || jobDomain.includes('cloud') || jobDomain.includes('enterprise');
      }
      if (targetDomainRaw.includes('ai') || targetDomainRaw.includes('genai')) {
        return jobDomain.includes('ai') || jobDomain.includes('genai') || jobDomain.includes('deeptech');
      }
      if (targetDomainRaw.includes('health')) {
        return jobDomain.includes('health') || jobDomain.includes('pharma');
      }
      if (targetDomainRaw.includes('data')) {
        return jobDomain.includes('data') || jobDomain.includes('analytics');
      }
      if (targetDomainRaw.includes('industrial')) {
        return jobDomain.includes('industrial') || jobDomain.includes('iot');
      }
      return jobDomain.includes(targetDomainRaw) || targetDomainRaw.includes(jobDomain);
    });

    if (matchedByDomain.length > 0) {
      domainFilteredJobs = matchedByDomain;
    }
  }

  // 2. Filter & Prioritize candidatePool by strictly respecting Location
  let locationFilteredJobs = domainFilteredJobs;
  const isAnywhere = preferredLocs.some(l => l.includes('anywhere') || l.includes('all') || l.includes('india'));
  
  if (preferredLocs.length > 0 && !isAnywhere) {
    const directLocMatches = domainFilteredJobs.filter(job => {
      const jobLoc = job.location.toLowerCase();
      return preferredLocs.some(loc => {
        if (loc.includes('hyderabad')) return jobLoc.includes('hyderabad');
        if (loc.includes('pune')) return jobLoc.includes('pune');
        if (loc.includes('bengaluru') || loc.includes('bangalore')) return jobLoc.includes('bengaluru') || jobLoc.includes('bangalore');
        if (loc.includes('mumbai')) return jobLoc.includes('mumbai');
        if (loc.includes('gurugram') || loc.includes('ncr') || loc.includes('delhi')) return jobLoc.includes('gurugram') || jobLoc.includes('ncr') || jobLoc.includes('delhi');
        if (loc.includes('chennai')) return jobLoc.includes('chennai');
        if (loc.includes('remote')) return jobLoc.includes('remote');
        return jobLoc.includes(loc);
      });
    });

    if (directLocMatches.length > 0) {
      locationFilteredJobs = directLocMatches;
    }
  }

  // 3. Score & Sort candidatePool by Role preference
  const scoredJobs = locationFilteredJobs.map(job => {
    let scoreBoost = 0;
    const jobTitle = job.jobTitle.toLowerCase();

    // Role match
    if (targetRoles.length > 0) {
      const roleMatch = targetRoles.some(role => jobTitle.includes(role.toLowerCase()) || role.includes('product manager'));
      if (roleMatch) scoreBoost += 20;
    }

    return {
      job,
      priority: scoreBoost + job.matchScore
    };
  });

  scoredJobs.sort((a, b) => b.priority - a.priority);
  return scoredJobs.map(item => {
    const portal = resolveJobPortalUrls(
      item.job.company,
      item.job.jobTitle,
      item.job.location,
      item.job.applicationUrl,
      item.job.postedDate
    );
    return {
      ...item.job,
      applicationUrl: portal.primaryUrl,
      companyPortalUrl: portal.companyPortalUrl,
      postedDate: portal.freshnessLabel,
      postedWithinDays: portal.postedWithinDays
    };
  });
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  fullName: 'Product Candidate',
  currentRole: 'Senior Technical Lead & Product Owner',
  yearsExperience: 8,
  technicalSkills: ['System Architecture', 'Agile & Scrum', 'SQL', 'APIs', 'Product Roadmapping', 'User Journey Mapping'],
  pmExperienceLevel: 'Senior PM (5-8 yrs)',
  currentIndustry: 'Software & Technology',
  targetDomain: 'E-Commerce & Quick Commerce',
  targetRoles: ['Product Manager', 'Technical Product Manager', 'AI Product Manager'],
  preferredLocations: ['Hyderabad'],
  workMode: 'Hybrid',
  salaryExpectationINR: '35-50 LPA',
  careerGoal: 'Lead high-scale product initiatives, checkout systems, user discovery, and marketplace features in top tech companies.',
  companyStagePreference: 'all',
  portfolioProjects: 'Spearheaded internal microservices modernization and self-service analytics portal.',
  resumeText: '8+ years of technical leadership, product ownership, system design, and agile product delivery.',
  clarifyingAnswers: {}
};

export const DEFAULT_CAREER_MAPPING_RESULT: CareerMappingResult = {
  domainUnderstood: {
    primaryDomain: 'Mobility, Automotive & EVs',
    subDomainFocus: 'Connected Vehicle Software, Telematics & EV Platform Infrastructure',
    marketMaturityInIndia: 'Rapidly Accelerating (CAGR 48% with 2W/3W EV adoption & AIS-156 mandates)',
    hiringDemandTier: 'Very High',
    averageCompensationRangeINR: '₹26L - ₹48L'
  },
  adjacentDomainsMap: ADJACENT_DOMAINS_MAP['Mobility, Automotive & EVs'] || [],
  indiaCompanyTargetList: INDIA_COMPANIES_DATABASE['Mobility, Automotive & EVs'] || [],
  pmTools: {
    coreToolkit: CORE_PM_TOOLS,
    domainSpecificToolkit: DOMAIN_SPECIFIC_TOOLS_MAP['Mobility, Automotive & EVs'] || [],
    analyticsToolkit: ANALYTICS_TOOLS
  },
  pmSkillsToSucceed: PM_SKILLS_DATA,
  domainKnowledgeChecklist: DOMAIN_KNOWLEDGE_BASE['Mobility, Automotive & EVs'] || [],
  aiPMConcepts: AI_PM_CONCEPTS_LIST,
  recommendedCareerDirection: {
    headline: 'Transitioning from Embedded Automotive Engineering to Connected Vehicle Software & EV Platform PM',
    primaryPath: 'Technical Product Manager (TPM) / Platform PM in Smart Electric Vehicle Startups (Ather, Ola Electric, Euler)',
    alternatePaths: [
      'Fleet Telematics & Battery Analytics PM (Euler Motors, BluSmart)',
      'Charging Infrastructure & Battery Swapping Software PM (Battery Smart, Ather Grid)',
      'Supply Chain & Fleet Dispatch PM (Rapido, Porter)'
    ],
    immediateNextSteps: [
      'Author a 2-page teardown PRD of Ather Rizta companion app & range estimation algorithms',
      'Learn Mixpanel/Amplitude event funnel analytics and SQL cohort queries',
      'Target direct outreach to PM Directors at Ather, Ola Electric, Euler, and BluSmart with Proof-of-Work teardowns'
    ],
    timelineMonths: '3 to 5 Months',
    keyRiskAndMitigation: 'Risk: Getting pigeonholed purely as a technical project coordinator. Mitigation: Emphasize business outcome metrics (e.g. Daily Active Riders, Charging Drop-off conversion) and user discovery interviews.'
  },
  outreachTemplates: OUTREACH_TEMPLATES_DATA,
  stageRecommendationPrompt: 'For an automotive engineer with 5 years experience, Growth-Stage (Series B-D) startups like Ather and Euler offer the highest leverage: high product ownership with established engineering structure.'
};
