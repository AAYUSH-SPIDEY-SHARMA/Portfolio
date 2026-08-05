import { motion } from 'framer-motion';
import { cld, cldSrcSet, ASSETS } from '../../lib/images';

/**
 * Thin spider rule between home sections.
 *
 * Purely decorative, so it is hidden from assistive tech. It draws itself in
 * from the centre as it scrolls into view — `once` keeps it from replaying
 * every time the user scrolls back up.
 */
const SectionDivider = ({ className = '' }) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, scaleX: 0.4 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className={`w-full flex justify-center py-10 md:py-14 ${className}`}
  >
    <img
      src={cld(ASSETS.divider, { width: 1200 })}
      srcSet={cldSrcSet(ASSETS.divider, [600, 900, 1200])}
      sizes="(max-width: 768px) 90vw, 1100px"
      alt=""
      loading="lazy"
      decoding="async"
      className="w-[90%] max-w-[1100px] h-auto select-none pointer-events-none"
    />
  </motion.div>
);

export default SectionDivider;
