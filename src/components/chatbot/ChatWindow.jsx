import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

const ChatWindow = ({ onClose, isWaifuMode, chat }) => {
  const { messages, isLoading, sendMessage } = chat;
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-24 right-6 z-[9999] w-[380px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden"
      style={{
        height: 'min(520px, calc(100vh - 8rem))',
        borderRadius: '20px',
        background: isWaifuMode
          ? 'linear-gradient(145deg, rgba(30,20,35,0.97) 0%, rgba(45,20,40,0.97) 100%)'
          : 'linear-gradient(145deg, rgba(15,15,25,0.97) 0%, rgba(25,20,40,0.97) 100%)',
        border: `1px solid ${isWaifuMode ? 'rgba(255,183,197,0.15)' : 'rgba(108,92,231,0.15)'}`,
        boxShadow: isWaifuMode
          ? '0 25px 80px rgba(255,105,180,0.15), 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,183,197,0.1)'
          : '0 25px 80px rgba(108,92,231,0.15), 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(108,92,231,0.1)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
    >
      {/* ═══ Header ═══ */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{
          borderBottom: `1px solid ${isWaifuMode ? 'rgba(255,183,197,0.1)' : 'rgba(108,92,231,0.1)'}`,
          background: isWaifuMode
            ? 'linear-gradient(90deg, rgba(255,105,180,0.05) 0%, transparent 100%)'
            : 'linear-gradient(90deg, rgba(108,92,231,0.05) 0%, transparent 100%)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Status dot */}
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{
                background: isWaifuMode
                  ? 'linear-gradient(135deg, #FFB7C5, #FF69B4)'
                  : 'linear-gradient(135deg, var(--primary), var(--secondary))',
              }}
            >
              {isWaifuMode ? '🌸' : '✨'}
            </div>
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{
                background: '#22c55e',
                borderColor: isWaifuMode ? 'rgba(30,20,35,0.97)' : 'rgba(15,15,25,0.97)',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h3
              className="text-sm font-bold font-heading"
              style={{ color: isWaifuMode ? '#FFB7C5' : 'var(--primary)' }}
            >
              {isWaifuMode ? 'AayushAI ✨' : 'AayushAI'}
            </h3>
            <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isWaifuMode ? 'hidden dimension mode' : 'online • always vibing'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.4)',
          }}
          aria-label="Close chat"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      {/* ═══ Messages Area ═══ */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${isWaifuMode ? 'rgba(255,183,197,0.2)' : 'rgba(108,92,231,0.2)'} transparent`,
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              isWaifuMode={isWaifuMode}
            />
          ))}
        </AnimatePresence>

        {isLoading && <TypingIndicator isWaifuMode={isWaifuMode} />}

        <div ref={messagesEndRef} />
      </div>

      {/* ═══ Input Area ═══ */}
      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        isWaifuMode={isWaifuMode}
      />
    </motion.div>
  );
};

export default ChatWindow;
