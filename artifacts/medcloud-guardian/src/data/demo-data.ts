export type Patient = {
  id: string; name: string; age: number; blood: string; allergies: string;
  condition: string; initials: string; phone: string; lastVisit: string;
  history: { title: string; detail: string; date: string }[];
  prescriptions: { name: string; instruction: string; status: string }[];
  labs: { test: string; result: string; date: string; status: string }[];
};

export const patients: Patient[] = [
  {
    id: 'MC-2048', name: 'Maya Chen', age: 26, blood: 'O positive', allergies: 'Penicillin',
    condition: 'Seasonal allergies', initials: 'MC', phone: '+1 (555) 014-2048', lastVisit: '12 May 2025',
    history: [
      { title: 'Seasonal allergic rhinitis', detail: 'Mild symptoms during spring. Symptoms managed with an over-the-counter antihistamine.', date: '12 May 2025' },
      { title: 'Annual wellness check', detail: 'Routine check-up. No new concerns noted in this illustrative summary.', date: '18 Sep 2024' },
    ],
    prescriptions: [
      { name: 'Cetirizine · 10 mg', instruction: 'One tablet once daily as needed', status: 'Current' },
      { name: 'Saline nasal spray', instruction: 'Use as directed when needed', status: 'Current' },
    ],
    labs: [
      { test: 'Complete blood count', result: 'Within reference range', date: '12 May 2025', status: 'Reviewed' },
      { test: 'Vitamin D', result: 'Illustrative: 32 ng/mL', date: '12 May 2025', status: 'Reviewed' },
    ],
  },
  {
    id: 'MC-3176', name: 'Elliot Brooks', age: 41, blood: 'A negative', allergies: 'None reported',
    condition: 'Routine follow-up', initials: 'EB', phone: '+1 (555) 014-3176', lastVisit: '04 Apr 2025',
    history: [
      { title: 'Routine follow-up', detail: 'General wellness conversation; no acute concern in this fictional summary.', date: '04 Apr 2025' },
      { title: 'Wellness visit', detail: 'Preventive care discussion and routine screening review.', date: '22 Jan 2024' },
    ],
    prescriptions: [
      { name: 'Vitamin D3 · 1000 IU', instruction: 'One capsule once daily', status: 'Current' },
      { name: 'Multivitamin', instruction: 'One tablet with breakfast', status: 'Current' },
    ],
    labs: [
      { test: 'Lipid panel', result: 'Illustrative: 168 mg/dL', date: '04 Apr 2025', status: 'Reviewed' },
      { test: 'Glucose, fasting', result: 'Within reference range', date: '04 Apr 2025', status: 'Reviewed' },
    ],
  },
  {
    id: 'MC-5921', name: 'Amara Okafor', age: 33, blood: 'B positive', allergies: 'Latex',
    condition: 'Migraine history', initials: 'AO', phone: '+1 (555) 014-5921', lastVisit: '21 Feb 2025',
    history: [
      { title: 'Migraine follow-up', detail: 'Discussed common triggers and a symptom journal in this sample record.', date: '21 Feb 2025' },
      { title: 'General consultation', detail: 'Routine consultation. Patient-reported history reviewed.', date: '15 Aug 2024' },
    ],
    prescriptions: [
      { name: 'Magnesium · 200 mg', instruction: 'One capsule once daily', status: 'Current' },
      { name: 'Acetaminophen · 500 mg', instruction: 'As needed, follow label directions', status: 'As needed' },
    ],
    labs: [
      { test: 'Basic metabolic panel', result: 'Within reference range', date: '21 Feb 2025', status: 'Reviewed' },
      { test: 'Ferritin', result: 'Illustrative: 48 ng/mL', date: '21 Feb 2025', status: 'Reviewed' },
    ],
  },
];

export const activePatient = patients[0];
