# Aayush Sharma — Portfolio

A React single-page portfolio with a Spider-Verse streak: seven routes, an AI chat companion,
and five hidden easter eggs.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

**Live:** [aayushsharma.me](https://aayushsharma.me)

---

## Quick start

```bash
npm install
cp .env.example .env   # add your GROQ_API_KEY_1 for the chatbot
npm run dev            # http://localhost:5173
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over `src/` and `api/` |

> The chatbot calls `/api/chat`, a Vercel serverless function. It does not run under
> `vite dev` — use `vercel dev` if you need the bot locally. Everything else works offline.

---

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, about, skill cloud, projects, CTA |
| `/blog` | Journal | Feed and calendar views, mood filters |
| `/blog/:date/:slug` | Post | |
| `/wall` | Whisper Wall | Post-it board, saved to localStorage |
| `/contact` | Contact | Validated form that hands off to your mail client |
| `/hidden` | Hidden dimension | Easter-egg gated, `noindex` |
| `*` | 404 | Click anywhere to shoot webs |

All pages are lazy-loaded.

---

## Project layout

```
api/chat.js              Vercel function — Groq chat, CORS allowlist, rate limiting
src/
  components/
    animations/          GlitchText, PreLoader, Typewriter
    chatbot/             BINGO orb, window, message list, input
    home/                HomeSections — shared by / and /hidden via a `variant` prop
    icons/               Brand SVGs not in lucide
    layout/              Navbar, Footer, PageWrapper, ErrorBoundary, EasterEggsSystem
    Hero.jsx             Landing hero (`variant="hidden"` for the secret page)
    Seo.jsx              Per-route <title>, description, OG/Twitter tags
  data/                  links.js, writing.js
  features/blog|wall/    Route-specific view components
  hooks/                 useChat, useIdleTimer, useEffects
  lib/                   images (Cloudinary), slug, wallStorage, easterEggs
  styles/                design-tokens.css, animations.css
```

**Conventions**

- Images go through `lib/images.js`, never inline URLs — every request gets
  `f_auto,q_auto` from Cloudinary plus a `srcSet`.
- Colours, spacing, and easing come from `styles/design-tokens.css`. If you need a token
  inside `rgba()`, use the `--*-rgb` triplets.
- Blog URLs are built by `lib/slug.js` so links and route matching can't drift apart.

---

## Easter eggs

| Trigger | Result |
|---|---|
| `↑ ↑ ↓ ↓ ← → ← → B A` | The Anime Shrine modal |
| Type `spidey` anywhere | Spider-web flash overlay |
| Click the `C++` skill pill × 6 | Unlocks `/hidden` |
| Click the navbar logo × 5 quickly | Web burst |
| Idle for 60s | "Still there?" toast |
| Open DevTools | Console ASCII art |

---

## Deploying

Vercel, zero config. Set `GROQ_API_KEY_1` in the project's environment variables.
Optionally set `ALLOWED_ORIGIN` if you serve from a domain other than `aayushsharma.me`.

`vercel.json` adds security headers and long-lived caching for hashed assets.

---

## Tech

React 18 · Vite 5 · Tailwind 3 · Framer Motion · React Router 7 · lucide-react ·
Groq (`llama-3.3-70b-versatile`) · Cloudinary

## License

MIT — use it as a template if it's useful.

---

Made with 💜 by [Aayush Sharma](https://github.com/AAYUSH-SPIDEY-SHARMA)
