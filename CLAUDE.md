# andresl.dev — Personal Portfolio Site

## Design Context

Visual / UX direction lives in `.impeccable.md` at the project root. **Read it before changing any visual treatment, copy tone, or adding new sections.** TL;DR: editorial-meets-terminal on warm paper, single orange accent used as punctuation, JetBrains Mono for chrome + Geist for content, hairlines not boxes, slow exponential-ease motion, grain overlay always on.

## Stack

React 19 · Vite 7 · TypeScript 5 (strict) · Tailwind CSS v4 (via `@tailwindcss/vite`, configured with a `@theme` block in `src/index.css` — no `tailwind.config.*` file) · framer-motion 12 · react-router-dom v7 · @phosphor-icons/react · clsx + tailwind-merge.

Path alias: `@/*` → `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

## Project Structure

```
andresl.dev/
├── src/
│   ├── main.tsx              # React entry, wraps App in BrowserRouter
│   ├── App.tsx               # Routes + persistent Nav/Footer/grain overlay
│   ├── index.css             # Tailwind import, @theme tokens, base styles, utilities (.grain, .reveal, .breathe, .glass, .hairline-*)
│   ├── App.css               # Empty — all styles live in index.css + Tailwind
│   ├── pages/
│   │   ├── Landing.tsx       # Mounts Hero, About, Experience, Skills, SelectedWork in order
│   │   ├── Work.tsx          # Full project archive
│   │   ├── ProjectCase.tsx   # Standalone /work/:slug page
│   │   └── ProjectModal.tsx  # Overlay variant of the same project view (location.state.background)
│   ├── components/
│   │   ├── Nav.tsx           # Fixed header, scroll progress bar, mobile drawer
│   │   ├── Hero.tsx          # H1 + tagline + CTAs, mounts HeroBackground canvas
│   │   ├── HeroBackground.tsx # Cursor-reactive particle canvas (variants: field/scatter/flock/off)
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── SelectedWork.tsx  # Featured projects grid on landing
│   │   ├── CaseStudy.tsx     # Shared body for ProjectCase + ProjectModal
│   │   ├── ContactModal.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ui/
│   │       └── hover-expand.tsx
│   ├── data/
│   │   └── projects.ts       # Typed Project[] + getProject(slug) helper — single source of truth
│   ├── lib/
│   │   └── utils.ts          # cn() = clsx + tailwind-merge
│   └── vite-env.d.ts
└── public/
    ├── favicon.svg, favicon.ico, apple-touch-icon.png
    └── images/               # Project covers and gallery shots (referenced as /images/*.png|jpg|svg)
```

## Routing

```
/                  → Landing  (Hero, About, Experience, Skills, SelectedWork)
/work              → Work     (full project archive)
/work/:slug        → ProjectCase  (standalone page)
                  OR ProjectModal (when navigated to with state={{ background: location }})
```

The modal-overlay pattern in `App.tsx`: when `location.state.background` is set, the main `<Routes>` renders the background route and a second `<Routes>` renders `ProjectModal` on top. This lets project links from the landing page open as overlays without losing the background page, while direct URLs to `/work/:slug` render the standalone `ProjectCase` page.

When linking to a project from inside the app, pass `state={{ background: location }}`:

```tsx
<Link to={`/work/${p.slug}`} state={{ background: location }}>...</Link>
```

## Dev Commands

```bash
npm run dev       # vite dev server
npm run build     # tsc -b && vite build
npm run preview   # preview the production build
npm run lint      # eslint
```

## Conventions

### Project data
- All projects are entries in the `projects: Project[]` array in `src/data/projects.ts`.
- `Project` shape:
  ```ts
  type Project = {
    slug: string              // URL slug, also the React key
    name: string              // Display name (gets the orange "." after it in UI)
    year: string
    award: string | null
    tagline: string           // One-line headline used on cards
    desc: string              // Short paragraph used on archive page
    img?: string              // Square/portrait thumbnail
    cover?: string            // 16:10 hero image for the case study
    gallery?: { src: string; caption: string }[]
    tech: string[]            // Tags rendered as mono text, separated by ·
    url?: string              // GitHub
    live?: string             // Deployed site
    devpost?: string
    problem: string           // Long-form: what's broken
    solution: string          // Long-form: what was built
    deepDive: string[]        // 3–5 implementation bullet strings
    role?: string             // e.g. "co-founder · technical"
  }
  ```
- Fetch a single project with `getProject(slug)` from `src/data/projects.ts`.

### Images
- Drop in `public/images/`, reference as `/images/filename.png` (or `.jpg`, `.svg`).
- `cover` should be ~16:10; thumbnails (`img`) can be square.

### Styling
- Tailwind v4 utilities everywhere. No CSS modules. No styled-components.
- Design tokens live in the `@theme { ... }` block in `src/index.css`:
  - Colors: `bg`, `surface`, `surface-2`, `line`, `line-strong`, `text`, `text-dim`, `muted`, `muted-2`, `accent`, `accent-dim`, `accent-ink`
  - Fonts: `font-display` (Geist), `font-mono` (JetBrains Mono), `font-sans` (Geist)
  - Shadows: `shadow-soft`, `shadow-glass-inset`
- Custom utilities defined in `@layer utilities`: `.grain`, `.reveal` + `.reveal--in`, `.breathe`, `.glass`, `.hairline-t`, `.hairline-b`, `.text-balance`, `.text-pretty`, `.font-display`, `.font-mono`.
- Use the `cn()` helper from `@/lib/utils` when conditionally composing class names.

### Motion
- One easing curve project-wide: `[0.16, 1, 0.3, 1]` (exponential ease-out). Don't introduce new curves.
- Use `framer-motion`'s `whileInView` with `viewport={{ once: true, margin: '-80px' }}` for section reveals.
- Durations cluster at `0.6s` / `0.7s` / `0.85s`. Snappier than that reads wrong on this site.

### Icons
- `@phosphor-icons/react`. Common picks: `ArrowUpRight`, `Trophy`, `GithubLogo`, `LinkedinLogo`, `At`, `List`, `X`. Use `weight="duotone"` for social icons, `weight="bold"` for inline arrows, `weight="light"` for nav chrome, `weight="fill"` for small accent badges.

## Notes

- TypeScript strict mode is on with `noUnusedLocals` and `noUnusedParameters`. The build runs `tsc -b` before `vite build`, so unused imports/vars will fail the build, not just lint.
- React 19 features (Actions, `use`, etc.) are available but the codebase mostly uses hooks + framer-motion. No React Compiler enabled.
