import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import HomePage from '@/pages/home';
import PatientPage from '@/pages/patient';
import DoctorPage from '@/pages/doctor';
import EmergencyPage from '@/pages/emergency';
import { LoginPage, RegisterPage } from '@/pages/demo-access';
import { AuthProvider, useAuth } from '@/auth/auth-context';
import { SiteLayout } from '@/components/site-layout';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/patient" component={PatientRoute} />
        <Route path="/doctor" component={DoctorRoute} />
        <Route path="/emergency" component={EmergencyPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function PatientRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SiteLayout>
        <div className="page-wrap">
          <section className="auth-card" role="status">Checking your account…</section>
        </div>
      </SiteLayout>
    );
  }

  if (!user) return <Redirect to="/login" />;

  return <PatientPage />;
}

function DoctorRoute() {
  const { user, loading, isVerifiedDoctor, configError } = useAuth();

  if (loading) {
    return (
      <SiteLayout>
        <div className="page-wrap">
          <section className="auth-card" role="status">Checking doctor access…</section>
        </div>
      </SiteLayout>
    );
  }

  if (!user) return <Redirect to="/login" />;

  if (!isVerifiedDoctor) {
    return (
      <SiteLayout>
        <div className="page-wrap">
          <section className="auth-card" data-testid="doctor-access-restricted">
            <span className="demo-badge">Verified doctor account required</span>
            <h1>Doctor access is restricted</h1>
            <p>
              Only an account granted the doctor role and verification by a trusted
              administrator can open this view. Registration does not offer doctor
              access or verification controls.
            </p>
            {configError && <div className="auth-feedback error" role="alert">{configError}</div>}
            <Link href="/patient" className="btn auth-action" data-testid="link-doctor-to-patient">
              Return to the patient demo
            </Link>
            <Link href="/" className="btn ghost auth-action" data-testid="link-doctor-to-home">
              Return to project overview
            </Link>
          </section>
        </div>
      </SiteLayout>
    );
  }

  return <DoctorPage />;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
