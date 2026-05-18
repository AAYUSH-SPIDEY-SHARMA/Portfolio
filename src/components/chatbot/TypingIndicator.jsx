import { motion } from 'framer-motion';

const TypingIndicator = ({ isWaifuMode }) => {
  const dotColor = isWaifuMode ? '#FFB7C5' : 'var(--primary)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex justify-start"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl rounded-bl-md"
        style={{
          background: isWaifuMode ? 'rgba(255,183,197,0.08)' : 'rgba(108,92,231,0.08)',
          border: `1px solid ${isWaifuMode ? 'rgba(255,183,197,0.1)' : 'rgba(108,92,231,0.1)'}`,
        }}
      >
        {/* Thinking text */}
        <motion.span
          className="text-[11px] font-mono"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isWaifuMode ? 'thinking in dimensions~' : 'thinking...'}
        </motion.span>

        {/* Animated dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: dotColor }}
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
