import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MAX_LENGTH = 1000;

const ChatInput = ({ onSend, isLoading, isWaifuMode }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  // Land the caret in the field as soon as the panel opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-4 py-3 shrink-0"
      style={{
        borderTop: `1px solid ${isWaifuMode ? 'rgba(255,183,197,0.2)' : 'rgba(0,0,0,0.08)'}`,
        background: isWaifuMode ? '#FFF5F8' : '#FFFFFF',
      }}
    >
      <label htmlFor="bingo-input" className="sr-only">Message BINGO</label>
      <input
        id="bingo-input"
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={isWaifuMode ? 'Ask me anything~' : 'Ask me anything...'}
        disabled={isLoading}
        maxLength={MAX_LENGTH}
        autoComplete="off"
        className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-body outline-none transition-all duration-300"
        style={{
          background: isWaifuMode ? 'rgba(255,183,197,0.08)' : '#F5F5F5',
          border: `1px solid ${isWaifuMode ? 'rgba(255,183,197,0.2)' : 'rgba(0,0,0,0.1)'}`,
          color: '#333',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = isWaifuMode ? 'rgba(255,183,197,0.3)' : 'rgba(108,92,231,0.3)';
          e.target.style.boxShadow = isWaifuMode
            ? '0 0 20px rgba(255,105,180,0.1)'
            : '0 0 20px rgba(108,92,231,0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = isWaifuMode ? 'rgba(255,183,197,0.12)' : 'rgba(108,92,231,0.12)';
          e.target.style.boxShadow = 'none';
        }}
      />

      {/* Send Button */}
      <motion.button
        type="submit"
        disabled={!input.trim() || isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Send message"
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: input.trim()
            ? isWaifuMode
              ? 'linear-gradient(135deg, #FF69B4, #FF1493)'
              : 'linear-gradient(135deg, var(--primary), var(--secondary))'
            : 'rgba(0,0,0,0.04)',
          boxShadow: input.trim()
            ? isWaifuMode
              ? '0 4px 15px rgba(255,105,180,0.3)'
              : '0 4px 15px rgba(108,92,231,0.3)'
            : 'none',
        }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke={input.trim() ? 'white' : 'rgba(0,0,0,0.2)'}
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </motion.button>
    </form>
  );
};

export default ChatInput;
