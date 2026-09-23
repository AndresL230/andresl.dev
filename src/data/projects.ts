export type Project = {
  slug: string
  name: string
  year: string
  award: string | null
  tagline: string
  desc: string
  img?: string
  cover?: string
  gallery?: { src: string; caption: string }[]
  tech: string[]
  url?: string
  live?: string
  devpost?: string
  problem: string
  solution: string
  deepDive: string[]
  role?: string
}

export const projects: Project[] = [
  {
    slug: 'recost',
    name: 'Recost',
    year: '2026',
    award: 'Best Web API · Stripe Track · HackIllinois (as EcoAPI)',
    tagline: 'Real-time visibility into what your API calls actually cost, down to the code level.',
    desc: 'API cost intelligence platform with runtime SDKs, a VS Code extension, and an MCP server.',
    img: '/images/recost.png',
    cover: '/images/recost.png',
    gallery: [
      { src: '/images/recost_dash.png', caption: 'Recost · dashboard view' },
    ],
    tech: [
      'Cloudflare Workers',
      'Hono',
      'D1',
      'Durable Objects',
      'KV',
      'Cloudflare Pages',
      'React',
      'Vite',
      'Tree-sitter',
      'Node.js',
      'Python',
      'Google OAuth',
    ],
    url: 'https://github.com/orgs/recost-dev/',
    live: 'https://recost.dev',
    devpost: 'https://devpost.com/software/ecoapi',
    role: 'co-founder · technical',
    problem:
      "Engineering teams have no visibility into what their third-party API calls actually cost at the code level. Cloud cost tools stop at infrastructure. They never reach the individual API request that's silently inflating the bill.",
    solution:
      'Recost is an API cost intelligence platform: runtime SDKs in Python and Node.js intercept HTTP calls to capture cost and latency telemetry, a VS Code extension statically analyzes codebases for cost patterns, and a web dashboard plus MCP server tie it all together.',
    deepDive: [
      'Serverless backend: 30+ REST endpoints on Cloudflare Workers with Hono, D1 for storage, KV-based rate limiting, and Durable Objects powering the MCP server.',
      'VS Code extension uses web-tree-sitter AST parsing across JS/TS/Python to detect N+1 hotspots, batch and cache opportunities, call frequency patterns, and cross-file origins, with a built-in cost simulator.',
      'Node.js and Python SDKs intercept outbound HTTP at runtime to capture cost and latency telemetry across 8+ providers, with middleware support for Express, FastAPI, and Flask.',
      'Originally shipped as EcoAPI at HackIllinois 2026 (won Stripe Best Web API), then rebranded to Recost and rebuilt from a hackathon prototype into a full product with SDKs, IDE tooling, an MCP server, and a docs site.',
    ],
  },
  {
    slug: 'canopy',
    name: 'Canopy',
    year: '2026',
    award: null,
    tagline: 'Agents can write to the team memory. Only a human can publish it.',
    desc: 'The team’s working memory for building with coding agents: docs, decisions, a ticket queue, the roadmap, and a live picture of the repo. One Cloudflare Worker serves the HTTP API, an MCP endpoint, a GitHub webhook, and a SPA, with an idempotent gate between the agents and anything published.',
    img: '/images/canopy.png',
    cover: '/images/canopy.png',
    gallery: [
      { src: '/images/canopy_repo.png', caption: 'Canopy · repo dashboard, both environments with deploys, CI on head, health, and drift (sample data)' },
      { src: '/images/canopy_sprint.png', caption: 'Canopy · a sprint: its tickets, live progress, and every linked resource' },
      { src: '/images/canopy_review.png', caption: 'Canopy · review queue, an agent’s staged doc edit as a diff waiting on a human' },
      { src: '/images/canopy_search.png', caption: 'Canopy · ranked FTS5 retrieval, every hit flagged live or staged' },
    ],
    tech: [
      'TypeScript',
      'Cloudflare Workers',
      'D1',
      'Hono',
      'Model Context Protocol',
      'SQLite FTS5',
      'GitHub webhooks',
      'Cron Triggers',
      'Zod',
      'Vite',
      'Vitest',
    ],
    url: 'https://github.com/SaplingLearn/canopy',
    role: 'solo · 479 of 496 commits',
    problem:
      "A four-person team shipping with coding agents kept losing the same context. Decisions lived in closed PR threads, architecture notes drifted from the code, and every new agent session started from zero, re-deriving what had already been settled. The work itself was scattered too: requests in DMs, the plan in a doc nobody opened, deploy state in three dashboards. Letting agents write to a shared store fixes the amnesia and creates a worse problem: nothing an LLM produces is trustworthy enough to publish unreviewed.",
    solution:
      'Canopy is that shared store, grown into the place the team actually works. Agents read assembled context through an MCP endpoint and propose changes back through the same endpoint; every proposed write lands staged, and a human promotes, rejects, or routes it from the web UI. Around that core sit a ticket queue with sprints, an authored roadmap whose progress is computed from real tickets, a personal My Work view, a five-tab dashboard over the product repo, and email digests. Agents produce, humans confirm, enforced by the architecture rather than by convention.',
    deepDive: [
      'One Worker, four surfaces off one origin: a Hono JSON API, a stateless MCP endpoint at /mcp built on the MCP TypeScript SDK, an HMAC-verified GitHub webhook, and the SPA served through the ASSETS binding, plus a scheduled() handler for the crons. D1 is the only datastore, across 27 migrations. No KV, no Durable Objects, no external search service.',
      'One write gate that every agent write funnels through regardless of entry point. A replay ledger keyed on (session_id, item_index) drops a re-POSTed payload; SHA-256 content hashes drop no-op edits; an LCS line diff types the rest as edit or rewrite at a 0.5 changed-over-max threshold; low confidence on a new slug routes to a human triage queue instead of the doc tree. Every confirm verb is a session-cookie route and is deliberately never an MCP tool.',
      '26 MCP tools, built per request against the authenticated principal, so admin-only tools are absent from tools/list for everyone else rather than failing at call time. Agents can work tickets, but only inside their person’s lane: a write is allowed only if the caller is already an assignee, an unknown id is not_found before the check so it is never an existence oracle, and assignment itself has no MCP counterpart. Nothing ever infers a resolution: a merged PR never closes a ticket, and a sprint is only done when a person says so.',
      'The repo dashboard never calls GitHub at render time. Webhook deliveries, a six-hourly reconcile, and a ten-minute cron capture everything into D1, with the cron spreading one heavy job per tick to stay under Cloudflare’s 50-subrequest cap. Every section is ok, empty, or not_connected, never a guessed zero: a week-over-week delta only appears once capture predates the window, and a metric point is validated before it is written, because points are first-write-wins forever.',
      'Retrieval is five FTS5 virtual tables with trigger-maintained indexes and bm25 weighted 5x toward titles, with query tokens sanitized and phrase-quoted so FTS5 operators cannot be injected. Every result carries an authority flag (live, staged_pending, unpromoted, draft) so an agent can tell settled context from an unreviewed proposal.',
      '1,750 tests across 120 files run against a real Miniflare D1, proving replay-safety at the reconciler, the HTTP route, and the MCP tool, and pinning the sidebar’s DOM shape so its animations survive rerenders. Ships as a Claude Code plugin: seven skills that run an orient → work → record loop, plus auto-wired MCP config, installable from a marketplace manifest in the repo.',
    ],
  },
  {
    slug: 'calyx',
    name: 'Calyx',
    year: '2026',
    award: null,
    tagline: 'Four data streams, one timeline, so EMTs don\u2019t have to relive the call to write the report.',
    desc: 'Multi-agent system that reconstructs EMS calls from four data streams into a structured after-action report with a 3D replay.',
    img: '/images/calyx.jpg',
    cover: '/images/calyx.jpg',
    tech: ['Python', 'TypeScript', 'Next.js', 'Mapbox', 'Deck.gl', 'Multi-agent LLMs'],
    url: 'https://github.com/Asyboi/emt',
    devpost: 'https://devpost.com/software/emt-tool',
    role: 'agentic systems + 3d replay · la hacks 2026',
    problem:
      'After every call, EMTs reconstruct the entire incident from memory plus body-cam video, dispatch audio, CAD logs, and the patient care report. The process is slow, cognitively heavy, and forces responders to repeatedly relive traumatic moments, which is a documented contributor to burnout and PTSD.',
    solution:
      'Calyx is a multi-agent system. Specialized agents pull events from four streams of the same EMS call (PCR, body-cam video, dispatch audio, CAD logs) in parallel, an orchestrator clusters the events that describe the same real-world action across sources, and a critic agent escalates only the messy clusters to stronger models. The whole pipeline collapses into one timestamped timeline, a QI report, and a 3D ambulance replay you can scrub through.',
    deepDive: [
      'Each modality gets its own agent. The PCR agent extracts clinical actions, the video agent picks out visible interventions, the audio agent parses dispatch and radio events, and the CAD parser anchors timestamps. They all run in parallel and emit into a shared event format.',
      'An orchestrator agent clusters events that refer to the same real-world action across sources. A critic agent then decides which clusters are too uncertain to trust, and only those get escalated to a stronger model. The system stays cheap when it can and gets smart when it has to.',
      'Validated clusters assemble into a canonical timeline. Downstream agents take that timeline and produce clinical assessments, documentation scoring, and a final QI determination. Deterministic rules guard the high-stakes outputs so a hallucination can\u2019t make it into the final report.',
      'A 3D ambulance replay built on Mapbox and Deck.gl snaps every event to the nearest GPS point on the actual route. A ScenegraphLayer ambulance drives the timeline forward, and severity markers pop in at the exact moments they happened in space and time.',
    ],
  },
  {
    slug: 'sapling',
    name: 'Sapling',
    year: '2026',
    award: 'AI Tutor Track Winner · CivicHacks BU',
    tagline: 'A study companion that watches your understanding grow, concept by concept.',
    desc: 'AI study platform with a live knowledge graph, adaptive quizzing, and three teaching modes.',
    img: '/images/sapling.png',
    cover: '/images/sapling.png',
    gallery: [
      { src: '/images/sapling_dash.png', caption: 'Sapling · live knowledge graph' },
    ],
    tech: [
      'Next.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'Supabase',
      'Google Gemini',
      'D3.js',
    ],
    url: 'https://github.com/SaplingLearn/Sapling',
    live: 'https://saplinglearn.com',
    devpost: 'https://devpost.com/software/sapling-f3wy8k',
    role: 'frontend lead + ai integration',
    problem:
      "Students lack an adaptive study tool that connects to their actual course content and identifies their specific knowledge gaps. Static materials don't track what someone actually understands or struggles with.",
    solution:
      'Sapling is an AI study platform with three teaching modes (Socratic, Expository, TeachBack), adaptive quiz generation that targets weakest concepts, AI flashcards with spaced-repetition scoring, a live knowledge graph, collaborative study rooms, and syllabus parsing.',
    deepDive: [
      'Next.js frontend, FastAPI backend, and Supabase for auth and database, with a three-layer RAG context system powered by Google Gemini for adaptive content generation.',
      'D3.js renders a live knowledge graph that updates mastery scores after every session and quiz so progress is visible, not just felt.',
      'Real-time chat study rooms, syllabus extraction for assignment tracking, and document processing pipelines that turn uploads into study guides.',
      'Post-hackathon: migrated auth to Google OAuth, normalized the schema (course_name strings → course_id FKs), imported 4,438 BU courses from CSV, and migrated to Cloudflare Pages and Workers.',
    ],
  },
  {
    slug: 'eyrie',
    name: 'Eyrie',
    year: '2025',
    award: 'Best Use of Cloudflare · HackHarvard',
    tagline: 'A drone, computer vision, and a few critical minutes of early warning.',
    desc: 'Real-time crowd monitoring from aerial feeds with WebRTC streaming and YOLOv8 detection.',
    img: '/images/eyrie.png',
    cover: '/images/eyrie.png',
    tech: ['Python', 'YOLOv8', 'WebRTC', 'aiortc', 'FastAPI', 'Next.js', 'Cloudflare', 'OpenCV', 'PyTorch'],
    url: 'https://github.com/treehill05/eyrie',
    devpost: 'https://devpost.com/software/eyrie-idxhj8',
    role: 'backend lead · 3-person team',
    problem:
      "Real-time crowd monitoring from aerial feeds lacks accessible, low-latency detection and density analysis. Crowd-crush events at concerts, festivals, and gatherings still kill hundreds every year because warnings arrive too late.",
    solution:
      'Eyrie processes live drone video feeds through WebRTC streaming with YOLOv8 object detection and Gaussian kernel density analysis, surfacing predictive crowd alerts before risk thresholds are hit.',
    deepDive: [
      'Processed 300+ video frames per hour through WebRTC streaming with YOLOv8 person detection and bounding box overlays.',
      'Gaussian kernel density estimation calculates spatial crowd density with normalized coordinates for predictive alerting.',
      'Scalable WebRTC architecture with aiortc handles multiple simultaneous drone feeds without buckling under concurrent load.',
      'Multithreaded video processing reduced detection latency to under 100ms with 85% accuracy on test footage.',
    ],
  },
  {
    slug: 'noogie',
    name: 'noogie',
    year: '2025',
    award: 'Best Design · PennApps XXVI',
    tagline: 'One headline, many sources. The full picture, not a single outlet.',
    desc: 'News aggregation platform that uses NLP clustering to group related stories across sources.',
    img: '/images/noogie.png',
    cover: '/images/noogie.png',
    tech: ['TypeScript', 'React', 'D3.js', 'Python', 'Flask', 'OpenAI GPT-4o', 'Supabase', 'FAISS', 'NLP'],
    url: 'https://github.com/ruslannnn2/noogie',
    devpost: 'https://devpost.com/software/noogie',
    role: 'ml + data viz',
    problem:
      "Keeping up with news across sources is overwhelming, and readers can't see how stories connect. Coverage is fragmented across outlets, each with their own framing.",
    solution:
      'noogie collects articles from many sources, deduplicates them with sentence embeddings and FAISS vector indexing, clusters related stories, and generates AI-powered summaries that surface patterns instead of isolated headlines.',
    deepDive: [
      'Sentence-transformer embeddings fed into FAISS for sub-millisecond similarity search across thousands of articles.',
      'Unsupervised clustering groups articles by topic without predefined categories.',
      'OpenAI GPT-4o generates cluster headlines that capture the shared narrative across sources.',
      'D3.js node-cluster visualization lets users explore story connections interactively.',
    ],
  },
  {
    slug: 'etl-pipeline',
    name: 'Data ETL Pipeline',
    year: '2025',
    award: null,
    tagline: 'Daily OHLCV data, seven indicators, one TimescaleDB hypertable, two ways to query it.',
    desc: 'Personal ETL pipeline that pulls daily stock data from Alpha Vantage, computes financial indicators in pandas, and lands it in TimescaleDB with FastAPI and Streamlit on top.',
    img: '/images/etl-pipeline.svg',
    cover: '/images/etl-pipeline.svg',
    tech: ['Python', 'TimescaleDB', 'Pandas', 'FastAPI', 'Streamlit', 'Docker', 'Alpha Vantage'],
    url: 'https://github.com/AndresL230/etl-pipeline',
    role: 'solo',
    problem:
      'I wanted a real time-series warehouse for daily stock data, with computed indicators ready to query, instead of pulling Alpha Vantage by hand and recomputing SMA / RSI / MACD every time I opened a notebook.',
    solution:
      'A Python pipeline that pulls daily OHLCV from Alpha Vantage, runs seven pandas-based indicators (returns, SMA, EMA, RSI, Bollinger, MACD, volatility), and loads everything into a TimescaleDB hypertable. A FastAPI service and a Streamlit dashboard sit on top for queries and observability.',
    deepDive: [
      'AlphaVantage_Extractor pulls TIME_SERIES_DAILY for a configurable symbol set (default AAPL / GOOGL / MSFT) with a 1.2s rate-limit gap, then hands a pandas DataFrame to the transformer.',
      'apply_transformations() runs grouped rolling and EWM math per symbol to produce daily returns, SMA (7/20/50), EMA (12/26), RSI (14), Bollinger Bands, MACD (12/26/9), and rolling volatility.',
      'TimescaleDB hypertable partitioned on timestamp stores the enriched price data, with composite indexes on (symbol, timestamp DESC). An etl_runs audit table logs every invocation with rows loaded, duration, and status.',
      'Six FastAPI endpoints expose prices, summaries, and per-indicator queries on :8000, and a Streamlit dashboard on :8501 surfaces ETL stats and a filterable data browser. A MetricsCollector sidecar tracks every phase end-to-end.',
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  }
}
