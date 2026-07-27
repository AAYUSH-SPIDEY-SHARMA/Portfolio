import { useState, useEffect } from 'react';

/**
 * True when the user has asked the OS for reduced motion.
 * JS-driven animations should check this; CSS animations are handled by the
 * `prefers-reduced-motion` block in animations.css.
 */
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
};

/**
 * Fires `callback` when the Konami code is entered.
 *
 * Pass a stable callback (useCallback) — it is a dependency of the listener.
 */
export const useKonamiCode = (callback) => {
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a',
    ];
    let keySequence = [];

    const handler = (e) => {
      keySequence.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
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
