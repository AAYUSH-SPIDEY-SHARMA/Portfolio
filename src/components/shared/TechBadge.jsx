/**
 * Tech badge component for skill/tech tags
 * Props: name, variant ('default'|'outlined'|'glow'), size ('sm'|'md')
 */
const TechBadge = ({ name, variant = 'default', size = 'sm' }) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
  };

  const variantClasses = {
    default: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]',
    outlined: 'bg-transparent text-[var(--primary)] border border-[var(--primary)]/20',
    glow: 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 shadow-[0_0_10px_rgba(108,92,231,0.1)]',
  };

  return (
    <span className={`inline-flex items-center font-mono rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} transition-all hover:border-[var(--primary)]/40`}>
      {name}
    </span>
  );
};

export default TechBadge;
