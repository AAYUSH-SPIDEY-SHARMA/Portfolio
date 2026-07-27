/**
 * Spider-Verse style glitch text effect
 * Supports both `text` prop and `children`
 * Props: text, children, className, glitchColor, style
 */
const GlitchText = ({ text, children, className = '', glitchColor = 'var(--accent-red)', style = {} }) => {
  const content = text || children;

  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {/* Main text */}
      <span className="relative z-10">{content}</span>

      {/* Red glitch layer */}
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: glitchColor,
          clipPath: 'inset(0 0 0 0)',
          animation: 'glitch-1 4s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {content}
      </span>

      {/* Blue glitch layer */}
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: 'var(--secondary)',
          clipPath: 'inset(0 0 0 0)',
          animation: 'glitch-2 4s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {content}
      </span>
    </span>
  );
};

export default GlitchText;
