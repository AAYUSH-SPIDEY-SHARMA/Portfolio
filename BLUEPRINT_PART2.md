# BLUEPRINT PART 2: ALL PAGES — EXTREME DETAIL

---

# PAGE 1: 🏠 HOME (Single-Scroll Landing)

## Section 1A: HERO (KEEP AS IS — No Changes)

## Section 1B: "PLAYER STATS" — About Me

**Visual Inspiration:** JRPG Character Status Screen + Anime Profile Card

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────────────────────────────┐ │
│  │          │  │  CLASS: Full-Stack Sorcerer       │ │
│  │  AVATAR  │  │  LEVEL: 22                       │ │
│  │  (anime  │  │  GUILD: IIIT Lucknow             │ │
│  │  style   │  │  TITLE: Overall Coordinator      │ │
│  │  illust) │  │                                   │ │
│  │          │  │  ═══ STATS ═══                    │ │
│  └──────────┘  │  STR ████████░░ Backend/Sys      │ │
│                │  DEX █████████░ Frontend/UI       │ │
│  Name:         │  INT ████████░░ Algorithms/CP     │ │
│  Aayush Sharma │  WIS ███████░░░ AI/ML             │ │
│                │  CHA █████████░ Leadership        │ │
│  M.Sc AI/ML    │  LCK ████████░░ Hackathons       │ │
│  IIITL 24-26   │                                   │ │
│                │  XP: ████████████████░░░░ Lv.22   │ │
│                └──────────────────────────────────┘ │
│                                                     │
│  "I don't choose one path. I walk them all."        │
│                                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│  │Coder│ │Gamer│ │Anime│ │Sport│ │Build│ │Lead │ │
│  │ 🖥️  │ │ 🎮  │ │ 🎌  │ │ 🏀  │ │ 🏗️  │ │ 👑  │ │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ │
│  ^ identity chips — hover to see details            │
└─────────────────────────────────────────────────────┘
```

**Behavior:**
- Stats bars animate from 0 → value when scrolled into view (Framer Motion)
- XP bar fills with green glow
- Identity chips are clickable — each shows a tooltip with 1-line description
- Avatar has subtle float animation (CSS)
- Japanese text "勇者" (Hero) decorative behind avatar at 5% opacity
- Background: Subtle dark gradient with faint hexagonal grid pattern

**CSS Effects:**
- Stat bars: `linear-gradient(90deg, var(--primary), var(--secondary))` with `box-shadow` glow
- Card: Glassmorphism with `backdrop-filter: blur(20px)`, border glow on hover
- Stat labels: `font-family: var(--font-mono)` for tech aesthetic

---

## Section 1C: SKILLS CONSTELLATION

**Visual:** Interactive floating nodes connected by glowing lines

```
                    ★ React
                   / \
          ★ Next.js   ★ Tailwind
         /               \
    ★ Node.js ——— ★ Express ——— ★ PostgreSQL
         \               /
          ★ Python   ★ Docker
                   \ /
                    ★ AI/ML
```

**Categories (Color Coded):**
- 🔵 Frontend: React, Next.js, Tailwind, HTML/CSS
- 🟢 Backend: Node.js, Express, REST APIs, JWT
- 🟣 Languages: Python, Java, C++, JavaScript, SQL
- 🔴 AI/ML: TensorFlow, scikit-learn, NLP, Computer Vision
- 🟡 DevOps: Docker, Git, GitHub Actions, CI/CD, Linux
- 🟠 Databases: PostgreSQL, MySQL, Prisma ORM, Redis

**Behavior:**
- Nodes float gently with `sticker-float` style animation
- Hover a node → it glows brighter, connected nodes also light up
- Click a node → brief tooltip showing proficiency level
- Connection lines: SVG paths with subtle dash animation
- Background: Dark with faint dot grid pattern
- Mobile: Falls back to grouped badge grid (no constellation)

---

## Section 1D: FEATURED PROJECTS (Bento Grid)

**Layout:** Asymmetric bento grid — 1 large + 2 medium

```
┌────────────────────────┬──────────────┐
│                        │              │
│    AETHER (Large)      │   AimPeak    │
│    Featured Project    │   (Medium)   │
│    With screenshot     │              │
│                        ├──────────────┤
│                        │              │
│                        │   DotCode    │
│                        │   (Medium)   │
└────────────────────────┴──────────────┘
```

**Each Card Has:**
- Gradient border that shifts on hover
- Project name + one-liner
- 3 tech badges
- "View Project →" link
- Subtle 3D tilt on mouse move (desktop only)
- Status badge: "🚀 Live" / "🚧 Building"

**Hover Effect:**
```css
/* Spotlight effect — radial gradient follows cursor */
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(108, 92, 231, 0.15),
    transparent 40%
  );
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s;
}
.project-card:hover::before { opacity: 1; }
```

---

## Section 1E: CTA STRIP

```
┌─────────────────────────────────────────────────────┐
│  ✨ "Let's build something legendary together" ✨   │
│                                                     │
│  [📄 Resume]  [🐙 GitHub]  [📬 Contact Me]         │
└─────────────────────────────────────────────────────┘
```
- Full-width gradient banner (purple → blue → pink)
- Animated gradient that slowly shifts
- Buttons with glow on hover
- Floating sticker in corner (Chibi Spider-Man)

---

# PAGE 2: 📂 PROJECTS (/projects)

**Mood:** Clean professional blue-purple on dark

## Section 2A: Page Header
- Title: "What I've Built" with character-by-character reveal animation
- Subtitle: "From hackathon prototypes to production platforms"
- Stats strip: "6+ Projects | 3 Live | 2 In Development"

## Section 2B: Featured Project — AETHER (Full Width)

```
┌─────────────────────────────────────────────────────┐
│  AETHER — IIITL Data Science & AI/ML Club Platform  │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │                  │  │ THE PROBLEM              │ │
│  │  Screenshot      │  │ Student clubs lack a     │ │
│  │  Carousel        │  │ centralized platform...  │ │
│  │  (Cloudinary)    │  │                          │ │
│  │                  │  │ OUR SOLUTION             │ │
│  │  ← ●●○ →        │  │ Full-stack platform with │ │
│  │                  │  │ JWT auth, RBAC, Razorpay │ │
│  └──────────────────┘  │ payment, admin panel     │ │
│                        │                          │ │
│  ┌──────────────────┐  │ HIGHLIGHTS               │ │
│  │ TECH STACK       │  │ ✦ Complete frontend arch │ │
│  │ React · Node.js  │  │ ✦ Scalable component UI │ │
│  │ Express · PG     │  │ ✦ Event workflows       │ │
│  │ JWT · Razorpay   │  │ ✦ Payment integration   │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                     │
│  [🔗 Frontend]  [🔗 Backend]  [🚀 Live Demo]       │
└─────────────────────────────────────────────────────┘
```

## Section 2C: Current Builds (2 Cards Side by Side)

**AimPeak — AI Test Platform**
- "🚧 In Active Development"
- JEE/NEET prep with adaptive testing, IRT engine, FSRS spaced repetition
- Tech: Next.js, Node.js, PostgreSQL, Redis, Docker
- Animated progress bar showing completion %

**DotCode — Coding Platform**
- "🚧 In Active Development"
- Full coding platform with contests, leaderboards, team finder
- Judge0 integration, real-time submissions
- Tech: React, NestJS, PostgreSQL, Docker

## Section 2D: Other Projects (Grid — 3 columns)

Cards for: PRDE, Demotivator AI, Doodle-to-Real, Cybersecurity Threat Detection, PDF RAG Summarizer

Each card:
- Icon/emoji header
- Title + 2-line description
- Tech badges row
- GitHub + Demo links
- Hover: lift + border glow

---

# PAGE 3: 🏆 ACHIEVEMENTS (/achievements)

**Mood:** Dark with gold/amber accents — Trophy room feel

## Section 3A: Hero Stats Counter
```
┌───────────┬───────────┬───────────┬───────────┐
│  500+     │  4        │  3+       │  15+      │
│  Problems │  National │  Global   │  Merged   │
│  Solved   │  Ranks    │  Comps    │  PRs      │
└───────────┴───────────┴───────────┴───────────┘
```
Numbers count up from 0 when section enters viewport.

## Section 3B: Prestigious Achievements (Large Cards)

**IIT JAM Mathematics — AIR 1317**
- Icon: 🎓 Academic cap
- "All India Rank in India's most competitive PG entrance exam for IITs"
- Color: Emerald glow

**National Bronze Medal — Basketball (SGFI 2017)**
- Icon: 🥉 Medal
- Animated bronze medal that spins on scroll entry
- "Years of competitive basketball at national level"
- Color: Bronze/Gold glow

**Meta Hacker Cup 2025 — Global Rank 141**
- Icon: 🌐 Globe
- "Top 0.1% globally in Meta's algorithmic competition"
- Color: Blue glow
- Link to certificate

**TCS CodeVita 2025 — Rank 585/20,540**
- Icon: 💻 Terminal
- "Top 3% in India's largest coding championship"
- Color: Purple glow

## Section 3C: CP Platform Profiles

3 cards with platform-specific colors:
- **Codeforces** (Blue): Specialist, handle SPIDEY_BOY, Global Rank 537
- **CodeChef** (Amber): 3★, handle spidey_sharma
- **Meta Hacker Cup** (Indigo): Rank 141, certificate link

Each has: Platform color accent, animated rating bar, profile link button

## Section 3D: Coding Programs & Events

Timeline-style cards:

**GSoC Journey** — Aspirant, research phase, target organizations
**GSSoC'25** — Campus Ambassador, contributed to open source
**Hacktoberfest'25** — Super Contributor, 15+ merged PRs, badge earned
**Summer of Bitcoin** — Learning blockchain, Bitcoin protocol
**Meta Hacker Cup** — Global Rank 141, practice and competition journey
**Google Cloud Arcade** — Cloud skills, badges earned
**Codeforces Round #1064** — Global Rank 537, Div. 2

Each entry: Event logo, date, role/result, personal reflection paragraph, certificate link if available

---

# PAGE 4: ⚡ HACKATHONS (/hackathons)

**Mood:** Electric green neon on dark — Competition energy, terminal vibes

## Section 4A: Overview Grid

Filter bar: `[All] [Won🏆] [Top 5⭐] [Participated✓]`

Grid of hackathon cards:
```
┌──────────────────────┐
│  🏆                  │
│  Smart India          │
│  Hackathon 2025       │
│                       │
│  College Rep          │
│  Team: 6 members      │
│  Dec 2025             │
│                       │
│  [View Details →]     │
└──────────────────────┘
```

**Hackathons to include:**
1. Smart India Hackathon 2025 — College Representative
2. OpenAI Open Model Hackathon — Participant, built AI project
3. Google Solution Challenge — Live deployment, team project
4. Any other hackathons (user will provide data)

## Section 4B: Individual Detail Page (/hackathons/:slug)

Full story layout for EACH hackathon:

```
┌─────────────────────────────────────────────────────┐
│  ═══ SMART INDIA HACKATHON 2025 ═══                │
│  📅 December 2025 | 📍 India | 👥 Team of 6       │
│                                                     │
│  ── THE CHALLENGE ──                                │
│  [Problem statement description]                    │
│                                                     │
│  ── OUR APPROACH ──                                 │
│  [What we built, architecture decisions]            │
│                                                     │
│  ── MY ROLE ──                                      │
│  [Specific contributions]                           │
│                                                     │
│  ── TECH STACK ──                                   │
│  [React] [Node.js] [PostgreSQL] [Docker]            │
│                                                     │
│  ── THE JOURNEY (Hour by Hour) ──                   │
│  08:00 — Kickoff, team formation                    │
│  12:00 — MVP architecture decided                   │
│  18:00 — First working prototype                    │
│  02:00 — Bug fixing marathon                        │
│  08:00 — Final submission & demo                    │
│                                                     │
│  ── TEAM ──                                         │
│  [Avatar] [Avatar] [Avatar] [Avatar] [Avatar]       │
│   Name     Name     Name     Name     Name          │
│                                                     │
│  ── SCREENSHOTS ──                                  │
│  [Image carousel from Cloudinary]                   │
│                                                     │
│  ── RESULT ──                                       │
│  🏆 College Representative — Successfully presented │
│                                                     │
│  ── REFLECTIONS ──                                  │
│  "What I learned, how I felt, what I'd do           │
│   differently next time..."                         │
│                                                     │
│  ── CERTIFICATE ──                                  │
│  [Embedded certificate image]                       │
│                                                     │
│  [← Back to Hackathons]                             │
└─────────────────────────────────────────────────────┘
```

---

# PAGE 5: 🎮 BEYOND CODE (/beyond-code)

**Mood Shifts Per Section — Most dynamic page**

## Section 5A: GAMING — "Player 1 Ready"

**Mood:** Dark red/orange, aggressive, scanline overlay, neon

```
┌─────────────────────────────────────────────────────┐
│  ▓▓ PLAYER 1 ▓▓                                    │
│  "I don't just write code. I frag."                 │
│                                                     │
│  ┌─────────────────────┐ ┌─────────────────────┐   │
│  │  🎯 VALORANT        │ │  📱 BGMI             │   │
│  │                     │ │                       │   │
│  │  🏆 Tournament      │ │  🥇 #1 Overall       │   │
│  │  Winner             │ │  Leaderboard          │   │
│  │  INFINITO 2026      │ │  Qualified Finals     │   │
│  │  IIIT Lucknow       │ │                       │   │
│  │                     │ │  Teammates:            │   │
│  │  Teammates:         │ │  [Names + photos]      │   │
│  │  [Names + photos]   │ │                       │   │
│  │                     │ │  [Gallery →]           │   │
│  │  [Gallery →]        │ │                       │   │
│  └─────────────────────┘ └─────────────────────┘   │
│                                                     │
│  [ Gaming Moments Gallery — Masonry Grid ]          │
└─────────────────────────────────────────────────────┘
```

**CSS Effects:**
- Scanline overlay: `repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)`
- Section border: Red neon glow
- Text: Orbitron font for "PLAYER 1"
- Cards shake subtly on hover (like controller vibration)

## Section 5B: SPORTS — "The Athlete"

**Mood:** Athletic orange/gold, powerful, medal showcase

**Basketball:**
- 🥉 National Bronze Medal (SGFI 2017) — HUGE animated medal display
- INFINITO 2025 — Team Captain, team photo gallery
- Stats card with basketball icon

**Kabaddi:**
- 2024 Tournament — Player role, team memories
- 2025 Tournament — CAPTAIN role, leadership story
- Team photos in masonry grid

**Medal Showcase:**
```css
/* Animated Medal */
@keyframes medal-shine {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.medal {
  background: linear-gradient(90deg, #CD7F32, #FFD700, #CD7F32);
  background-size: 200% auto;
  animation: medal-shine 3s ease-in-out infinite;
  border-radius: 50%;
  box-shadow: var(--glow-gold);
}
```

## Section 5C: ANIME & MANHWA CORNER

**Mood:** Soft Japanese aesthetic, cherry blossom, manga panels

- Current Watching/Reading list with cover art
- Top 5 favorites with star ratings in manga-panel layout
- Favorite quotes with character art backgrounds
- "How anime shapes my mindset" paragraph
- Decorative Japanese text elements (kanji at low opacity)
- Background: Subtle sakura pattern

## Section 5D: MEMORIES GALLERY — Pinterest Style

**Mood:** Warm, emotional, soft lighting

- Full masonry grid (react-responsive-masonry)
- Categories filter: [All] [Friends] [College] [Events] [Gaming] [Sports]
- Images loaded from Cloudinary with auto-optimization
- Click image → Lightbox modal with caption
- Infinite scroll for large collections
- Each image has soft shadow + rounded corners
- Hover: slight scale + brightness increase

---

# PAGE 6: 🏫 MY JOURNEY (/journey)

**Mood:** Night sky gradient → sunrise as you scroll — Storytelling

## Section 6A: Interactive Scroll Timeline

Vertical timeline with alternating left/right cards, progress line that DRAWS as you scroll (GSAP ScrollTrigger + SVG stroke-dashoffset).

**Milestones (Chronological):**

1. 🏫 **School Days** — S.Tech IT School, Bhilwara, Rajasthan
2. 🎓 **B.Sc PCM** — Sangam University (2021-2024), "Where curiosity began"
3. 📝 **IIT JAM** — AIR 1317, "Proved myself at national level"
4. 🚀 **IIIT Lucknow** — M.Sc AI/ML admission (Aug 2024), "New dimension unlocked"
5. 💻 **Coding Awakening** — First program, first bug, first fix
6. 🕸️ **Joined WnC Wing** — Web & Coding wing of Aether club
7. 🏆 **First Hackathon** — The rush, the chaos, the love
8. 📈 **WnC Coordinator** — Conducting CP contests, tech sessions
9. 🎮 **Gaming Glory** — Valorant & BGMI tournament victories
10. 🏀 **Sports Captain** — Basketball & Kabaddi tournaments
11. 👑 **Overall Coordinator** — Leading the entire Aether club
12. 🌍 **National Hackathon** — Organized a national-level event
13. 🌸 **Her** — "The chapter I never expected"
14. 🔮 **Today** — "Building AimPeak, DotCode, and the future"

Each milestone card:
- Date badge
- Title + 2-3 sentence story
- Optional photo (Cloudinary)
- Scroll-triggered fade-in from alternating sides

## Section 6B: "Her" — The Special Section

**Mood:** Complete aesthetic shift — soft pink/lavender, cherry blossoms falling

```
┌─────────────────────────────────────────────────────┐
│                  🌸  🌸  🌸                         │
│            (cherry blossom particles)               │
│                                                     │
│         "Some people change the way                 │
│              you breathe."                          │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │                                               │  │
│  │  She walked into my world at IIIT Lucknow    │  │
│  │  and everything shifted. I'm the most         │  │
│  │  confident person in any room — until she's   │  │
│  │  there. Then I freeze. I lose words. My mind  │  │
│  │  goes blank. But seeing her? That's the best  │  │
│  │  part of any day.                             │  │
│  │                                               │  │
│  │  No name needed. She knows.                   │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Background: tsParticles cherry blossom preset      │
│  Font: Serif/italic for letter feel                 │
│  Animation: Text fades in word-by-word              │
│  Color: --romance-primary palette                   │
│                                                     │
│                  🌸  🌸  🌸                         │
└─────────────────────────────────────────────────────┘
```

## Section 6C: Daily Motivations
- Rotating quote cards (auto-cycle every 8s)
- "What keeps me going" paragraph
- Personal mantras in styled quote blocks
- Decorative motivational stickers

---

*Continued in BLUEPRINT_PART3.md →*
