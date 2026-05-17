import { motion } from 'framer-motion';

/**
 * TimelineItem — reusable timeline node for Journey page
 * 
 * @param {string} year - Year/date label
 * @param {string} title - Milestone title
 * @param {string} description - Milestone description
 * @param {string} icon - Emoji icon
 * @param {string} mood - Mood category for border color
 * @param {number} index - Position index for animation direction
 */
const moodColors = {
  special: 'border-yellow-400',
  excited: 'border-blue-400',
  proud: 'border-emerald-400',
  growth: 'border-purple-400',
  happy: 'border-pink-400',
};

const TimelineItem = ({ year, title, description, icon, mood, index = 0 }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`relative flex items-start gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} pl-14 md:pl-0`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
        <div className="p-5 rounded-2xl bg-[rgba(19,19,26,0.8)] border border-[var(--border-default)] backdrop-blur-sm hover:border-[var(--primary)]/20 transition-all group">
          <span className="text-[10px] font-mono text-[var(--accent-gold)] tracking-wider">{year}</span>
          <h3 className="font-heading font-bold text-base text-[var(--text-accent)] mt-1 group-hover:text-[var(--primary)] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Center dot */}
      <div className={`absolute left-3 md:left-1/2 md:-translate-x-1/2 w-7 h-7 rounded-full bg-[var(--bg-primary)] border-2 ${moodColors[mood] || 'border-[var(--primary)]'} flex items-center justify-center text-xs z-10`}>
        {icon}
      </div>

      {/* Spacer for alternating */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export default TimelineItem;
