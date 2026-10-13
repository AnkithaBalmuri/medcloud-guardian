import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, supabaseConfigError } from '@/lib/supabase';

type AuthActionResult = {
  error: string | null;
  requiresEmailConfirmation?: boolean;
  role?: AppRole;
};

type AppRole = 'patient' | 'doctor';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: AppRole;
  isVerifiedDoctor: boolean;
  configError: string | null;
  startupError: string | null;
  signIn: (email: string, password: string) => Promise<AuthActionResult>;
  signUp: (email: string, password: string) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function friendlyAuthError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes('invalid login credentials')) {
    return 'That email and password do not match. Check them and try again.';
  }
  if (normalized.includes('email not confirmed')) {
    return 'Confirm your email address before signing in.';
  }
  if (
    normalized.includes('failed to fetch') ||
    normalized.includes('network') ||
    normalized.includes('fetch failed')
  ) {
    return 'Could not reach Supabase. Check the project URL and your connection.';
  }
  return message;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [startupError, setStartupError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;
    let authEventReceived = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      authEventReceived = true;
      setSession(nextSession);
      setLoading(false);
      setStartupError(null);
    });

    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active || authEventReceived) return;
        setSession(data.session);
        if (error) setStartupError(friendlyAuthError(error.message));
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (!active || authEventReceived) return;
        setStartupError(
          error instanceof Error
            ? friendlyAuthError(error.message)
            : 'Could not check the saved Supabase session.',
        );
        setLoading(false);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string): Promise<AuthActionResult> {
    if (!supabase) return { error: supabaseConfigError };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    const isDoctor =
      data.user?.app_metadata?.role === 'doctor' &&
      data.user.app_metadata?.doctor_verified === true;
    return {
      error: error ? friendlyAuthError(error.message) : null,
      role: isDoctor ? 'doctor' : 'patient',
    };
  }

  async function signUp(email: string, password: string): Promise<AuthActionResult> {
    if (!supabase) return { error: supabaseConfigError };
    const appBase = new URL(import.meta.env.BASE_URL, window.location.origin);
    const emailRedirectTo = new URL('login', appBase).toString();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo },
    });
    if (error) return { error: friendlyAuthError(error.message) };

    return {
      error: null,
      requiresEmailConfirmation: !data.session,
    };
  }

  async function signOut(): Promise<AuthActionResult> {
    if (!supabase) return { error: supabaseConfigError };
    const { error } = await supabase.auth.signOut();
    return { error: error ? friendlyAuthError(error.message) : null };
  }

  const user = session?.user ?? null;
  // Only server-controlled app_metadata can grant doctor access. User-editable
  // user_metadata is intentionally never read for roles or verification.
  const isVerifiedDoctor =
    user?.app_metadata?.role === 'doctor' &&
    user.app_metadata?.doctor_verified === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        role: isVerifiedDoctor ? 'doctor' : 'patient',
        isVerifiedDoctor,
        configError: supabaseConfigError,
        startupError,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
