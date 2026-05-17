import { motion } from 'framer-motion';
import { moodColors } from './constants';
import { Link } from 'react-router-dom';

const BlogCard = ({ post, index, isFeatured }) => {
  const mood = moodColors[post.mood] || moodColors.productive;
  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group cursor-pointer w-full h-full ${isFeatured ? 'min-h-[400px]' : 'min-h-[300px]'}`}
    >
      <Link to={`/blog/${post.dateSlug || post.date.replace(/[^a-z0-9]+/gi, '-')}/${slug}`} className="block h-full outline-none">
        {/* Layered Glass Background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl rounded-[1.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] group-hover:-translate-y-2 transition-all duration-700 ease-out z-0 overflow-hidden">
          {/* Subtle mood ambient lighting */}
          <div className={`absolute -inset-x-20 -top-20 h-40 bg-gradient-to-b ${mood.theme} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl mix-blend-multiply`} />
        </div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between transition-transform duration-700 ease-out group-hover:-translate-y-2">
          {/* Top Meta */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-slate-400">
              <span className="uppercase">{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                3 MIN
              </span>
            </div>

            {/* Mood Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 bg-white shadow-sm border border-slate-100 group-hover:border-transparent ${mood.bg} ${mood.glow}`}>
              <span>{mood.emoji}</span>
              <span>{post.mood}</span>
            </div>
          </div>

          {/* Content */}
          <div className="mt-auto">
            <h3 className={`font-heading font-black text-slate-800 mb-6 leading-[1.1] transition-colors duration-500 group-hover:text-black ${isFeatured ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>
              {post.title}
            </h3>
            
            <p className="text-base leading-relaxed text-slate-500 font-medium max-w-2xl">
              {post.excerpt || post.content?.substring(0, 150) + '...'}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
