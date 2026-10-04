export type Project = {
  slug: string;
  name: string;
  shortName: string;
  category:
    | 'Sports engineering'
    | 'Backend systems'
    | 'Data engineering'
    | 'Applied AI';
  status: 'In development' | 'Local MVP' | 'Research prototype';
  year: string;
  summary: string;
  intro: string;
  audience: string;
  repo: string;
  tags: string[];
  data: string;
  flow: { title: string; detail: string }[];
  decisions: { title: string; text: string }[];
  validation: string[];
  results: string[];
  limitations: string[];
  sources: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: 'nfl-opponent-intelligence',
    name: 'NFL Opponent Intelligence Platform',
    shortName: 'NFL Opponent Intelligence',
    category: 'Sports engineering',
    status: 'In development',
    year: '2026',
    summary:
      'Reproducible opponent tendency reports with explicit provenance, sample sizes, and historical cutoffs.',
    intro:
      'An analyst preparing for an opponent needs to know how a team behaves in comparable situations—and whether the sample is large enough to trust. The current implementation establishes the reporting and data contracts for that question.',
    audience:
      'Football analysts preparing an opponent brief. This is an independent portfolio project; it is not affiliated with an NFL team.',
    repo: 'https://github.com/AryanParte/nfl-opponent-intelligence',
    tags: ['Python', 'nflverse', 'Play-by-play', 'Reproducible analytics'],
    data: 'The acquisition workflow pins a 2024 nflverse play-by-play archive, checks published and decoded hashes, and writes a source manifest. A small synthetic CSV fixture supports the offline demo; its numbers are illustrative, not NFL observations.',
    flow: [
      {
        title: 'Acquire & verify',
        detail:
          'Pin the raw snapshot, hash it, and preserve the source manifest.',
      },
      {
        title: 'Validate & adapt',
        detail:
          'Check row identities, play types, missingness, and eligible coverage.',
      },
      {
        title: 'Select a historical cohort',
        detail:
          'Apply team, role, season, week cutoff, and optional pre-play situation filters.',
      },
      {
        title: 'Compute the report',
        detail:
          'Return play-call tendencies, EPA summaries, sample sizes, and exclusion accounting as JSON.',
      },
    ],
    decisions: [
      {
        title: 'Time comes first',
        text: 'A before-week cutoff excludes the week being prepared for and later games. That keeps a report from quietly using future information.',
      },
      {
        title: 'Definitions stay visible',
        text: 'Dropbacks include sacks and scrambles; missing EPA remains in the play-call denominator. Offense and defense views keep EPA offense-relative.',
      },
      {
        title: 'Missing context is accounted for',
        text: 'Field position, score, period, and clock filters are applied in a fixed order. Each stage reports missing and outside-range exclusions rather than silently shrinking the sample.',
      },
    ],
    validation: [
      'The repository documents 130 offline tests across acquisition, adapters, filters, metric definitions, and command-line behavior as of October 4, 2026.',
      'A pinned real-season audit reconciles eligible identities and fields against the raw 2024 source; the synthetic fixture provides hand-checkable report totals.',
      'The repository separates the verified raw snapshot from committed code and records replay instructions in its evidence documents.',
    ],
    results: [
      'A working CSV or pinned-snapshot to JSON reporting pipeline supports offensive and defensive tendencies with contextual filters.',
      'The 2024 source audit and cohort reconciliations establish data and measurement evidence. This is not yet a validated scouting conclusion or forecast.',
    ],
    limitations: [
      'Matched league baselines, uncertainty estimates, opponent adjustment, and a finished brief are still on the roadmap.',
      'There is no deployed API, web interface, database, or trained predictive model yet.',
      'A descriptive tendency can be unstable in a small or selected cohort; the report keeps denominators visible for that reason.',
    ],
    sources: [
      {
        label: 'Repository and runnable demo',
        url: 'https://github.com/AryanParte/nfl-opponent-intelligence',
      },
      {
        label: 'Data provenance',
        url: 'https://github.com/AryanParte/nfl-opponent-intelligence/blob/main/docs/INGESTION.md',
      },
      {
        label: 'Metric definitions',
        url: 'https://github.com/AryanParte/nfl-opponent-intelligence/blob/main/docs/METRICS.md',
      },
      {
        label: 'Audit evidence',
        url: 'https://github.com/AryanParte/nfl-opponent-intelligence/blob/main/docs/REAL_DATA_AUDIT.md',
      },
    ],
  },
  {
    slug: 'api-integration-hub',
    name: 'API Integration Hub & Notification Service',
    shortName: 'API Integration Hub',
    category: 'Backend systems',
    status: 'Local MVP',
    year: '2026',
    summary:
      'A local integration gateway built around idempotent webhooks, durable queueing, retries, and auditability.',
    intro:
      'Third-party events can be duplicated, delayed, or fail partway through processing. This project treats those cases as the core design problem: it provides a consistent REST contract and an operational trail from webhook receipt through notification delivery.',
    audience:
      'Developers integrating external providers and operators tracing failed or retried events.',
    repo: 'https://github.com/AryanParte/API-Integration-Hub-Notification-Service',
    tags: ['TypeScript', 'Express', 'PostgreSQL', 'Docker', 'CI'],
    data: 'The local demo uses deterministic mock CRM and messaging providers plus seeded PostgreSQL records. It does not claim production traffic or real email delivery.',
    flow: [
      {
        title: 'Receive',
        detail:
          'Authenticate, validate, rate-limit, and normalize API requests or webhook payloads.',
      },
      {
        title: 'Reserve once',
        detail:
          'Store a client-scoped idempotency key, receipt, queue item, and audit record transactionally.',
      },
      {
        title: 'Process safely',
        detail:
          'Workers claim PostgreSQL rows with FOR UPDATE SKIP LOCKED and recover stale locks.',
      },
      {
        title: 'Deliver or dead-letter',
        detail:
          'Record immutable attempts, retry transient failures, and retain exhausted events for replay.',
      },
    ],
    decisions: [
      {
        title: 'PostgreSQL as the queue',
        text: 'For a local MVP, transactions and row locks provide durable work claims without another service. A dedicated broker would be a later choice at different scale or ordering requirements.',
      },
      {
        title: 'Idempotency is transactional',
        text: 'The receipt and work item are reserved with the key. Identical retries replay the original response; a changed payload with the same key returns a conflict.',
      },
      {
        title: 'One worker core, two runtimes',
        text: 'The local polling worker and Lambda-compatible handler call the same batch processor. The cloud boundary is implemented, but no AWS deployment is claimed.',
      },
    ],
    validation: [
      'The repository includes unit and HTTP contract tests, four real-database primary-workflow integration tests, and a three-job GitHub Actions workflow.',
      'A local demo exercises provider execution, webhook replay, deliberate retry, notification attempt history, and audit records.',
    ],
    results: [
      'A containerized local system exposes integration, event, notification, audit, and dead-letter APIs.',
      'The implementation records retries and terminal failures so an operator can inspect what happened to an event.',
    ],
    limitations: [
      'Provider and delivery adapters are local simulations; no external CRM or email provider is connected.',
      'Rate limiting is process-local. Multiple API instances would require shared coordination.',
      'There is no user-facing operations dashboard or cloud deployment.',
    ],
    sources: [
      {
        label: 'Repository and demo',
        url: 'https://github.com/AryanParte/API-Integration-Hub-Notification-Service',
      },
      {
        label: 'Architecture and tradeoffs',
        url: 'https://github.com/AryanParte/API-Integration-Hub-Notification-Service/blob/main/docs/ARCHITECTURE.md',
      },
      {
        label: 'API contract',
        url: 'https://github.com/AryanParte/API-Integration-Hub-Notification-Service/blob/main/openapi.yaml',
      },
    ],
  },
  {
    slug: 'investment-portfolio-analytics',
    name: 'Investment Portfolio Analytics Platform',
    shortName: 'Investment Analytics Platform',
    category: 'Data engineering',
    status: 'Local MVP',
    year: '2026',
    summary:
      'A distributed local stack that moves synthetic transactions through services, analytics, and a dashboard.',
    intro:
      'A portfolio dashboard is only useful if transaction state, market prices, and risk calculations agree. This project joins those layers in a local distributed MVP and documents both the system boundaries and measured workload.',
    audience:
      'Engineers evaluating event-driven data flows and users exploring a simulated investment portfolio.',
    repo: 'https://github.com/AryanParte/Investment-Portfolio-Analytics-Platform',
    tags: ['Java', 'Spring Boot', 'Kafka', 'Python', 'PostgreSQL', 'React'],
    data: 'Every portfolio, security, transaction, and price is synthetic. A deterministic generator created the million-transaction local dataset; those rows were not all streamed through Kafka.',
    flow: [
      {
        title: 'Process transactions',
        detail:
          'Spring Boot services maintain portfolio state and publish transaction or price events.',
      },
      {
        title: 'Move events',
        detail: 'Kafka topics connect service changes to downstream analytics.',
      },
      {
        title: 'Compute analytics',
        detail:
          'Python services calculate valuation, returns, volatility, Sharpe ratio, and drawdown.',
      },
      {
        title: 'Present the result',
        detail:
          'A React dashboard displays holdings, performance, risk, and recent activity.',
      },
    ],
    decisions: [
      {
        title: 'Separate state and analytics',
        text: 'The Java services own transactions and prices; Python handles portfolio calculations. This keeps accounting behavior distinct from analytical queries.',
      },
      {
        title: 'Measure the query path',
        text: 'The repository compares raw 30-day valuation reconstruction against an indexed aggregate lookup on the synthetic local dataset.',
      },
      {
        title: 'Reproducible environment',
        text: 'Docker Compose runs the complete stack; Kubernetes resources are packaged and validated structurally rather than presented as a live cluster deployment.',
      },
    ],
    validation: [
      'Repository documentation records exactly 1,000,000 generated transactions, 10,000 securities, and 130,000 market prices in the local workload.',
      'Database-only query evidence records a 26,813.207 ms mean raw reconstruction and a 0.024 ms mean indexed aggregate lookup. These are different query strategies on synthetic data.',
      'One local load report records 700 successful responses at concurrency 700 with 1,173.890 ms p95 latency. It is not an availability claim.',
    ],
    results: [
      'The local MVP connects transaction processing, event publication, analytics APIs, and a working dashboard.',
      'The measured query comparison shows the value of pre-aggregated lookups for this specific local workload.',
    ],
    limitations: [
      'The data and measurements are synthetic and local, measured on an Apple M3 with 16 GB of memory.',
      'The million generated rows were inserted through the data generator, not all through Kafka.',
      'Kubernetes manifests were validated but not applied to a live cluster; there is no production uptime measurement.',
    ],
    sources: [
      {
        label: 'Repository and local quick start',
        url: 'https://github.com/AryanParte/Investment-Portfolio-Analytics-Platform',
      },
      {
        label: 'Benchmark methodology',
        url: 'https://github.com/AryanParte/Investment-Portfolio-Analytics-Platform/blob/main/docs/benchmarking.md',
      },
      {
        label: 'Load test evidence',
        url: 'https://github.com/AryanParte/Investment-Portfolio-Analytics-Platform/blob/main/docs/load-testing.md',
      },
      {
        label: 'Claims and evidence',
        url: 'https://github.com/AryanParte/Investment-Portfolio-Analytics-Platform/blob/main/docs/resume-evidence.md',
      },
    ],
  },
  {
    slug: 'textbookgen',
    name: 'TextbookGen',
    shortName: 'TextbookGen',
    category: 'Applied AI',
    status: 'Research prototype',
    year: '2025',
    summary:
      'An AI textbook generation prototype with a React interface and incremental progress updates.',
    intro:
      'Long-form generation creates a product problem beyond prompting a model: users need an outline, visible progress, and a way to inspect partial results. This repository explores that workflow through a client application and a generation function.',
    audience: 'A learner creating a draft textbook from a topic prompt.',
    repo: 'https://github.com/AryanParte/TextbookGen',
    tags: ['React', 'TypeScript', 'Supabase', 'OpenAI API'],
    data: 'The user provides a topic prompt. The edge function asks an OpenAI model for a structured outline and chapter content, then stores textbook, chapter, and section records in Supabase.',
    flow: [
      {
        title: 'Describe the topic',
        detail:
          'A user submits a prompt and chapter count through the React interface.',
      },
      {
        title: 'Create the outline',
        detail:
          'A server function requests structured chapter and section headings.',
      },
      {
        title: 'Generate sections',
        detail:
          'The function creates and stores textbook sections incrementally.',
      },
      {
        title: 'Show progress',
        detail:
          'Supabase change subscriptions update partial content and completion state in the UI.',
      },
    ],
    decisions: [
      {
        title: 'Progress is part of the interface',
        text: 'The client listens for stored status and section changes, so the user can inspect a partial draft instead of waiting for a single large response.',
      },
      {
        title: 'Keep model calls server-side',
        text: 'The generation function reads its API key from server environment variables rather than embedding it in the client.',
      },
    ],
    validation: [
      'Repository inspection confirms the React progress hook, Supabase subscriptions, and generation function in source.',
      'The repository does not provide a documented accuracy evaluation, publication workflow, or production usage evidence.',
    ],
    results: [
      'An implemented interface and generation flow demonstrate a multi-step applied AI product pattern.',
    ],
    limitations: [
      'Generated material requires human review for factual accuracy, attribution, and instructional quality.',
      'The repository README is still starter documentation, so deployment and reliability claims are intentionally omitted.',
      'This is presented as a prototype; no usage, learning-outcome, or model-quality metrics are claimed.',
    ],
    sources: [
      {
        label: 'Repository source',
        url: 'https://github.com/AryanParte/TextbookGen',
      },
      {
        label: 'Generation function',
        url: 'https://github.com/AryanParte/TextbookGen/blob/main/supabase/functions/generate-textbook/index.ts',
      },
      {
        label: 'Progress hook',
        url: 'https://github.com/AryanParte/TextbookGen/blob/main/src/hooks/useTextbookGeneration.ts',
      },
    ],
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, Project>;

export const sportsRoadmap = [
  {
    stage: 'IN THE ROADMAP',
    title: 'Broader NFL analysis',
    detail:
      'Matched baselines, uncertainty, and richer football questions after the reporting foundation.',
  },
  {
    stage: 'FUTURE DIRECTION',
    title: 'Basketball data products',
    detail:
      'NBA engineering and applied ML work will join this collection as it exists.',
  },
] as const;
