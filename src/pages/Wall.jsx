import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import MessageForm from '../features/wall/MessageForm';
import WallGrid from '../features/wall/WallGrid';
import { loadMessages, saveMessage } from '../lib/wallStorage';

const Wall = () => {
  const [messages, setMessages] = useState(loadMessages);
  const [toast, setToast] = useState(null);

  const handleSubmit = useCallback((draft) => {
    const message = {
      ...draft,
      id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    };

    const persisted = saveMessage(message);
    setMessages((prev) => [message, ...prev]);

    setToast(
      persisted
        ? 'Pinned to the wall 💌'
        : "Pinned — but your browser won't remember it after a refresh."
    );
    setTimeout(() => setToast(null), 4000);
  }, []);

  return (
    <PageWrapper>
      <Seo
        title="The Whisper Wall"
        description="Leave an anonymous note on Aayush Sharma's whisper wall. Say something, leave your mark, no judgment."
        path="/wall"
      />
      <section
        className="pt-24 pb-16 min-h-screen relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #2c1e10 0%, #3d2b1a 30%, #2c1e10 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23DEB887\' /%3E%3C/svg%3E")',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="content-container relative z-10 px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <span className="text-3xl" aria-hidden="true">💌</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-2 mb-4">
              <span style={{ color: '#FECA57', textShadow: '0 0 30px rgba(254,202,87,0.2)' }}>
                The Whisper Wall
              </span>
            </h1>
            <p className="text-sm" style={{ color: '#A89070' }}>
              Say something. Leave your mark. No judgment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-lg mx-auto mb-12"
          >
            <MessageForm onSubmit={handleSubmit} />

            <p className="text-[11px] text-center mt-3 leading-relaxed" style={{ color: '#8B7355' }}>
              Notes are saved in your browser, so they’re here when you come back.
            </p>
          </motion.div>

          <WallGrid messages={messages} />
        </div>

        {/* Confirmation toast — replaces the old blocking alert() */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 30, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 30, x: '-50%' }}
              role="status"
              className="fixed bottom-28 left-1/2 z-[9990] flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium shadow-xl"
              style={{ background: '#FFFACD', color: '#2C1810', border: '1px solid rgba(139,69,19,0.25)' }}
            >
              <Check size={16} className="text-green-700 shrink-0" aria-hidden="true" />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageWrapper>
  );
};

export default Wall;
