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
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Mood Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[{ id: 'all', label: 'All' }, ...Object.entries(moodColors).map(([k, v]) => ({ id: k, label: `${v.emoji} ${k}` }))].map(f => (
          <button
            key={f.id}
            onClick={() => onMoodFilterChange(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              selectedMoodFilter === f.id
                ? 'text-white'
                : 'text-[#8B7355] hover:text-[#DEB887]'
            }`}
            style={selectedMoodFilter === f.id ? { background: '#8B4513', border: '1px solid rgba(139,69,19,0.3)' } : { border: '1px solid rgba(139,69,19,0.1)' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length > 0 ? posts.map((post, i) => (
          <BlogCard key={i} post={post} index={i} />
        )) : (
          <div className="text-center py-16">
            <PenLine size={32} className="mx-auto mb-3" style={{ color: '#8B7355' }} />
            <p className="text-sm" style={{ color: '#8B7355' }}>No entries yet for this mood.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeedView;
