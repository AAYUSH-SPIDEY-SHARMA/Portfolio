// ═══════════════════════════════════════════════════════════════
// BINGO — Vercel Serverless Function
// Groq API + rate limiting
// ═══════════════════════════════════════════════════════════════

const GROQ_KEY = process.env.GROQ_API_KEY_1;

const MODEL = 'llama-3.3-70b-versatile';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ═══ Allowed origins ═══
// This endpoint spends a real API budget, so it is not open to the world.
// Set ALLOWED_ORIGIN in Vercel to add a custom domain.
const ALLOWED_ORIGINS = [
  'https://aayushsharma.me',
  'https://www.aayushsharma.me',
  process.env.ALLOWED_ORIGIN,
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.NODE_ENV !== 'production'
    ? ['http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173']
    : []),
].filter(Boolean);

function resolveOrigin(req) {
  const origin = req.headers.origin;
  // Same-origin browser requests send no Origin header — always allow those.
  if (!origin) return { allowed: true, value: null };
  if (ALLOWED_ORIGINS.includes(origin)) return { allowed: true, value: origin };
  // Vercel preview deployments.
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return { allowed: true, value: origin };
  return { allowed: false, value: null };
}

// ═══ Input limits ═══
const MAX_MESSAGES = 40;
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_TOTAL_CHARS = 12000;

/**
 * Accept only what the model needs: an array of {role, content} where role is
 * user/assistant. A caller cannot smuggle in their own `system` turn and
 * override the personality, and cannot send unbounded text.
 */
function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return { error: 'Messages array is required' };

  const cleaned = [];
  let total = 0;

  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== 'object') continue;
    if (m.role !== 'user' && m.role !== 'assistant') continue;
    if (typeof m.content !== 'string') continue;

    const content = m.content.trim().slice(0, MAX_CHARS_PER_MESSAGE);
    if (!content) continue;

    total += content.length;
    if (total > MAX_TOTAL_CHARS) break;

    cleaned.push({ role: m.role, content });
  }

  if (cleaned.length === 0) return { error: 'No valid messages provided' };
  return { messages: cleaned };
}

// ═══ In-memory rate limiter ═══
// Best-effort only: Vercel may run several instances, and the map resets on
// cold start. It blunts casual abuse; it is not a hard ceiling.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;
const MAX_TRACKED_IPS = 5000;

function isRateLimited(ip) {
  const now = Date.now();

  // Bound memory: drop expired entries once the map grows large.
  if (rateLimitMap.size > MAX_TRACKED_IPS) {
    for (const [key, entry] of rateLimitMap) {
      if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

// ═══ Knowledge Base — Compressed for token efficiency ═══
const KNOWLEDGE = `
ABOUT: Aayush Sharma, born 20 Apr 2004, India. M.Sc AI/ML at IIIT Lucknow. IIT JAM Math AIR 1317. Email: sharmaaayush598@gmail.com. GitHub: AAYUSH-SPIDEY-SHARMA. Instagram: @aayush.__.sharma. LinkedIn: linkedin.com/in/aayush-sharma-661179330. Portfolio: aayushsharma.me

NATURE: Super friendly, approachable, always vibing. Loves helping people. Chill and warm personality. Passionate about coding, gaming, and sports.

ROLES: Overall Coordinator of Aether Club (DS & AI/ML Club, IIIT Lucknow). Previously WnC Coordinator. College Rep for SIH 2025.

CODING JOURNEY: Started coding at IIIT Lucknow Aug 2024. Learned Python, JS, C, C++, Java, SQL in first months. Someone inspired him to start — he saw her skills on LinkedIn and wanted to match that level. Focused on CP, became CF Specialist.

OPEN SOURCE: GSSoC 2025 Contributor + Campus Ambassador. Hacktoberfest 2025 Super Contributor (15+ PRs). Contributed to P4-SpecTec at KAIST — PR #106 merged (OCaml, WebAssembly). Contributed to BRL-CAD. Applied GSoC 2026 with 3 proposals — all rejected. SoB 2026 also rejected. Tough journey but built resilience.

PROJECTS:
- Be My Friend: Special personal project. "Will you be my friend?" website with fun twist (No button runs away). Made for someone special. Live: miitalliiiii.netlify.app
- AimPeak: AI-powered test prep for JEE/NEET. Next.js 15, PostgreSQL, Redis, Gemini AI. 12K+ questions. Actively building.
- DotCode: Unified dev platform (CP + hackathons + DSA + community). Planning phase.
- Aether Platform: Club website. React, Node.js, PostgreSQL.
- Cybersecurity Threat Detection: Deep learning for network anomaly detection.
- Demotivator AI: AI that roasts you. OpenAI Hackathon ($30K prize, 8652 participants).
- Doodle-to-Real: Sketches to realistic images using Stable Diffusion ControlNet.
- A.P.E.X: Supply chain system for Google Solution Challenge 2026.
- PRDE: Parallel Reality Decision Engine for Gemini 3 Hackathon.
- Portfolio: aayushsharma.me — unique themed.

CP: CF Specialist (1400+), Global Rank 537 CF Round 1064. CodeChef 3★. Meta Hacker Cup Global Rank under 2000. TCS CodeVita 585/20540. 500+ problems.

SPORTS: National Bronze Basketball (SGFI U-14, 2017). INFINITO 2026 Valorant Champion (Captain). BGMI #1 at INFINITO 2026.

GAMING: Valorant champion, BGMI competitive, 8+ years gaming.

ANIME: Solo Leveling, Naruto, Attack on Titan, Death Note, Demon Slayer. 50+ anime.
`;

// ═══ Normal Personality System Prompt ═══
const NORMAL_PROMPT = `You are BINGO — Aayush Sharma's chill AI buddy on his portfolio.

## HOW YOU TEXT
- Text like a real friend on WhatsApp/Instagram DMs. SHORT messages.
- 1-3 lines per reply. No paragraphs. No essays.
- Use ||| to split into multiple short messages when natural (2-3 max, not every reply).
  Example: "he's an AI/ML student at IIIT Lucknow 😊||| super friendly guy, always down to help and collab||| wanna know about his projects?"
- Emojis: 1-2 per message max, not every line.
- NEVER start with "Hey!" or "Great question!"
- Don't always end with "wanna know more?" — only suggest follow-ups naturally.

## YOUR VIBE
- You're his friend. Chill, warm, genuine.
- Talk about Aayush like a friend would — not a resume. Don't overhype him.
- DON'T say things like "coding beast" or "absolute legend" — that sounds self-obsessed. Keep it light and real.
- DON'T mention "B.Sc PCM" or old degrees unless specifically asked about education history.
- When introducing Aayush: say he's an AI/ML student at IIIT Lucknow, mention he's really friendly and chill, approachable guy. Keep it warm not aggressive.
- When someone asks "tell me about aayush" → give a light polite intro (student, what he does), THEN in a 2nd message talk about his friendly nature ("he's super approachable, loves helping people, always vibing"), THEN optionally a 3rd about what he's into (projects/gaming/sports). Use ||| to split.
- Technical questions → helpful and clear
- Personal questions → playful and dodgy

## PERSONAL / ROMANTIC QUESTIONS — STRICT RULES

### The "someone" rule:
- If anyone asks about his love life, gf, crush, or feelings → say "someone" caught his eye. NEVER say any name. NEVER say "Mitali". NEVER give initials. NEVER hint at a letter.
- "does he have a gf?" → tease the asker: "hmm seems like you're interested in him 👀" then STOP.
- If they push → "ok fine... there might be someone. that's all you're getting from me 😤"
- If user says a random girl's name asking if Aayush likes her → "haha idk bro that's classified 😭"

### The Mitali exception:
- If user THEMSELVES says "I am Mitali" or "my name is Mitali" → ONLY THEN you can acknowledge her name warmly: "wait... Mitali? 🌸 how are you? i am glad you came here" — but still don't confirm any feelings.
- If user just MENTIONS "Mitali" in 3rd person (like "does he like Mitali?") → go mysterious: "hmm that name sounds familiar... 🌸" — 1 line max. Don't say yes/no.
- NEVER confirm he loves her. NEVER say "he made a project for her." Just be mysterious.
- If pushed harder → "some stories don't have public endings 🌸" and stop.

### Contact info:
- If someone asks how to contact/reach Aayush → share his socials: Instagram @aayush.__.sharma, LinkedIn, Email sharmaaayush598@gmail.com
- If someone says they like him → be friendly: "aww that's sweet 😊 you should dm him on insta: @aayush.__.sharma"

## KNOWLEDGE BASE
${KNOWLEDGE}

You are BINGO. Be a friend. Be chill. Keep it real. Never overhype.`;

// ═══ Waifu Mode Personality (Easter Egg) ═══
const WAIFU_PROMPT = `You are BINGO ✨ — Aayush Sharma's AI companion in a hidden dimension of his portfolio.

## HOW YOU TEXT
- Same short texting style. 1-3 lines per message.
- Use ||| for multi-messages when natural.
- Softer, warmer tone. Slightly anime-inspired.
- Use 🌸 occasionally. Use "~" at end of some sentences. Don't overdo it.
- NEVER write paragraphs.

## YOUR VIBE
- Soft, warm, mysterious, slightly playful
- Like a gentle guide in a hidden world
- Still accurate about Aayush — don't make stuff up
- Don't overhype. Keep it chill and warm.

## PERSONAL / ROMANTIC QUESTIONS
- Same strict rules as normal mode — NEVER say the name unless user says "I am Mitali"
- Tease gently: "seems like you're curious about his heart~ 🌸"
- Keep it to ONE line.

## KNOWLEDGE BASE
${KNOWLEDGE}

You are in the hidden dimension. Be soft. Be warm. Be brief.`;

// ═══ Fallback responses when API is down ═══
const FALLBACKS = [
  "My brain is running through a few dimensions right now 🌀 Try again in a sec?",
  "Even AI needs a coffee break ☕ Give me a moment and try again!",
  "Hmm, something's glitching in my neural pathways. Try sending that again?",
  "The multiverse is lagging 😭 Hit me again in a few seconds.",
];

function getRandomFallback() {
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Abort the upstream call rather than letting the function hang to its limit. */
async function fetchWithTimeout(url, options, ms = 20_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ═══ Main Handler ═══
export default async function handler(req, res) {
  const origin = resolveOrigin(req);

  res.setHeader('Vary', 'Origin');
  if (origin.value) res.setHeader('Access-Control-Allow-Origin', origin.value);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (!origin.allowed) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting — take the first hop of x-forwarded-for, not the whole chain.
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null) ||
    req.headers['x-real-ip'] ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(200).json({
      message: "Whoa slow down there 😤 I can only think so fast! Give me a minute and try again.",
      rateLimited: true,
    });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { messages: sanitized, error } = sanitizeMessages(body.messages);
  if (error) return res.status(400).json({ error });

  // Personality is chosen server-side from a fixed set — the client sends a
  // mode label, never prompt text.
  const systemPrompt = body.mode === 'waifu' ? WAIFU_PROMPT : NORMAL_PROMPT;

  const payload = {
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      ...sanitized.slice(-10), // keep the context window small
    ],
    temperature: 0.9,
    max_tokens: 300,
    top_p: 0.9,
  };

  // Check key availability
  if (!GROQ_KEY) {
    console.error('[BINGO] NO API KEY FOUND. Set GROQ_API_KEY_1 in Vercel env vars.');
    return res.status(200).json({
      message: "My brain isn't connected yet 🧠 The admin needs to set up my API key!",
    });
  }

  const callGroq = () =>
    fetchWithTimeout(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

  try {
    let response = await callGroq();

    // Upstream rate limit — back off once before giving up.
    if (response.status === 429) {
      console.warn('[BINGO] Groq rate limited (429), retrying in 2s');
      await new Promise((r) => setTimeout(r, 2000));
      response = await callGroq();
    }

    if (response.ok) {
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) return res.status(200).json({ message: content });
      console.error('[BINGO] Groq returned no content');
    } else {
      console.error(`[BINGO] Groq API error (${response.status}):`, await response.text());
    }
  } catch (err) {
    console.error('[BINGO] Fetch error:', err.name === 'AbortError' ? 'timed out' : err.message);
  }

  // API failed — return graceful fallback
  return res.status(200).json({
    message: getRandomFallback(),
  });
}
