import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const webLineAngles = [0, 45, 90, 135, 180, 225, 270, 315];

const PreLoader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [nameText, setNameText] = useState('');
  const fullName = 'AAYUSH SHARMA';

  useEffect(() => {
    if (sessionStorage.getItem('preloader-seen')) {
      onComplete?.();
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 300),   // Logo drops in
      setTimeout(() => setPhase(2), 1200),  // Web lines shoot out
      setTimeout(() => setPhase(3), 2000),  // Name types
      setTimeout(() => {
        setPhase(4);
        sessionStorage.setItem('preloader-seen', 'true');
        setTimeout(() => onComplete?.(), 600);
      }, 3500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Typewriter effect for name
  useEffect(() => {
    if (phase < 3) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setNameText(fullName.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [phase]);

  if (sessionStorage.getItem('preloader-seen')) return null;

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-primary)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onClick={() => { sessionStorage.setItem('preloader-seen', 'true'); onComplete?.(); }}
        >
          {/* Background subtle particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[var(--primary)]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="text-center relative">
            {/* Spider Web SVG */}
            <svg
              viewBox="0 0 200 200"
              className="w-40 h-40 md:w-48 md:h-48 mx-auto"
              style={{ overflow: 'visible' }}
            >
              {/* Web lines shooting outward */}
              {phase >= 2 && webLineAngles.map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x2 = 100 + 90 * Math.cos(rad);
                const y2 = 100 + 90 * Math.sin(rad);
                return (
                  <motion.line
                    key={angle}
                    x1="100" y1="100"
                    x2={x2} y2={y2}
                    stroke="var(--primary)"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  />
                );
              })}

              {/* Concentric web rings */}
              {phase >= 2 && [35, 55, 75].map((r, i) => (
                <motion.circle
                  key={r}
                  cx="100" cy="100" r={r}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{ transformOrigin: '100px 100px' }}
                />
              ))}

              {/* Center logo circle */}
              <motion.circle
                cx="100" cy="100" r="28"
                fill="url(#logoGradient)"
                initial={{ scale: 0 }}
                animate={phase >= 1 ? { scale: 1 } : { scale: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{ transformOrigin: '100px 100px' }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Logo text */}
              <motion.text
                x="100" y="103"
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="20"
                fontWeight="bold"
                fontFamily="var(--font-display)"
                initial={{ opacity: 0 }}
                animate={phase >= 1 ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                filter="url(#glow)"
              >
                AS
              </motion.text>

              {/* Spider emoji */}
              <motion.text
                x="100" y="74"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                initial={{ opacity: 0, y: -10 }}
                animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                🕷️
              </motion.text>
            </svg>

            {/* Divider line */}
            {phase >= 2 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-48 h-px mx-auto mb-4 mt-2 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
              />
            )}

            {/* Typing name */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-heading text-xl tracking-[0.3em] text-[var(--text-primary)]"
              >
                {nameText}
                <span className="animate-cursor inline-block w-0 h-5 border-r-2 border-[var(--primary)] ml-0.5" />
              </motion.div>
            )}

            {/* Subtitle */}
            {phase >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8 }}
                className="text-[10px] text-[var(--text-muted)] font-mono mt-3 tracking-wider"
              >
                // Loading universe...
              </motion.p>
            )}

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 1.5 }}
              className="text-[10px] text-[var(--text-muted)] mt-8"
            >
              click anywhere to skip
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;
