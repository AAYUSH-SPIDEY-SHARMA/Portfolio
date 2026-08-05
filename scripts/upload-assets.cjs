/*
 * One-off: push the new source images to Cloudinary untouched.
 *
 * No eager transforms, no quality or format params — Cloudinary keeps the
 * original bytes as the master asset. Compression happens only at delivery
 * time, via the f_auto,q_auto that lib/images.js appends per request.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read .env directly so the secrets never pass through a shell argument.
const env = {};
for (const line of fs.readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const CLOUD = env.CLOUDINARY_CLOUD_NAME;
const KEY = env.CLOUDINARY_API_KEY;
const SECRET = env.CLOUDINARY_API_SECRET;

if (!CLOUD || !KEY || !SECRET) {
  console.error('Missing Cloudinary credentials in .env');
  process.exit(1);
}

const FOLDER = 'portfolio_assets';

const files = [
  { file: 'public/hero.png', id: 'hero-bg-moonlit' },
  { file: 'public/banner.png', id: 'footer-banner-spidey' },
  { file: 'public/divider.png', id: 'divider-spider' },
  { file: 'public/spider-mark.png', id: 'spider-mark' },
];

function sign(params) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(toSign + SECRET).digest('hex');
}

(async () => {
  const results = {};

  for (const { file, id } of files) {
    const bytes = fs.readFileSync(file);
    const ext = path.extname(file).slice(1);
    const dataUrl = `data:image/${ext};base64,${bytes.toString('base64')}`;

    const timestamp = Math.round(Date.now() / 1000);
    // Every upload param except file/api_key/resource_type has to be signed.
    // None of these alter the stored bytes.
    const signParams = {
      folder: FOLDER,
      invalidate: 'true',
      overwrite: 'true',
      public_id: id,
      timestamp,
    };
    const signature = sign(signParams);

    const form = new URLSearchParams({
      ...signParams,
      timestamp: String(timestamp),
      file: dataUrl,
      api_key: KEY,
      signature,
    });

    process.stdout.write(`${path.basename(file).padEnd(18)} ${(bytes.length / 1024).toFixed(0)} KB → `);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
      method: 'POST',
      body: form,
    });

    if (!res.ok) {
      console.log('FAILED');
      console.error(await res.text());
      process.exit(1);
    }

    const r = await res.json();
    const versionedPath = `v${r.version}/${r.public_id}.${r.format}`;
    results[id] = versionedPath;
    console.log(`ok  ${r.width}x${r.height}  ${(r.bytes / 1024).toFixed(0)} KB stored`);
    console.log(`${''.padEnd(18)}   ${versionedPath}`);
  }

  console.log('\n──── paths for ASSETS in src/lib/images.js ────');
  console.log(JSON.stringify(results, null, 2));
})();
