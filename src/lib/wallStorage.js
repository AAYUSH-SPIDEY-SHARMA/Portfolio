/**
 * Whisper Wall persistence.
 *
 * Messages used to live in component state behind an `alert()`, so every
 * refresh wiped them. They now persist in localStorage. This is per-visitor
 * (nothing is shared between browsers) — swapping in a real backend later means
 * replacing only the two functions below.
 */

const KEY = 'whisper-wall:v1';
const MAX_MESSAGES = 200;

export const seedMessages = [
  { id: 's1', text: 'Amazing portfolio bro! 🔥 The Spider-Verse theme is next level', name: null, isAnonymous: true, createdAt: Date.now() - 2 * 36e5, emoji: '🔥' },
  { id: 's2', text: 'You inspire me to build cooler things', name: 'Rahul', isAnonymous: false, createdAt: Date.now() - 864e5, emoji: '💜' },
  { id: 's3', text: 'Keep going! IIITL represents 🏆', name: null, isAnonymous: true, createdAt: Date.now() - 3 * 864e5, emoji: '🏆' },
  { id: 's4', text: 'The gaming section had me hyped! Fellow Valorant player here', name: 'Priya', isAnonymous: false, createdAt: Date.now() - 5 * 864e5, emoji: '🎮' },
  { id: 's5', text: 'Solo Leveling fan spotted 👊 Great taste', name: null, isAnonymous: true, createdAt: Date.now() - 7 * 864e5, emoji: '⚔️' },
  { id: 's6', text: 'That Meta Hacker Cup rank is insane respect', name: 'Aditya', isAnonymous: false, createdAt: Date.now() - 8 * 864e5, emoji: '🧠' },
  { id: 's7', text: 'Cherry blossom section literally made me emotional', name: null, isAnonymous: true, createdAt: Date.now() - 14 * 864e5, emoji: '🌸' },
  { id: 's8', text: 'Can we collab on a hackathon? DM me!', name: 'Sneha', isAnonymous: false, createdAt: Date.now() - 15 * 864e5, emoji: '🚀' },
];

export function loadMessages() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedMessages;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedMessages;
    // Visitor-written notes first, then the seeds for a never-empty board.
    return [...parsed, ...seedMessages];
  } catch {
    return seedMessages;
  }
}

export function saveMessage(message) {
  try {
    const raw = localStorage.getItem(KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const next = [message, ...(Array.isArray(existing) ? existing : [])].slice(0, MAX_MESSAGES);
    localStorage.setItem(KEY, JSON.stringify(next));
    return true;
  } catch {
    // Private mode / quota exceeded — the note still shows for this session.
    return false;
  }
}

/** Timestamp -> "just now" / "3h ago" / "2w ago" */
export function relativeTime(ts) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 6e4);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.floor(day / 7);
  if (wk < 5) return `${wk}w ago`;
  return `${Math.floor(day / 30)}mo ago`;
}
