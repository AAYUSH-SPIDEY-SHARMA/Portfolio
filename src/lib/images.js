/**
 * Cloudinary asset registry + URL builder.
 *
 * Every remote image in the site goes through here so that:
 *   1. asset paths live in one place instead of being pasted inline, and
 *   2. every request carries `f_auto,q_auto` — Cloudinary then serves AVIF/WebP
 *      at a sensible quality instead of the multi-megabyte source PNG.
 */

const CLOUD_NAME = 'du8isxcag';
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Build a transformed Cloudinary URL.
 *
 * @param {string} path  Versioned asset path, e.g. "v1779047601/portfolio_assets/MC.png"
 * @param {object} [opts]
 * @param {number} [opts.width]  Cap the width in px (uses c_limit — never upscales)
 * @returns {string}
 */
export function cld(path, { width } = {}) {
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`, 'c_limit');
  return `${BASE}/${transforms.join(',')}/${path}`;
}

/**
 * Build a `srcSet` so browsers can pick a size that matches the viewport and
 * pixel density rather than always downloading the largest rendition.
 *
 * @param {string} path
 * @param {number[]} widths
 * @returns {string}
 */
export function cldSrcSet(path, widths) {
  return widths.map((w) => `${cld(path, { width: w })} ${w}w`).join(', ');
}

/**
 * Same as `cld`, but tolerant of whatever is stored on a post.
 *
 * Uploads save a versioned path ("v123/folder/file.jpg"), but a hand-entered
 * row might hold a full URL — from Cloudinary or anywhere else. Full URLs are
 * returned untouched; Cloudinary ones get transforms injected.
 */
export function imageUrl(stored, { width } = {}) {
  if (!stored) return null;

  if (stored.startsWith('http://') || stored.startsWith('https://')) {
    // Inject transforms into a Cloudinary URL that doesn't have them yet.
    const marker = '/image/upload/';
    const at = stored.indexOf(marker);
    if (at === -1) return stored; // not Cloudinary — leave it alone

    const after = stored.slice(at + marker.length);
    if (/^[a-z]_[^/]*\//.test(after)) return stored; // already transformed

    const transforms = ['f_auto', 'q_auto'];
    if (width) transforms.push(`w_${width}`, 'c_limit');
    return `${stored.slice(0, at + marker.length)}${transforms.join(',')}/${after}`;
  }

  return cld(stored, { width });
}

/** srcSet for a stored image path or URL. */
export function imageSrcSet(stored, widths) {
  if (!stored) return undefined;
  return widths.map((w) => `${imageUrl(stored, { width: w })} ${w}w`).join(', ');
}

/** Canonical asset paths. Add new images here, never inline in a component. */
export const ASSETS = {
  heroBg: 'v1779048913/portfolio_assets/src_assets/hero-bg.png',
  heroIllustration: 'v1779048915/portfolio_assets/src_assets/hero-illustration.png',
  githubIcon: 'v1779048911/portfolio_assets/src_assets/github-icon.png',
  instagramIcon: 'v1779048916/portfolio_assets/src_assets/instagram-icon.png',
  ariseSilhouette: 'v1779048917/portfolio_assets/src_assets/arise-silhouette.jpg',
  eyes: 'v1779047589/portfolio_assets/EYES_HD.png',
  portrait: 'v1779047603/portfolio_assets/portfolio.png',
  mainCharacter: 'v1779047601/portfolio_assets/MC.png',
  card6: 'v1779047550/portfolio_assets/card6.png',
  card7: 'v1779047552/portfolio_assets/card7.png',
  card8: 'v1779047554/portfolio_assets/card8.png',
  card5: 'v1779048030/portfolio_assets/card5_lossless.webp',
  card9: 'v1779048016/portfolio_assets/card9_lossless.webp',
};
