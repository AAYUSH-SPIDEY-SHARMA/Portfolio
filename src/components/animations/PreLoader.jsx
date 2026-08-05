import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cld, ASSETS } from '../../lib/images';

const FULL_NAME = 'AAYUSH SHARMA';

/**
 * Intro screen.
 *
 * Was a generated spider-web SVG — eight lines and three rings drawn with
 * Framer Motion. It has been replaced by the actual spider emblem, so the
 * first thing a visitor sees is the same mark that appears in the navbar and
 * on the chat orb rather than a one-off drawing.
 */
const PreLoader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [nameText, setNameText] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('preloader-seen')) {
      onComplete?.();
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 200),   // mark lands
      setTimeout(() => setPhase(2), 1100),  // name types
      setTimeout(() => {
        setPhase(3);
        sessionStorage.setItem('preloader-seen', 'true');
        setTimeout(() => onComplete?.(), 600);
      }, 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (phase < 2) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= FULL_NAME.length) {
        setNameText(FULL_NAME.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [phase]);

  if (sessionStorage.getItem('preloader-seen')) return null;

  const skip = () => {
    sessionStorage.setItem('preloader-seen', 'true');
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-primary)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onClick={skip}
        >
          {/* Slow red bloom behind the mark, echoing its colour. */}
          <div
            aria-hidden="true"
            className="animate-mark-glow absolute inset-0 m-auto h-[520px] w-[520px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(226,29,44,0.18) 0%, rgba(226,29,44,0.06) 42%, transparent 68%)',
            }}
          />

          <div className="relative text-center px-6">
            {/* The mark */}
            <img
              src={cld(ASSETS.spiderMark, { width: 640, quality: 'auto:best' })}
              alt=""
              aria-hidden="true"
              className="animate-mark-in mx-auto w-48 sm:w-64 md:w-72 h-auto select-none"
              style={{ filter: 'drop-shadow(0 12px 34px rgba(226,29,44,0.38))' }}
              draggable={false}
            />

            {/* Hairline rule */}
            {phase >= 2 && (
              <div className="animate-rule-in mx-auto mt-8 mb-5 h-px w-56 bg-gradient-to-r from-transparent via-[#E21D2C] to-transparent" />
            )}

            {/* Name */}
            {phase >= 2 && (
              <div className="animate-soft-in font-display text-2xl md:text-3xl font-bold italic tracking-[0.22em] text-[var(--text-primary)]">
                {nameText}
                <span className="animate-cursor ml-1 inline-block h-6 w-0 border-r-2 border-[#E21D2C] align-middle" />
              </div>
            )}

            {phase >= 2 && (
              <p className="animate-soft-in mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
                Entering the spider-verse
              </p>
            )}

            <p className="mt-10 font-mono text-[10px] text-[var(--text-muted)] opacity-30">
              click anywhere to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;
