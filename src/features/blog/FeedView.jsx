import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import { moodColors } from './constants';
import BlogCard from './BlogCard';

const FeedView = ({ posts, selectedMoodFilter, onMoodFilterChange }) => {
  return (
    <motion.div
      key="feed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto"
    >
      {/* Mood Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {[{ id: 'all', label: 'All Entries' }, ...Object.entries(moodColors).map(([k, v]) => ({ id: k, label: `${v.emoji} ${k}` }))].map(f => (
          <button
            key={f.id}
            onClick={() => onMoodFilterChange(f.id)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
              selectedMoodFilter === f.id
                ? 'bg-slate-800 text-white shadow-md scale-105'
                : 'bg-white/40 text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts - Asymmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {posts.length > 0 ? posts.map((post, i) => {
          // Asymmetrical layout logic
          const isLeft = i % 2 === 0;
          const isFeatured = i % 3 === 0;
          
          let colSpan = isFeatured ? 'md:col-span-10' : 'md:col-span-8';
          let colStart = isLeft ? 'md:col-start-1' : (isFeatured ? 'md:col-start-3' : 'md:col-start-5');
          let marginTop = i > 0 && !isLeft ? 'md:mt-24' : 'md:mt-0';

          return (
            <div key={i} className={`${colSpan} ${colStart} ${marginTop}`}>
              <BlogCard post={post} index={i} isFeatured={isFeatured} />
            </div>
          );
        }) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:col-span-12 text-center py-20"
          >
            <PenLine size={32} strokeWidth={1} className="mx-auto mb-4 text-slate-300" />
            <p className="text-sm text-slate-500 font-medium">No logs found in this state.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FeedView;
