import { useState } from 'react';
import { Send, User, EyeOff } from 'lucide-react';

const MAX_LENGTH = 280;
const EMOJIS = ['💌', '🔥', '💜', '🌸', '🚀', '🏆', '🎮', '⚔️', '🧠', '✨'];

const MessageForm = ({ onSubmit }) => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [error, setError] = useState('');

  const remaining = MAX_LENGTH - message.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Write something first.');
      return;
    }
    if (!isAnonymous && !name.trim()) {
      setError('Add a name, or switch to anonymous.');
      return;
    }

    setError('');
    onSubmit({
      text: message.trim(),
      name: isAnonymous ? null : name.trim(),
      isAnonymous,
      emoji,
    });

    setMessage('');
    setName('');
    setEmoji(EMOJIS[0]);
  };

  const modeButton = (active) => ({
    background: active ? '#8B4513' : 'transparent',
    border: `1px solid rgba(139,69,19,${active ? 0.3 : 0.1})`,
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 rounded-2xl border"
      style={{ background: 'rgba(60,45,25,0.6)', borderColor: 'rgba(222,184,135,0.1)' }}
    >
      {/* Identity toggle */}
      <div className="flex items-center gap-2 mb-4" role="radiogroup" aria-label="Post as">
        <button
          type="button"
          role="radio"
          aria-checked={isAnonymous}
          onClick={() => { setIsAnonymous(true); setError(''); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isAnonymous ? 'text-white' : 'text-[#8B7355]'
          }`}
          style={modeButton(isAnonymous)}
        >
          <EyeOff size={12} aria-hidden="true" /> Anonymous 🎭
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={!isAnonymous}
          onClick={() => { setIsAnonymous(false); setError(''); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            !isAnonymous ? 'text-white' : 'text-[#8B7355]'
          }`}
          style={modeButton(!isAnonymous)}
        >
          <User size={12} aria-hidden="true" /> Leave Name 👤
        </button>
      </div>

      {!isAnonymous && (
        <>
          <label htmlFor="wall-name" className="sr-only">Your name</label>
          <input
            id="wall-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Your name..."
            maxLength={30}
            className="w-full px-4 py-2 rounded-lg text-sm mb-3 outline-none transition-all"
            style={{ background: 'rgba(44,30,16,0.6)', border: '1px solid rgba(222,184,135,0.1)', color: '#DEB887' }}
          />
        </>
      )}

      <label htmlFor="wall-message" className="sr-only">Your whisper</label>
      <textarea
        id="wall-message"
        value={message}
        onChange={(e) => { setMessage(e.target.value); setError(''); }}
        placeholder="Your whisper..."
        maxLength={MAX_LENGTH}
        rows={3}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'wall-error' : undefined}
        className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none transition-all"
        style={{
          background: 'rgba(44,30,16,0.6)',
          border: `1px solid rgba(222,184,135,${error ? 0.4 : 0.1})`,
          color: '#DEB887',
          fontFamily: 'Caveat, cursive',
          fontSize: '1rem',
        }}
      />

      {/* Emoji picker */}
      <fieldset className="mt-3">
        <legend className="sr-only">Pick a mood emoji</legend>
        <div className="flex flex-wrap gap-1">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              aria-label={`Use ${e}`}
              aria-pressed={emoji === e}
              className="w-7 h-7 rounded-md text-sm leading-none transition-all hover:scale-110"
              style={{
                background: emoji === e ? 'rgba(222,184,135,0.22)' : 'transparent',
                border: `1px solid rgba(222,184,135,${emoji === e ? 0.45 : 0.1})`,
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </fieldset>

      {error && (
        <p id="wall-error" className="text-xs mt-3" style={{ color: '#E8A87C' }}>
          {error}
        </p>
      )}

      <div className="flex items-center justify-between mt-3">
        <span
          className="text-[10px] font-mono"
          style={{ color: remaining < 30 ? '#E8A87C' : '#8B7355' }}
          aria-live="polite"
        >
          {message.length}/{MAX_LENGTH}
        </span>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-medium text-white transition-all disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #8B4513, #A0522D)' }}
        >
          <Send size={12} aria-hidden="true" /> Send
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
