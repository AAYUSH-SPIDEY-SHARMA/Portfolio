import { useState } from 'react';
import { motion } from 'framer-motion';
import { imageUrl, imageSrcSet } from '../../lib/images';
import { postTitle } from '../../lib/posts';
import { estimateRatio } from './useMasonry';

/**
 * Six muted paper tints for text-only cards. Deliberately desaturated — a
 * saturated rainbow is the fastest way to make a feed look generated.
 */
const TEXT_TINTS = [
  { bg: '#F4F1EC', ink: '#2E2A24', rule: '#D8D2C8' },
  { bg: '#EFF1F4', ink: '#232A33', rule: '#D2D8E0' },
  { bg: '#F3F0F4', ink: '#2C2533', rule: '#DCD4E2' },
  { bg: '#EFF3F1', ink: '#22302A', rule: '#D2DED8' },
  { bg: '#F5F0EE', ink: '#332723', rule: '#E2D5D0' },
  { bg: '#F2F2EE', ink: '#2B2B26', rule: '#DADAD2' },
];

/** Stable tint per post, so a card doesn't change colour between visits. */
function tintFor(id = '') {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return TEXT_TINTS[hash % TEXT_TINTS.length];
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

const PostCard = ({ post, index, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const hasImage = Boolean(post.image_url);
  const ratio = estimateRatio(post);
  const tint = tintFor(post.id);
  const title = postTitle(post);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '80px' }}
      transition={{
        duration: 0.55,
        // Stagger only within the first screenful; later cards appear instantly
        // as you scroll, which feels responsive rather than laggy.
        delay: Math.min(index * 0.045, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group mb-4 md:mb-5"
    >
      <button
        type="button"
        onClick={() => onOpen(post)}
        aria-label={`Open: ${title}`}
        className="block w-full text-left rounded-2xl focus-visible:outline-none"
      >
        {hasImage ? (
          <div
            className="relative w-full overflow-hidden rounded-2xl bg-[#EFEFEC]"
            // Reserve the exact box before the image arrives — no layout shift,
            // no columns re-balancing mid-scroll.
            style={{ aspectRatio: `1 / ${ratio}` }}
          >
            {!loaded && <div className="absolute inset-0 animate-shimmer" aria-hidden="true" />}

            <img
              src={imageUrl(post.image_url, { width: 800 })}
              srcSet={imageSrcSet(post.image_url, [400, 600, 800, 1200])}
              sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 22vw"
              alt={post.caption ? title : ''}
              loading={index < 6 ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Scrim only on hover, and only at the foot of the card. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-[13px] font-medium leading-snug text-white line-clamp-2">
                {title}
              </p>
            </div>

            {/* Hairline keeps pale images from bleeding into the page. */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.06]" />
          </div>
        ) : (
          <div
            className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
            style={{ aspectRatio: `1 / ${ratio}`, background: tint.bg }}
          >
            <span
              className="font-display text-2xl leading-none opacity-25"
              style={{ color: tint.ink }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <p
              className="font-heading text-[15px] leading-[1.5] md:text-base line-clamp-[9]"
              style={{ color: tint.ink }}
            >
              {post.caption}
            </p>

            <span className="h-px w-8" style={{ background: tint.rule }} aria-hidden="true" />

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
          </div>
        )}
      </button>

      {/* Meta sits outside the card, Pinterest-style — quiet, not competing. */}
      <div className="px-1 pt-2.5">
        {hasImage && post.caption && (
          <p className="text-[13px] font-medium leading-snug text-[var(--text-primary)] line-clamp-2">
            {title}
          </p>
        )}
        <p className="mt-0.5 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
          {formatDate(post.published_at)}
        </p>
      </div>
    </motion.article>
  );
};

export default PostCard;
