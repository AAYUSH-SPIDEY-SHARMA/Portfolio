import { useState } from 'react';
import { Send, User, EyeOff } from 'lucide-react';

const MessageForm = ({ onSubmit }) => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSubmit({
      text: message,
      name: isAnonymous ? null : name,
      isAnonymous,
      emoji: '💌' // Default emoji for new messages
    });

    setMessage('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl border" style={{ background: 'rgba(60,45,25,0.6)', borderColor: 'rgba(222,184,135,0.1)' }}>
      {/* Anonymous toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setIsAnonymous(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isAnonymous
              ? 'text-white'
              : 'text-[#8B7355]'
          }`}
          style={isAnonymous ? { background: '#8B4513', border: '1px solid rgba(139,69,19,0.3)' } : { border: '1px solid rgba(139,69,19,0.1)' }}
        >
          <EyeOff size={12} /> Anonymous 🎭
        </button>
        <button
          type="button"
          onClick={() => setIsAnonymous(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            !isAnonymous
              ? 'text-white'
              : 'text-[#8B7355]'
          }`}
          style={!isAnonymous ? { background: '#8B4513', border: '1px solid rgba(139,69,19,0.3)' } : { border: '1px solid rgba(139,69,19,0.1)' }}
        >
          <User size={12} /> Leave Name 👤
        </button>
      </div>

      {/* Name input (when not anonymous) */}
      {!isAnonymous && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name..."
          maxLength={30}
          className="w-full px-4 py-2 rounded-lg text-sm mb-3 outline-none transition-all"
          style={{
            background: 'rgba(44,30,16,0.6)',
            border: '1px solid rgba(222,184,135,0.1)',
            color: '#DEB887',
          }}
        />
      )}

      {/* Message textarea */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your whisper..."
        maxLength={280}
        rows={3}
        className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none transition-all"
        style={{
          background: 'rgba(44,30,16,0.6)',
          border: '1px solid rgba(222,184,135,0.1)',
          color: '#DEB887',
          fontFamily: 'Caveat, cursive',
          fontSize: '1rem',
        }}
      />

      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] font-mono" style={{ color: '#8B7355' }}>
          {message.length}/280
        </span>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-medium text-white transition-all disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #8B4513, #A0522D)' }}
        >
          <Send size={12} /> Send
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
