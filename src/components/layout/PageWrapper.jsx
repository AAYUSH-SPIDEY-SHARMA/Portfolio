import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useEffects';

/**
 * Wraps every page: resets scroll position and plays the entrance animation.
 *
 * There is no `exit` variant — see the note in App.jsx for why route-level exit
 * animations are not used with this router setup.
 */
const PageWrapper = ({ children, className = '' }) => {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      className={`page-wrapper ${className}`}
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
