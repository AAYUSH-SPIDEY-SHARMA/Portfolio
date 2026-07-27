// ═══════════════════════════════════════════════════════════════
// Authenticated image upload → Cloudinary
//
// The browser never sees the Cloudinary API secret. The admin sends their
// Supabase access token; this function verifies it against Supabase, and only
// then signs and forwards the upload.
// ═══════════════════════════════════════════════════════════════

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const UPLOAD_FOLDER = 'portfolio_journal';
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

export const config = {
  api: {
    bodyParser: { sizeLimit: '12mb' },
  },
};

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
  if (!origin) return { allowed: true, value: null };
  if (ALLOWED_ORIGINS.includes(origin)) return { allowed: true, value: origin };
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return { allowed: true, value: origin };
  return { allowed: false, value: null };
}

/** Ask Supabase whether this access token belongs to a real, current user. */
async function verifyUser(token) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: SUPABASE_ANON_KEY,
    },
  });

  if (!res.ok) return null;
  const user = await res.json();
  return user?.id ? user : null;
}

/** Cloudinary signed uploads: sha1 of the sorted params plus the API secret. */
async function sign(params) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');

  const buffer = await crypto.subtle.digest(
    'SHA-1',
    new TextEncoder().encode(toSign + API_SECRET)
  );

  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default async function handler(req, res) {
  const origin = resolveOrigin(req);

  res.setHeader('Vary', 'Origin');
  if (origin.value) res.setHeader('Access-Control-Allow-Origin', origin.value);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (!origin.allowed) return res.status(403).json({ error: 'Origin not allowed' });
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return res.status(500).json({ error: 'Image hosting is not configured on the server.' });
  }

  // ── Authenticate ──
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Sign in to upload.' });

  const user = await verifyUser(token);
  if (!user) return res.status(401).json({ error: 'Your session expired. Sign in again.' });

  // ── Validate ──
  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const dataUrl = body?.file;

  if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return res.status(400).json({ error: 'No image received.' });
  }

  const mime = dataUrl.slice(5, dataUrl.indexOf(';'));
  if (!ALLOWED_TYPES.includes(mime)) {
    return res.status(415).json({ error: `Unsupported image type: ${mime || 'unknown'}` });
  }

  // A base64 payload is ~4/3 the size of the bytes it encodes.
  const base64Length = dataUrl.length - dataUrl.indexOf(',') - 1;
  if (base64Length * 0.75 > MAX_BYTES) {
    return res.status(413).json({ error: 'That image is over 10 MB. Try a smaller one.' });
  }

  // ── Upload ──
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signParams = { folder: UPLOAD_FOLDER, timestamp };
    const signature = await sign(signParams);

    const form = new URLSearchParams({
      file: dataUrl,
      api_key: API_KEY,
      timestamp: String(timestamp),
      folder: UPLOAD_FOLDER,
      signature,
    });

    const upload = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: form,
    });

    if (!upload.ok) {
      console.error('[upload] Cloudinary error:', await upload.text());
      return res.status(502).json({ error: 'Upload failed. Try again.' });
    }

    const result = await upload.json();

    return res.status(200).json({
      // Store the versioned path, not the full URL — lib/images.js adds the
      // f_auto,q_auto transforms at render time.
      path: `v${result.version}/${result.public_id}.${result.format}`,
      url: result.secure_url,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error('[upload] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Something went wrong uploading that image.' });
  }
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
