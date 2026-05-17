import { motion } from 'framer-motion';
import { moodColors } from './constants';
import { Link } from 'react-router-dom';

const TimelineView = ({ posts }) => {
  return (
    <motion.div
      key="timeline"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto relative py-12"
    >
      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent -translate-x-1/2" />

      <div className="space-y-24">
        {posts.map((post, i) => {
          const isLeft = i % 2 === 0;
          const mood = moodColors[post.mood] || moodColors.productive;
          const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-center justify-between w-full ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Empty space for the other side */}
              <div className="w-5/12" />

              {/* Central Node */}
              <div className="relative flex items-center justify-center w-2/12 z-10">
                <div className={`w-8 h-8 rounded-full border-4 border-[#fafafa] flex items-center justify-center shadow-lg ${mood.bg} ${mood.glow} transition-transform hover:scale-125 duration-500`}>
                  <span className="text-[10px]">{mood.emoji}</span>
                </div>
              </div>

              {/* Card */}
              <div className="w-5/12">
                <Link to={`/blog/${post.dateSlug || post.date.replace(/[^a-z0-9]+/gi, '-')}/${slug}`} className="block relative group">
                  {/* Subtle connector line */}
                  <div className={`absolute top-1/2 -translate-y-1/2 h-px w-8 bg-slate-200 transition-all duration-500 group-hover:w-12 group-hover:bg-slate-300 ${isLeft ? '-right-8 group-hover:-right-12' : '-left-8 group-hover:-left-12'}`} />

                  <div className={`bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isLeft ? 'text-right' : 'text-left'}`}>
                    
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${mood.theme} transition-opacity duration-700 pointer-events-none`} />

                    <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-slate-400 mb-3 block">
                      {post.date}
                    </span>
                    <h4 className="font-heading font-extrabold text-xl text-slate-800 mb-3 group-hover:text-black transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {post.excerpt || post.content?.substring(0, 100) + '...'}
                    </p>
                  </div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TimelineView;
