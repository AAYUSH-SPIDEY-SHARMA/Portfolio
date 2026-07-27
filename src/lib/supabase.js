import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * True once both env vars are present.
 *
 * Every caller checks this first so the site still renders — with empty
 * states rather than a crash — before Supabase is wired up, and if the
 * project is ever paused or deleted.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/** Shown in the UI when the backend isn't reachable. */
export const NOT_CONFIGURED_MESSAGE =
  'The backend is not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
