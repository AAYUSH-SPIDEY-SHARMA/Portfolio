import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import ChatWindow from './ChatWindow';

const ChatOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useChat();
  const { isWaifuMode } = chat;

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            onClose={() => setIsOpen(false)}
            isWaifuMode={isWaifuMode}
            chat={chat}
          />
        )}
      </AnimatePresence>

      {/* Floating Orb Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9998] group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        aria-label="Open AayushAI Chat"
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isWaifuMode
              ? 'radial-gradient(circle, rgba(255,183,197,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(108,92,231,0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Second Pulse Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: isWaifuMode ? 'rgba(255,183,197,0.3)' : 'rgba(108,92,231,0.3)',
          }}
          animate={{
            scale: [1, 1.8],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* Main Orb */}
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
          style={{
            background: isWaifuMode
              ? 'linear-gradient(135deg, #FFB7C5 0%, #FF69B4 50%, #FF1493 100%)'
              : 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, #4F46E5 100%)',
            boxShadow: isWaifuMode
              ? '0 0 30px rgba(255,105,180,0.4), 0 8px 32px rgba(0,0,0,0.3)'
              : '0 0 30px rgba(108,92,231,0.4), 0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {/* Animated inner glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)',
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="w-6 h-6 text-white relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-6 h-6 text-white relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Label tooltip */}
        <motion.span
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono px-3 py-1.5 rounded-full pointer-events-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-secondary)',
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 5 : 0 }}
          transition={{ delay: 3 }}
        >
          {isWaifuMode ? 'AayushAI ✨' : 'AayushAI'}
        </motion.span>
      </motion.button>
    </>
  );
};

export default ChatOrb;
