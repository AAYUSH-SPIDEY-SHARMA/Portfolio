import { supabase, isSupabaseConfigured } from './supabase';
import { toSlug } from './slug';

/**
 * Data access for the journal feed.
 *
 * Every function returns `{ data, error }` and never throws, so a component
 * can render an empty or error state instead of falling over.
 */

const POSTS_PER_PAGE = 24;

/** Fetch one page of published posts, newest first. */
export async function fetchPosts({ page = 0, pageSize = POSTS_PER_PAGE } = {}) {
  if (!isSupabaseConfigured) return { data: [], error: null, hasMore: false };

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) return { data: [], error, hasMore: false };
  return { data: data ?? [], error: null, hasMore: (data?.length ?? 0) === pageSize };
}

/** Fetch a single post by slug. */
export async function fetchPostBySlug(slug) {
  if (!isSupabaseConfigured) return { data: null, error: null };

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  return { data: data ?? null, error };
}

/** Admin: fetch everything, including unpublished drafts. */
export async function fetchAllPostsForAdmin() {
  if (!isSupabaseConfigured) return { data: [], error: null };

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  return { data: data ?? [], error };
}

/**
 * Derive a URL-safe, collision-free slug.
 *
 * Titles repeat ("Late night"), and two posts sharing a slug would make one
 * unreachable, so a short suffix is appended when the base is already taken.
 */
async function buildUniqueSlug(base) {
  const root = toSlug(base).slice(0, 60) || 'post';
  if (!isSupabaseConfigured) return root;

  const { data } = await supabase
    .from('posts')
    .select('slug')
    .like('slug', `${root}%`);

  const taken = new Set((data ?? []).map((r) => r.slug));
  if (!taken.has(root)) return root;

  for (let i = 2; i < 100; i++) {
    const candidate = `${root}-${i}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `${root}-${Date.now().toString(36)}`;
}

/** Admin: publish a new post. */
export async function createPost({ caption, title, imageUrl, imageWidth, imageHeight, tags = [], mood = 'productive' }) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Backend not configured') };

  const trimmedCaption = caption?.trim() || null;
  const trimmedTitle = title?.trim() || null;

  if (!trimmedCaption && !imageUrl) {
    return { data: null, error: new Error('Add an image or write something.') };
  }

  // Slug source: explicit title, else the caption's first line.
  const slugSource = trimmedTitle || trimmedCaption?.split('\n')[0] || 'post';
  const slug = await buildUniqueSlug(slugSource);

  const { data, error } = await supabase
    .from('posts')
    .insert({
      caption: trimmedCaption,
      title: trimmedTitle,
      image_url: imageUrl ?? null,
      image_width: imageWidth ?? null,
      image_height: imageHeight ?? null,
      tags,
      mood,
      slug,
      is_published: true,
    })
    .select()
    .single();

  return { data, error };
}

/** Admin: delete a post. */
export async function deletePost(id) {
  if (!isSupabaseConfigured) return { error: new Error('Backend not configured') };
  const { error } = await supabase.from('posts').delete().eq('id', id);
  return { error };
}

/** Admin: toggle a post between published and draft. */
export async function setPostPublished(id, isPublished) {
  if (!isSupabaseConfigured) return { error: new Error('Backend not configured') };
  const { error } = await supabase.from('posts').update({ is_published: isPublished }).eq('id', id);
  return { error };
}

/** The headline shown on a card: explicit title, else the caption's first line. */
export function postTitle(post) {
  if (post.title) return post.title;
  const firstLine = post.caption?.split('\n')[0]?.trim();
  if (!firstLine) return 'Untitled';
  return firstLine.length > 80 ? `${firstLine.slice(0, 80)}…` : firstLine;
}
