import { motion } from 'framer-motion';

/**
 * Reusable button with variants
 * Props: children, variant ('primary'|'secondary'|'ghost'|'danger'), size ('sm'|'md'|'lg'), href, onClick, className
 */
const Button = ({ children, variant = 'primary', size = 'md', href, onClick, className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)]',
    secondary: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--bg-secondary)]',
    danger: 'bg-gradient-to-r from-[var(--accent-red)] to-[var(--gaming-orange)] text-white hover:shadow-[var(--glow-red)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-xl',
  };

  const classes = `inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
