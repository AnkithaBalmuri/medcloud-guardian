import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

let configurationError: string | null = null;
let client: SupabaseClient | null = null;

if (!supabaseUrl || !supabasePublishableKey) {
  const missing: string[] = [];
  if (!supabaseUrl) missing.push('VITE_SUPABASE_URL');
  if (!supabasePublishableKey) missing.push('VITE_SUPABASE_PUBLISHABLE_KEY');
  configurationError = `Supabase Auth is not configured. Add ${missing.join(' and ')} in Replit Secrets.`;
} else {
  try {
    client = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  } catch {
    configurationError = 'Supabase Auth could not start. Check the configured project URL.';
  }
}

export const supabase = client;
export const supabaseConfigError = configurationError;
