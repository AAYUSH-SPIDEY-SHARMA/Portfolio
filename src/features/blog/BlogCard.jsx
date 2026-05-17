import { motion } from 'framer-motion';
import { moodColors } from './constants';
import { Link } from 'react-router-dom';

const BlogCard = ({ post, index }) => {
  const mood = moodColors[post.mood] || moodColors.productive;
  
  // Create a URL-friendly slug if not provided
  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="p-6 rounded-2xl border transition-all hover:border-[rgba(139,69,19,0.3)] group cursor-pointer"
      style={{ background: 'rgba(30,22,15,0.8)', borderColor: 'rgba(139,69,19,0.1)' }}
    >
      <Link to={`/blog/${post.dateSlug || post.date.replace(/[^a-z0-9]+/gi, '-')}/${slug}`} className="block">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono" style={{ color: '#8B7355' }}>📅 {post.date}</span>
          <span className="text-[10px]">{mood.emoji} {post.mood}</span>
        </div>
        <h3 className="font-heading font-bold text-base mb-2 group-hover:text-white transition-colors" style={{ color: '#DEB887' }}>
          "{post.title}"
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#A89070', fontFamily: 'Georgia, serif' }}>
          {post.excerpt || post.content?.substring(0, 200) + '...'}
        </p>
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ color: '#8B7355', background: 'rgba(139,69,19,0.08)', border: '1px solid rgba(139,69,19,0.1)' }}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default BlogCard;
