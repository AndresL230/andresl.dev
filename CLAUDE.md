# andresl.dev — Personal Portfolio Site

## Project Structure

```
andresl.dev/            # Vite + React + TypeScript app (the entire site)
├── src/
│   ├── App.tsx         # Root component, mounts all sections
│   ├── App.css         # Global styles
│   ├── index.css       # Base/reset styles
│   ├── vite-env.d.ts   # Vite client type references
│   └── components/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx    # All project data lives here as a typed array
│       ├── Footer.tsx
│       └── ContactModal.tsx
└── public/
    └── images/         # Project preview images (e.g. sapling.png, ecoapi.png)
```

## Dev Commands

```bash
npm run dev       # start local dev server
npm run build     # production build
npm run preview   # preview production build
```

## Key Conventions

- **Projects** are defined as a typed `Project[]` array at the top of `Projects.tsx`. Each entry has:
  - `name`, `award` (null if none), `desc`, `img` (optional), `tech[]`
  - `url` (GitHub), `live` (optional deployed site), `devpost` (optional)
  - `problem`, `solution`, `deepDive[]` (3–4 bullet strings)
- **Images** go in `public/images/` and are referenced as `/images/filename.png`
- No routing — single-page, scroll-based layout
- Styling is plain CSS (no Tailwind, no CSS modules)
- Stack: React 19, Vite 7, TypeScript 5, vanilla CSS
