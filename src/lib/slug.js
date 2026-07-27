/**
 * Blog URL helpers.
 *
 * Post URLs are `/blog/:date/:slug`. Both segments were previously derived by
 * copy-pasted regexes in four separate files, which meant a link could be
 * generated one way and matched another. Everything now goes through here.
 */

/** "Built the Future Today" -> "built-the-future-today" */
export function toSlug(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** "May 14, 2026" -> "May-14-2026" (only used when a post has no dateSlug) */
export function toDateSlug(date = '') {
  return date.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)+/g, '');
}

/** The canonical route for a post. */
export function postPath(post) {
  const date = post.dateSlug || toDateSlug(post.date);
  const slug = post.slug || toSlug(post.title);
  return `/blog/${date}/${slug}`;
}

/** True when a post matches the `:date`/`:slug` params from the router. */
export function matchesPost(post, date, slug) {
  const postDate = post.dateSlug || toDateSlug(post.date);
  const postSlug = post.slug || toSlug(post.title);
  return postDate === date && postSlug === slug;
}
