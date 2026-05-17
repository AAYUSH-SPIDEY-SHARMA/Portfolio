import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../../hooks/useEffects';
import { useIdleTimer } from '../../hooks/useIdleTimer';
import { X, PlayCircle, Eye, Sparkles } from 'lucide-react';

/**
 * EasterEggsSystem — Global component managing all hidden interactions.
 * 
 * 1. Konami Code (↑↑↓↓←→←→BA) → Opens "Anime Shrine" secret modal
 * 2. Idle 60s → "Hey, you still there?" toast notification
 * 3. Type "spidey" anywhere → Spider-web flash overlay for 2s
 */
const EasterEggsSystem = () => {
  const [showKonamiModal, setShowKonamiModal] = useState(false);
  const [showIdleToast, setShowIdleToast] = useState(false);
  const [showSpideyFlash, setShowSpideyFlash] = useState(false);
  
  // Konami Code Easter Egg
  useKonamiCode(useCallback(() => {
    setShowKonamiModal(true);
  }, []));

  // Idle Easter Egg (60 seconds)
  useIdleTimer(
    60000, 
    () => { setShowIdleToast(true); },
    () => { setShowIdleToast(false); }
  );

  // "spidey" keyword Easter Egg
  useEffect(() => {
    const spideyCode = 'spidey';
    let buffer = '';

    const handler = (e) => {
      // Ignore if user is typing in an input field
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      buffer += e.key.toLowerCase();
      buffer = buffer.slice(-spideyCode.length);
      if (buffer === spideyCode) {
        setShowSpideyFlash(true);
        buffer = '';
        setTimeout(() => setShowSpideyFlash(false), 2000);
      }
    };

    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  }, []);

  // Anime shrine gallery data using local images
  const shrineItems = [
    { img: '/YOUR NAME WALLPAPER.jpg', title: 'Your Name — Kimi no Na wa' },
    { img: '/Anime boy sitting under Cherry blossom 🌸.jpg', title: 'Cherry Blossom Dreams' },
    { img: '/chisa-wuthering-5120x2880-24847.jpg', title: 'Wuthering Waves' },
    { img: '/Spider Alya Cute.jpg', title: 'Spider-Verse Alya 🕸️' },
  ];

  return (
    <>
      {/* ═══ Konami Secret Modal ═══ */}
      <AnimatePresence>
        {showKonamiModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            onClick={() => setShowKonamiModal(false)}
            style={{ background: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(10px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full p-8 rounded-2xl border border-[var(--primary)]/30 bg-[var(--bg-secondary)] overflow-hidden shadow-[var(--glow-purple)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background rays */}
              <div className="absolute inset-0 opacity-10 pointer-events-none animate-spin-slow"
                   style={{ background: 'repeating-conic-gradient(from 0deg, var(--primary) 0deg 10deg, transparent 10deg 20deg)' }} />

              <button
                onClick={() => setShowKonamiModal(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="relative z-10 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-6">
                  <Sparkles size={14} /> SECRET UNLOCKED ↑↑↓↓←→←→BA
                </span>
                
                <h2 className="font-display text-4xl font-bold mb-4 neon-purple">
                  The Anime Shrine
                </h2>
                
                <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-md mx-auto leading-relaxed">
                  You found the secret Konami code! Welcome to the hidden collection. 🕷️
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {shrineItems.map((item, i) => (
                    <div key={i} className="group relative aspect-video rounded-xl overflow-hidden border border-[var(--border-default)] cursor-pointer">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent text-left">
                        <p className="text-xs font-bold text-white">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Idle Toast ═══ */}
      <AnimatePresence>
        {showIdleToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[99998]"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[rgba(19,19,26,0.95)] border border-[var(--primary)]/30 shadow-[var(--glow-purple)] backdrop-blur-md">
              <Eye className="text-[var(--primary)] animate-pulse" size={18} />
              <p className="text-sm font-medium text-white">
                You've been staring at the void for a while. Everything okay? 🕷️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ "Spidey" Keyword Flash ═══ */}
      <AnimatePresence>
        {showSpideyFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99997] pointer-events-none"
          >
            {/* Spider-web SVG overlay */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Radial web lines from center */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                return (
                  <motion.line
                    key={i}
                    x1="50" y1="50"
                    x2={50 + 60 * Math.cos(angle)}
                    y2={50 + 60 * Math.sin(angle)}
                    stroke="var(--spider-web)"
                    strokeWidth="0.15"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.03 }}
                  />
                );
              })}
              {/* Concentric rings */}
              {[15, 30, 45].map((r, i) => (
                <motion.circle
                  key={r}
                  cx="50" cy="50" r={r}
                  fill="none"
                  stroke="var(--spider-web)"
                  strokeWidth="0.1"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggsSystem;
