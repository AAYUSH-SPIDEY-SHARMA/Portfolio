import { useState, useEffect } from 'react';

/**
 * Custom hook to detect time of day for dynamic theming
 * Returns: 'morning' | 'afternoon' | 'evening' | 'night'
 */
export const useTimeOfDay = () => {
  const [timeOfDay, setTimeOfDay] = useState(() => getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
};

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

/**
 * Custom hook to detect prefers-reduced-motion
 */
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
};

/**
 * Custom hook for Konami Code Easter Egg
 */
export const useKonamiCode = (callback) => {
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let keySequence = [];

    const handler = (e) => {
      keySequence.push(e.key);
      keySequence = keySequence.slice(-konamiCode.length);
      if (keySequence.join(',') === konamiCode.join(',')) {
        callback();
        keySequence = [];
      }
    };

    window.addEventListener('keyup', handler);
    return () => window.removeEventListener('keyup', handler);
  }, [callback]);
};

/**
 * Custom hook for scroll progress (0 to 1)
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return progress;
};
