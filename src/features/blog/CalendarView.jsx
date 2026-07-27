import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { moodColors, months } from './constants';
import { Link } from 'react-router-dom';
import { postPath } from '../../lib/slug';

const CalendarView = ({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
  getPostForDay
}) => {
  // Calendar helpers
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <motion.div
      key="calendar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)]">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-10">
          <button onClick={onPrevMonth} className="p-3 rounded-2xl bg-white/50 hover:bg-white text-slate-400 hover:text-slate-800 transition-all duration-300 shadow-sm hover:shadow">
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-800 tracking-tight">
              {months[currentMonth]}
            </h3>
            <p className="text-sm font-mono tracking-widest text-slate-400 mt-1">{currentYear}</p>
          </div>
          <button onClick={onNextMonth} className="p-3 rounded-2xl bg-white/50 hover:bg-white text-slate-400 hover:text-slate-800 transition-all duration-300 shadow-sm hover:shadow">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-[10px] font-bold tracking-widest uppercase font-mono py-2 text-slate-400">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {calendarDays.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} className="aspect-square" />;
            const post = getPostForDay(day);
            const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            const mood = post ? moodColors[post.mood] : null;

            const dayContent = (
              <div
                className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl text-sm font-medium transition-all duration-500 group overflow-hidden
                  ${isToday ? 'border-2 border-slate-800 shadow-lg' : 'border border-transparent'}
                  ${post ? 'bg-white shadow-sm hover:shadow-xl hover:-translate-y-1' : 'bg-white/20 hover:bg-white/40'}
                `}
              >
                {/* Background glow if there's a post */}
                {post && mood && (
                  <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 bg-gradient-to-br ${mood.theme} transition-opacity duration-500`} />
                )}

                <span className={`relative z-10 ${isToday ? 'text-slate-800 font-bold' : post ? 'text-slate-700 font-bold' : 'text-slate-400'}`}>
                  {day}
                </span>
                
                {mood && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 text-[10px] mt-1"
                  >
                    {mood.emoji}
                  </motion.div>
                )}

                {/* Hover Tooltip (Desktop only) */}
                {post && (
                  <div className="absolute inset-0 bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center z-20 pointer-events-none hidden md:flex backdrop-blur-md">
                    <p className="text-[10px] font-bold leading-tight line-clamp-3">{post.title}</p>
                  </div>
                )}
              </div>
            );

            if (post) {
              return (
                <Link key={day} to={postPath(post)} title={post.title} className="block outline-none">
                  {dayContent}
                </Link>
              );
            }

            return <div key={day}>{dayContent}</div>;
          })}
        </div>

        {/* Heatmap legend */}
        <div className="mt-12 pt-8 border-t border-white/50 flex flex-col items-center">
          <p className="text-[10px] font-bold tracking-widest uppercase font-mono text-slate-400 mb-4">Emotional States</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {Object.entries(moodColors).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 group cursor-default">
                <div className={`w-3 h-3 rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300 ${v.bg}`} />
                <span className="text-[10px] font-bold tracking-wide uppercase text-slate-500 group-hover:text-slate-800 transition-colors">
                  {k}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarView;
