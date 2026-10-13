import { useMemo, useState } from 'react';
import { Search, UserRound } from 'lucide-react';
import { SiteLayout } from '@/components/site-layout';
import { PatientRecord } from '@/components/record-sections';
import { patients } from '@/data/demo-data';

export default function DoctorPage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const filtered = useMemo(() => patients.filter((patient) => `${patient.name} ${patient.id} ${patient.condition}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const selected = patients.find((patient) => patient.id === selectedId) ?? patients[0];
  return <SiteLayout><div className="page-wrap">
    <div className="dashboard-head">
      <div><div className="eyebrow">Care team view · walkthrough</div><h1>Patient directory</h1><p>Search and select a sample profile to explore its illustrative record.</p></div>
      <span className="demo-badge">Fictional patients</span>
    </div>
    <div className="doctor-layout">
      <section className="panel patient-list-panel" aria-label="Sample patient directory" data-testid="patient-directory">
        <div className="panel-title"><h2><UserRound size={17} /> Sample patients</h2><span>{filtered.length} shown</span></div>
        <label className="search-box"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or ID" aria-label="Search fictional patients" data-testid="input-patient-search" /></label>
        {filtered.length ? filtered.map((patient) => <button className={`patient-item ${selected.id === patient.id ? 'selected' : ''}`} key={patient.id} onClick={() => setSelectedId(patient.id)} aria-pressed={selected.id === patient.id} data-testid={`button-patient-${patient.id}`}>
          <span className="avatar">{patient.initials}</span><span><strong>{patient.name}</strong><small>{patient.id} · {patient.condition}</small></span>
        </button>) : <div className="empty-search" data-testid="text-no-patients">No sample patients match that search.</div>}
      </section>
      <div className="doctor-record" key={selected.id} data-testid="selected-patient-record">
        <div className="panel" style={{ marginBottom: 16, padding: '15px 19px' }}><div className="panel-title" style={{ margin: 0 }}><h2>Selected patient record</h2><span>Last visit · {selected.lastVisit}</span></div></div>
        <PatientRecord patient={selected} />
      </div>
    </div>
  </div></SiteLayout>;
}
