import { useState, useEffect, useMemo } from 'react';

/**
 * Responsive column count, driven by matchMedia rather than a resize listener
 * so it doesn't fire on every pixel of a drag.
 */
export function useColumnCount() {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.matchMedia('(min-width: 1280px)').matches) return 4;
    if (window.matchMedia('(min-width: 768px)').matches) return 3;
    return 2;
  });

  useEffect(() => {
    const queries = [
      { mq: window.matchMedia('(min-width: 1280px)'), value: 4 },
      { mq: window.matchMedia('(min-width: 768px)'), value: 3 },
    ];

    const update = () => {
      const match = queries.find((q) => q.mq.matches);
      setCount(match ? match.value : 2);
    };

    update();
    queries.forEach(({ mq }) => mq.addEventListener('change', update));
    return () => queries.forEach(({ mq }) => mq.removeEventListener('change', update));
  }, []);

  return count;
}

/** Text-only cards have no intrinsic ratio; estimate height from how much there is to read. */
const TEXT_CARD_BASE = 0.62;
const TEXT_CARD_PER_CHAR = 0.0016;
const TEXT_CARD_MAX = 1.35;

function estimateRatio(post) {
  if (post.image_url && post.image_width && post.image_height) {
    // Clamp so one extreme panorama or tower can't wreck the column balance.
    return Math.min(Math.max(post.image_height / post.image_width, 0.5), 1.9);
  }
  if (post.image_url) return 1; // unknown dimensions — assume square

  const length = (post.caption?.length ?? 0) + (post.title?.length ?? 0);
  return Math.min(TEXT_CARD_BASE + length * TEXT_CARD_PER_CHAR, TEXT_CARD_MAX);
}

/**
 * Distribute posts into balanced columns.
 *
 * CSS `columns` would be one line of CSS, but it fills top-to-bottom per column,
 * so a chronological feed reads down column one before jumping back up to
 * column two. This assigns each post to whichever column is currently shortest,
 * which keeps left-to-right reading order roughly chronological *and* keeps the
 * column bottoms even.
 *
 * Heights come from the stored image dimensions, so nothing reflows once the
 * images actually load.
 */
export function useMasonryColumns(posts, columnCount) {
  return useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => []);
    const heights = new Array(columnCount).fill(0);

    for (const post of posts) {
      let shortest = 0;
      for (let i = 1; i < columnCount; i++) {
        if (heights[i] < heights[shortest]) shortest = i;
      }
      columns[shortest].push(post);
      // +0.18 approximates the caption/meta block under each card.
      heights[shortest] += estimateRatio(post) + 0.18;
    }

    return columns;
  }, [posts, columnCount]);
}

export { estimateRatio };
