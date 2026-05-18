import { motion } from 'framer-motion';

const ChatMessage = ({ message, isWaifuMode }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed ${
          isUser ? 'rounded-2xl rounded-br-md' : 'rounded-2xl rounded-bl-md'
        }`}
        style={
          isUser
            ? {
                background: isWaifuMode
                  ? 'linear-gradient(135deg, #FF69B4, #FF1493)'
                  : 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'white',
                boxShadow: isWaifuMode
                  ? '0 4px 15px rgba(255,105,180,0.2)'
                  : '0 4px 15px rgba(108,92,231,0.2)',
              }
            : {
                background: isWaifuMode
                  ? 'rgba(255,183,197,0.08)'
                  : 'rgba(108,92,231,0.08)',
                color: 'rgba(255,255,255,0.85)',
                border: `1px solid ${isWaifuMode ? 'rgba(255,183,197,0.1)' : 'rgba(108,92,231,0.1)'}`,
              }
        }
      >
        {/* Parse basic markdown: **bold** and line breaks */}
        {message.content.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong
                  key={j}
                  className="font-bold"
                  style={{
                    color: isUser
                      ? 'white'
                      : isWaifuMode
                      ? '#FFB7C5'
                      : 'var(--primary)',
                  }}
                >
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
