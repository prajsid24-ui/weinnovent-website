# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR (http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint on all .js/.jsx files
```

No test runner is configured.

## Architecture

Single-page React 19 app built with Vite 8. All UI is composed in `src/App.jsx` from discrete section components in `src/components/`.

**Stack:**
- **Tailwind CSS v4** via `@tailwindcss/vite` — configured in `vite.config.js` as a plugin; global styles and `@import "tailwindcss"` live in `src/index.css`. No `tailwind.config.js` — that's intentional for v4.
- **framer-motion** — used in every component for scroll-reveal (`whileInView`, `viewport={{ once: true }}`) and entrance animations (`initial` / `animate`). New animated sections should follow this same pattern.

**Component structure (`src/components/`):**
| File | Section |
|---|---|
| `Navbar.jsx` | Fixed nav with scroll-blur effect and mobile hamburger |
| `Hero.jsx` | Full-viewport hero with ambient glow, headline, stats |
| `Services.jsx` | 6-service grid with icon cards |
| `CaseStudies.jsx` | Portfolio case study cards with results metrics |
| `About.jsx` | Two-column layout — agency story + pillars |
| `Testimonials.jsx` | 2-column testimonial card grid |
| `ContactCTA.jsx` | Full-width gradient CTA banner |
| `Footer.jsx` | Links, brand, copyright |

**Design system:**
- Background: `#050505`; cards use `bg-white/[0.02]` with `border-white/[0.07]` borders
- Accent: violet-400 / violet-600 gradient; secondary blue-400
- Strings containing apostrophes must use double quotes (e.g. `"don't"`) — single-quoted JS strings containing `'` will break the Rolldown parser used by Vite 8.
