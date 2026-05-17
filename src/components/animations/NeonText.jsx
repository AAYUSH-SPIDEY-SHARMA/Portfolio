/**
 * Neon glowing text component
 * Props: text, color ('purple'|'blue'|'red'|'green'|'pink'), className
 */
const NeonText = ({ text, color = 'purple', className = '' }) => {
  const colorMap = {
    purple: { main: 'var(--primary)', glow: 'rgba(108, 92, 231, 0.4)', outerGlow: 'rgba(108, 92, 231, 0.1)' },
    blue: { main: 'var(--secondary)', glow: 'rgba(0, 210, 255, 0.4)', outerGlow: 'rgba(0, 210, 255, 0.1)' },
    red: { main: 'var(--accent-red)', glow: 'rgba(230, 57, 70, 0.4)', outerGlow: 'rgba(230, 57, 70, 0.1)' },
    green: { main: 'var(--accent-matrix)', glow: 'rgba(0, 255, 65, 0.4)', outerGlow: 'rgba(0, 255, 65, 0.1)' },
    pink: { main: 'var(--romance-pink)', glow: 'rgba(255, 105, 180, 0.4)', outerGlow: 'rgba(255, 105, 180, 0.1)' },
  };

  const c = colorMap[color] || colorMap.purple;

  return (
    <span
      className={`animate-neon-flicker ${className}`}
      style={{
        color: c.main,
        textShadow: `0 0 7px ${c.glow}, 0 0 20px ${c.glow}, 0 0 40px ${c.outerGlow}, 0 0 80px ${c.outerGlow}`,
      }}
    >
      {text}
    </span>
  );
};

export default NeonText;
