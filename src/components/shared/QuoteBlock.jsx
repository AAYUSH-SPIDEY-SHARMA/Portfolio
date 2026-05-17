import { motion } from 'framer-motion';

/**
 * QuoteBlock — styled quote display with optional author and gradient accent
 * 
 * @param {string} quote - The quote text
 * @param {string} author - Attribution (optional)
 * @param {string} accentColor - CSS color for the left border accent (optional)
 * @param {'serif'|'handwriting'|'mono'} font - Font style (optional)
 */
const QuoteBlock = ({ quote, author, accentColor = 'var(--primary)', font = 'serif' }) => {
  const fontFamily = {
    serif: 'Georgia, serif',
    handwriting: 'Caveat, cursive',
    mono: 'JetBrains Mono, monospace',
  };

  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative pl-6 py-4"
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
        style={{ background: `linear-gradient(180deg, ${accentColor}, transparent)` }}
      />

      <p
        className="text-sm text-[var(--text-secondary)] italic leading-relaxed"
        style={{ fontFamily: fontFamily[font] || fontFamily.serif }}
      >
        "{quote}"
      </p>

      {author && (
        <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">
          — {author}
        </p>
      )}
    </motion.blockquote>
  );
};

export default QuoteBlock;
