import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ImageOff, Loader2 } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import PostCard from '../features/journal/PostCard';
import PostLightbox from '../features/journal/PostLightbox';
import { useColumnCount, useMasonryColumns } from '../features/journal/useMasonry';
import { fetchPosts } from '../lib/posts';
import { isSupabaseConfigured } from '../lib/supabase';

/** Placeholder cards with staggered heights, so the first paint isn't a blank page. */
const SkeletonGrid = ({ columns }) => (
  <div className="flex gap-4 md:gap-5" aria-hidden="true">
    {Array.from({ length: columns }).map((_, col) => (
      <div key={col} className="flex-1">
        {[0.9, 1.3, 0.7, 1.1].map((ratio, i) => (
          <div
            key={i}
            className="mb-4 animate-shimmer rounded-2xl md:mb-5"
            style={{ aspectRatio: `1 / ${ratio + col * 0.08}` }}
          />
        ))}
      </div>
    ))}
  </div>
);

const EmptyState = ({ title, body }) => (
  <div className="mx-auto max-w-sm py-24 text-center">
    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F1EC]">
      <ImageOff size={20} className="text-[#A79E93]" strokeWidth={1.5} />
    </div>
    <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{body}</p>
  </div>
);

const Blog = () => {
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const columnCount = useColumnCount();
  const columns = useMasonryColumns(posts, columnCount);
  const sentinelRef = useRef(null);

  // ── Initial load ──
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error, hasMore: more } = await fetchPosts({ page: 0 });
      if (cancelled) return;
      if (error) {
        console.error('[blog] failed to load posts:', error);
        setStatus('error');
        return;
      }
      setPosts(data);
      setHasMore(more);
      setStatus('ready');
    })();

    return () => { cancelled = true; };
  }, []);

  // ── Infinite scroll ──
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    const next = page + 1;
    const { data, error, hasMore: more } = await fetchPosts({ page: next });

    if (!error) {
      setPosts((prev) => [...prev, ...data]);
      setPage(next);
      setHasMore(more);
    }
    setLoadingMore(false);
  }, [page, hasMore, loadingMore]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: '600px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  // ── Deep link: /blog/:slug opens that post ──
  useEffect(() => {
    if (!slug || status !== 'ready') return;
    const match = posts.find((p) => p.slug === slug);
    if (match) setActiveId(match.id);
  }, [slug, status, posts]);

  const activeIndex = posts.findIndex((p) => p.id === activeId);
  const activePost = activeIndex >= 0 ? posts[activeIndex] : null;

  const open = useCallback((post) => {
    setActiveId(post.id);
    // Give the post its own URL without a route change/remount.
    window.history.pushState(null, '', `/blog/${post.slug}`);
  }, []);

  const close = useCallback(() => {
    setActiveId(null);
    window.history.pushState(null, '', '/blog');
  }, []);

  const step = useCallback(
    (delta) => {
      const next = posts[activeIndex + delta];
      if (!next) return;
      setActiveId(next.id);
      window.history.replaceState(null, '', `/blog/${next.slug}`);
    },
    [posts, activeIndex]
  );

  // Browser back should close the overlay rather than leave the page.
  useEffect(() => {
    const onPop = () => setActiveId(null);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <PageWrapper>
      <Seo
        title={activePost ? activePost.title || 'Journal' : 'Journal'}
        description="Photographs, notes, and late-night thoughts from Aayush Sharma."
        path={activePost ? `/blog/${activePost.slug}` : '/blog'}
        image={activePost?.image_url || undefined}
        type={activePost ? 'article' : 'website'}
      />

      <section className="min-h-screen bg-[#FCFCFB] pb-28 pt-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">

          {/* ── Masthead ── */}
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
          >
            <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.32em] text-[#A79E93]">
              Journal
            </p>
            <h1 className="font-heading text-[2.6rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#1F1C18] md:text-[3.75rem]">
              Late Night Logs
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#7A736A]">
              Photographs, half-finished thoughts, and the occasional breakthrough.
            </p>
            <div className="mx-auto mt-9 h-px w-12 bg-[#DDD7CE]" />
          </motion.header>

          {/* ── Feed ── */}
          {status === 'loading' && <SkeletonGrid columns={columnCount} />}

          {status === 'error' && (
            <EmptyState
              title="Couldn't load the journal"
              body="Something went wrong reaching the server. Refreshing usually sorts it out."
            />
          )}

          {status === 'ready' && posts.length === 0 && (
            <EmptyState
              title="Nothing here yet"
              body={
                isSupabaseConfigured
                  ? 'The first post will show up here the moment it goes live.'
                  : 'The journal backend is not connected yet.'
              }
            />
          )}

          {status === 'ready' && posts.length > 0 && (
            <>
              <div className="flex gap-4 md:gap-5">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="min-w-0 flex-1">
                    {column.map((post, i) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        index={colIndex + i * columnCount}
                        onOpen={open}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div ref={sentinelRef} className="h-4" />

              {loadingMore && (
                <div className="flex justify-center py-10" role="status" aria-label="Loading more posts">
                  <Loader2 size={18} className="animate-spin text-[#A79E93]" />
                </div>
              )}

              {!hasMore && posts.length > 8 && (
                <p className="py-14 text-center text-[11px] font-mono uppercase tracking-[0.22em] text-[#BDB5AA]">
                  That&rsquo;s everything
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activePost && (
          <PostLightbox
            key={activePost.id}
            post={activePost}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            hasPrev={activeIndex > 0}
            hasNext={activeIndex < posts.length - 1}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Blog;
