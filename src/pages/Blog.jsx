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

  const getPostForDay = (day) => {
    if (!blogPosts) return null;
    return blogPosts.find(p => {
      const d = new Date(p.date);
      return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  };

  return (
    <PageWrapper>
      <section className="pt-24 pb-20 min-h-screen relative bg-[#fafafa]">
        {/* Soft calm ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] to-white -z-20" />
        <div className="absolute inset-0 noise opacity-[0.02] mix-blend-overlay pointer-events-none -z-10" />
        
        {/* Extremely subtle atmospheric blur */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-50/30 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto relative z-10 px-6">
          
          {/* Compact Cinematic Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-4 font-mono">
              DIGITAL JOURNAL
            </span>

            <h1 className="font-heading text-4xl md:text-5xl font-black mb-4 text-slate-800 tracking-tight">
              Late Night Logs
            </h1>
            
            <p className="text-sm md:text-base text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
              Thoughts, code, breakthroughs, failures, and everything in between.
            </p>
          </motion.div>

          {/* Simple Segmented Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex p-1 bg-white/80 backdrop-blur-md rounded-[16px] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative">
              {[
                { id: 'feed', icon: List, label: 'Feed' },
                { id: 'calendar', icon: CalendarDays, label: 'Calendar' }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = view === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-colors z-10 ${
                      isActive ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabCompact"
                        className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-50"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon size={14} className={isActive ? 'text-indigo-400' : ''} />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Dynamic Content Area */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {view === 'calendar' && (
                <CalendarView 
                  key="calendar"
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  onPrevMonth={prevMonth}
                  onNextMonth={nextMonth}
                  getPostForDay={getPostForDay}
                />
              )}
              {view === 'feed' && (
                <FeedView 
                  key="feed"
                  posts={filteredPosts}
                  selectedMoodFilter={selectedMoodFilter}
                  onMoodFilterChange={setSelectedMoodFilter}
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
