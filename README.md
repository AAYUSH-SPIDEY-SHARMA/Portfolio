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
cp .env.example .env
npm run dev            # http://localhost:5173
```

The site runs without any keys — the blog and wall just show empty states until
the backend is connected.

## Connecting the backend

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is fine).
2. **Run the schema.** SQL Editor → paste `supabase/schema.sql` → Run. This creates
   the `posts` and `wall_messages` tables and their Row Level Security policies.
3. **Copy the keys.** Project Settings → API. Put the Project URL and the `anon`
   key into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. **Create your account.** Authentication → Users → Add user. Use a real email
   and a strong password; this is your `/admin` login.
5. **Close the door.** Authentication → Providers → Email → turn **off**
   "Allow new users to sign up", so yours is the only account that can ever exist.
6. **Add the same variables in Vercel** (Project Settings → Environment Variables),
   along with `GROQ_API_KEY_1` and the three `CLOUDINARY_*` values.

The `anon` key is meant to be public — it ships in the browser bundle. RLS is what
protects the data, which is why step 2 matters more than key secrecy.

## Publishing

Go to `/admin`, sign in, drag in a photo (or paste one, or skip it entirely for a
text post), write a caption, hit Publish. Works from a phone. Posts appear on
`/blog` immediately.

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
| `/blog` | Journal | Pinterest-style masonry of photo + text posts |
| `/blog/:slug` | Post | Opens as an overlay on the feed; direct links work |
| `/wall` | Whisper Wall | Public post-it board, shared across all visitors |
| `/admin` | Studio | Private. Sign in to publish, unpublish, or delete posts |
| `/contact` | Contact | Validated form that hands off to your mail client |
| `/hidden` | Hidden dimension | Easter-egg gated, `noindex` |
| `*` | 404 | Click anywhere to shoot webs |

All pages are lazy-loaded.

---

## Project layout

```
api/chat.js              Vercel function — Groq chat, CORS allowlist, rate limiting
api/upload.js            Vercel function — verifies the admin's Supabase token,
                         then uploads to Cloudinary (secret stays server-side)
supabase/schema.sql      Tables + Row Level Security. Run once in Supabase.
src/
  components/
    animations/          GlitchText, PreLoader, Typewriter
    chatbot/             BINGO orb, window, message list, input
    home/                HomeSections — shared by / and /hidden via a `variant` prop
    icons/               Brand SVGs not in lucide
    layout/              Navbar, Footer, PageWrapper, ErrorBoundary, EasterEggsSystem
    Hero.jsx             Landing hero (`variant="hidden"` for the secret page)
    Seo.jsx              Per-route <title>, description, OG/Twitter tags
  data/                  links.js
  features/journal/      Masonry engine, post card, lightbox
  features/wall/         Message form, note, grid
  features/admin/        Auth hook, composer
  hooks/                 useChat, useIdleTimer, useEffects
  lib/                   supabase, posts, wall, images, slug, easterEggs
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

Vercel, zero config. Set every variable from `.env.example` in Project Settings →
Environment Variables. Set `ALLOWED_ORIGIN` if you serve from a domain other than
`aayushsharma.me`.

`vercel.json` adds security headers and long-lived caching for hashed assets.

---

## Tech

React 18 · Vite 5 · Tailwind 3 · Framer Motion · React Router 7 · lucide-react ·
Supabase (Postgres + Auth) · Cloudinary · Groq (`llama-3.3-70b-versatile`)

## License

MIT — use it as a template if it's useful.

---

Made with 💜 by [Aayush Sharma](https://github.com/AAYUSH-SPIDEY-SHARMA)
