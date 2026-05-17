import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { moodColors, months } from './constants';
import { Link } from 'react-router-dom';

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
      exit={{ opacity: 0 }}
      className="max-w-xl mx-auto"
    >
      <div className="rounded-2xl p-6 border" style={{ background: 'rgba(30,22,15,0.8)', borderColor: 'rgba(139,69,19,0.15)' }}>
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onPrevMonth} className="p-2 rounded-lg hover:bg-[rgba(139,69,19,0.1)] text-[#8B7355] hover:text-[#DEB887] transition-all">
            <ChevronLeft size={18} />
          </button>
          <h3 className="font-heading font-bold text-lg" style={{ color: '#DEB887' }}>
            {months[currentMonth]} {currentYear}
          </h3>
          <button onClick={onNextMonth} className="p-2 rounded-lg hover:bg-[rgba(139,69,19,0.1)] text-[#8B7355] hover:text-[#DEB887] transition-all">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-[10px] font-mono py-1" style={{ color: '#8B7355' }}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const post = getPostForDay(day);
            const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            const mood = post ? moodColors[post.mood] : null;

            const dayContent = (
              <div
                className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all
                  ${isToday ? 'ring-1 ring-[#DEB887]/40' : ''}
                  ${post ? 'hover:bg-[rgba(139,69,19,0.1)] cursor-pointer' : 'cursor-default'}
                `}
                style={{ color: isToday ? '#DEB887' : '#8B7355' }}
              >
                <span className={isToday ? 'font-bold' : ''}>{day}</span>
                {mood && (
                  <span className="text-[8px] mt-0.5">{mood.emoji}</span>
                )}
              </div>
            );

            if (post) {
              const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              return (
                <Link key={day} to={`/blog/${post.dateSlug || post.date.replace(/[^a-z0-9]+/gi, '-')}/${slug}`} title={post.title}>
                  {dayContent}
                </Link>
              );
            }

            return <div key={day}>{dayContent}</div>;
          })}
        </div>

        {/* Mood legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'rgba(139,69,19,0.1)' }}>
          {Object.entries(moodColors).map(([k, v]) => (
            <span key={k} className="text-[10px] flex items-center gap-1" style={{ color: '#8B7355' }}>
              {v.emoji} {k}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarView;
