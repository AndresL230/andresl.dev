import { useState } from 'react'

type Project = {
  name: string
  award: string | null
  desc: string
  img?: string
  tech: string[]
  url?: string
  live?: string
  devpost?: string
  problem: string
  solution: string
  deepDive: string[]
}

const projects: Project[] = [
  {
    name: 'EcoApi',
    award: 'Best Web API (Stripe Track) — HackIllinois 2026',
    desc: 'Developer tool that visualizes hidden API call costs and environmental footprint to drive optimization.',
    img: '/images/ecoapi.png',
    tech: ['Cloudflare Workers', 'Hono', 'D1', 'KV', 'React', 'Vite', 'TanStack Query', 'D3.js', 'TypeScript', 'Tailwind CSS', 'Llama 3.1'],
    devpost: 'https://devpost.com/software/ecoapi',
    live: 'https://ecoapi.dev',
    problem: "Developers make costly API architecture mistakes without realizing it — redundant calls, N+1 patterns, and unchecked rate limits silently inflate cloud bills and carbon footprint with no visibility into the damage.",
    solution: 'Built a three-part developer tool — a cloud API, interactive dashboard, and VSCode extension — that surfaces hidden API costs and environmental impact with real-time diagnostics, pattern detection, and AI-powered optimization suggestions.',
    deepDive: [
      'Cloudflare Workers REST API delivers cost breakdowns, rate-limit analysis, and N+1 pattern detection at the edge using Hono and D1',
      'D3.js dependency graph and Recharts visualizations map endpoint relationships and cost distribution across a React dashboard',
      'VSCode extension embeds a live analyzer that scans code for API patterns with AI chat explanations powered by Llama 3.1 8B',
      'Sustainability metrics estimate electricity, water, and CO₂ footprint from API call volume to quantify environmental cost',
    ],
  },
  {
    name: 'Sapling',
    award: 'Eduhack Track Winner — Civichacks 2026',
    desc: 'AI study framework with live knowledge graph visualization and adaptive quizzing.',
    img: '/images/sapling.png',
    tech: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'D3.js', 'Google Gemini', 'SQLite'],
    url: 'https://github.com/Jose-Gael-Cruz-Lopez/sapling',
    devpost: 'https://devpost.com/software/sapling-f3wy8k',
    problem: "Students study in isolation with static materials that don't adapt to what they actually know or struggle with. There's no way to visualize how concepts connect or track understanding over time.",
    solution: 'Built an AI study companion that constructs a live knowledge graph as you learn, with three teaching modes (Socratic, expository, teachback), adaptive quizzing, and study rooms for comparing progress with classmates.',
    deepDive: [
      'FastAPI backend dynamically builds and persists concept graphs in SQLite as users explore topics',
      'D3.js renders a force-directed knowledge graph that updates in real time as new concepts are learned',
      'Google Gemini API powers three distinct tutoring modes that adapt to the student\'s demonstrated understanding',
      'Adaptive quiz generation pulls from weak areas in the knowledge graph to target gaps',
    ],
  },
  {
    name: 'noogie',
    award: 'Best Design — PennApps XXVI',
    desc: 'News aggregation platform that groups and summarizes breaking news in real time.',
    img: '/images/noogie.png',
    tech: ['TypeScript', 'React', 'D3.js', 'Python', 'Flask', 'OpenAI GPT-4o', 'Supabase', 'FAISS', 'NLP'],
    url: 'https://github.com/ruslannnn2/noogie',
    devpost: 'https://devpost.com/software/noogie',
    problem: "News coverage is fragmented across outlets, each with their own biases. Readers see isolated stories instead of the full picture, making it hard to understand what's actually happening.",
    solution: 'Built a platform that collects articles from multiple sources, deduplicates them using sentence embeddings and FAISS vector indexing, clusters related stories, and generates AI-powered summaries so users can see unified, bias-mitigated news threads.',
    deepDive: [
      'Sentence-transformer embeddings fed into FAISS for sub-millisecond similarity search across thousands of articles',
      'Unsupervised clustering groups articles by topic without predefined categories',
      'OpenAI GPT-4o generates cluster headlines that capture the shared narrative',
      'D3.js node-cluster visualization lets users explore story connections interactively',
    ],
  },
  {
    name: 'Eyrie',
    award: 'Best Use of Cloudflare — HackHarvard',
    desc: 'Real-time crowd monitoring system designed to prevent crowd crush events.',
    img: '/images/eyrie.png',
    tech: ['TypeScript', 'React', 'Next.js 15', 'D3.js', 'Python', 'FastAPI', 'YOLOv8', 'OpenCV', 'PyTorch', 'WebRTC', 'Cloudflare'],
    url: 'https://github.com/treehill05/eyrie',
    devpost: 'https://devpost.com/software/eyrie-idxhj8',
    problem: "Crowd crush events at concerts, festivals, and religious gatherings kill hundreds of people every year. Authorities often have no warning until it's too late to respond.",
    solution: 'Built a real-time drone monitoring system that uses computer vision to detect dangerous crowd formations and predict crush events before they happen, giving authorities critical minutes to intervene.',
    deepDive: [
      'YOLOv8 runs person detection on live WebRTC drone feeds with bounding box overlays',
      'Gaussian kernel density estimation calculates spatial crowd density with normalized coordinates',
      'Predictive ML algorithms flag high-risk formations before crush thresholds are reached',
      'Cloudflare Workers handle edge processing for near-zero latency on live streams',
    ],
  },

  {
    name: 'ETL Pipeline',
    award: null,
    desc: 'Automated financial data pipeline from API ingestion to time-series storage.',
    tech: ['Python', 'TimescaleDB', 'SQLAlchemy', 'Streamlit', 'Docker'],
    url: 'https://github.com/AndresL230/etl-pipeline',
    problem: 'Financial data from external APIs arrives raw and unstructured, making it unusable for time-series analysis without significant manual processing.',
    solution: 'Built an automated pipeline that polls Alpha Vantage for OHLCV data, computes rolling indicators, and bulk-loads into TimescaleDB hypertables optimized for time-series queries.',
    deepDive: [
      'Scheduled polling fetches OHLCV data and computes rolling moving averages and volatility metrics on ingestion',
      'TimescaleDB hypertables partition data by time for fast range queries across years of financial data',
      'SQLAlchemy manages schema migrations and ORM operations across the pipeline',
      'Docker Compose containerizes the full stack for reproducible deployment',
    ],
  },
  {
    name: 'Portfolio Insights',
    award: null,
    desc: 'Full-stack app for tracking and analyzing stock portfolios with AI risk analysis.',
    tech: ['React', 'Flask', 'Python', 'Alpha Vantage API'],
    url: 'https://github.com/AndresL230/portfolio-insights',
    problem: "Retail investors lack access to professional-grade portfolio analytics and rely on scattered tools to understand their holdings' risk and performance.",
    solution: 'Built a full-stack app that tracks stock portfolios with real-time P&L, sector allocation breakdowns, and AI-powered risk analysis and investment recommendations.',
    deepDive: [
      'Flask REST API computes real-time P&L, returns, and sector allocation per holding using live market data',
      'AI analysis pass evaluates portfolio composition to surface concentration risk and volatility exposure',
      'React frontend renders interactive Chart.js visualizations for performance tracking and allocation breakdowns',
      'RESTful architecture with comprehensive endpoint coverage for holdings CRUD operations',
    ],
  },
]

type ProjectRowProps = {
  project: Project
  open: boolean
  onToggle: () => void
}

function ProjectRow({ project: p, open, onToggle }: ProjectRowProps) {
  return (
    <div className={`proj-row${open ? ' proj-row--open' : ''}`}>
      <button className="proj-summary" onClick={onToggle}>
        <div className="proj-summary-left">
          <span className="proj-name">{p.name}</span>
          {p.award && <span className="proj-award">{p.award}</span>}
        </div>
        <div className="proj-summary-right">
          <span className="proj-desc-inline">{p.desc}</span>
          <span className="proj-toggle">{open ? '−' : '+'}</span>
        </div>
      </button>

      <div className="proj-detail">
        <div className="proj-detail-inner">
          <div className="proj-detail-content">
            {p.img && (
              <img src={p.img} alt={p.name} className="proj-preview" />
            )}
            <div className="proj-detail-sections">
              <div className="proj-detail-section">
                <p className="proj-detail-label">// the problem</p>
                <p className="proj-detail-text">{p.problem}</p>
              </div>
              <div className="proj-detail-section">
                <p className="proj-detail-label">// the solution</p>
                <p className="proj-detail-text">{p.solution}</p>
              </div>
              <div className="proj-detail-section">
                <p className="proj-detail-label">// technical deep dive</p>
                <ul className="proj-deep-dive">
                  {p.deepDive.map((d) => (
                    <li key={d} className="proj-deep-dive-item">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="proj-detail-footer">
              <div className="project-tech">
                {p.tech.map((t) => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="proj-links">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="proj-link">
                    GitHub ↗
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="proj-link">
                    Live ↗
                  </a>
                )}
                {p.devpost && (
                  <a href={p.devpost} target="_blank" rel="noreferrer" className="proj-link">
                    Devpost ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [openName, setOpenName] = useState<string | null>(null)

  return (
    <section className="projects" id="projects">
      <div className="container">
        <p className="section-tag">projects</p>
        <h2 className="section-title">Things I&apos;ve built.</h2>
        <div className="proj-list">
          {projects.map((p) => (
            <ProjectRow
              key={p.name}
              project={p}
              open={openName === p.name}
              onToggle={() => setOpenName(openName === p.name ? null : p.name)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
