import { useState, type ChangeEvent } from 'react';
import { FileUp, FolderOpen, Info } from 'lucide-react';
import { SiteLayout } from '@/components/site-layout';
import { PatientRecord } from '@/components/record-sections';
import { activePatient } from '@/data/demo-data';

export default function PatientPage() {
  const [filename, setFilename] = useState('');
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.files?.[0]?.name ?? '');
    event.target.value = '';
  };
  return <SiteLayout><div className="page-wrap">
    <div className="dashboard-head">
      <div><div className="eyebrow">Patient portal · walkthrough</div><h1>Your health overview</h1><p>A guided look at a fictional record, organized in one place.</p></div>
      <span className="demo-badge">Illustrative data only</span>
    </div>
    <nav className="section-jumps" aria-label="Patient dashboard sections" data-testid="patient-section-navigation">
      <a href="#history" data-testid="jump-history">Medical history</a>
      <a href="#prescriptions" data-testid="jump-prescriptions">Prescriptions</a>
      <a href="#labs" data-testid="jump-laboratory">Lab reports</a>
      <a href="#documents" data-testid="jump-documents">Documents</a>
    </nav>
    <PatientRecord patient={activePatient} />
    <section className="panel" style={{ marginTop: 17, maxWidth: 680 }} id="documents" data-testid="section-documents">
      <div className="panel-title"><h2><FolderOpen size={17} /> Personal documents</h2><span>Picker preview</span></div>
      <div className="file-area">
        <FileUp size={22} />
        <h3>Choose a file to preview its name</h3>
        <p>This demo only displays the filename temporarily in your browser. It never reads the file contents, uploads bytes, or stores anything.</p>
        <label className="btn secondary small" htmlFor="document-picker" data-testid="label-document-picker">Choose a document</label>
        <input id="document-picker" type="file" onChange={handleFile} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} aria-label="Choose a document for filename preview" data-testid="input-document-picker" />
        {filename && <div className="file-name" role="status" data-testid="text-selected-filename">Selected filename: {filename}</div>}
      </div>
      <div className="home-note" style={{ marginTop: 14 }}><Info size={16} /><span>Document selection is only a temporary local preview. No record creation or persistent uploads are part of this student project.</span></div>
    </section>
  </div></SiteLayout>;
}
