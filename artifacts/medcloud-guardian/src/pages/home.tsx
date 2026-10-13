import { Link } from 'wouter';
import { ArrowRight, BookOpen, Cloud, FileCheck2, HeartPulse, LockKeyhole, ShieldCheck } from 'lucide-react';
import { SiteLayout } from '@/components/site-layout';

export default function HomePage() {
  return <SiteLayout>
    <div className="page-wrap">
      <section className="home-hero">
        <div>
          <div className="eyebrow">A student project, made clear</div>
          <h1 className="title">A simpler way to understand connected care.</h1>
          <p className="lead">MedCloud Guardian is a beginner-friendly walkthrough of how a cloud-based medical record experience could work — from a patient view to a doctor view.</p>
          <div className="hero-actions">
            <Link href="/login" className="btn" data-testid="button-start-demo">Explore the demo <ArrowRight size={16} /></Link>
            <Link href="/patient" className="btn ghost" data-testid="button-patient-preview">View patient dashboard</Link>
          </div>
          <div className="home-note" style={{ marginTop: 24 }} data-testid="notice-fictional-data">
            <ShieldCheck size={18} />
            <span><strong>Safe to explore.</strong> Every person and record shown here is fictional. This educational prototype does not connect to a server or store medical data.</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration of an organized digital record">
          <div className="hero-orbit" />
          <div className="float-note one"><strong>Record overview</strong>History · reports · care notes</div>
          <div className="float-note two"><strong>Demo environment</strong>No account or uploads</div>
          <div className="hero-card">
            <div className="hero-card-top"><span>MEDCLOUD / RECORD</span><ShieldCheck size={16} /></div>
            <div className="hero-emblem"><HeartPulse size={77} /></div>
            <b>Care information, in context</b><p>A fictional patient record preview</p>
          </div>
        </div>
      </section>
      <section aria-labelledby="features-heading">
        <div className="section-heading"><div><div className="eyebrow">What you can explore</div><h2 id="features-heading">One project, three perspectives.</h2></div>
          <span className="demo-badge"><BookOpen size={13} /> Learning prototype</span>
        </div>
        <div className="feature-grid">
          <article className="feature-card"><div className="feature-icon"><HeartPulse size={20} /></div><h3>Patient dashboard</h3><p>Explore a fictional profile, sample history, prescriptions, lab results, and a browser-only document picker.</p><Link href="/patient" className="btn ghost small" style={{ marginTop: 16 }} data-testid="feature-patient">Open patient view <ArrowRight size={13} /></Link></article>
          <article className="feature-card"><div className="feature-icon"><Cloud size={20} /></div><h3>Doctor dashboard</h3><p>Search a small sample patient list and switch between illustrative record summaries.</p><Link href="/doctor" className="btn ghost small" style={{ marginTop: 16 }} data-testid="feature-doctor">Open doctor view <ArrowRight size={13} /></Link></article>
          <article className="feature-card"><div className="feature-icon"><FileCheck2 size={20} /></div><h3>Emergency card</h3><p>See how key sample details might be presented at a glance, with a clear real-world safety boundary.</p><Link href="/emergency" className="btn ghost small" style={{ marginTop: 16 }} data-testid="feature-emergency">View sample card <ArrowRight size={13} /></Link></article>
        </div>
      </section>
      <section className="steps-band">
        <div><h2>Built for a classroom demo.</h2><p>A guided interface, not a real health service.</p></div>
        <div className="step-list"><div className="step"><b>01</b>Choose a demo role</div><div className="step"><b>02</b>Explore sample records</div><div className="step"><b>03</b>See the privacy boundary</div></div>
        <LockKeyhole size={24} color="#b7dce6" />
      </section>
    </div>
  </SiteLayout>;
}
