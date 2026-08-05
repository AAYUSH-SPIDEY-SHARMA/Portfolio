import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useEffects';

/**
 * Types `text` out one character at a time behind a blinking caret.
 *
 * Replaces the old `animate-typewriter` class, which was referenced by the Hero
 * but never actually defined anywhere — so the effect silently did nothing.
 * A pure-CSS width animation can't know the text's natural width, so this is
 * driven in JS.
 *
 * With `loop`, it types, holds, deletes, and starts over. Reserves the full
 * text as invisible inline text so the line never reflows mid-cycle, and
 * renders the finished string instantly for anyone who prefers reduced motion.
 */
const Typewriter = ({
  text,
  speed = 70,
  deleteSpeed = 38,
  startDelay = 350,
  holdMs = 1800,
  restMs = 500,
  loop = false,
  className = '',
  caretClassName = '',
}) => {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(true);

  // A ref chain rather than an interval: each step schedules the next one, so
  // the typing and deleting phases can run at different speeds and the hold
  // between them doesn't need its own effect.
  const timer = useRef(null);

  useEffect(() => {
    if (prefersReduced) {
      setCount(text.length);
      setTyping(false);
      return;
    }

    let cancelled = false;
    let i = 0;
    let forward = true;

    const schedule = (fn, ms) => {
      timer.current = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const step = () => {
      if (forward) {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          if (!loop) {
            setTyping(false);
            return;
          }
          setTyping(false);
          forward = false;
          schedule(step, holdMs);
          return;
        }
        schedule(step, speed);
      } else {
        i -= 1;
        setCount(i);
        if (i <= 0) {
          forward = true;
          setTyping(true);
          schedule(step, restMs);
          return;
        }
        schedule(step, deleteSpeed);
      }
    };

    setCount(0);
    setTyping(true);
    schedule(step, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer.current);
    };
  }, [text, speed, deleteSpeed, startDelay, holdMs, restMs, loop, prefersReduced]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Invisible full-length copy holds the line's final width so nothing
          shifts as characters land. Also what screen readers announce. */}
      <span aria-hidden="true" className="invisible">{text}</span>

      <span className="absolute inset-0 whitespace-pre" aria-label={text}>
        {text.slice(0, count)}
        <span
          aria-hidden="true"
          className={`${typing ? '' : 'animate-caret'} inline-block w-[0.06em] -mb-[0.08em] h-[0.85em] align-baseline bg-[var(--primary)] ml-[0.06em] ${caretClassName}`}
        />
      </span>
    </span>
  );
};

export default Typewriter;
