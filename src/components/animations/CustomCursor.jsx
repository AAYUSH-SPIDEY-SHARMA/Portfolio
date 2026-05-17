import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  const [cursorType, setCursorType] = useState('default'); // default, link, image, button

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Determine cursor type based on hovered element
      if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
        setCursorType('link');
      } else if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setCursorType('button');
      } else if (target.tagName.toLowerCase() === 'img' || target.closest('img') || target.classList.contains('image-zoom')) {
        setCursorType('image');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  // Define states for the outer ring
  const variants = {
    default: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: 'rgba(108, 92, 231, 0)',
      borderColor: 'rgba(108, 92, 231, 0.4)',
    },
    link: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      backgroundColor: 'rgba(108, 92, 231, 0.1)',
      borderColor: 'rgba(108, 92, 231, 0.6)',
    },
    button: {
      width: 44,
      height: 44,
      borderRadius: '8px',
      backgroundColor: 'rgba(108, 92, 231, 0.05)',
      borderColor: 'rgba(108, 92, 231, 0.6)',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: '50%',
      backgroundColor: 'rgba(108, 92, 231, 0)',
      borderColor: 'rgba(108, 92, 231, 0.2)',
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--primary)] z-[99999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      <motion.div
        className="fixed top-0 left-0 border-2 z-[99998] pointer-events-none flex items-center justify-center"
        variants={variants}
        animate={cursorType}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Crosshair lines for image hover */}
        {cursorType === 'image' && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute w-full h-px bg-[var(--primary)] opacity-50" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute h-full w-px bg-[var(--primary)] opacity-50" />
          </>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
