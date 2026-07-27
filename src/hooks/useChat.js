import { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GREETING = {
  role: 'assistant',
  content:
    "Hii! I'm BINGO ✨ — wanna know about Aayush, his projects, skills, or literally anything? Ask away, I'm your friend here 😄",
};

const WAIFU_GREETING = {
  role: 'assistant',
  content:
    "Ara ara~ welcome to the hidden dimension 🌸 Not everyone finds their way here. I'm BINGO — ask me anything about Aayush-kun, his projects, or this secret world ✨",
};

const SESSION_LIMIT = 30;
const MESSAGE_MAX_CHARS = 1000;
const MULTI_MESSAGE_DELAY_MS = 400;
const API_URL = '/api/chat';

export function useChat() {
  const location = useLocation();
  const isWaifuMode = location.pathname === '/hidden';

  const [messages, setMessages] = useState([isWaifuMode ? WAIFU_GREETING : GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messageCountRef = useRef(0);
  const abortRef = useRef(null);

  // Reset the conversation when crossing into/out of the hidden dimension.
  // (Documented React pattern for adjusting state during render.)
  const prevModeRef = useRef(isWaifuMode);
  if (prevModeRef.current !== isWaifuMode) {
    prevModeRef.current = isWaifuMode;
    setMessages([isWaifuMode ? WAIFU_GREETING : GREETING]);
    messageCountRef.current = 0;
    setError(null);
  }

  // Don't leave a request in flight after the orb unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const sendMessage = useCallback(
    async (content) => {
      const trimmed = content.trim().slice(0, MESSAGE_MAX_CHARS);
      if (!trimmed || isLoading) return;

      if (messageCountRef.current >= SESSION_LIMIT) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "We've been chatting a lot! 😄 I need a breather. Refresh the page to start a new conversation!",
          },
        ]);
        return;
      }

      const userMessage = { role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);
      messageCountRef.current += 1;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        // Build history from the authoritative state rather than the closure,
        // so staggered multi-part replies are always included.
        let history = [];
        setMessages((prev) => {
          history = prev
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map(({ role, content: c }) => ({ role, content: c }));
          return prev;
        });

        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history,
            mode: isWaifuMode ? 'waifu' : 'normal',
          }),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data = await res.json();
        if (!data?.message) throw new Error('No response from API');

        if (data.rateLimited) {
          setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
          return;
        }

        // The model splits longer replies with ||| so they land like real texts.
        const parts = data.message.split('|||').map((p) => p.trim()).filter(Boolean);

        if (parts.length <= 1) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.message.replace(/\|\|\|/g, '').trim() },
          ]);
          return;
        }

        for (let i = 0; i < parts.length; i++) {
          if (controller.signal.aborted) return;
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, MULTI_MESSAGE_DELAY_MS));
          }
          setMessages((prev) => [...prev, { role: 'assistant', content: parts[i] }]);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Chat error:', err);
        setError('Connection glitch — try again!');
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Hmm something went wrong on my end 😅 Try sending that again?' },
        ]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    },
    [isLoading, isWaifuMode]
  );

  return { messages, isLoading, error, sendMessage, isWaifuMode };
}
