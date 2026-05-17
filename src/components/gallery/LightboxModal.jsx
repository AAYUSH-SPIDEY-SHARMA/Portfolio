import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';

/**
 * LightboxModal — Full-screen image view with nav.
 * Blueprint: "Click image → Lightbox modal with caption"
 */
const LightboxModal = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const current = images?.[currentIndex];

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && onPrev) onPrev();
    if (e.key === 'ArrowRight' && onNext) onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={current.src}
            alt={current.alt || current.caption || ''}
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />

          {/* Caption */}
          {current.caption && (
            <p className="text-center text-sm text-white/70 mt-4 font-body">
              {current.caption}
            </p>
          )}

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Counter */}
          <p className="text-center text-xs text-white/40 mt-2 font-mono">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightboxModal;
