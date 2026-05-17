import { forwardRef } from 'react';

/**
 * Input — styled form input component
 */
const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{label}</label>
    )}
    <input
      ref={ref}
      className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/20 transition-all ${error ? 'border-red-500/50' : ''} ${className}`}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-400 mt-1">{error}</p>
    )}
  </div>
));

Input.displayName = 'Input';
export default Input;
