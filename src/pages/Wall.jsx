import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MessageForm from '../features/wall/MessageForm';
import WallGrid from '../features/wall/WallGrid';

const sampleMessages = [
  { text: 'Amazing portfolio bro! 🔥 The Spider-Verse theme is next level', name: null, isAnonymous: true, createdAt: '2h ago', emoji: '🔥' },
  { text: 'You inspire me to build cooler things', name: 'Rahul', isAnonymous: false, createdAt: '1d ago', emoji: '💜' },
  { text: 'Keep going! IIITL represents 🏆', name: null, isAnonymous: true, createdAt: '3d ago', emoji: '🏆' },
  { text: 'The gaming section had me hyped! Fellow Valorant player here', name: 'Priya', isAnonymous: false, createdAt: '5d ago', emoji: '🎮' },
  { text: 'Solo Leveling fan spotted 👊 Great taste', name: null, isAnonymous: true, createdAt: '1w ago', emoji: '⚔️' },
  { text: 'That Meta Hacker Cup rank is insane respect', name: 'Aditya', isAnonymous: false, createdAt: '1w ago', emoji: '🧠' },
  { text: 'Cherry blossom section literally made me emotional', name: null, isAnonymous: true, createdAt: '2w ago', emoji: '🌸' },
  { text: 'Can we collab on a hackathon? DM me!', name: 'Sneha', isAnonymous: false, createdAt: '2w ago', emoji: '🚀' },
];

const Wall = () => {
  const [messages, setMessages] = useState(sampleMessages);

  const handleSubmit = (newMessage) => {
    // Firebase integration placeholder
    alert('Message sent! 💌 (Firebase integration coming soon)');
    setMessages([
      { ...newMessage, createdAt: 'just now' },
      ...messages
    ]);
  };

  return (
    <PageWrapper>
      <section className="pt-24 pb-16 min-h-screen relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #2c1e10 0%, #3d2b1a 30%, #2c1e10 100%)' }}>

        {/* Cork board texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23DEB887\' /%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />

        <div className="content-container relative z-10 px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <span className="text-3xl">💌</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-2 mb-4">
              <span style={{ color: '#FECA57', textShadow: '0 0 30px rgba(254,202,87,0.2)' }}>
                The Whisper Wall
              </span>
            </h1>
            <p className="text-sm" style={{ color: '#A89070' }}>Say something. Leave your mark. No judgment.</p>
          </motion.div>

          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-lg mx-auto mb-12"
          >
            <MessageForm onSubmit={handleSubmit} />
          </motion.div>

          {/* Messages Grid — Post-it Masonry */}
          <WallGrid messages={messages} />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Wall;
