import { motion } from 'framer-motion';

/**
 * Toggle — animated switch component
 */
const Toggle = ({ isOn, onToggle, labelLeft, labelRight, size = 'md' }) => {
  const sizes = {
    sm: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translateX(20px)' },
    md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translateX(24px)' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translateX(28px)' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className="inline-flex items-center gap-2">
      {labelLeft && (
        <span className={`text-xs font-medium ${!isOn ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'} transition-colors`}>
          {labelLeft}
        </span>
      )}

      <button
        onClick={onToggle}
        className={`relative ${s.track} rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30`}
        style={{
          background: isOn
            ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
            : 'var(--bg-elevated)',
          border: `1px solid ${isOn ? 'var(--primary)' : 'var(--border-default)'}`,
        }}
      >
        <motion.div
          className={`${s.thumb} rounded-full bg-white shadow-sm absolute top-0.5 left-0.5`}
          animate={{ x: isOn ? parseInt(s.translate.match(/\d+/)[0]) : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>

      {labelRight && (
        <span className={`text-xs font-medium ${isOn ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'} transition-colors`}>
          {labelRight}
        </span>
      )}
    </div>
  );
};

export default Toggle;
