import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Activity, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/auth/auth-context';

const links = [
  { href: '/', label: 'Project overview' },
  { href: '/patient', label: 'Patient demo' },
  { href: '/doctor', label: 'Doctor demo' },
  { href: '/emergency', label: 'Emergency card' },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, loading, signOut } = useAuth();
  const [authError, setAuthError] = useState('');

  async function handleSignOut() {
    setAuthError('');
    try {
      const result = await signOut();
      if (result.error) {
        setAuthError(result.error);
        return;
      }
      setOpen(false);
      setLocation('/login');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Could not sign out. Please try again.');
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link href="/" className="brand" data-testid="link-home-brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Activity size={21} strokeWidth={2.2} /></span>
          <span>MedCloud Guardian<small>Cloud records · learning demo</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? 'active' : ''} data-testid={`nav-${item.href.slice(1) || 'home'}`}>{item.label}</Link>)}
          {loading ? <span className="nav-account-state" role="status">Checking account…</span> : user
            ? <button type="button" className="nav-cta" onClick={handleSignOut} data-testid="button-logout"><LogOut size={14} /> Sign out</button>
            : <Link href="/login" className="nav-cta" data-testid="nav-demo-entry">Sign in</Link>}
        </nav>
        <button className="mobile-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        {open && <nav className="mobile-menu" aria-label="Mobile navigation">
          {links.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} data-testid={`mobile-nav-${item.href.slice(1) || 'home'}`}>{item.label}</Link>)}
          {loading ? <span className="nav-account-state" role="status">Checking account…</span> : user
            ? <button type="button" className="nav-cta mobile-signout" onClick={handleSignOut} data-testid="button-mobile-logout"><LogOut size={14} /> Sign out</button>
            : <Link href="/login" onClick={() => setOpen(false)} data-testid="mobile-nav-login">Sign in</Link>}
        </nav>}
      </header>
      <main>
        {authError && <div className="auth-nav-error" role="alert" data-testid="status-logout-error">{authError}</div>}
        {children}
      </main>
      <footer className="site-footer">MedCloud Guardian · B.Tech project demonstration · Fictional sample data only</footer>
    </div>
  );
}
