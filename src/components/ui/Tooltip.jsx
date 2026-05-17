import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tooltip — hover tooltip with animated entrance
 */
const Tooltip = ({ children, content, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const origins = {
    top: { initial: { opacity: 0, y: 5, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
    bottom: { initial: { opacity: 0, y: -5, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
    left: { initial: { opacity: 0, x: 5, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
    right: { initial: { opacity: 0, x: -5, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            {...origins[position]}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${positions[position]} z-50 pointer-events-none`}
          >
            <div className="px-3 py-1.5 rounded-lg text-[10px] font-medium text-white whitespace-nowrap"
              style={{ background: 'rgba(19,19,26,0.95)', border: '1px solid var(--border-default)', backdropFilter: 'blur(8px)' }}>
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
