import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to detect when the user is idle.
 * @param {number} timeoutMs - Time in milliseconds before considering the user idle.
 * @param {Function} onIdle - Callback when the user becomes idle.
 * @param {Function} onActive - Callback when the user becomes active again.
 */
export const useIdleTimer = (timeoutMs = 60000, onIdle, onActive) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleActivity = () => {
      if (isIdle) {
        setIsIdle(false);
        if (onActive) onActive();
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        if (onIdle) onIdle();
      }, timeoutMs);
    };

    // Initial setup
    handleActivity();

    // Events to track user activity
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [timeoutMs, isIdle, onIdle, onActive]);

  return isIdle;
};
