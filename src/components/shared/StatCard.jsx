import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Animated counter stat card
 * Props: value (number), label, suffix, icon, color
 */
const StatCard = ({ value, label, suffix = '', icon, color = 'purple' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const displayRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(count, parseInt(value) || 0, { duration: 2, ease: 'easeOut' });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v + suffix;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  const colorMap = {
    purple: 'text-[var(--primary)]',
    blue: 'text-[var(--secondary)]',
    red: 'text-[var(--accent-red)]',
    gold: 'text-[var(--accent-gold)]',
    green: 'text-[var(--accent-matrix)]',
    pink: 'text-[var(--romance-pink)]',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/20 transition-all"
    >
      {icon && <div className="mb-2">{icon}</div>}
      <div ref={displayRef} className={`text-3xl font-bold font-display ${colorMap[color] || colorMap.purple}`}>
        0{suffix}
      </div>
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">{label}</div>
    </motion.div>
  );
};

export default StatCard;
