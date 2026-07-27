import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, List } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import { blogPosts } from '../data/writing';
import CalendarView from '../features/blog/CalendarView';
import FeedView from '../features/blog/FeedView';

const TABS = [
  { id: 'feed', icon: List, label: 'Feed' },
  { id: 'calendar', icon: CalendarDays, label: 'Calendar' },
];

/** Newest first, so the feed and the calendar's default month agree. */
const sortedPosts = [...(blogPosts || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

/**
 * Open the calendar on the month of the most recent post rather than today.
 * Defaulting to the current month meant a visitor usually landed on an empty
 * grid and assumed the journal was broken.
 */
const initialMonth = () => {
  const latest = sortedPosts[0];
  const d = latest ? new Date(latest.date) : new Date();
  return { month: d.getMonth(), year: d.getFullYear() };
};

const Blog = () => {
  const [view, setView] = useState('feed');
  const [{ month, year }, setCursor] = useState(initialMonth);
  const [mood, setMood] = useState('all');

  const filteredPosts = useMemo(
    () => (mood === 'all' ? sortedPosts : sortedPosts.filter((p) => p.mood === mood)),
    [mood]
  );

  const prevMonth = () =>
    setCursor(({ month: m, year: y }) => (m === 0 ? { month: 11, year: y - 1 } : { month: m - 1, year: y }));

  const nextMonth = () =>
    setCursor(({ month: m, year: y }) => (m === 11 ? { month: 0, year: y + 1 } : { month: m + 1, year: y }));

  const getPostForDay = (day) =>
    sortedPosts.find((p) => {
      const d = new Date(p.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    }) || null;

  return (
    <PageWrapper>
      <Seo
        title="Late Night Logs"
        description="Thoughts, code, breakthroughs, failures, and everything in between — the working journal of Aayush Sharma."
        path="/blog"
      />
      <section className="pt-24 pb-20 min-h-screen relative bg-[#fafafa]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] to-white -z-20" />
        <div className="absolute inset-0 noise opacity-[0.02] mix-blend-overlay pointer-events-none -z-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-50/30 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto relative z-10 px-6">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-4 font-mono">
              Digital Journal
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-black mb-4 text-slate-800 tracking-tight">
              Late Night Logs
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
              Thoughts, code, breakthroughs, failures, and everything in between.
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div
              role="tablist"
              aria-label="Journal view"
              className="inline-flex p-1 bg-white/80 backdrop-blur-md rounded-[16px] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative"
            >
              {TABS.map(({ id, icon: Icon, label }) => {
                const isActive = view === id;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setView(id)}
                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-colors z-10 ${
                      isActive ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeTabCompact"
                        className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-50"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon size={14} className={isActive ? 'text-indigo-400' : ''} aria-hidden="true" />
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {view === 'calendar' ? (
                <CalendarView
                  key="calendar"
                  currentMonth={month}
                  currentYear={year}
                  onPrevMonth={prevMonth}
                  onNextMonth={nextMonth}
                  getPostForDay={getPostForDay}
                />
              ) : (
                <FeedView
                  key="feed"
                  posts={filteredPosts}
                  selectedMoodFilter={mood}
                  onMoodFilterChange={setMood}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Blog;
