import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useEffects';

/**
 * Types `text` out one character at a time behind a blinking caret.
 *
 * Replaces the old `animate-typewriter` class, which was referenced by the Hero
 * but never actually defined anywhere — so the effect silently did nothing.
 * A pure-CSS width animation can't know the text's natural width, so this is
 * driven in JS (the same approach PreLoader already uses).
 *
 * Reserves the full text as invisible inline text so the line never reflows
 * mid-type, and renders instantly for anyone who prefers reduced motion.
 */
const Typewriter = ({ text, speed = 70, startDelay = 350, className = '', caretClassName = '' }) => {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setCount(text.length);
      setDone(true);
      return;
    }

    setCount(0);
    setDone(false);

    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            setDone(true);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, prefersReduced]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Invisible full-length copy holds the line's final width so nothing
          shifts as characters land. Also what screen readers announce. */}
      <span aria-hidden="true" className="invisible">{text}</span>

      <span className="absolute inset-0 whitespace-pre" aria-label={text}>
        {text.slice(0, count)}
        <span
          aria-hidden="true"
          className={`${done ? 'animate-caret' : ''} inline-block w-[0.06em] -mb-[0.08em] h-[0.85em] align-baseline bg-[var(--primary)] ml-[0.06em] ${caretClassName}`}
        />
      </span>
    </span>
  );
};

export default Typewriter;
