import { useEffect } from 'react';

const SITE_NAME = 'Aayush Sharma';
const SITE_URL = 'https://aayushsharma.me';
const DEFAULT_IMAGE =
  'https://res.cloudinary.com/du8isxcag/image/upload/f_auto,q_auto,w_1200/portfolio_assets/portfolio.png';

/** Create the tag if it doesn't exist yet, then set its content. */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

/**
 * Per-route document metadata.
 *
 * This is a single-page app, so every route previously shared the one static
 * `<title>` from index.html — bad for search results, browser history, and
 * link previews. Drop this into a page and it keeps the head in sync.
 *
 * Renders nothing.
 */
const Seo = ({ title, description, path = '', image = DEFAULT_IMAGE, type = 'website', noIndex = false }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;

    setMeta('name', 'description', description);
    setCanonical(url);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', type);

    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
  }, [title, description, path, image, type, noIndex]);

  return null;
};

export default Seo;
