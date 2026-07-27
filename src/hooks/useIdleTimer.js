import { useEffect, useRef } from 'react';

/**
 * Calls `onIdle` after `timeoutMs` without user input, then `onActive` on the
 * next interaction.
 *
 * The previous version listed `isIdle`, `onIdle` and `onActive` in the effect's
 * dependency array. Callers pass inline arrow functions, so every render
 * produced new identities, which tore down and re-armed the whole timer — and
 * because setup ran `handleActivity()` immediately, the render caused by
 * `onIdle` fed straight back into `onActive`. The toast dismissed itself within
 * a frame of appearing.
 *
 * Now the callbacks live in refs and idle state is a ref too, so the effect
 * runs exactly once and the listeners are never re-registered.
 */
export const useIdleTimer = (timeoutMs = 60000, onIdle, onActive) => {
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);
  const isIdleRef = useRef(false);
  const timeoutRef = useRef(null);

  // Keep the refs pointing at the latest callbacks without re-running the effect.
  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
  });

  useEffect(() => {
    const arm = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isIdleRef.current = true;
        onIdleRef.current?.();
      }, timeoutMs);
    };

    const handleActivity = () => {
      if (isIdleRef.current) {
        isIdleRef.current = false;
        onActiveRef.current?.();
      }
      arm();
    };

    arm();

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    return () => {
      clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [timeoutMs]);
};
