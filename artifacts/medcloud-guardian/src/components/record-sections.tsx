import { FileText, FlaskConical, Pill, Stethoscope } from 'lucide-react';
import type { Patient } from '@/data/demo-data';

export function PatientRecord({ patient, showProfile = true }: { patient: Patient; showProfile?: boolean }) {
  return <>
    {showProfile && <section className="profile-panel" data-testid="profile-summary">
      <div className="profile-left">
        <div className="avatar" aria-hidden="true">{patient.initials}</div>
        <div className="profile-info"><h2>{patient.name}</h2><p>Illustrative patient profile · {patient.id}</p></div>
      </div>
      <div className="profile-meta">
        <div><span className="meta-label">Age</span><span className="meta-value">{patient.age} years</span></div>
        <div><span className="meta-label">Blood group</span><span className="meta-value">{patient.blood}</span></div>
        <div><span className="meta-label">Allergy note</span><span className="meta-value">{patient.allergies}</span></div>
      </div>
    </section>}
    <div className="dashboard-grid">
      <section id="history" className="panel" data-testid="section-medical-history">
        <div className="panel-title"><h2><Stethoscope size={17} /> Medical history</h2><span>Sample entries</span></div>
        {patient.history.map((entry, index) => <div className="record-row" key={entry.title} data-testid={`history-entry-${index}`}>
          <div className="record-marker"><FileText size={16} /></div>
          <div className="record-copy"><strong>{entry.title}</strong><p>{entry.detail}</p></div><span className="record-date">{entry.date}</span>
        </div>)}
      </section>
      <section id="prescriptions" className="panel" data-testid="section-prescriptions">
        <div className="panel-title"><h2><Pill size={17} /> Prescriptions</h2><span>Illustrative only</span></div>
        {patient.prescriptions.map((item, index) => <div className="record-row" key={item.name} data-testid={`prescription-${index}`}>
          <div className="record-marker"><Pill size={15} /></div>
          <div className="record-copy"><strong>{item.name}</strong><p>{item.instruction}</p></div><span className="status-pill">{item.status}</span>
        </div>)}
      </section>
      <section id="labs" className="panel wide" data-testid="section-laboratory-reports">
        <div className="panel-title"><h2><FlaskConical size={17} /> Laboratory reports</h2><span>Sample results, not medical guidance</span></div>
        <div className="table-wrap"><table className="data-table">
          <thead><tr><th>Test</th><th>Illustrative result</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>{patient.labs.map((lab, index) => <tr key={lab.test} data-testid={`lab-row-${index}`}><td>{lab.test}</td><td>{lab.result}</td><td>{lab.date}</td><td><span className="status-pill">{lab.status}</span></td></tr>)}</tbody>
        </table></div>
      </section>
    </div>
  </>;
}
