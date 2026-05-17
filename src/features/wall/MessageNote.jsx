import { motion } from 'framer-motion';

const noteColors = [
  '#FFFACD', // Lemon Chiffon
  '#FFE4E1', // Misty Rose
  '#E0F7FA', // Light Cyan
  '#F3E5F5', // Lavender
  '#E8F5E9', // Mint
  '#FFF3E0', // Peach
  '#F1F8E9', // Light Lime
];

const MessageNote = ({ msg, index }) => {
  const color = noteColors[index % noteColors.length];
  // Calculate rotation once per component instance using index or fixed random seed based on ID to avoid hydration issues, 
  // but for simplicity in this demo, pseudo-random is fine.
  const rotation = (Math.sin(index * 1234.5) * 6 - 3).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: Number(rotation) }}
      whileInView={{ opacity: 1, y: 0, rotate: Number(rotation) }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="break-inside-avoid mb-4 p-4 rounded cursor-default transition-shadow"
      style={{
        background: color,
        boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Emoji */}
      <div className="text-right text-sm mb-1">{msg.emoji}</div>

      {/* Message text */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#2C1810', fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
        "{msg.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium" style={{ color: '#666' }}>
          {msg.isAnonymous ? '🎭 Anonymous' : `👤 ${msg.name}`}
        </span>
        <span className="text-[10px]" style={{ color: '#999' }}>{msg.createdAt}</span>
      </div>
    </motion.div>
  );
};

export default MessageNote;
