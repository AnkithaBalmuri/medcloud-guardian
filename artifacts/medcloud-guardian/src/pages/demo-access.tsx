import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Info, LockKeyhole } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { SiteLayout } from '@/components/site-layout';
import { useAuth } from '@/auth/auth-context';

export function LoginPage() {
  const { signIn, user, loading, isVerifiedDoctor, configError, startupError } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) setLocation(isVerifiedDoctor ? '/doctor' : '/patient');
  }, [isVerifiedDoctor, loading, setLocation, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const result = await signIn(email.trim(), password);
      if (result.error) {
        setError(result.error);
        return;
      }
      setLocation(result.role === 'doctor' ? '/doctor' : '/patient');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Sign-in failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <div className="page-wrap">
        <section className="auth-card" data-testid="login-demo-screen">
          <span className="demo-badge"><LockKeyhole size={13} /> Supabase Auth</span>
          <h1>Sign in</h1>
          <p>Use your MedCloud Guardian account email and password to continue.</p>
          {configError && <div className="auth-feedback error" role="alert" data-testid="status-auth-config">{configError}</div>}
          {!configError && startupError && <div className="auth-feedback error" role="alert" data-testid="status-auth-startup">{startupError}</div>}
          <form onSubmit={handleSubmit} aria-busy={submitting || loading}>
            <label className="field-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="field-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              data-testid="input-login-email"
            />
            <label className="field-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="field-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              data-testid="input-login-password"
            />
            {error && <div className="auth-feedback error" role="alert" data-testid="status-login-error">{error}</div>}
            <button className="btn auth-action" type="submit" disabled={submitting || loading || !!configError} data-testid="button-submit-login">
              {submitting ? 'Signing in…' : 'Sign in'} <ArrowRight size={15} />
            </button>
          </form>
          <div className="demo-message" role="note">
            This account is for app sign-in only. The student demo does not save or upload medical records.
          </div>
          <p className="auth-switch">New here? <Link href="/register" data-testid="link-register-screen">Create a patient account</Link></p>
          <Link href="/" className="btn ghost auth-action" data-testid="link-login-home">Return to project overview</Link>
        </section>
      </div>
    </SiteLayout>
  );
}

export function RegisterPage() {
  const { signUp, user, loading, isVerifiedDoctor, configError } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!loading && user) setLocation(isVerifiedDoctor ? '/doctor' : '/patient');
  }, [isVerifiedDoctor, loading, setLocation, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setNotice('');
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await signUp(email.trim(), password);
      if (result.error) {
        setError(result.error);
        return;
      }
      setPassword('');
      setConfirmPassword('');
      if (result.requiresEmailConfirmation) {
        setNotice('Account request received. Check your email for a confirmation link, then sign in.');
      } else {
        setLocation('/patient');
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <div className="page-wrap">
        <section className="auth-card" data-testid="registration-demo-screen">
          <span className="demo-badge"><Info size={13} /> Patient account</span>
          <h1>Create an account</h1>
          <p>Register with Supabase Auth. New accounts use the patient role by default; doctor access cannot be selected here.</p>
          {configError && <div className="auth-feedback error" role="alert" data-testid="status-auth-config">{configError}</div>}
          <form onSubmit={handleSubmit} aria-busy={submitting || loading}>
            <label className="field-label" htmlFor="register-email">Email</label>
            <input
              id="register-email"
              className="field-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              data-testid="input-register-email"
            />
            <label className="field-label" htmlFor="register-password">Password</label>
            <input
              id="register-password"
              className="field-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
              data-testid="input-register-password"
            />
            <label className="field-label" htmlFor="register-password-confirm">Confirm password</label>
            <input
              id="register-password-confirm"
              className="field-input"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
              data-testid="input-register-password-confirm"
            />
            {error && <div className="auth-feedback error" role="alert" data-testid="status-registration-error">{error}</div>}
            {notice && <div className="auth-feedback success" role="status" data-testid="status-registration-success">{notice}</div>}
            <button className="btn auth-action" type="submit" disabled={submitting || loading || !!configError} data-testid="button-submit-registration">
              {submitting ? 'Creating account…' : 'Create patient account'} <ArrowRight size={15} />
            </button>
          </form>
          <div className="demo-message" role="note">
            Only your sign-in email and password are sent to Supabase Auth. Do not enter medical information here. This demo does not store medical records.
          </div>
          <p className="auth-switch">Already registered? <Link href="/login" data-testid="link-back-login">Sign in</Link></p>
          <Link href="/" className="btn ghost auth-action" data-testid="button-registration-home">Return to project overview</Link>
        </section>
      </div>
    </SiteLayout>
  );
}
