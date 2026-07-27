import { motion } from 'framer-motion';
import { relativeTime } from '../../lib/wall';

const noteColors = [
  '#FFFACD', // lemon chiffon
  '#FFE4E1', // misty rose
  '#E0F7FA', // light cyan
  '#F3E5F5', // lavender
  '#E8F5E9', // mint
  '#FFF3E0', // peach
  '#F1F8E9', // light lime
];

const MessageNote = ({ msg, index }) => {
  const color = noteColors[index % noteColors.length];
  // Deterministic tilt so a note doesn't jump to a new angle on re-render.
  const rotation = Number((Math.sin(index * 1234.5) * 6 - 3).toFixed(1));

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.6), type: 'spring', stiffness: 260, damping: 22 }}
      className="break-inside-avoid mb-4 p-4 rounded relative"
      style={{ background: color, boxShadow: '2px 3px 8px rgba(0,0,0,0.15)' }}
    >
      <div className="text-right text-sm mb-1" aria-hidden="true">{msg.emoji}</div>

      <blockquote
        className="text-sm leading-relaxed mb-3"
        style={{ color: '#2C1810', fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}
      >
        “{msg.text}”
      </blockquote>

      <figcaption className="flex items-center justify-between">
        <span className="text-[10px] font-medium" style={{ color: '#666' }}>
          {msg.is_anonymous ? '🎭 Anonymous' : `👤 ${msg.name}`}
        </span>
        <span className="text-[10px]" style={{ color: '#999' }}>
          {relativeTime(msg.created_at)}
        </span>
      </figcaption>
    </motion.figure>
  );
};

export default MessageNote;
