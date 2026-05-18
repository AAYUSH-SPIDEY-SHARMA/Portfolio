import { useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GREETING = {
  role: 'assistant',
  content: "Hii! I'm AayushAI ✨ — wanna know about Aayush, his projects, skills, or literally anything? Ask away, I'm your friend here 😄",
};

const WAIFU_GREETING = {
  role: 'assistant',
  content: "Ara ara~ welcome to the hidden dimension 🌸 Not everyone finds their way here. I'm AayushAI — ask me anything about Aayush-kun, his projects, or this secret world ✨",
};

const SESSION_LIMIT = 30; // max messages per session
const API_URL = '/api/chat';

export function useChat() {
  const location = useLocation();
  const isWaifuMode = location.pathname === '/hidden';

  const [messages, setMessages] = useState([
    isWaifuMode ? WAIFU_GREETING : GREETING,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageCountRef = useRef(0);

  // Reset greeting when mode changes
  const prevModeRef = useRef(isWaifuMode);
  if (prevModeRef.current !== isWaifuMode) {
    prevModeRef.current = isWaifuMode;
    setMessages([isWaifuMode ? WAIFU_GREETING : GREETING]);
    messageCountRef.current = 0;
  }

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    // Session rate limit
    if (messageCountRef.current >= SESSION_LIMIT) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "We've been chatting a lot! 😄 I need a breather. Refresh the page to start a new conversation!",
      }]);
      return;
    }

    const userMessage = { role: 'user', content: content.trim() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    messageCountRef.current++;

    try {
      // Build conversation history for API (only user/assistant messages)
      const chatHistory = [...messages, userMessage]
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          mode: isWaifuMode ? 'waifu' : 'normal',
        }),
      });

      const data = await res.json();

      if (data.rateLimited) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
        }]);
      } else if (data.message) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
        }]);
      } else {
        throw new Error('No response from API');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Connection glitch — try again!');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Hmm something went wrong on my end 😅 Try sending that again?",
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, isWaifuMode]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    isWaifuMode,
  };
}
