import { AlertTriangle, ArrowLeft, HeartPulse } from 'lucide-react';
import { Link } from 'wouter';
import { SiteLayout } from '@/components/site-layout';
import { activePatient } from '@/data/demo-data';

export default function EmergencyPage() {
  return <SiteLayout><div className="page-wrap">
    <div className="dashboard-head"><div><div className="eyebrow">Quick reference · sample</div><h1>Emergency information</h1><p>A fictional example of key details arranged for quick visibility.</p></div><span className="demo-badge">Not for clinical use</span></div>
    <section className="emergency-panel" data-testid="emergency-card">
      <div className="emergency-banner"><AlertTriangle size={23} /><div><h2>Not for real emergencies</h2><p>This page contains made-up information for a college project. It is not an emergency service or medical advice.</p></div></div>
      <div className="emergency-body">
        <div className="profile-left" style={{ marginBottom: 23 }}><div className="avatar"><HeartPulse size={21} /></div><div className="profile-info"><h2>{activePatient.name}</h2><p>Fictional sample profile · {activePatient.id}</p></div></div>
        <div className="critical-grid">
          <div className="critical-item"><span>Blood group · fictional</span><strong>{activePatient.blood}</strong></div>
          <div className="critical-item"><span>Allergy note · fictional</span><strong>{activePatient.allergies}</strong></div>
          <div className="critical-item"><span>Sample condition</span><strong>{activePatient.condition}</strong></div>
          <div className="critical-item"><span>Demo contact</span><strong>{activePatient.phone}</strong></div>
        </div>
        <div className="urgent-note" data-testid="notice-real-emergency"><strong>Need urgent help in real life?</strong> Contact your local emergency services immediately. Do not rely on this project or its sample data.</div>
        <Link href="/" className="btn ghost small" data-testid="link-back-home"><ArrowLeft size={14} /> Back to project overview</Link>
      </div>
    </section>
  </div></SiteLayout>;
}
