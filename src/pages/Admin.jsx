import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Trash2, Eye, EyeOff, Loader2, AlertCircle, Lock } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import Composer from '../features/admin/Composer';
import { useAdminAuth } from '../features/admin/useAdminAuth';
import { fetchAllPostsForAdmin, deletePost, setPostPublished, postTitle } from '../lib/posts';
import { imageUrl } from '../lib/images';
import { isSupabaseConfigured } from '../lib/supabase';

/* ═══════════════ Sign in ═══════════════ */

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    const { error: signInError } = await onSignIn(email, password);

    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? 'That email and password combination is not right.'
          : signInError.message
      );
      setBusy(false);
    }
    // On success the auth listener swaps this component out.
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-8 text-center">
          <span className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#F4F1EC]">
            <Lock size={17} className="text-[#8C8478]" strokeWidth={1.6} />
          </span>
          <h1 className="font-heading text-xl font-bold text-[#1F1C18]">Studio</h1>
          <p className="mt-1.5 text-[13px] text-[#A79E93]">Sign in to write.</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <label htmlFor="admin-email" className="sr-only">Email</label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-[#E4DED5] bg-white px-4 py-3 text-[14px] text-[#1F1C18] outline-none transition-colors placeholder:text-[#BDB5AA] focus:border-[#1F1C18]"
          />

          <label htmlFor="admin-password" className="sr-only">Password</label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-[#E4DED5] bg-white px-4 py-3 text-[14px] text-[#1F1C18] outline-none transition-colors placeholder:text-[#BDB5AA] focus:border-[#1F1C18]"
          />

          {error && (
            <p className="flex items-center gap-2 text-[12px] text-[#C2410C]">
              <AlertCircle size={13} className="shrink-0" /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F1C18] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#332E27] disabled:opacity-50"
          >
            {busy ? <><Loader2 size={15} className="animate-spin" /> Signing in</> : 'Sign in'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

/* ═══════════════ Post row ═══════════════ */

const PostRow = ({ post, onDelete, onToggle }) => {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  // Reset the confirm state if the user walks away from it.
  useEffect(() => {
    if (!confirming) return;
    const timer = setTimeout(() => setConfirming(false), 4000);
    return () => clearTimeout(timer);
  }, [confirming]);

  const remove = async () => {
    setBusy(true);
    await onDelete(post.id);
  };

  return (
    <li className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[#FAF8F5]">
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#F0ECE5]">
        {post.image_url ? (
          <img
            src={imageUrl(post.image_url, { width: 96 })}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-display text-base text-[#C6BFB4]">
            &ldquo;
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[#1F1C18]">{postTitle(post)}</p>
        <p className="text-[11px] font-mono text-[#A79E93]">
          {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          {!post.is_published && ' · draft'}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onToggle(post.id, !post.is_published)}
        aria-label={post.is_published ? 'Move to drafts' : 'Publish'}
        title={post.is_published ? 'Move to drafts' : 'Publish'}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A79E93] transition-colors hover:bg-white hover:text-[#1F1C18]"
      >
        {post.is_published ? <Eye size={15} /> : <EyeOff size={15} />}
      </button>

      <button
        type="button"
        onClick={() => (confirming ? remove() : setConfirming(true))}
        disabled={busy}
        aria-label={confirming ? 'Confirm delete' : 'Delete post'}
        className={`flex h-8 items-center justify-center gap-1 rounded-lg px-2 text-[12px] font-medium transition-colors ${
          confirming
            ? 'bg-[#FEE2E2] text-[#B91C1C]'
            : 'w-8 text-[#A79E93] hover:bg-white hover:text-[#B91C1C]'
        }`}
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={15} />}
        {confirming && !busy && 'Sure?'}
      </button>
    </li>
  );
};

/* ═══════════════ Page ═══════════════ */

const Admin = () => {
  const { session, status, signIn, signOut } = useAdminAuth();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const load = useCallback(async () => {
    const { data } = await fetchAllPostsForAdmin();
    setPosts(data);
    setLoadingPosts(false);
  }, []);

  useEffect(() => {
    if (status === 'authenticated') load();
  }, [status, load]);

  const handleDelete = async (id) => {
    const { error } = await deletePost(id);
    if (!error) setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggle = async (id, isPublished) => {
    const { error } = await setPostPublished(id, isPublished);
    if (!error) {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: isPublished } : p)));
    }
  };

  return (
    <PageWrapper>
      {/* Never index the studio. */}
      <Seo title="Studio" description="Private." path="/admin" noIndex />

      <div className="min-h-screen bg-[#FCFCFB] pb-24 pt-28">
        {!isSupabaseConfigured ? (
          <div className="mx-auto max-w-md px-6 py-24 text-center">
            <h1 className="font-heading text-lg font-bold text-[#1F1C18]">Backend not connected</h1>
            <p className="mt-2 text-[13px] leading-relaxed text-[#7A736A]">
              Add <code className="rounded bg-[#F4F1EC] px-1.5 py-0.5 font-mono text-[12px]">VITE_SUPABASE_URL</code> and{' '}
              <code className="rounded bg-[#F4F1EC] px-1.5 py-0.5 font-mono text-[12px]">VITE_SUPABASE_ANON_KEY</code>,
              then run <code className="rounded bg-[#F4F1EC] px-1.5 py-0.5 font-mono text-[12px]">supabase/schema.sql</code>.
            </p>
          </div>
        ) : status === 'checking' ? (
          <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
            <Loader2 size={20} className="animate-spin text-[#C6BFB4]" />
          </div>
        ) : status === 'anonymous' ? (
          <SignIn onSignIn={signIn} />
        ) : (
          <div className="mx-auto max-w-2xl px-5">
            <header className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1F1C18]">Studio</h1>
                <p className="mt-0.5 text-[12px] text-[#A79E93]">{session?.user?.email}</p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-[#8C8478] transition-colors hover:bg-[#F4F1EC] hover:text-[#1F1C18]"
              >
                <LogOut size={14} /> Sign out
              </button>
            </header>

            <Composer
              accessToken={session?.access_token}
              onPublished={(post) => post && setPosts((prev) => [post, ...prev])}
            />

            <section className="mt-12">
              <h2 className="mb-3 px-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#A79E93]">
                {posts.length > 0 ? `${posts.length} post${posts.length === 1 ? '' : 's'}` : 'Posts'}
              </h2>

              {loadingPosts ? (
                <div className="flex justify-center py-10">
                  <Loader2 size={17} className="animate-spin text-[#C6BFB4]" />
                </div>
              ) : posts.length === 0 ? (
                <p className="px-2 py-10 text-center text-[13px] text-[#A79E93]">
                  Nothing published yet.
                </p>
              ) : (
                <ul className="space-y-0.5">
                  <AnimatePresence initial={false}>
                    {posts.map((post) => (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <PostRow post={post} onDelete={handleDelete} onToggle={handleToggle} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Admin;
