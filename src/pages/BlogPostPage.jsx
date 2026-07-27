import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import { blogPosts } from '../data/writing';
import { moodColors } from '../features/blog/constants';
import { matchesPost, postPath } from '../lib/slug';

const BlogPostPage = () => {
  const { date, slug } = useParams();
  const post = blogPosts.find((p) => matchesPost(p, date, slug));

  if (!post) return <Navigate to="/blog" replace />;

  const mood = moodColors[post.mood] || moodColors.productive;
  const body = (post.content || post.excerpt || '').split(/\n{2,}|\n/).filter(Boolean);

  return (
    <PageWrapper>
      <Seo
        title={post.title}
        description={post.excerpt || post.content?.slice(0, 160)}
        path={postPath(post)}
        type="article"
      />
      <article className="pt-32 pb-24 min-h-screen relative" style={{ background: '#1a1510' }}>
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="content-container max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#8B7355] hover:text-[#DEB887] transition-colors"
            >
              <ChevronLeft size={16} aria-hidden="true" /> Back to Journal
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
                style={{ background: 'rgba(139,69,19,0.1)', color: '#DEB887', border: '1px solid rgba(139,69,19,0.2)' }}
              >
                <Calendar size={12} aria-hidden="true" />
                <time dateTime={post.dateSlug}>{post.date}</time>
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{ background: 'rgba(139,69,19,0.1)', color: '#8B7355', border: '1px solid rgba(139,69,19,0.2)' }}
              >
                {mood.emoji} {post.mood}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: '#DEB887' }}>
              {post.title}
            </h1>

            {/*
              Rendered as plain text paragraphs. This used to go through
              dangerouslySetInnerHTML, which was safe only because the posts are
              a local constant — the moment entries came from a database or a
              form it would have been a stored-XSS hole.
            */}
            <div className="space-y-5">
              {body.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed font-serif" style={{ color: '#A89070' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {post.tags?.length > 0 && (
              <footer className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(139,69,19,0.1)' }}>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <li
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-lg"
                      style={{ color: '#8B7355', background: 'rgba(139,69,19,0.05)', border: '1px solid rgba(139,69,19,0.1)' }}
                    >
                      #{t}
                    </li>
                  ))}
                </ul>
              </footer>
            )}
          </motion.div>
        </div>
      </article>
    </PageWrapper>
  );
};

export default BlogPostPage;
