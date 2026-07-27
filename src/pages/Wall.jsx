import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import MessageForm from '../features/wall/MessageForm';
import WallGrid from '../features/wall/WallGrid';
import { fetchMessages, postMessage } from '../lib/wall';
import { isSupabaseConfigured } from '../lib/supabase';

const Wall = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await fetchMessages();
      if (cancelled) return;
      if (error) {
        console.error('[wall] failed to load messages:', error);
        setStatus('error');
        return;
      }
      setMessages(data);
      setStatus('ready');
    })();

    return () => { cancelled = true; };
  }, []);

  const showToast = (tone, text) => {
    setToast({ tone, text });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = useCallback(async (draft) => {
    // Optimistic: the note appears immediately, then reconciles with the row
    // the server actually created.
    const tempId = `temp_${Date.now()}`;
    const optimistic = { ...draft, id: tempId, created_at: new Date().toISOString(), is_anonymous: draft.isAnonymous };
    setMessages((prev) => [optimistic, ...prev]);

    const { data, error } = await postMessage(draft);

    if (error) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      showToast('error', error.message || "That didn't send. Try again?");
      return;
    }

    setMessages((prev) => prev.map((m) => (m.id === tempId ? data : m)));
    showToast('success', 'Pinned to the wall 💌');
  }, []);

  return (
    <PageWrapper>
      <Seo
        title="The Whisper Wall"
        description="Leave an anonymous note on Aayush Sharma's whisper wall. Say something, leave your mark, no judgment."
        path="/wall"
      />
      <section
        className="relative min-h-screen overflow-hidden pb-16 pt-24"
        style={{ background: 'linear-gradient(180deg, #2c1e10 0%, #3d2b1a 30%, #2c1e10 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23DEB887\' /%3E%3C/svg%3E")',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="content-container relative z-10 px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <span className="text-3xl" aria-hidden="true">💌</span>
            <h1 className="font-display mb-4 mt-2 text-5xl font-bold md:text-6xl">
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
            className="mx-auto mb-12 max-w-lg"
          >
            <MessageForm onSubmit={handleSubmit} />

            <p className="mt-3 text-center text-[11px] leading-relaxed" style={{ color: '#8B7355' }}>
              {isSupabaseConfigured
                ? 'Notes are public — everyone who visits can read them.'
                : 'The wall backend is not connected yet.'}
            </p>
          </motion.div>

          {status === 'loading' && (
            <div className="flex justify-center py-16" role="status" aria-label="Loading messages">
              <Loader2 size={20} className="animate-spin" style={{ color: '#8B7355' }} />
            </div>
          )}

          {status === 'error' && (
            <p className="py-16 text-center text-sm" style={{ color: '#A89070' }}>
              Couldn&rsquo;t reach the wall right now. Try refreshing.
            </p>
          )}

          {status === 'ready' && <WallGrid messages={messages} />}
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 30, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 30, x: '-50%' }}
              role="status"
              className="fixed bottom-28 left-1/2 z-[9990] flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-medium shadow-xl"
              style={{
                background: toast.tone === 'error' ? '#FEE2E2' : '#FFFACD',
                color: toast.tone === 'error' ? '#7F1D1D' : '#2C1810',
                border: '1px solid rgba(139,69,19,0.25)',
              }}
            >
              {toast.tone === 'error' ? (
                <AlertCircle size={16} className="shrink-0 text-[#B91C1C]" aria-hidden="true" />
              ) : (
                <Check size={16} className="shrink-0 text-green-700" aria-hidden="true" />
              )}
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageWrapper>
  );
};

export default Wall;
