# BLUEPRINT PART 3: BLOG, WALL, CONTACT, COMPONENTS, ARCHITECTURE & EASTER EGGS

---

# PAGE 7: 🌐 OPEN SOURCE (/open-source)

**Mood:** Matrix green terminal aesthetic on dark

## Section 7A: Contribution Dashboard
```
┌─────────────────────────────────────────────────────┐
│  > git log --oneline --author="SPIDEY"              │
│                                                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │  15+    │ │  5+     │ │  3+     │ │  1000+  │  │
│  │  PRs    │ │  Repos  │ │  Orgs   │ │  Lines  │  │
│  │ Merged  │ │ Touched │ │ Joined  │ │ Changed │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                     │
│  [ GitHub Contribution Graph Recreation ]           │
│  (green squares heatmap for the year)               │
└─────────────────────────────────────────────────────┘
```

## Section 7B: Highlighted Contributions

**P4-SpecTec (KAIST)** — Major PR #106
- Org logo + description
- "Fixed directionless parameter classification (CTK vs DYN)"
- PR link, Issue link
- Impact description

**Other contributions** — Cards with org logo, PR title, status badge

## Section 7C: Programs

Cards for each program with personal journey narrative:
- **Hacktoberfest'25**: Super Contributor badge, 15+ PRs, what I learned
- **GSSoC'25**: Campus Ambassador, contributing to GirlScript
- **GSoC Aspirations**: Target orgs, preparation journey
- **Summer of Bitcoin**: Bitcoin protocol learning

---

# PAGE 8: 📝 BLOG (/blog)

**Mood:** Warm journal aesthetic — cozy anime study room vibes

**Two view modes with animated toggle switch:**

## View 1: 🗓️ Anime Calendar

```
┌─────────────────────────────────────────────────────┐
│  ◀ May 2026 ▶                                       │
│                                                     │
│  Mon  Tue  Wed  Thu  Fri  Sat  Sun                  │
│  ┌────┬────┬────┬────┬────┬────┬────┐               │
│  │    │    │    │ 1  │ 2  │ 3  │ 4  │               │
│  │    │    │    │ 🟣 │    │ 🔵 │    │               │
│  ├────┼────┼────┼────┼────┼────┼────┤               │
│  │ 5  │ 6  │ 7  │ 8  │ 9  │ 10 │ 11 │               │
│  │ 🟢 │    │ 🟣 │    │ 🔴 │ 🟡 │    │               │
│  ├────┼────┼────┼────┼────┼────┼────┤               │
│  │ 12 │ 13 │ 14 │ ...                               │
│  │    │ 🟣 │ ⭐ │    TODAY marker glows              │
│  └────┴────┴────┴────────────────────               │
│                                                     │
│  🟣 = Productive  🔵 = Learning  🟢 = Happy         │
│  🔴 = Tough Day   🟡 = Excited   ⭐ = Special        │
│                                                     │
│  ── Click a date to see blog entries ──             │
│                                                     │
│  ┌──────────────────────────────────────┐           │
│  │  📅 May 14, 2026 — "Built the      │           │
│  │  Future Today"                       │           │
│  │  Mood: 🟣 Productive                │           │
│  │  Worked on portfolio redesign...     │           │
│  │  [Read Full →]                       │           │
│  │                                      │           │
│  │  📅 May 14, 2026 — "Late Night     │           │
│  │  Coding Session"                     │           │
│  │  Mood: 🟡 Excited                   │           │
│  │  Finally cracked the animation...    │           │
│  │  [Read Full →]                       │           │
│  └──────────────────────────────────────┘           │
└─────────────────────────────────────────────────────┘
```

**Calendar Styling:**
- Warm paper background: `var(--journal-bg)`
- Calendar cells with subtle borders, rounded corners
- Mood dot indicator on dates with entries
- Today: highlighted with glow ring
- Month transition: cards flip animation (Framer Motion)
- Decorative: Anime-style desk elements around calendar (lamp, coffee, pen)

## View 2: 📜 Feed View

```
┌─────────────────────────────────────────────────────┐
│  Filter: [All] [Productive🟣] [Happy🟢] [Learning🔵] │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  📅 May 14, 2026                            │   │
│  │  "Built the Future Today"                    │   │
│  │  🟣 Productive                               │   │
│  │                                              │   │
│  │  Today was one of those days where            │   │
│  │  everything just clicked. The portfolio       │   │
│  │  redesign is coming together beautifully...   │   │
│  │                                              │   │
│  │  📸 [Thumbnail] [Thumbnail]                  │   │
│  │  🏷️ #coding #portfolio #design               │   │
│  │  [Read Full →]                               │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  📅 May 13, 2026                            │   │
│  │  "Rainy Day at IIITL"         ...            │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  [Load More ↓]  (Infinite scroll)                   │
└─────────────────────────────────────────────────────┘
```

## Individual Blog Post (/blog/:date/:slug)

```
┌─────────────────────────────────────────────────────┐
│  ← Back to Blog                                     │
│                                                     │
│  📅 Wednesday, May 14, 2026                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│                                                     │
│  "Built the Future Today"                           │
│                                                     │
│  Mood: 🟣 Productive  |  Tags: #coding #portfolio   │
│                                                     │
│  ── Content ──                                      │
│  [Full markdown-rendered blog content]              │
│  [Can include images, code blocks, links]           │
│                                                     │
│  ── Photos ──                                       │
│  [Cloudinary image gallery — masonry mini-grid]     │
│                                                     │
│  ── How I'm Feeling ──                              │
│  "Excited about the progress. The animations are    │
│   coming together and the design feels alive."      │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│  ← Previous Day    |    Next Day →                  │
└─────────────────────────────────────────────────────┘
```

**Blog Post Styling:**
- Background: Warm paper texture (`var(--journal-bg)`)
- Font: Serif for content (Georgia or Playfair Display)
- Max-width: 700px centered
- Images: Rounded corners, subtle shadow
- Code blocks: Dark theme with syntax highlighting

## Blog Admin Panel (/blog/admin — password protected)

Simple form: Title, Content (markdown textarea), Mood selector, Tags input, Image upload (to Cloudinary), Publish button.

Password stored hashed in Firebase `admin/config` collection.

---

# PAGE 9: 💌 WALL (/wall)

**Mood:** Playful, warm, post-it note aesthetic on cork board

```
┌─────────────────────────────────────────────────────┐
│  💌 THE WHISPER WALL                                │
│  "Say something. Leave your mark. No judgment."     │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  Toggle: [Anonymous 🎭] [Leave Your Name 👤] │    │
│  │                                             │    │
│  │  ┌─────────────────────────────────────┐    │    │
│  │  │  Your message...                    │    │    │
│  │  │                                     │    │    │
│  │  └─────────────────────────────────────┘    │    │
│  │  [😊 Emoji] [📤 Send]                      │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ── MESSAGES ──                                     │
│                                                     │
│  ┌────────┐  ┌─────────┐  ┌──────────┐             │
│  │ "You   │  │"Amazing │  │ "Keep   │              │
│  │ inspire│  │ work!   │  │ going   │              │
│  │ me"    │  │ 🔥"     │  │ bro!"  │              │
│  │        │  │         │  │         │              │
│  │ 🎭 Anon│  │ 👤 Rahul│  │ 🎭 Anon │              │
│  │ 2h ago │  │ 1d ago  │  │ 3d ago  │              │
│  └────────┘  └─────────┘  └──────────┘             │
│                                                     │
│  (Masonry layout, random rotation -3deg to 3deg)    │
│  (Random pastel colors per note)                    │
│  (New messages animate in — float up + settle)      │
└─────────────────────────────────────────────────────┘
```

**Message Note Styling:**
```css
.wall-note {
  background: var(--note-color); /* Random pastel */
  border-radius: 4px;
  padding: 16px;
  box-shadow: 2px 3px 8px rgba(0,0,0,0.15);
  transform: rotate(var(--rotation)); /* -3 to 3 deg */
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: 'Caveat', cursive; /* Handwriting font */
}
.wall-note:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow: 4px 6px 16px rgba(0,0,0,0.2);
}
```

**Note Colors (Random Assignment):**
```
#FFFACD (Lemon Chiffon)
#FFE4E1 (Misty Rose)
#E0F7FA (Light Cyan)
#F3E5F5 (Lavender)
#E8F5E9 (Mint)
#FFF3E0 (Peach)
#F1F8E9 (Light Lime)
```

**Firebase Rules:**
- Rate limit: 1 message per 5 min per anonymous session
- Max length: 280 characters
- Basic profanity filter (word list)
- App Check enabled for bot prevention

---

# PAGE 10: 📬 CONTACT (/contact)

**Mood:** Professional with subtle spider-web SVG background

```
┌─────────────────────────────────────────────────────┐
│  📬 LET'S CONNECT                                   │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │                  │  │  Name: [______________]  │ │
│  │  STATUS:         │  │  Email: [______________] │ │
│  │  🟢 Open to      │  │  Subject: [___________]  │ │
│  │  Opportunities   │  │  Message:                │ │
│  │                  │  │  [                       ]│ │
│  │  📧 Email        │  │  [                       ]│ │
│  │  📱 Phone        │  │  [_______Send Message____]│ │
│  │  📍 Lucknow, IN  │  │                          │ │
│  │                  │  └──────────────────────────┘ │
│  │  ── SOCIALS ──   │                               │
│  │  [GitHub]        │  ┌──────────────────────────┐ │
│  │  [LinkedIn]      │  │  📄 Download Resume      │ │
│  │  [Twitter/X]     │  │  [Preview] [Download]    │ │
│  │  [Instagram]     │  └──────────────────────────┘ │
│  │  [Dev.to]        │                               │
│  │  [Medium]        │                               │
│  └──────────────────┘                               │
└─────────────────────────────────────────────────────┘
```

---

# SHARED COMPONENTS — EXTREME DETAIL

## Navbar

```
Desktop:
┌─[🕷️ AS]──[Home]──[Projects]──[Achievements]──[Hackathons]──[Beyond]──[Journey]──[OSS]──[Blog]──[Wall]──[Contact]──[🌙]─┐

Mobile:
┌─[🕷️ AS]──────────────────────────────────────────[☰]─┐
```

- Sticky top, glassmorphism blur background
- Active page: underline with gradient (purple → blue)
- Scroll: background opacity increases from 0.5 → 0.9
- Mobile: Hamburger → full-screen overlay, staggered item animation
- Theme toggle: Sun/Moon icon with rotation transition
- Spider logo: Subtle glow pulse animation

## Footer

```
┌─────────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ NAVIGATE │ │ SOCIAL   │ │ CONTACT  │            │
│  │ Home     │ │ GitHub   │ │ Email    │            │
│  │ Projects │ │ LinkedIn │ │ Phone    │            │
│  │ Blog     │ │ Twitter  │ │ Lucknow  │            │
│  │ Wall     │ │ Instagram│ │          │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│                                                     │
│  "Built with ❤️, mass caffeine, and 3AM commits"    │
│  © 2026 Aayush Sharma. All rights reserved.         │
│                                                     │
│  [Chibi Itachi sticker] 🕷️                          │
└─────────────────────────────────────────────────────┘
```

## Preloader (Initial Page Load)

```
Frame 1 (0-0.5s):   Black screen
Frame 2 (0.5-1.5s): Spider logo drops in with bounce physics
Frame 3 (1.5-2s):   Web lines shoot out from logo (SVG stroke animation)
Frame 4 (2-2.5s):   "AAYUSH SHARMA" types out below logo
Frame 5 (2.5-3s):   Everything fades out, main site fades in
```
- Skippable: Click anywhere to skip
- Only on first visit (sessionStorage flag)

## Custom Cursor (Desktop Only)

```
Default:   Small dot (6px) + Outer ring (40px) with spring delay
On links:  Ring expands to 60px, fills with 10% opacity
On images: Ring becomes crosshair style
On buttons: Ring morphs to square shape
```
- Uses Framer Motion `useSpring` for smooth following
- `pointer-events: none` on cursor elements
- Hidden on mobile via `@media (hover: none)`

## Scroll Progress Bar
- Fixed at top of page, full width
- 2px height, gradient fill (purple → blue → pink)
- Framer Motion `useScroll` → `scaleX` transform

## ScrollToTop Button
- Fixed bottom-right
- Appears after 500px scroll
- Spider-Man web-shoot icon
- Smooth scroll to top on click

---

# ARCHITECTURE — FOLDER STRUCTURE

```
src/
├── assets/
│   ├── images/           # Static images
│   ├── icons/            # SVG icons
│   ├── stickers/         # Decorative stickers (existing)
│   └── fonts/            # Custom font files if needed
│
├── components/
│   ├── ui/               # Reusable primitives
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Tooltip.jsx
│   │   └── Toggle.jsx
│   │
│   ├── layout/           # Structural components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PageWrapper.jsx       # AnimatePresence wrapper
│   │   ├── SectionWrapper.jsx    # Scroll reveal wrapper
│   │   ├── ScrollToTop.jsx
│   │   └── ScrollProgress.jsx
│   │
│   ├── animations/       # Visual effect components
│   │   ├── PreLoader.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── ParticleBackground.jsx   # tsParticles wrapper
│   │   ├── CherryBlossoms.jsx       # Sakura particles
│   │   ├── CodeRain.jsx             # Matrix rain canvas
│   │   ├── GlitchText.jsx           # Spider-Verse glitch
│   │   └── NeonText.jsx             # Glowing neon text
│   │
│   ├── gallery/          # Image display components
│   │   ├── MasonryGallery.jsx       # Pinterest grid
│   │   ├── LightboxModal.jsx        # Full-screen image view
│   │   ├── ImageCard.jsx            # Single image with hover
│   │   └── CloudinaryImage.jsx      # Optimized Cloudinary img
│   │
│   └── shared/           # Cross-page components
│       ├── SectionHeader.jsx        # Consistent section titles
│       ├── StatCard.jsx             # Animated counter card
│       ├── TimelineItem.jsx         # Journey timeline nodes
│       ├── TechBadge.jsx            # Tech stack chips
│       ├── ProjectCard.jsx          # Reusable project cards
│       ├── AchievementCard.jsx      # Achievement display
│       ├── FloatingSticker.jsx      # (Existing) Decorative sticker
│       └── QuoteBlock.jsx           # Styled quote display
│
├── features/
│   ├── blog/
│   │   ├── CalendarView.jsx
│   │   ├── FeedView.jsx
│   │   ├── BlogPost.jsx
│   │   ├── BlogAdmin.jsx
│   │   ├── MoodSelector.jsx
│   │   └── BlogCard.jsx
│   │
│   ├── wall/
│   │   ├── MessageForm.jsx
│   │   ├── MessageNote.jsx
│   │   ├── WallGrid.jsx
│   │   └── EmojiPicker.jsx
│   │
│   └── hackathons/
│       ├── HackathonCard.jsx
│       ├── HackathonDetail.jsx
│       ├── HackathonFilter.jsx
│       └── HackathonTimeline.jsx
│
├── pages/               # Route-level components
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Achievements.jsx
│   ├── Hackathons.jsx
│   ├── HackathonDetailPage.jsx
│   ├── BeyondCode.jsx
│   ├── Journey.jsx
│   ├── OpenSource.jsx
│   ├── Blog.jsx
│   ├── BlogPostPage.jsx
│   ├── Wall.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx      # 404 page with Easter egg
│
├── data/                # Static content
│   ├── projects.js      # (Existing, expand)
│   ├── cp.js            # (Existing, expand)
│   ├── oss.js           # (Existing, expand)
│   ├── links.js         # (Existing)
│   ├── writing.js       # (Existing → migrate to blog)
│   ├── hackathons.js    # NEW: All hackathon data
│   ├── journey.js       # NEW: Timeline milestones
│   ├── gaming.js        # NEW: Gaming achievements
│   ├── sports.js        # NEW: Sports achievements
│   ├── skills.js        # NEW: Skills constellation data
│   ├── anime.js         # NEW: Anime/manhwa lists
│   └── motivations.js   # NEW: Quotes and motivations
│
├── hooks/               # Custom React hooks
│   ├── useScrollProgress.js
│   ├── useFirestore.js
│   ├── useCloudinaryUpload.js
│   ├── useKonamiCode.js
│   ├── useTimeOfDay.js
│   └── useReducedMotion.js
│
├── lib/                 # Third-party configs
│   ├── firebase.js      # Firebase init + auth
│   ├── cloudinary.js    # Cloudinary config
│   └── gsap.js          # GSAP + ScrollTrigger register
│
├── styles/
│   ├── index.css        # Tailwind directives + global reset
│   ├── design-tokens.css # All CSS variables from design system
│   ├── stickers.css     # (Existing) Sticker styles
│   ├── animations.css   # @keyframes for CSS-only animations
│   └── fonts.css        # Font-face declarations
│
├── routes/
│   └── router.jsx       # createBrowserRouter config
│
├── App.jsx              # Root shell: Lenis + Cursor + Layout
└── main.jsx             # Entry point
```

---

# TECH STACK — FULL DEPENDENCY LIST

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "framer-motion": "^11.15.0",
    "gsap": "^3.12.7",
    "lenis": "^1.1.18",
    "@tsparticles/react": "^3.0.0",
    "@tsparticles/slim": "^3.7.1",
    "@cloudinary/url-gen": "^1.21.0",
    "@cloudinary/react": "^1.14.1",
    "firebase": "^10.14.1",
    "dayjs": "^1.11.13",
    "react-responsive-masonry": "^2.3.0",
    "lucide-react": "^0.460.0",
    "react-powerglitch": "^3.1.0",
    "react-markdown": "^9.0.1",
    "partycles": "^2.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "tailwindcss": "^3.4.14",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "vite": "^5.4.10"
  }
}
```

---

# EASTER EGGS 🥚

1. **Konami Code** (↑↑↓↓←→←→BA): Opens secret anime gallery modal
2. **Click spider logo 5x**: Web-slinging animation across screen
3. **Console message**: ASCII art spider + "Hey hacker! 🕷️ Like what you see?"
4. **404 Page**: Mini web-swinging game or funny Spider-Man meme
5. **Idle 60 seconds**: Toast notification with chibi saying "Hey, you still there?"
6. **Type "spidey" anywhere**: Screen flashes spider-web overlay for 2s
7. **Time-based**: Night visitors (10PM-6AM) see stars particle background instead of default

---

# FIREBASE STRUCTURE

```
Firestore:
├── blog_posts/{postId}
│   ├── title: string
│   ├── content: string (markdown)
│   ├── date: timestamp
│   ├── mood: "productive" | "happy" | "learning" | "tough" | "excited" | "special"
│   ├── tags: string[]
│   ├── images: string[] (Cloudinary URLs)
│   ├── slug: string
│   └── createdAt: timestamp
│
├── wall_messages/{msgId}
│   ├── text: string (max 280 chars)
│   ├── name: string | null
│   ├── emoji: string | null
│   ├── isAnonymous: boolean
│   ├── sessionId: string
│   ├── noteColor: string (random pastel hex)
│   ├── rotation: number (-3 to 3)
│   └── createdAt: timestamp
│
└── admin/config
    └── blogPasswordHash: string
```

---

# CLOUDINARY FOLDER STRUCTURE

```
portfolio/
├── gallery/       # Pinterest memories
├── hackathons/    # Screenshots, certificates
├── blog/          # Blog post images
├── sports/        # Basketball, Kabaddi photos
├── gaming/        # Valorant, BGMI screenshots
├── journey/       # Timeline milestone photos
├── projects/      # Project screenshots
└── stickers/      # Custom anime stickers
```

Auto-optimization config: `f_auto,q_auto,w_auto,dpr_auto`

---

# IMPLEMENTATION PHASES

## Phase 1: Foundation (Days 1-2)
- Install all dependencies
- Setup react-router-dom with all 12 routes
- Build layout: Navbar, Footer, PageWrapper
- Setup Lenis smooth scroll + GSAP registration
- Create design-tokens.css with all variables
- Build PreLoader + CustomCursor
- Configure Tailwind with extended theme

## Phase 2: Home Page (Days 3-4)
- Keep Hero as-is
- Build Player Stats section (RPG card)
- Build Skills Constellation (interactive nodes)
- Build Featured Projects bento grid
- Build CTA strip
- Add scroll reveal animations

## Phase 3: Core Pages (Days 5-8)
- Projects page (all sections)
- Achievements page (all sections)
- Open Source page
- Contact page with form

## Phase 4: Story Pages (Days 9-12)
- Journey page with GSAP scroll timeline
- Beyond Code (Gaming, Sports, Anime, Gallery)
- Hackathons overview + detail page template
- "Her" section with cherry blossoms

## Phase 5: Dynamic Features (Days 13-16)
- Firebase setup
- Blog: Calendar view + Feed view + Post page + Admin
- Wall: Anonymous + Named messaging
- Cloudinary integration

## Phase 6: Polish (Days 17-19)
- Particle backgrounds per section
- Easter eggs implementation
- Sticker integration
- Responsive testing
- Performance optimization (lazy loading, code splitting)
- SEO meta tags
- Accessibility

## Phase 7: Deploy (Day 20)
- Production build
- Vercel deployment
- Final testing

---

# PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Bundle Size (gzipped) | < 200KB initial |

**Strategies:**
- `React.lazy()` + `Suspense` per route
- Cloudinary `f_auto,q_auto` for all images
- `loading="lazy"` on all images
- `prefers-reduced-motion` check
- Intersection Observer for scroll reveals
- Font `display=swap` preloading

---

*END OF COMPLETE BLUEPRINT*
*All 3 parts together form the complete design document.*
*Ready to build when you say GO. 🕷️🚀*
