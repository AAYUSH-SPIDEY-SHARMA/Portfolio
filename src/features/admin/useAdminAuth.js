import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

/**
 * Supabase session state for the admin area.
 *
 * `status` is 'checking' until the initial session lookup resolves — without
 * it the login form flashes for anyone who is already signed in.
 */
export function useAdminAuth() {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState(isSupabaseConfigured ? 'checking' : 'unconfigured');

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session ?? null);
      setStatus(data.session ? 'authenticated' : 'anonymous');
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setStatus(nextSession ? 'authenticated' : 'anonymous');
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) return { error: new Error('Backend not configured') };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  };

  return { session, status, signIn, signOut };
}
