import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';

/**
 * Reusable card with spotlight mouse-tracking effect
 * Props: children, className, hover (enable hover lift), glow (color name)
 */
const Card = ({ children, className = '', hover = true, glow = '', onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const glowClasses = {
    purple: 'hover:shadow-[var(--glow-purple)]',
    blue: 'hover:shadow-[var(--glow-blue)]',
    red: 'hover:shadow-[var(--glow-red)]',
    green: 'hover:shadow-[var(--glow-green)]',
    pink: 'hover:shadow-[var(--glow-pink)]',
    gold: 'hover:shadow-[var(--glow-gold)]',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      className={`
        rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)]
        hover:border-[var(--primary)]/20 transition-all duration-300
        card-spotlight overflow-hidden
        ${glow ? glowClasses[glow] || '' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
