import PageWrapper from '../components/layout/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, List } from 'lucide-react';
import { useState } from 'react';
import { blogPosts } from '../data/writing';
import CalendarView from '../features/blog/CalendarView';
import FeedView from '../features/blog/FeedView';

const Blog = () => {
  const [view, setView] = useState('feed'); // 'feed' | 'calendar'
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('all');

  const filteredPosts = selectedMoodFilter === 'all'
    ? (blogPosts || [])
    : (blogPosts || []).filter(p => p.mood === selectedMoodFilter);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  // Check if a day has a post
  const getPostForDay = (day) => {
    if (!blogPosts) return null;
    return blogPosts.find(p => {
      const d = new Date(p.date);
      return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  };

  return (
    <PageWrapper>
      <section className="pt-24 pb-16 min-h-screen relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a1510 0%, #1f1914 30%, #1a1510 100%)' }}>

        {/* Warm grain texture */}
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Decorative warm lamp glow */}
        <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #DEB887, transparent 70%)' }} />
        <div className="absolute top-40 left-1/4 w-48 h-48 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #8B4513, transparent 70%)' }} />

        <div className="content-container relative z-10 px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--journal-accent)', fontFamily: 'Caveat, cursive', fontSize: '1rem' }}>
              ✍️ Daily Entries
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-2 mb-4">
              <span style={{ color: '#DEB887', textShadow: '0 0 30px rgba(222,184,135,0.2)' }}>
                My Journal
              </span>
            </h1>
            <p className="text-sm" style={{ color: '#8B7355' }}>Thoughts, code, feelings, and everything in between</p>
          </motion.div>

          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex rounded-xl p-1" style={{ background: 'rgba(139,69,19,0.1)', border: '1px solid rgba(139,69,19,0.15)' }}>
              <button
                onClick={() => setView('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  view === 'calendar'
                    ? 'text-white shadow-md'
                    : 'text-[#8B7355] hover:text-[#DEB887]'
                }`}
                style={view === 'calendar' ? { background: '#8B4513' } : {}}
              >
                <CalendarDays size={14} /> Calendar
              </button>
              <button
                onClick={() => setView('feed')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  view === 'feed'
                    ? 'text-white shadow-md'
                    : 'text-[#8B7355] hover:text-[#DEB887]'
                }`}
                style={view === 'feed' ? { background: '#8B4513' } : {}}
              >
                <List size={14} /> Feed
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {view === 'calendar' ? (
              <CalendarView 
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                getPostForDay={getPostForDay}
              />
            ) : (
              <FeedView 
                posts={filteredPosts}
                selectedMoodFilter={selectedMoodFilter}
                onMoodFilterChange={setSelectedMoodFilter}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Blog;
