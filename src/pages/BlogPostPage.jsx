import { useParams, Navigate, Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { blogPosts } from '../data/writing';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar } from 'lucide-react';
import { moodColors } from '../features/blog/constants';

const BlogPostPage = () => {
  const { date, slug } = useParams();

  // Find the matching post
  const post = blogPosts.find(p => {
    const postSlug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const postDateSlug = p.dateSlug || p.date.replace(/[^a-z0-9]+/gi, '-');
    return postSlug === slug && postDateSlug === date;
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const mood = moodColors[post.mood] || moodColors.productive;

  return (
    <PageWrapper>
      <section className="pt-32 pb-24 min-h-screen relative" style={{ background: '#1a1510' }}>
        {/* Warm grain texture */}
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="content-container max-w-3xl mx-auto px-6 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#8B7355] hover:text-[#DEB887] transition-colors">
              <ChevronLeft size={16} /> Back to Journal
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono" style={{ background: 'rgba(139,69,19,0.1)', color: '#DEB887', border: '1px solid rgba(139,69,19,0.2)' }}>
                <Calendar size={12} /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(139,69,19,0.1)', color: '#8B7355', border: '1px solid rgba(139,69,19,0.2)' }}>
                {mood.emoji} {post.mood}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: '#DEB887' }}>
              {post.title}
            </h1>

            <div className="prose prose-invert max-w-none prose-p:font-serif prose-p:leading-relaxed prose-p:text-[#A89070] prose-a:text-[#DEB887] prose-headings:text-[#DEB887] prose-headings:font-heading">
              {/* If we had markdown content, we'd render it here. For now, we'll use excerpt or simulate content */}
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
              ) : (
                <p className="text-lg">{post.excerpt}</p>
              )}
            </div>

            {post.tags && (
              <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(139,69,19,0.1)' }}>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(t => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg" style={{ color: '#8B7355', background: 'rgba(139,69,19,0.05)', border: '1px solid rgba(139,69,19,0.1)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </section>
    </PageWrapper>
  );
};

export default BlogPostPage;
