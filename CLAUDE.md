# andresl.dev — Personal Portfolio Site

## Project Structure

```
andresl.dev/
└── frontend/           # Vite + React app (the entire site)
    ├── src/
    │   ├── App.jsx         # Root component, mounts all sections
    │   ├── App.css         # Global styles
    │   ├── index.css       # Base/reset styles
    │   └── components/
    │       ├── Nav.jsx
    │       ├── Hero.jsx
    │       ├── About.jsx
    │       ├── Experience.jsx
    │       ├── Skills.jsx
    │       ├── Projects.jsx    # All project data lives here as a JS array
    │       ├── Footer.jsx
    │       └── ContactModal.jsx
    └── public/
        └── images/         # Project preview images (e.g. sapling.png, ecoapi.png)
```

## Dev Commands

```bash
cd frontend
npm run dev       # start local dev server
npm run build     # production build
npm run preview   # preview production build
```

## Key Conventions

- **Projects** are defined as a plain JS array at the top of `Projects.jsx`. Each entry has:
  - `name`, `award` (null if none), `desc`, `img` (optional), `tech[]`
  - `url` (GitHub), `live` (optional deployed site), `devpost` (optional)
  - `problem`, `solution`, `deepDive[]` (3–4 bullet strings)
- **Images** go in `frontend/public/images/` and are referenced as `/images/filename.png`
- No routing — single-page, scroll-based layout
- Styling is plain CSS (no Tailwind, no CSS modules)
- Stack: React 19, Vite 7, vanilla CSS
