export const matters = [
  { id: 'MAT-1042', name: 'Northstar MSA Renewal', client: 'Northstar Systems', owner: 'Zainab Khan', status: 'In Review', value: '$240K', risk: 'High', deadline: 'Sep 20, 2026', docs: 7 },
  { id: 'MAT-1038', name: 'Atlas Vendor Onboarding', client: 'Atlas Health', owner: 'Sarah Malik', status: 'Negotiation', value: '$92K', risk: 'Medium', deadline: 'Sep 24, 2026', docs: 4 },
  { id: 'MAT-1031', name: 'Beacon Employment Pack', client: 'Beacon Labs', owner: 'Omar Ali', status: 'Drafting', value: '$38K', risk: 'Low', deadline: 'Oct 02, 2026', docs: 11 },
  { id: 'MAT-1027', name: 'Helio Data Processing Addendum', client: 'Helio Commerce', owner: 'Zainab Khan', status: 'Approved', value: '$180K', risk: 'Low', deadline: 'Closed', docs: 5 },
];

export const clients = [
  { name: 'Northstar Systems', industry: 'Enterprise Software', matters: 8, documents: 31, openRisk: 5, contact: 'Maya Chen', email: 'maya@northstar.example' },
  { name: 'Atlas Health', industry: 'Healthcare', matters: 5, documents: 22, openRisk: 3, contact: 'Daniel Reed', email: 'daniel@atlas.example' },
  { name: 'Beacon Labs', industry: 'Technology', matters: 4, documents: 18, openRisk: 1, contact: 'Amina Shah', email: 'amina@beacon.example' },
  { name: 'Helio Commerce', industry: 'E-commerce', matters: 6, documents: 27, openRisk: 2, contact: 'Lucas Park', email: 'lucas@helio.example' },
];

export const clauses = [
  { category: 'Liability', title: 'Mutual Liability Cap', status: 'Preferred', text: 'Each party’s aggregate liability shall not exceed the fees paid or payable during the twelve months preceding the event giving rise to the claim.', updated: 'Sep 12, 2026' },
  { category: 'Termination', title: 'Termination for Material Breach', status: 'Preferred', text: 'Either party may terminate for material breach if such breach remains uncured thirty days after written notice.', updated: 'Sep 10, 2026' },
  { category: 'Confidentiality', title: 'Standard Confidentiality', status: 'Approved', text: 'Each party will protect Confidential Information using no less than reasonable care and use it solely to perform under the Agreement.', updated: 'Sep 04, 2026' },
  { category: 'Indemnity', title: 'Balanced IP Indemnity', status: 'Review', text: 'Provider will defend third-party claims alleging that the Services infringe registered intellectual property rights, subject to stated exclusions.', updated: 'Aug 28, 2026' },
  { category: 'Data Protection', title: 'Security Incident Notice', status: 'Approved', text: 'Processor will notify Controller without undue delay after becoming aware of a confirmed Security Incident affecting Personal Data.', updated: 'Aug 21, 2026' },
];

export const tasks = [
  { id: 1, title: 'Review Northstar liability redlines', matter: 'MAT-1042', assignee: 'Zainab Khan', due: 'Today', priority: 'High', completed: false },
  { id: 2, title: 'Approve Atlas DPA exceptions', matter: 'MAT-1038', assignee: 'Sarah Malik', due: 'Tomorrow', priority: 'High', completed: false },
  { id: 3, title: 'Send Beacon employment pack', matter: 'MAT-1031', assignee: 'Omar Ali', due: 'Sep 19', priority: 'Medium', completed: false },
  { id: 4, title: 'Archive signed Helio addendum', matter: 'MAT-1027', assignee: 'Zainab Khan', due: 'Sep 20', priority: 'Low', completed: true },
];

export const activity = [
  { who: 'Zainab Khan', action: 'flagged a high-risk indemnity clause', item: 'Northstar MSA', time: '12 min ago' },
  { who: 'Sarah Malik', action: 'approved 3 clause changes', item: 'Atlas DPA', time: '38 min ago' },
  { who: 'Omar Ali', action: 'uploaded a new document', item: 'Employment Agreement v4', time: '1 hr ago' },
  { who: 'CounselFlow AI', action: 'completed a risk review', item: 'Vendor NDA', time: '2 hrs ago' },
];

export const reviewActivity = [34, 51, 42, 68, 57, 81, 64];
