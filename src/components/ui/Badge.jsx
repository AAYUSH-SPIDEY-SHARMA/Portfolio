import { motion } from 'framer-motion';

/**
 * Badge — small tag/label component with color variants
 */
const variantStyles = {
  default: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-default)]',
  primary: 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20',
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  gold: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
};

const Badge = ({ children, variant = 'default', icon, className = '' }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-medium border ${variantStyles[variant] || variantStyles.default} ${className}`}>
    {icon && <span className="text-[10px]">{icon}</span>}
    {children}
  </span>
);

export default Badge;
