import { Link } from 'wouter';
import { SiteLayout } from '@/components/site-layout';

export default function NotFound() {
  return (
    <SiteLayout><div className="page-wrap"><section className="not-found" data-testid="not-found-page">
      <div className="eyebrow">This page is not in the demo</div>
      <h1>404</h1>
      <p>That address does not lead to a MedCloud Guardian page.</p>
      <Link href="/" className="btn" data-testid="button-not-found-home">Back to project overview</Link>
    </section></div></SiteLayout>
  );
}
