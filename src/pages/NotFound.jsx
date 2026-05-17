import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Home, Ghost, ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import GlitchText from '../components/animations/GlitchText';

const spiderQuotes = [
  "With great power comes great... 404 errors.",
  "Even Spider-Man gets lost sometimes.",
  "This page got snapped by Thanos.",
  "The multiverse collapsed here.",
  "Error 404: Universe not found.",
  "This dimension doesn't exist... yet.",
];

const NotFound = () => {
  const [quote] = useState(() => spiderQuotes[Math.floor(Math.random() * spiderQuotes.length)]);
  const [webCount, setWebCount] = useState(0);
  const [webs, setWebs] = useState([]);
  const containerRef = useRef(null);

  // Click to shoot webs mini-game
  const handleClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setWebs(prev => [...prev.slice(-15), { x, y, id: Date.now() }]);
    setWebCount(c => c + 1);
  };

  return (
    <PageWrapper>
      <section
        ref={containerRef}
        onClick={handleClick}
        className="min-h-screen flex items-center justify-center relative overflow-hidden cursor-crosshair select-none"
        style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #1a0520 40%, #0A0A0F 100%)' }}
      >
        {/* Animated web shots */}
        {webs.map(w => (
          <motion.div
            key={w.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute pointer-events-none"
            style={{ left: w.x - 20, top: w.y - 20, width: 40, height: 40, zIndex: 5 }}
          >
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <circle cx="20" cy="20" r="3" fill="none" stroke="rgba(168,218,220,0.8)" strokeWidth="1" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                <line
                  key={angle}
                  x1="20" y1="20"
                  x2={20 + 18 * Math.cos(angle * Math.PI / 180)}
                  y2={20 + 18 * Math.sin(angle * Math.PI / 180)}
                  stroke="rgba(168,218,220,0.6)" strokeWidth="0.5"
                />
              ))}
            </svg>
          </motion.div>
        ))}

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {['🕷️', '🕸️', '💀', '👻', '⚡', '🔮'][i]}
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10 px-6"
        >
          {/* Giant 404 with glitch */}
          <GlitchText className="font-display text-[120px] md:text-[180px] font-black leading-none mb-2" style={{ color: 'var(--accent-red)' }}>
            404
          </GlitchText>

          {/* Ghost icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            👻
          </motion.div>

          {/* Quote */}
          <p className="text-lg text-[var(--text-secondary)] italic mb-2 max-w-md mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
            "{quote}"
          </p>
          <p className="text-xs text-[var(--text-muted)] font-mono mb-8">
            // page_not_found.exe has stopped working
          </p>

          {/* Web shooting counter */}
          {webCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[var(--text-muted)] font-mono mb-4"
            >
              🕸️ Webs shot: {webCount} {webCount >= 10 ? '— You\'re a natural!' : webCount >= 5 ? '— Keep shooting!' : ''}
            </motion.p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)] transition-all"
            >
              <Home size={16} /> Go Home
            </Link>
            <button
              onClick={(e) => { e.stopPropagation(); window.history.back(); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/30 transition-all"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>

          {/* Hint */}
          <p className="text-[10px] text-[var(--text-muted)] mt-8 font-mono animate-pulse">
            💡 Click anywhere to shoot webs
          </p>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default NotFound;
