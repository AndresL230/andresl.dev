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
