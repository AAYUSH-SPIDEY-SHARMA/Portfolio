import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Link2, Check } from 'lucide-react';
import { imageUrl, imageSrcSet } from '../../lib/images';
import { postTitle } from '../../lib/posts';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

/**
 * Full-view overlay for a single post.
 *
 * Image on the left, caption on the right on desktop; stacked on mobile.
 * Arrow keys and Escape work, focus is trapped to the panel, and the page
 * behind it can't scroll.
 */
const PostLightbox = ({ post, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowLeft' && hasPrev) { onPrev(); return; }
      if (e.key === 'ArrowRight' && hasNext) { onNext(); return; }

      // Keep Tab inside the dialog.
      if (e.key === 'Tab') {
        const focusables = panelRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const hasImage = Boolean(post.image_url);
  const title = postTitle(post);

  /*
    Rendered into document.body rather than in place.

    PageWrapper animates `y`, which leaves a transform on the wrapper — and a
    transformed ancestor becomes the containing block for `position: fixed`
    descendants. Without this portal the overlay anchors to the page wrapper
    instead of the viewport and sits visibly off-screen.
  */
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-6 md:p-10"
      style={{ background: 'rgba(23, 22, 20, 0.72)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[88vh] sm:rounded-[26px] ${
          hasImage ? 'md:max-w-5xl md:flex-row' : 'md:max-w-2xl'
        }`}
      >
        {/* Close */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#3A3630] shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <X size={17} />
        </button>

        {/* Image */}
        {hasImage && (
          <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#141312] md:max-w-[62%]">
            <img
              src={imageUrl(post.image_url, { width: 1600 })}
              srcSet={imageSrcSet(post.image_url, [800, 1200, 1600, 2000])}
              sizes="(max-width: 768px) 100vw, 62vw"
              alt={post.caption ? title : ''}
              className="max-h-[52vh] w-full object-contain sm:max-h-[88vh] md:max-h-[88vh]"
            />
          </div>
        )}

        {/* Caption side */}
        <div className={`flex min-h-0 flex-col ${hasImage ? 'md:w-[38%]' : 'w-full'}`}>
          <div className="flex-1 overflow-y-auto px-6 py-7 md:px-8 md:py-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9A938A]">
              {formatDate(post.published_at)}
            </p>

            {post.title && (
              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-[#1F1C18] md:text-3xl">
                {post.title}
              </h2>
            )}

            {post.caption && (
              <div className="mt-4 space-y-4">
                {post.caption.split(/\n{2,}|\n/).filter(Boolean).map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.7] text-[#4A443C]">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {post.tags?.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[#F4F1EC] px-3 py-1 text-[11px] font-mono text-[#7A736A]"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer controls */}
          <div className="flex shrink-0 items-center justify-between border-t border-[#EDE9E2] px-5 py-3">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#7A736A] transition-colors hover:bg-[#F4F1EC] hover:text-[#1F1C18]"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Link2 size={13} />}
              {copied ? 'Link copied' : 'Copy link'}
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                aria-label="Previous post"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7A736A] transition-colors hover:bg-[#F4F1EC] hover:text-[#1F1C18] disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                aria-label="Next post"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7A736A] transition-colors hover:bg-[#F4F1EC] hover:text-[#1F1C18] disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default PostLightbox;
