import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Data access for the Whisper Wall.
 *
 * Messages are now shared across every visitor rather than living in one
 * browser's localStorage. Writes are anonymous; RLS caps length and stops a
 * caller from inserting a pre-hidden row (see supabase/schema.sql).
 */

const MAX_FETCH = 200;

export async function fetchMessages() {
  if (!isSupabaseConfigured) return { data: [], error: null };

  const { data, error } = await supabase
    .from('wall_messages')
    .select('id, text, name, is_anonymous, emoji, created_at')
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
    .limit(MAX_FETCH);

  return { data: data ?? [], error };
}

export async function postMessage({ text, name, isAnonymous, emoji }) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Backend not configured') };

  const trimmed = text.trim();
  if (!trimmed) return { data: null, error: new Error('Write something first.') };

  const { data, error } = await supabase
    .from('wall_messages')
    .insert({
      text: trimmed.slice(0, 280),
      name: isAnonymous ? null : name?.trim().slice(0, 30) || null,
      is_anonymous: Boolean(isAnonymous),
      emoji: emoji || '💌',
      is_visible: true,
    })
    .select('id, text, name, is_anonymous, emoji, created_at')
    .single();

  return { data, error };
}

/** Admin: hide a message from the public wall without deleting it. */
export async function hideMessage(id) {
  if (!isSupabaseConfigured) return { error: new Error('Backend not configured') };
  const { error } = await supabase.from('wall_messages').update({ is_visible: false }).eq('id', id);
  return { error };
}

/** Timestamp -> "just now" / "3h ago" / "2w ago" */
export function relativeTime(input) {
  const ts = typeof input === 'number' ? input : new Date(input).getTime();
  if (Number.isNaN(ts)) return '';

  const diff = Date.now() - ts;
  const min = Math.floor(diff / 6e4);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.floor(day / 7);
  if (wk < 5) return `${wk}w ago`;
  return `${Math.floor(day / 30)}mo ago`;
}
