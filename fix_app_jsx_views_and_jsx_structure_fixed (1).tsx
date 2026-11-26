import React, { useState, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  Kanban,
  CalendarRange,
  FileUp,
  Users,
  Plus,
  Search,
  Filter,
  Clock,
  TrendingUp,
  CheckCircle2,
  Circle,
  MessageSquare,
  Car,
  FileText,
  ChevronRight,
  ChevronDown,
  X,
  Send,
  Building2,
  Briefcase,
  Award,
  ArrowUpRight,
  List,
  LayoutGrid,
  Upload,
  CheckSquare,
  ExternalLink,
  MapPin,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  FolderOpen,
  Download,
  Eye,
  Globe,
  Hash,
  Printer,
  Sparkles,
  LogIn,
  LogOut,
  Mail,
  Bell,
  ListTodo,
  GitBranch,
  Calendar as CalendarIcon,
  FileSpreadsheet,
  Copy,
  Check,
  Lock,
  UserCog,
  ArrowRight,
  SlidersHorizontal,
  KeyRound,
  ShieldAlert,
  Radio,
  History,
  Unlock,
  RefreshCw,
  Tag,
  Smartphone,
  Monitor,
  Menu,
  MoreHorizontal
} from 'lucide-react';

// --- COMPANY TEAM DIRECTORY WITH ROLES & COMPANY EMAILS ---
const INITIAL_TEAM = [
  {
    id: 'u1',
    name: 'Camille Santos',
    role: 'Head of Bidding Department',
    systemRole: 'head',
    email: 'camille.santos@company.com',
    avatar: 'CS',
    color: 'bg-[#0A2E6E]'
  },
  {
    id: 'u2',
    name: 'Rafael Mendoza',
    role: 'Senior Estimator & Pricing Analyst',
    systemRole: 'staff',
    email: 'rafael.mendoza@company.com',
    avatar: 'RM',
    color: 'bg-sky-600'
  },
  {
    id: 'u3',
    name: 'Atty. Miguel Reyes',
    role: 'Legal & Compliance Officer',
    systemRole: 'staff',
    email: 'miguel.reyes@company.com',
    avatar: 'MR',
    color: 'bg-slate-800'
  },
  {
    id: 'u4',
    name: 'Jerome Bautista',
    role: 'Technical Specs & EV Engineer',
    systemRole: 'staff',
    email: 'jerome.bautista@company.com',
    avatar: 'JB',
    color: 'bg-emerald-600'
  },
  {
    id: 'u5',
    name: 'Trisha Alonzo',
    role: 'PhilGEPS & LTO Liaison Officer',
    systemRole: 'staff',
    email: 'trisha.alonzo@company.com',
    avatar: 'TA',
    color: 'bg-amber-600'
  },
];

// --- 5-STAGE BIDDING PIPELINE ---
const STAGES = [
  { id: 'scoping', title: '1. Notice Intake & Go/No-Go', short: 'Go/No-Go', color: 'border-slate-500', badge: 'bg-slate-100 text-slate-700', sla: '2 Days' },
  { id: 'technical', title: '2. Technical & BOQ Prep', short: 'Tech & BOQ', color: 'border-sky-500', badge: 'bg-sky-50 text-sky-700', sla: '4 Days' },
  { id: 'pricing', title: '3. Pricing & Margin Review', short: 'Pricing', color: 'border-amber-500', badge: 'bg-amber-50 text-amber-700', sla: '2 Days' },
  { id: 'compliance', title: '4. Head Sign-Off & Notarization', short: 'Sign-Off', color: 'border-[#0A2E6E]', badge: 'bg-[#0A2E6E]/10 text-[#0A2E6E]', sla: '1 Day' },
  { id: 'submitted', title: '5. Submitted / Bid Opening', short: 'Submitted', color: 'border-emerald-600', badge: 'bg-emerald-50 text-emerald-700', sla: 'Complete' },
];

const COMPANY_ABC_OFFERINGS = [
  'Company ABC Enterprise Package A',
  'Company ABC Heavy Operations Package B',
  'Company ABC Executive Supply Package C',
  'Company ABC Standard Commercial Unit D',
  'Company ABC Compact Service Unit E',
  'Company ABC Flagship Turnkey Package F'
];

// --- INITIAL BIDS / TENDERS (ALPHABETICAL PROJECTS & PROCURING ENTITIES) ---
const INITIAL_BIDS = [
  {
    id: 'BID-PH-2026-104',
    philgepsRef: '11489204',
    title: 'Project Alpha',
    client: 'Procuring Entity A',
    region: 'Region II (Cagayan Valley)',
    bydModel: 'Company ABC Enterprise Package A',
    unitQty: 8,
    abcValue: 13200000,
    bidOffer: 12784000,
    margin: 14.5,
    probability: 80,
    preBidDate: '2026-11-18',
    deadline: '2026-12-01',
    bidOpeningTime: '2026-12-01 01:30 PM',
    daysLeft: 5,
    stage: 'compliance',
    managerId: 'u1',
    location: 'BAC Office - Procuring Entity A',
    remarks: 'Awaiting final notarization of Omnibus Sworn Statement before courier dispatch for Company ABC.',
    checklist: [
      { id: 'c1', envelope: 'Eligibility', label: 'PhilGEPS Platinum Registration Certificate & Annex A (Company ABC)', required: true, completed: true, fileName: 'PhilGEPS_Platinum_CompanyABC_2026.pdf' },
      { id: 'c2', envelope: 'Eligibility', label: 'Statement of Ongoing & Single Largest Completed Contract (SLCC)', required: true, completed: true, fileName: 'SLCC_Project_Alpha_2025.pdf' },
      { id: 'c3', envelope: 'Eligibility', label: 'Net Financial Contracting Capacity (NFCC) Computation', required: true, completed: true, fileName: 'NFCC_Computation_Q4.pdf' },
      { id: 'c4', envelope: 'Technical', label: 'Bid Securing Declaration (Notarized)', required: true, completed: true, fileName: 'BSD_Project_Alpha.pdf' },
      { id: 'c5', envelope: 'Technical', label: 'Technical Specifications Compliance Sheet (Company ABC Enterprise Package A)', required: true, completed: true, fileName: 'TechSpecs_CompanyABC_PkgA_Signed.pdf' },
      { id: 'c6', envelope: 'Technical', label: 'Omnibus Sworn Statement (OSS) & Secretary’s Certificate', required: true, completed: false, fileName: '' },
      { id: 'c7', envelope: 'Financial', label: 'Original Signed Financial Bid Form & Price Schedule', required: true, completed: false, fileName: '' },
    ],
    chat: [
      { id: 'm1', userId: 'u4', text: 'Verified Supplemental Bid Bulletin No. 1 for Project Alpha: Procuring Entity A confirmed technical compliance for Company ABC.', time: '2 days ago', type: 'note' },
      { id: 'm2', userId: 'u2', text: 'Locked commercial pricing for Project Alpha at ₱1,598,000/unit inclusive of 3-year support & commissioning.', time: 'Yesterday, 3:40 PM', type: 'note' },
      { id: 'm3', userId: 'u3', text: 'Scheduled notarization of Omnibus Sworn Statement & Bid Form tomorrow at 9:00 AM before dispatch.', time: 'Today, 8:15 AM', type: 'approval' },
    ],
    unitLogs: [
      { id: 'ul1', title: 'Project Alpha — 8x Company ABC Enterprise Package A', date: 'Nov 24', tag: 'Stock Reserved', palette: 'from-slate-800 to-[#0A2E6E]', caption: 'Units allocated at Company ABC staging yard; dispatch tags assigned.' },
      { id: 'ul2', title: 'Procuring Entity A Official Marking Layout', date: 'Nov 25', tag: 'Livery Spec', palette: 'from-sky-950 to-slate-900', caption: 'Approved official markings and delivery checklist for Procuring Entity A.' },
    ]
  },
  {
    id: 'BID-PH-2026-109',
    philgepsRef: '11495812',
    title: 'Project Bravo',
    client: 'Procuring Entity B',
    region: 'Region II (Cagayan Valley)',
    bydModel: 'Company ABC Heavy Operations Package B',
    unitQty: 12,
    abcValue: 26400000,
    bidOffer: 25440000,
    margin: 13.8,
    probability: 70,
    preBidDate: '2026-11-24',
    deadline: '2026-12-05',
    bidOpeningTime: '2026-12-05 10:00 AM',
    daysLeft: 9,
    stage: 'pricing',
    managerId: 'u2',
    location: 'BAC Office - Procuring Entity B',
    remarks: 'Finalizing heavy-duty reinforcement, beacon kit, and reflectorized striping costings for Project Bravo.',
    checklist: [
      { id: 'c1', envelope: 'Eligibility', label: 'PhilGEPS Platinum Registration Certificate & Annex A (Company ABC)', required: true, completed: true, fileName: 'PhilGEPS_Platinum_CompanyABC_2026.pdf' },
      { id: 'c2', envelope: 'Eligibility', label: 'Statement of Ongoing & SLCC Contracts (50% ABC)', required: true, completed: true, fileName: 'SLCC_Project_Bravo.pdf' },
      { id: 'c3', envelope: 'Technical', label: 'Technical Specs Compliance (Company ABC Heavy Operations Package B)', required: true, completed: true, fileName: 'PkgB_Project_Bravo_Specs.pdf' },
      { id: 'c4', envelope: 'Technical', label: 'After-Sales Service Center Certification', required: true, completed: true, fileName: 'ServiceCenter_Cert_EntityB.pdf' },
      { id: 'c5', envelope: 'Technical', label: 'Omnibus Sworn Statement (OSS) & Bid Securing Declaration', required: true, completed: false, fileName: '' },
      { id: 'c6', envelope: 'Financial', label: 'Financial Bid Form & Detailed Accessories Breakdown', required: true, completed: false, fileName: '' },
    ],
    chat: [
      { id: 'm1', userId: 'u4', text: 'Attended Pre-Bid at Procuring Entity B. BAC confirmed Company ABC Heavy Operations Package B exceeds minimum specs.', time: '2 days ago', type: 'note' },
      { id: 'm2', userId: 'u2', text: 'Finalizing heavy-duty reinforcement, LED beacon kit, and striping costings for Project Bravo.', time: 'Yesterday, 5:10 PM', type: 'note' },
    ],
    unitLogs: [
      { id: 'ul1', title: 'Project Bravo — Company ABC Package B Spec Sheet', date: 'Nov 24', tag: 'Tech Compliance', palette: 'from-amber-900 to-slate-900', caption: 'Durability rating & payload capacity certified for Procuring Entity B.' },
    ]
  },
  {
    id: 'BID-PH-2026-112',
    philgepsRef: '11502341',
    title: 'Project Charlie',
    client: 'Procuring Entity C',
    region: 'NCR (Metro Manila)',
    bydModel: 'Company ABC Standard Commercial Unit D',
    unitQty: 6,
    abcValue: 10200000,
    bidOffer: 9780000,
    margin: 15.2,
    probability: 85,
    preBidDate: '2026-11-27',
    deadline: '2026-12-09',
    bidOpeningTime: '2026-12-09 02:00 PM',
    daysLeft: 13,
    stage: 'technical',
    managerId: 'u4',
    location: 'BAC Office - Procuring Entity C',
    remarks: 'Pre-bid conference via MS Teams tomorrow; Company ABC warranty certs under preparation.',
    checklist: [
      { id: 'c1', envelope: 'Eligibility', label: 'PhilGEPS Platinum Registration Certificate (Company ABC)', required: true, completed: true, fileName: 'PhilGEPS_Platinum_CompanyABC_2026.pdf' },
      { id: 'c2', envelope: 'Technical', label: 'Company ABC Model Listing & Compliance Certificate', required: true, completed: true, fileName: 'CompanyABC_Recognition_UnitD.pdf' },
      { id: 'c3', envelope: 'Technical', label: 'Company ABC Extended Warranty Undertaking', required: true, completed: false, fileName: '' },
      { id: 'c4', envelope: 'Technical', label: 'Omnibus Sworn Statement & Bid Securing Declaration', required: true, completed: false, fileName: '' },
      { id: 'c5', envelope: 'Financial', label: 'Financial Bid Form (Company ABC Commercial Schedule)', required: true, completed: false, fileName: '' },
    ],
    chat: [
      { id: 'm1', userId: 'u5', text: 'Downloaded Bidding Documents for Project Charlie from PhilGEPS. Pre-bid with Procuring Entity C tomorrow at 2:00 PM.', time: '4 hours ago', type: 'note' },
    ],
    unitLogs: [
      { id: 'ul1', title: 'Project Charlie — Company ABC Safety & Quality Dossier', date: 'Nov 25', tag: 'Certification', palette: 'from-emerald-900 to-slate-900', caption: 'Attached to Technical Envelope Section VII for Procuring Entity C.' },
    ]
  },
  {
    id: 'BID-PH-2026-115',
    philgepsRef: '11508910',
    title: 'Project Delta',
    client: 'Procuring Entity D',
    region: 'CAR (Cordillera)',
    bydModel: 'Company ABC Executive Supply Package C',
    unitQty: 4,
    abcValue: 11200000,
    bidOffer: 10880000,
    margin: 16.0,
    probability: 65,
    preBidDate: '2026-12-02',
    deadline: '2026-12-14',
    bidOpeningTime: '2026-12-14 10:00 AM',
    daysLeft: 18,
    stage: 'scoping',
    managerId: 'u1',
    location: 'BAC Office - Procuring Entity D',
    remarks: 'Initial Go/No-Go & 30-day delivery feasibility review ongoing for Project Delta.',
    checklist: [
      { id: 'c1', envelope: 'Eligibility', label: 'PhilGEPS Platinum Registration Certificate (Company ABC)', required: true, completed: true, fileName: 'PhilGEPS_Platinum_CompanyABC_2026.pdf' },
      { id: 'c2', envelope: 'Technical', label: 'Company ABC Executive Supply Package C Brochures & Specs', required: true, completed: false, fileName: '' },
      { id: 'c3', envelope: 'Technical', label: 'Omnibus Sworn Statement & Bid Securing Declaration', required: true, completed: false, fileName: '' },
      { id: 'c4', envelope: 'Financial', label: 'Financial Bid Form & Delivery Schedule (30 Calendar Days)', required: true, completed: false, fileName: '' },
    ],
    chat: [
      { id: 'm1', userId: 'u1', text: 'New PhilGEPS posting spotted for Project Delta (Procuring Entity D)! Reviewing delivery timeline for Company ABC.', time: '2 hours ago', type: 'note' },
    ],
    unitLogs: [
      { id: 'ul1', title: 'Project Delta — Company ABC Package C Spec Brief', date: 'Nov 26', tag: 'Product Brief', palette: 'from-indigo-950 to-slate-900', caption: 'Prepared for Procuring Entity D technical evaluation.' },
    ]
  },
  {
    id: 'BID-PH-2026-098',
    philgepsRef: '11461102',
    title: 'Project Echo',
    client: 'Procuring Entity E',
    region: 'Region II (Cagayan Valley)',
    bydModel: 'Company ABC Compact Service Unit E',
    unitQty: 10,
    abcValue: 13500000,
    bidOffer: 12950000,
    margin: 14.2,
    probability: 90,
    preBidDate: '2026-11-10',
    deadline: '2026-11-24',
    bidOpeningTime: '2026-11-24 02:00 PM',
    daysLeft: 0,
    stage: 'submitted',
    managerId: 'u5',
    location: 'BAC Office - Procuring Entity E',
    remarks: 'Ranked #1 Lowest Calculated Bidder (LCB). Post-Qualification scheduled Nov 28.',
    checklist: [
      { id: 'c1', envelope: 'Eligibility', label: 'PhilGEPS Platinum Registration Certificate (Company ABC)', required: true, completed: true, fileName: 'PhilGEPS_Platinum_CompanyABC_2026.pdf' },
      { id: 'c2', envelope: 'Eligibility', label: 'SLCC & Audited Financial Statements (2025)', required: true, completed: true, fileName: 'AFS_2025_BIR_Stamped.pdf' },
      { id: 'c3', envelope: 'Technical', label: 'Notarized Omnibus Sworn Statement & Bid Security', required: true, completed: true, fileName: 'OSS_Project_Echo_UnitE.pdf' },
      { id: 'c4', envelope: 'Financial', label: 'Original Financial Bid Form (Opened & Ranked #1 LCB)', required: true, completed: true, fileName: 'FinBid_Project_Echo_LCB.pdf' },
    ],
    chat: [
      { id: 'm1', userId: 'u5', text: 'PASSED Preliminary Examination of Bids for Project Echo! Declared Lowest Calculated Bidder (LCB) by Procuring Entity E.', time: 'Yesterday, 4:30 PM', type: 'approval' },
    ],
    unitLogs: [
      { id: 'ul1', title: 'Project Echo — Delivery & Marking Rendering', date: 'Nov 20', tag: 'Award Prep', palette: 'from-sky-900 to-rose-950', caption: 'Prepared for Procuring Entity E post-qualification.' },
    ]
  }
];

// --- INITIAL DELEGATED TASKS ---
const INITIAL_TASKS = [
  {
    id: 'TSK-2026-01',
    title: 'Notarize Omnibus Sworn Statement & Secretary’s Certificate',
    description: 'Have all 3 original sets notarized and dry-sealed for Project Alpha (Procuring Entity A) submission.',
    bidId: 'BID-PH-2026-104',
    assignedToId: 'u3',
    delegatedById: 'u1',
    priority: 'Urgent',
    dueDate: '2026-11-29',
    status: 'In Progress',
    emailNotifiedAt: '2026-11-26 08:30 AM'
  },
  {
    id: 'TSK-2026-02',
    title: 'Finalize Project Bravo Accessories & BOQ Costing',
    description: 'Confirm supplier quotes for heavy-duty accessories and compute final unit margin for Procuring Entity B.',
    bidId: 'BID-PH-2026-109',
    assignedToId: 'u2',
    delegatedById: 'u1',
    priority: 'High',
    dueDate: '2026-11-30',
    status: 'In Progress',
    emailNotifiedAt: '2026-11-26 09:15 AM'
  },
  {
    id: 'TSK-2026-03',
    title: 'Compile EV & Blade Battery Warranty Certificates for Project Charlie',
    description: 'Prepare Technical Envelope Section VII compliance sheets for Procuring Entity C tender.',
    bidId: 'BID-PH-2026-112',
    assignedToId: 'u4',
    delegatedById: 'u1',
    priority: 'Medium',
    dueDate: '2026-12-03',
    status: 'Pending',
    emailNotifiedAt: '2026-11-26 10:05 AM'
  },
  {
    id: 'TSK-2026-04',
    title: 'Submit Post-Qualification Originals for Project Echo',
    description: 'Present original Mayor’s Permit, Tax Clearance, and Audited FS to Procuring Entity E BAC.',
    bidId: 'BID-PH-2026-098',
    assignedToId: 'u5',
    delegatedById: 'u1',
    priority: 'Urgent',
    dueDate: '2026-11-28',
    status: 'Completed',
    emailNotifiedAt: '2026-11-25 02:20 PM'
  }
];

// --- INITIAL IN-HOUSE COLLABORATION CHAT CHANNELS ---
const INITIAL_CHANNELS = {
  'general-bidding': [
    { id: 'ch1', userId: 'u1', text: 'Good morning team! Please ensure all December 1st Project Alpha (Procuring Entity A) envelopes are ready for final audit by Friday 2 PM.', time: '08:15 AM' },
    { id: 'ch2', userId: 'u5', text: 'Noted Ma’am Camille. Courier dispatch to Procuring Entity A BAC is already locked in.', time: '08:22 AM' },
  ],
  'boq-technical': [
    { id: 'ch3', userId: 'u4', text: 'Uploaded updated spec sheet for Project Bravo to the Secure Document Vault.', time: '09:40 AM' },
    { id: 'ch4', userId: 'u2', text: 'Thanks Jerome! Pulling those specs into the Procuring Entity B BOQ sheet now.', time: '09:48 AM' },
  ],
  'pricing-approvals': [
    { id: 'ch5', userId: 'u2', text: '@Camille Santos — Project Bravo (Procuring Entity B) bid offer is computed at ₱25.44M (3.6% below ABC) with 13.8% gross margin. Ready for your review.', time: '10:15 AM' },
  ]
};

// --- CORPORATE COMPLIANCE VAULT ---
const INITIAL_BIDDING_DOCS = [
  {
    id: 'doc-1',
    envelope: "Class 'A' Legal & Eligibility",
    classification: 'Confidential - Legal/Eligibility',
    name: 'PhilGEPS Certificate of Registration (Platinum Membership) & Annex A',
    description: 'Valid Platinum Certificate for Company ABC with updated Mayor’s Permit, SEC, Tax Clearance, and Audited FS.',
    fileName: 'CompanyABC_PhilGEPS_Platinum_Cert_2026.pdf',
    fileSize: '2.4 MB',
    uploadedBy: 'Trisha Alonzo',
    uploadedDate: '2026-11-10',
    expiryDate: '2027-06-30',
    status: 'Verified',
    requiredFor: 'All Government Bids',
    tempApprovedUserIds: []
  },
  {
    id: 'doc-2',
    envelope: "Class 'A' Legal & Eligibility",
    classification: 'Confidential - Legal/Eligibility',
    name: 'Mayor’s / Business Permit (2026) & SEC Certificate of Incorporation',
    description: 'Certified true copy of current year Mayor’s Permit for Company ABC commercial & supply operations.',
    fileName: 'CompanyABC_Mayors_Permit_SEC_2026_CTC.pdf',
    fileSize: '3.1 MB',
    uploadedBy: 'Atty. Miguel Reyes',
    uploadedDate: '2026-11-08',
    expiryDate: '2026-12-31',
    status: 'Expiring Soon',
    requiredFor: 'All Government Bids',
    tempApprovedUserIds: []
  },
  {
    id: 'doc-3',
    envelope: "Class 'A' Legal & Eligibility",
    classification: 'Restricted - Financial/Pricing',
    name: 'BIR Tax Clearance Certificate & Audited Financial Statements (2025)',
    description: 'Valid Tax Clearance issued by BIR Collection Enforcement Division & stamped AFS for Company ABC.',
    fileName: 'CompanyABC_BIR_Tax_Clearance_AFS_Nov2026.pdf',
    fileSize: '1.8 MB',
    uploadedBy: 'Rafael Mendoza',
    uploadedDate: '2026-11-15',
    expiryDate: '2027-05-15',
    status: 'Verified',
    requiredFor: 'All Government Bids',
    tempApprovedUserIds: ['u2']
  },
  {
    id: 'doc-4',
    envelope: 'Technical Envelope (1st Envelope)',
    classification: 'Internal - Technical',
    name: 'Statement of Ongoing & Single Largest Completed Contract (SLCC)',
    description: 'Master schedule of completed Company ABC contract deliveries (at least 50% of ABC).',
    fileName: 'CompanyABC_Master_SLCC_Deliveries_2026.pdf',
    fileSize: '4.0 MB',
    uploadedBy: 'Camille Santos',
    uploadedDate: '2026-11-20',
    expiryDate: 'Per Bid',
    status: 'Verified',
    requiredFor: 'All Government Bids',
    tempApprovedUserIds: []
  },
  {
    id: 'doc-5',
    envelope: 'Financial Envelope (2nd Envelope)',
    classification: 'Restricted - Financial/Pricing',
    name: 'Master NFCC Computation & Priced BOQ Template (2026)',
    description: 'Confidential pricing workbook, supplier discounts, and NFCC credit formula for Company ABC.',
    fileName: 'CompanyABC_Master_NFCC_Priced_BOQ_2026.xlsx',
    fileSize: '1.2 MB',
    uploadedBy: 'Rafael Mendoza',
    uploadedDate: '2026-11-22',
    expiryDate: 'Q4 2026',
    status: 'Verified',
    requiredFor: 'Financial Envelope',
    tempApprovedUserIds: []
  }
];

// --- INITIAL PHILGEPS LIVE OPPORTUNITIES (ALPHABETICAL PROJECTS & ENTITIES) ---
const INITIAL_PHILGEPS_OPPORTUNITIES = [
  {
    id: 'pgp-1',
    philgepsRef: '11521088',
    title: 'Project Foxtrot',
    procuringEntity: 'Procuring Entity F',
    region: 'Region II (Cagayan Valley)',
    category: 'Commercial Supply / Operations',
    abcValue: 13500000,
    closingDate: '2026-12-16',
    postedAt: '12 mins ago',
    suggestedModel: 'Company ABC Heavy Operations Package B',
    unitQty: 6,
    isUnread: true,
    imported: false
  },
  {
    id: 'pgp-2',
    philgepsRef: '11520419',
    title: 'Project Golf',
    procuringEntity: 'Procuring Entity G',
    region: 'Region II (Cagayan Valley)',
    category: 'Commercial Supply / Operations',
    abcValue: 8500000,
    closingDate: '2026-12-12',
    postedAt: '2 hours ago',
    suggestedModel: 'Company ABC Enterprise Package A',
    unitQty: 5,
    isUnread: true,
    imported: false
  },
  {
    id: 'pgp-3',
    philgepsRef: '11518730',
    title: 'Project Hotel',
    procuringEntity: 'Procuring Entity H',
    region: 'Region II (Cagayan Valley)',
    category: 'Commercial Supply / Operations',
    abcValue: 5400000,
    closingDate: '2026-12-10',
    postedAt: 'Yesterday',
    suggestedModel: 'Company ABC Compact Service Unit E',
    unitQty: 4,
    isUnread: false,
    imported: false
  }
];

const SIMULATED_PHILGEPS_POOL = [
  {
    philgepsRef: '11524910',
    title: 'Project India',
    procuringEntity: 'Procuring Entity I',
    region: 'Region III (Central Luzon)',
    category: 'Commercial Supply / Operations',
    abcValue: 16800000,
    closingDate: '2026-12-21',
    suggestedModel: 'Company ABC Enterprise Package A',
    unitQty: 10
  },
  {
    philgepsRef: '11525304',
    title: 'Project Juliet',
    procuringEntity: 'Procuring Entity J',
    region: 'Region II (Cagayan Valley)',
    category: 'Commercial Supply / Operations',
    abcValue: 15400000,
    closingDate: '2026-12-19',
    suggestedModel: 'Company ABC Heavy Operations Package B',
    unitQty: 7
  },
  {
    philgepsRef: '11526115',
    title: 'Project Kilo',
    procuringEntity: 'Procuring Entity K',
    region: 'Region III (Central Luzon)',
    category: 'Commercial Supply / Operations',
    abcValue: 8400000,
    closingDate: '2026-12-23',
    suggestedModel: 'Company ABC Executive Supply Package C',
    unitQty: 3
  },
  {
    philgepsRef: '11527044',
    title: 'Project Lima',
    procuringEntity: 'Procuring Entity L',
    region: 'NCR (Metro Manila)',
    category: 'Commercial Supply / Operations',
    abcValue: 11900000,
    closingDate: '2026-12-26',
    suggestedModel: 'Company ABC Standard Commercial Unit D',
    unitQty: 7
  }
];

const formatShortPHP = (val) => {
  if (val >= 1000000) return `₱${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `₱${(val / 1000).toFixed(0)}K`;
  return `₱${val.toLocaleString('en-PH')}`;
};

const formatFullPHP = (val) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0
  }).format(val);
};

export default function App() {
  // --- AUTHENTICATION & ROLE STATE ---
  const [currentUser, setCurrentUser] = useState(INITIAL_TEAM[0]); // Default logged in as Head of Bidding for instant preview; user can log out or switch roles anytime
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loginEmail, setLoginEmail] = useState('camille.santos@company.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [loginError, setLoginError] = useState('');

  // --- NAVIGATION & MENU STATES ---
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | pipeline | tasks | philgeps | collab-chat | collab-workflow | collab-calendar | reports | docs
  const [collabMenuOpen, setCollabMenuOpen] = useState(true);
  const [pipelineView, setPipelineView] = useState('kanban');
  const [mobileStageId, setMobileStageId] = useState('compliance');
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [viewportMode, setViewportMode] = useState('auto'); // 'auto' | 'mobile' | 'desktop'

  // --- CORE DATA STATES ---
  const [bids, setBids] = useState(INITIAL_BIDS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [biddingDocs, setBiddingDocs] = useState(INITIAL_BIDDING_DOCS);
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [activeChannel, setActiveChannel] = useState('general-bidding');
  const [channelInput, setChannelInput] = useState('');

  // --- PHILGEPS MERCHANT INTEGRATION STATES ---
  const [philgepsAccount, setPhilgepsAccount] = useState({
    merchantId: 'PGP-2026-884910-PH',
    organizationName: 'Company ABC Solutions Inc.',
    membershipTier: 'Platinum Membership (Valid thru Jun 30, 2027)',
    syncEmail: 'philgeps-alerts@company.com',
    syncMode: 'Automated Merchant Email Parser + Notice Feed Sync',
    autoSyncEnabled: true,
    lastSyncedAt: 'Just now (Live)',
    categories: [
      'Commercial Supply / Operations',
      'IT & Office Equipment',
      'Construction / Engineering',
      'Medical Supplies'
    ],
    activeCategories: ['Commercial Supply / Operations', 'IT & Office Equipment']
  });
  const [philgepsOpportunities, setPhilgepsOpportunities] = useState(INITIAL_PHILGEPS_OPPORTUNITIES);
  const [isPhilgepsDrawerOpen, setIsPhilgepsDrawerOpen] = useState(false);
  const [livePhilgepsAlert, setLivePhilgepsAlert] = useState(null);
  const [simPoolIndex, setSimPoolIndex] = useState(0);

  // --- DOCUMENT SECURITY VAULT & AUDIT TRAIL STATES ---
  const [vaultSubTab, setVaultSubTab] = useState('documents'); // documents | audit
  const [unlockedDocIds, setUnlockedDocIds] = useState([]);
  const [securityModalState, setSecurityModalState] = useState(null); // { action: 'view' | 'download' | 'upload', doc, bidId?, checkId? }
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [clearanceRequestedDocIds, setClearanceRequestedDocIds] = useState([]);
  const [securityAuditLogs, setSecurityAuditLogs] = useState([
    {
      id: 'aud-1',
      timestamp: '2026-11-26 09:12:18 AM',
      userName: 'Camille Santos',
      userEmail: 'camille.santos@company.com',
      userRole: 'Head of Bidding Department',
      docName: 'Master NFCC Computation & Priced Fleet BOQ Template (2026)',
      classification: 'Restricted - Financial/Pricing',
      action: 'UNLOCK & PREVIEW',
      status: 'GRANTED'
    },
    {
      id: 'aud-2',
      timestamp: '2026-11-26 09:45:03 AM',
      userName: 'Jerome Bautista',
      userEmail: 'jerome.bautista@company.com',
      userRole: 'Technical Specs & EV Engineer',
      docName: 'Master NFCC Computation & Priced Fleet BOQ Template (2026)',
      classification: 'Restricted - Financial/Pricing',
      action: 'ACCESS ATTEMPT',
      status: 'DENIED - INSUFFICIENT CLEARANCE'
    },
    {
      id: 'aud-3',
      timestamp: '2026-11-26 10:18:44 AM',
      userName: 'Atty. Miguel Reyes',
      userEmail: 'miguel.reyes@company.com',
      userRole: 'Legal & Compliance Officer',
      docName: 'PhilGEPS Certificate of Registration (Platinum Membership) & Annex A',
      classification: 'Confidential - Legal/Eligibility',
      action: '2FA PIN DOWNLOAD',
      status: 'GRANTED'
    }
  ]);

  // --- EMAIL NOTIFICATION DISPATCH LOG ---
  const [emailNotifications, setEmailNotifications] = useState([
    {
      id: 'eml-1',
      to: 'miguel.reyes@company.com',
      toName: 'Atty. Miguel Reyes',
      ccAll: true,
      subject: '[BidsPro Task Assigned] Notarize Omnibus Sworn Statement & Secretary’s Certificate',
      bidTitle: 'Project Alpha — Procuring Entity A (BID-PH-2026-104)',
      dueDate: '2026-11-29',
      priority: 'Urgent',
      sentAt: 'Today, 08:30 AM'
    }
  ]);
  const [latestEmailDispatch, setLatestEmailDispatch] = useState(null);

  // --- MODALS, DRAWERS & FILTERS ---
  const [selectedBidId, setSelectedBidId] = useState(null);
  const [drawerTab, setDrawerTab] = useState('checklist');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [taskFilter, setTaskFilter] = useState('all'); // all | mine | urgent
  const [docEnvelopeFilter, setDocEnvelopeFilter] = useState('all');

  const [isNewBidOpen, setIsNewBidOpen] = useState(false);
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false);
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [printSummaryBid, setPrintSummaryBid] = useState(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState(null);

  // --- GOOGLE SHEETS REPORT STATES ---
  const [sheetFilterStage, setSheetFilterStage] = useState('all');
  const [selectedSheetCell, setSelectedSheetCell] = useState('A1');
  const [copiedSheetLink, setCopiedSheetLink] = useState(false);

  // --- FORMS ---
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    bidId: 'BID-PH-2026-104',
    assignedToId: 'u2',
    priority: 'High',
    dueDate: '2026-12-02'
  });

  const [newBidForm, setNewBidForm] = useState({
    philgepsRef: '11514920',
    title: 'Project Mike',
    client: 'Procuring Entity M',
    region: 'Region II (Cagayan Valley)',
    bydModel: 'Company ABC Enterprise Package A',
    unitQty: '5',
    abcValue: '8250000',
    deadline: '2026-12-18',
    managerId: 'u1',
    location: 'BAC Office - Procuring Entity M'
  });

  const [newDocForm, setNewDocForm] = useState({
    envelope: 'Technical Envelope (1st Envelope)',
    classification: 'Confidential - Legal/Eligibility',
    name: '',
    description: '',
    expiryDate: '2027-06-30',
    requiredFor: 'Government Tender Requirement'
  });

  const fileInputRef = useRef(null);
  const [uploadingTargetId, setUploadingTargetId] = useState(null);
  const [uploadMode, setUploadMode] = useState('repo');
  const [chatInput, setChatInput] = useState('');
  const [unitNote, setUnitNote] = useState('');
  const [isAddingUnitLog, setIsAddingUnitLog] = useState(false);

  const [toast, setToast] = useState(null);
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const isHeadOfBidding = currentUser?.systemRole === 'head';
  const isForcedMobile = viewportMode === 'mobile';

  const getUser = (id) => INITIAL_TEAM.find((u) => u.id === id) || INITIAL_TEAM[0];

  const getChecklistStats = (checklist) => {
    const completed = checklist.filter((c) => c.completed).length;
    const total = checklist.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  };

  // --- AUTHENTICATION HANDLERS ---
  const handleCompanyLogin = (e) => {
    e.preventDefault();
    const emailClean = loginEmail.trim().toLowerCase();
    if (!emailClean.endsWith('@company.com')) {
      setLoginError('Access restricted: Please sign in using your official @company.com email address.');
      return;
    }
    const matchedUser = INITIAL_TEAM.find((u) => u.email.toLowerCase() === emailClean);
    if (matchedUser) {
      setCurrentUser(matchedUser);
    } else {
      const nameFromEmail = emailClean
        .split('@')[0]
        .split('.')
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' ');
      setCurrentUser({
        id: `u-${Date.now()}`,
        name: nameFromEmail,
        role: 'Bidding Specialist',
        systemRole: 'staff',
        email: emailClean,
        avatar: nameFromEmail.slice(0, 2).toUpperCase(),
        color: 'bg-sky-700'
      });
    }
    setLoginError('');
    setIsAuthenticated(true);
    showToast(`Signed in with ${emailClean}`);
  };

  const handleQuickRoleSwitch = (userId) => {
    const target = getUser(userId);
    setCurrentUser(target);
    setUnlockedDocIds([]); // Re-lock vault documents on user session switch for strict security
    showToast(`Switched active session to ${target.name} (${target.role})`);
  };

  // --- SECURITY AUDIT & RBAC HELPERS ---
  const appendSecurityAudit = (docName, classification, action, status) => {
    const nowStr = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    setSecurityAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: nowStr,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userRole: currentUser.role,
        docName,
        classification,
        action,
        status
      },
      ...prev
    ]);
  };

  const hasDocumentClearance = (doc) => {
    if (!doc) return true;
    if (isHeadOfBidding) return true;
    if (doc.classification !== 'Restricted - Financial/Pricing') return true;
    return (doc.tempApprovedUserIds || []).includes(currentUser.id);
  };

  const requestSecuredDocumentAction = (action, doc, extra = {}) => {
    const allowed = hasDocumentClearance(doc);
    if (!allowed) {
      appendSecurityAudit(
        doc.name,
        doc.classification,
        action.toUpperCase(),
        'DENIED - INSUFFICIENT CLEARANCE'
      );
      setSecurityModalState({ action, doc, denied: true, ...extra });
      return;
    }

    if (action !== 'upload' && unlockedDocIds.includes(doc.id)) {
      appendSecurityAudit(
        doc.name,
        doc.classification,
        action === 'download' ? 'ENCRYPTED DOWNLOAD' : 'VIEW PREVIEW',
        'GRANTED'
      );
      if (action === 'view') {
        setPreviewDoc(doc);
      } else if (action === 'download') {
        showToast(`Downloaded encrypted file: ${doc.fileName}`);
      }
      return;
    }

    setPinInput('');
    setPinError('');
    setSecurityModalState({ action, doc, denied: false, ...extra });
  };

  const handleVerifySecurityPin = (e) => {
    e.preventDefault();
    if (pinInput.trim() !== '202688') {
      setPinError('Invalid 6-digit Security PIN. Use your assigned authenticator PIN (Demo: 202688).');
      appendSecurityAudit(
        securityModalState.doc.name,
        securityModalState.doc.classification,
        'PIN VERIFICATION',
        'DENIED - INVALID PIN'
      );
      return;
    }

    const { action, doc, bidId, checkId } = securityModalState;
    setUnlockedDocIds((prev) => (prev.includes(doc.id) ? prev : [...prev, doc.id]));
    appendSecurityAudit(
      doc.name,
      doc.classification,
      action === 'upload' ? '2FA PIN UPLOAD' : action === 'download' ? '2FA PIN DOWNLOAD' : '2FA PIN UNLOCK',
      'GRANTED'
    );

    setSecurityModalState(null);
    setPinInput('');
    setPinError('');

    if (action === 'view') {
      setPreviewDoc(doc);
      showToast(`Security Clearance Verified • Unlocked "${doc.name}"`);
    } else if (action === 'download') {
      showToast(`Security Clearance Verified • Downloading "${doc.fileName}"`);
    } else if (action === 'upload') {
      if (bidId && checkId) {
        triggerProjectFileUpload(bidId, checkId);
      } else {
        triggerRepoFileUpload(doc.id);
      }
    }
  };

  const handleRequestTempClearance = (doc) => {
    if (!clearanceRequestedDocIds.includes(doc.id)) {
      setClearanceRequestedDocIds((prev) => [...prev, doc.id]);
    }
    appendSecurityAudit(
      doc.name,
      doc.classification,
      'REQUEST TEMP CLEARANCE',
      'PENDING HEAD APPROVAL'
    );
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChannels((prev) => ({
      ...prev,
      'pricing-approvals': [
        ...prev['pricing-approvals'],
        {
          id: `ch-${Date.now()}`,
          userId: currentUser.id,
          text: `🔐 Security Clearance Request: ${currentUser.name} (${currentUser.email}) requested temporary access to "${doc.name}" [${doc.classification}].`,
          time: nowTime
        }
      ]
    }));
    setSecurityModalState(null);
    showToast('Temporary clearance request sent to Head of Bidding Department');
  };

  const handleGrantTempClearance = (docId, userId) => {
    const targetUser = getUser(userId);
    const targetDoc = biddingDocs.find((d) => d.id === docId);
    setBiddingDocs((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              tempApprovedUserIds: Array.from(new Set([...(d.tempApprovedUserIds || []), userId]))
            }
          : d
      )
    );
    if (targetDoc) {
      appendSecurityAudit(
        targetDoc.name,
        targetDoc.classification,
        `GRANT TEMP ACCESS (${targetUser.email})`,
        'GRANTED'
      );
    }
    showToast(`Granted temporary clearance to ${targetUser.name}`);
  };

  // --- PHILGEPS OPPORTUNITY SIMULATION & IMPORT HANDLERS ---
  const unreadPhilgepsCount = useMemo(
    () => philgepsOpportunities.filter((o) => o.isUnread).length,
    [philgepsOpportunities]
  );

  const handleSimulatePhilgepsOpportunity = () => {
    const template = SIMULATED_PHILGEPS_POOL[simPoolIndex % SIMULATED_PHILGEPS_POOL.length];
    setSimPoolIndex((prev) => prev + 1);
    const uniqueRef = String(Number(template.philgepsRef) + Math.floor(Math.random() * 90));
    const newOpp = {
      ...template,
      id: `pgp-${Date.now()}`,
      philgepsRef: uniqueRef,
      postedAt: 'Just now',
      isUnread: true,
      imported: false
    };

    setPhilgepsOpportunities((prev) => [newOpp, ...prev]);
    setPhilgepsAccount((prev) => ({ ...prev, lastSyncedAt: 'Just now (New Notice Ingested)' }));
    setLivePhilgepsAlert(newOpp);

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChannels((prev) => ({
      ...prev,
      'general-bidding': [
        ...prev['general-bidding'],
        {
          id: `ch-${Date.now()}`,
          userId: 'u1',
          text: `🔔 PhilGEPS Alert Matched [${newOpp.category}]: Ref #${newOpp.philgepsRef} — "${newOpp.title}" (${newOpp.procuringEntity}, ABC: ${formatFullPHP(newOpp.abcValue)}). Closing: ${newOpp.closingDate}.`,
          time: nowTime
        }
      ]
    }));

    showToast(`New PhilGEPS Opportunity Matched: #${newOpp.philgepsRef} - ${newOpp.procuringEntity}`);
  };

  const handleImportPhilgepsToPipeline = (opp) => {
    if (opp.imported) {
      setActiveTab('pipeline');
      setIsPhilgepsDrawerOpen(false);
      return;
    }

    const numId = Math.floor(200 + Math.random() * 750);
    const newBid = {
      id: `BID-PH-2026-${numId}`,
      philgepsRef: opp.philgepsRef,
      title: opp.title,
      client: opp.procuringEntity,
      region: opp.region,
      bydModel: opp.suggestedModel,
      unitQty: opp.unitQty,
      abcValue: opp.abcValue,
      bidOffer: Math.round(opp.abcValue * 0.965),
      margin: 14.8,
      probability: 70,
      preBidDate: '2026-12-06',
      deadline: opp.closingDate,
      bidOpeningTime: `${opp.closingDate} 01:30 PM`,
      daysLeft: 18,
      stage: 'scoping',
      managerId: currentUser.id,
      location: `${opp.procuringEntity} BAC Office`,
      remarks: `Imported directly from PhilGEPS Merchant Sync (Ref #${opp.philgepsRef}). Go/No-Go evaluation initiated.`,
      checklist: [
        { id: 'c1', envelope: 'Eligibility', label: 'PhilGEPS Platinum Registration Certificate & Annex A', required: true, completed: true, fileName: 'BYD_PH_PhilGEPS_Platinum_Cert_2026.pdf' },
        { id: 'c2', envelope: 'Eligibility', label: 'Statement of Ongoing & SLCC Contracts', required: true, completed: false, fileName: '' },
        { id: 'c3', envelope: 'Technical', label: `Technical Specifications Compliance (${opp.suggestedModel})`, required: true, completed: false, fileName: '' },
        { id: 'c4', envelope: 'Technical', label: 'Omnibus Sworn Statement (OSS) & Bid Securing Declaration', required: true, completed: false, fileName: '' },
        { id: 'c5', envelope: 'Financial', label: 'Original Signed Financial Bid Form & Price Schedule', required: true, completed: false, fileName: '' },
      ],
      chat: [
        {
          id: `m-${Date.now()}`,
          userId: currentUser.id,
          text: `Imported PhilGEPS Opportunity #${opp.philgepsRef} (${opp.procuringEntity}) into Go/No-Go Pipeline.`,
          time: 'Just now',
          type: 'system'
        }
      ],
      unitLogs: [
        {
          id: `ul-${Date.now()}`,
          title: `${opp.unitQty}x ${opp.suggestedModel} Allocation Check`,
          date: 'Nov 26',
          tag: 'PhilGEPS Import',
          palette: 'from-slate-800 to-[#0A2E6E]',
          caption: 'Stock & delivery lead time verification initiated.'
        }
      ]
    };

    setBids((prev) => [newBid, ...prev]);
    setPhilgepsOpportunities((prev) =>
      prev.map((item) => (item.id === opp.id ? { ...item, isUnread: false, imported: true } : item))
    );
    setLivePhilgepsAlert(null);
    setIsPhilgepsDrawerOpen(false);
    setSelectedBidId(newBid.id);
    showToast(`Imported PhilGEPS #${opp.philgepsRef} to Bid Pipeline (Go/No-Go)`);
  };

  const handleTogglePhilgepsCategory = (cat) => {
    setPhilgepsAccount((prev) => {
      const exists = prev.activeCategories.includes(cat);
      return {
        ...prev,
        activeCategories: exists
          ? prev.activeCategories.filter((c) => c !== cat)
          : [...prev.activeCategories, cat]
      };
    });
    showToast(`Updated PhilGEPS category watch filter: ${cat}`);
  };

  // --- TASK DELEGATION & AUTOMATIC COMPANY EMAIL NOTIFICATION ---
  const handleDelegateTask = (e) => {
    e.preventDefault();
    if (!isHeadOfBidding) return;
    if (!newTaskForm.title.trim()) return;

    const assignee = getUser(newTaskForm.assignedToId);
    const linkedBid = bids.find((b) => b.id === newTaskForm.bidId) || bids[0];
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const createdTask = {
      id: `TSK-2026-0${tasks.length + 1}`,
      title: newTaskForm.title.trim(),
      description: newTaskForm.description.trim() || 'Complete assigned bidding deliverable before deadline.',
      bidId: linkedBid.id,
      assignedToId: assignee.id,
      delegatedById: currentUser.id,
      priority: newTaskForm.priority,
      dueDate: newTaskForm.dueDate,
      status: 'Pending',
      emailNotifiedAt: `Today, ${nowTime}`
    };

    setTasks((prev) => [createdTask, ...prev]);

    // Automatic Company Email Broadcast (Primary TO: Assignee, CC: All Bidding Team)
    const dispatchRecord = {
      id: `eml-${Date.now()}`,
      to: assignee.email,
      toName: assignee.name,
      ccList: INITIAL_TEAM.filter((m) => m.id !== assignee.id).map((m) => m.email),
      subject: `[BidsPro Task Assigned] ${createdTask.title}`,
      bidTitle: `${linkedBid.client} (${linkedBid.id})`,
      dueDate: createdTask.dueDate,
      priority: createdTask.priority,
      sentAt: `Today, ${nowTime}`
    };

    setEmailNotifications((prev) => [dispatchRecord, ...prev]);
    setLatestEmailDispatch(dispatchRecord);

    // Also log into #general-bidding In-house Chat
    setChannels((prev) => ({
      ...prev,
      'general-bidding': [
        ...prev['general-bidding'],
        {
          id: `ch-${Date.now()}`,
          userId: currentUser.id,
          text: `📌 Delegated task "${createdTask.title}" to ${assignee.name} (${assignee.email}) for ${linkedBid.id}. Automated email alert sent to assignee & all bidding staff.`,
          time: nowTime
        }
      ]
    }));

    setIsDelegateModalOpen(false);
    setNewTaskForm({
      title: '',
      description: '',
      bidId: bids[0]?.id || 'BID-PH-2026-104',
      assignedToId: 'u2',
      priority: 'High',
      dueDate: '2026-12-04'
    });
    showToast(`Task delegated to ${assignee.name} • Company email sent to team!`);
  };

  const handleToggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextStatus =
          t.status === 'Pending' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'Pending';
        return { ...t, status: nextStatus };
      })
    );
    showToast('Task status updated');
  };

  // --- DERIVED DATA ---
  const selectedBid = useMemo(
    () => bids.find((b) => b.id === selectedBidId) || null,
    [bids, selectedBidId]
  );

  const filteredBids = useMemo(() => {
    return bids.filter((bid) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        bid.title.toLowerCase().includes(q) ||
        bid.client.toLowerCase().includes(q) ||
        bid.bydModel.toLowerCase().includes(q) ||
        bid.philgepsRef.toLowerCase().includes(q) ||
        bid.id.toLowerCase().includes(q);
      const matchesStage = stageFilter === 'all' || bid.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [bids, searchQuery, stageFilter]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (taskFilter === 'mine') return t.assignedToId === currentUser.id;
      if (taskFilter === 'urgent') return t.priority === 'Urgent' || t.priority === 'High';
      return true;
    });
  }, [tasks, taskFilter, currentUser.id]);

  const filteredDocs = useMemo(() => {
    return biddingDocs.filter((doc) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        (doc.fileName && doc.fileName.toLowerCase().includes(q));
      const matchesEnvelope = docEnvelopeFilter === 'all' || doc.envelope === docEnvelopeFilter;
      return matchesSearch && matchesEnvelope;
    });
  }, [biddingDocs, searchQuery, docEnvelopeFilter]);

  const kpis = useMemo(() => {
    const activeCount = bids.filter((b) => b.stage !== 'submitted').length;
    const totalABC = bids.reduce((sum, b) => sum + b.abcValue, 0);
    const totalUnits = bids.reduce((sum, b) => sum + b.unitQty, 0);
    const urgentDeadlines = bids.filter((b) => b.daysLeft > 0 && b.daysLeft <= 10 && b.stage !== 'submitted').length;
    return {
      activeCount,
      totalABC,
      totalUnits,
      urgentDeadlines,
      winRate: 46.5
    };
  }, [bids]);

  const docStats = useMemo(() => {
    const verified = biddingDocs.filter((d) => d.status === 'Verified').length;
    const uploaded = biddingDocs.filter((d) => d.status === 'Uploaded').length;
    const missing = biddingDocs.filter((d) => d.status === 'Missing').length;
    const expiring = biddingDocs.filter((d) => d.status === 'Expiring Soon').length;
    return { verified, uploaded, missing, expiring, total: biddingDocs.length };
  }, [biddingDocs]);

  // --- GOOGLE SHEETS REPORT DATA & CSV EXPORT ---
  const sheetRows = useMemo(() => {
    return bids
      .filter((b) => sheetFilterStage === 'all' || b.stage === sheetFilterStage)
      .map((bid) => {
        const stats = getChecklistStats(bid.checklist);
        const stageObj = STAGES.find((s) => s.id === bid.stage);
        const lead = getUser(bid.managerId);
        const bidTasks = tasks.filter((t) => t.bidId === bid.id);
        const openTasks = bidTasks.filter((t) => t.status !== 'Completed').length;

        return {
          bidId: bid.id,
          philgepsRef: bid.philgepsRef,
          client: bid.client,
          projectTitle: bid.title,
          fleetSpec: `${bid.unitQty}x ${bid.bydModel}`,
          abcValue: bid.abcValue,
          bidOffer: bid.bidOffer,
          stageShort: stageObj?.short || bid.stage,
          readinessPercent: stats.percent,
          leadName: lead.name,
          deadline: bid.deadline,
          activityStatus:
            bid.stage === 'submitted'
              ? 'SUBMITTED / LCB #1'
              : openTasks > 0
              ? `ACTIVE (${openTasks} Open Tasks)`
              : 'READY FOR SUBMISSION',
          remarks: bid.remarks
        };
      });
  }, [bids, tasks, sheetFilterStage]);

  const handleExportGoogleSheetsCSV = () => {
    const headers = [
      'Bid ID',
      'PhilGEPS Ref #',
      'Procuring Entity / Client',
      'Project / Contract Title',
      'Fleet & Quantity',
      'Approved Budget (ABC PHP)',
      'Bid Offer (PHP)',
      'Current Pipeline Stage',
      'Envelope Readiness (%)',
      'Assigned Lead',
      'Submission Deadline',
      'Bidding Activity Status',
      'Latest Remarks'
    ];

    const csvLines = [
      headers.join(','),
      ...sheetRows.map((r) =>
        [
          `"${r.bidId}"`,
          `"${r.philgepsRef}"`,
          `"${r.client.replace(/"/g, '""')}"`,
          `"${r.projectTitle.replace(/"/g, '""')}"`,
          `"${r.fleetSpec}"`,
          r.abcValue,
          r.bidOffer,
          `"${r.stageShort}"`,
          `${r.readinessPercent}%`,
          `"${r.leadName}"`,
          `"${r.deadline}"`,
          `"${r.activityStatus}"`,
          `"${r.remarks.replace(/"/g, '""')}"`
        ].join(',')
      )
    ];

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BidsPro_Activity_Status_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded Google Sheets compatible CSV report');
  };

  const handleCopyGoogleSheetTable = () => {
    const tsv = [
      ['Bid ID', 'PhilGEPS #', 'Client', 'Project Title', 'ABC (PHP)', 'Offer (PHP)', 'Stage', 'Readiness', 'Lead', 'Deadline', 'Activity Status'].join('\t'),
      ...sheetRows.map((r) =>
        [r.bidId, r.philgepsRef, r.client, r.projectTitle, r.abcValue, r.bidOffer, r.stageShort, `${r.readinessPercent}%`, r.leadName, r.deadline, r.activityStatus].join('\t')
      )
    ].join('\n');
    navigator.clipboard?.writeText(tsv);
    setCopiedSheetLink(true);
    setTimeout(() => setCopiedSheetLink(false), 2500);
    showToast('Copied table rows — paste directly into Google Sheets (Ctrl+V)');
  };

  // --- FILE UPLOAD & PROJECT HANDLERS ---
  const triggerRepoFileUpload = (docId) => {
    setUploadMode('repo');
    setUploadingTargetId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const triggerProjectFileUpload = (bidId, checkId) => {
    setUploadMode('project');
    setUploadingTargetId({ bidId, checkId });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKB = file.size / 1024;
    const formattedSize = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(sizeKB))} KB`;
    const todayStr = new Date().toISOString().split('T')[0];

    if (uploadMode === 'repo' && uploadingTargetId) {
      setBiddingDocs((prev) =>
        prev.map((doc) =>
          doc.id === uploadingTargetId
            ? {
                ...doc,
                fileName: file.name,
                fileSize: formattedSize,
                uploadedBy: currentUser.name,
                uploadedDate: todayStr,
                status: 'Uploaded'
              }
            : doc
        )
      );
      const targetDoc = biddingDocs.find((d) => d.id === uploadingTargetId);
      if (targetDoc) {
        appendSecurityAudit(targetDoc.name, targetDoc.classification, `UPLOADED FILE (${file.name})`, 'GRANTED');
      }
      showToast(`Encrypted & uploaded "${file.name}" to Secure Document Vault`);
    } else if (uploadMode === 'project' && uploadingTargetId) {
      const { bidId, checkId } = uploadingTargetId;
      setBids((prev) =>
        prev.map((bid) => {
          if (bid.id !== bidId) return bid;
          const updatedChecklist = bid.checklist.map((item) =>
            item.id === checkId ? { ...item, completed: true, fileName: file.name } : item
          );
          const logMsg = {
            id: `m-${Date.now()}`,
            userId: currentUser.id,
            text: `Uploaded requirement file: "${file.name}"`,
            time: 'Just now',
            type: 'system'
          };
          return {
            ...bid,
            checklist: updatedChecklist,
            chat: [...bid.chat, logMsg]
          };
        })
      );
      showToast(`Attached "${file.name}" to tender checklist`);
    }
  };

  const handleVerifyDoc = (docId) => {
    setBiddingDocs((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, status: doc.status === 'Verified' ? 'Uploaded' : 'Verified' } : doc
      )
    );
    showToast('Document verification status updated');
  };

  const handleAddCustomDocSlot = (e) => {
    e.preventDefault();
    if (!newDocForm.name.trim()) return;
    const newEntry = {
      id: `doc-${Date.now()}`,
      envelope: newDocForm.envelope,
      classification: newDocForm.classification,
      name: newDocForm.name.trim(),
      description: newDocForm.description.trim() || 'Required government bidding compliance document.',
      fileName: '',
      fileSize: '',
      uploadedBy: '',
      uploadedDate: '',
      expiryDate: newDocForm.expiryDate || 'Per Bid',
      status: 'Missing',
      requiredFor: newDocForm.requiredFor,
      tempApprovedUserIds: []
    };
    setBiddingDocs((prev) => [newEntry, ...prev]);
    setIsAddDocModalOpen(false);
    setNewDocForm({
      envelope: 'Technical Envelope (1st Envelope)',
      classification: 'Confidential - Legal/Eligibility',
      name: '',
      description: '',
      expiryDate: '2027-06-30',
      requiredFor: 'Government Tender Requirement'
    });
    showToast('Added new protected document slot');
  };

  const handleToggleChecklist = (bidId, checkId) => {
    setBids((prev) =>
      prev.map((bid) => {
        if (bid.id !== bidId) return bid;
        const updatedChecklist = bid.checklist.map((item) =>
          item.id === checkId ? { ...item, completed: !item.completed } : item
        );
        return { ...bid, checklist: updatedChecklist };
      })
    );
  };

  const handleStageChange = (bidId, newStage) => {
    const stageObj = STAGES.find((s) => s.id === newStage);
    setBids((prev) =>
      prev.map((bid) => {
        if (bid.id !== bidId) return bid;
        const logMsg = {
          id: `m-${Date.now()}`,
          userId: currentUser.id,
          text: `Moved tender stage to "${stageObj?.title}"`,
          time: 'Just now',
          type: 'system'
        };
        return {
          ...bid,
          stage: newStage,
          chat: [...bid.chat, logMsg]
        };
      })
    );
    showToast(`Stage updated: ${stageObj?.short}`);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedBid) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      userId: currentUser.id,
      text: chatInput.trim(),
      time: 'Just now',
      type: 'note'
    };
    setBids((prev) =>
      prev.map((b) => (b.id === selectedBid.id ? { ...b, chat: [...b.chat, newMsg] } : b))
    );
    setChatInput('');
  };

  const handleSendChannelMessage = (e) => {
    e.preventDefault();
    if (!channelInput.trim()) return;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChannels((prev) => ({
      ...prev,
      [activeChannel]: [
        ...prev[activeChannel],
        {
          id: `ch-${Date.now()}`,
          userId: currentUser.id,
          text: channelInput.trim(),
          time: nowTime
        }
      ]
    }));
    setChannelInput('');
  };

  const handleAddUnitLog = (e) => {
    e.preventDefault();
    if (!selectedBid) return;
    const palettes = [
      'from-slate-800 to-[#0A2E6E]',
      'from-sky-950 to-slate-900',
      'from-emerald-950 to-slate-900'
    ];
    const newLog = {
      id: `ul-${Date.now()}`,
      title: unitNote.trim() || `${selectedBid.bydModel} PDI & LTO Red Plate Update`,
      date: 'Nov 26',
      tag: 'Fleet & LTO Log',
      palette: palettes[Math.floor(Math.random() * palettes.length)],
      caption: unitNote.trim() || 'Unit allocation, conduction sticker, and LTO red plate processing logged.'
    };
    setBids((prev) =>
      prev.map((b) =>
        b.id === selectedBid.id ? { ...b, unitLogs: [newLog, ...b.unitLogs] } : b
      )
    );
    setUnitNote('');
    setIsAddingUnitLog(false);
    showToast('Added unit allocation & LTO log');
  };

  const handleCreateBid = (e) => {
    e.preventDefault();
    if (!newBidForm.title.trim() || !newBidForm.client.trim()) return;
    const numId = Math.floor(120 + Math.random() * 850);
    const abc = Number(newBidForm.abcValue) || 5000000;
    const qty = Number(newBidForm.unitQty) || 1;
    const created = {
      id: `BID-PH-2026-${numId}`,
      philgepsRef: newBidForm.philgepsRef.trim() || '11519901',
      title: newBidForm.title.trim(),
      client: newBidForm.client.trim(),
      region: newBidForm.region,
      bydModel: newBidForm.bydModel,
      unitQty: qty,
      abcValue: abc,
      bidOffer: Math.round(abc * 0.965),
      margin: 15.0,
      probability: 60,
      preBidDate: '2026-12-03',
      deadline: newBidForm.deadline,
      bidOpeningTime: `${newBidForm.deadline} 01:30 PM`,
      daysLeft: 22,
      stage: 'scoping',
      managerId: newBidForm.managerId,
      location: newBidForm.location || 'Procuring Entity BAC Office',
      remarks: 'Newly registered PhilGEPS opportunity; initial scoping underway.',
      checklist: [
        { id: 'c1', envelope: 'Eligibility', label: 'PhilGEPS Platinum Registration Certificate & Annex A', required: true, completed: true, fileName: 'BYD_PH_PhilGEPS_Platinum_Cert_2026.pdf' },
        { id: 'c2', envelope: 'Eligibility', label: 'Statement of Ongoing & SLCC Contracts', required: true, completed: false, fileName: '' },
        { id: 'c3', envelope: 'Technical', label: `Technical Specifications Compliance (${newBidForm.bydModel})`, required: true, completed: false, fileName: '' },
        { id: 'c4', envelope: 'Technical', label: 'Omnibus Sworn Statement (OSS) & Bid Securing Declaration', required: true, completed: false, fileName: '' },
        { id: 'c5', envelope: 'Financial', label: 'Financial Bid Form & Price Schedule (Within PH)', required: true, completed: false, fileName: '' },
      ],
      chat: [
        { id: `m-${Date.now()}`, userId: currentUser.id, text: `Registered PhilGEPS Ref #${newBidForm.philgepsRef} for ${qty}x ${newBidForm.bydModel}.`, time: 'Just now', type: 'system' }
      ],
      unitLogs: [
        { id: `ul-${Date.now()}`, title: `${qty}x ${newBidForm.bydModel} Fleet Reservation`, date: 'Nov 26', tag: 'Stock Check', palette: 'from-slate-800 to-[#0A2E6E]', caption: 'Initial allocation request sent to Fleet Desk.' }
      ]
    };

    setBids((prev) => [created, ...prev]);
    setIsNewBidOpen(false);
    setSelectedBidId(created.id);
    showToast(`Registered PhilGEPS Bid ${created.id}`);
  };

  // --- CALENDAR COMBINED EVENTS ---
  const calendarEvents = useMemo(() => {
    const events = [];
    bids.forEach((b) => {
      events.push({
        id: `ev-sub-${b.id}`,
        date: b.deadline,
        type: 'Bid Submission',
        badgeColor: 'bg-[#0A2E6E] text-white',
        title: `Bid Opening: ${b.client}`,
        subtitle: `${b.unitQty}x ${b.bydModel} • ${formatShortPHP(b.abcValue)}`,
        bidId: b.id
      });
      if (b.preBidDate) {
        events.push({
          id: `ev-pre-${b.id}`,
          date: b.preBidDate,
          type: 'Pre-Bid Conf',
          badgeColor: 'bg-sky-100 text-sky-800',
          title: `Pre-Bid: ${b.client}`,
          subtitle: `PhilGEPS #${b.philgepsRef}`,
          bidId: b.id
        });
      }
    });
    tasks.forEach((t) => {
      const assignee = getUser(t.assignedToId);
      events.push({
        id: `ev-tsk-${t.id}`,
        date: t.dueDate,
        type: 'Task Due',
        badgeColor: 'bg-[#D49B1A] text-[#071E4A]',
        title: `Task: ${t.title}`,
        subtitle: `Assigned to ${assignee.name} (${t.status})`,
        bidId: t.bidId
      });
    });
    return events.sort((a, b) => a.date.localeCompare(b.date));
  }, [bids, tasks]);

  // =========================================================================
  // COMPANY EMAIL LOGIN GATE SCREEN (WHEN SIGNED OUT)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071E4A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#D49B1A] overflow-hidden relative z-10">
          <div className="p-6 bg-white border-b border-slate-200 text-center space-y-2">
            <img
              src="1000032310.png"
              alt="BidsPro - Plan • Manage • Win"
              className="h-16 w-auto object-contain mx-auto"
            />
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-[#071E4A] border border-[#D49B1A]">
                Demo only LSCasti
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A2E6E] text-[#F5C342]">
                Developer LSCastillejo
              </span>
            </div>
            <p className="text-xs text-slate-600 font-semibold">
              Company ABC Bidding Portal — Sign in with your official <strong>@company.com</strong> account
            </p>
          </div>

          <form onSubmit={handleCompanyLogin} className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Email (@company.com)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 focus:border-[#0A2E6E] rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 focus:border-[#0A2E6E] rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D49B1A] to-[#E5B02B] hover:from-[#B88412] hover:to-[#D49B1A] text-[#071E4A] text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to BidsPro</span>
            </button>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-500">Quick Demo Account Login:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {INITIAL_TEAM.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => {
                      setLoginEmail(member.email);
                      setCurrentUser(member);
                      setIsAuthenticated(true);
                      showToast(`Signed in as ${member.name}`);
                    }}
                    className="text-left px-2.5 py-2 rounded-xl bg-slate-50 hover:bg-[#0A2E6E]/10 border border-slate-200 text-[11px] cursor-pointer"
                  >
                    <p className="font-bold text-[#0A2E6E] truncate">{member.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {member.systemRole === 'head' ? 'Head of Bidding' : 'Personnel'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </form>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span className="font-bold text-[#0A2E6E]">Developer LSCastillejo</span>
            <span className="font-semibold text-amber-800">Demo only LSCasti</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col lg:flex-row relative">
      {/* Hidden file input used by Secure Document Vault & Bid Checklist uploads */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelected}
        className="hidden"
      />

      {/* ================= DESKTOP / LAPTOP LEFT SIDEBAR ================= */}
      <aside
        className={`${
          isForcedMobile ? 'hidden' : 'hidden lg:flex'
        } w-72 shrink-0 bg-[#071E4A] text-slate-200 flex-col justify-between border-r border-[#0F3D8C] select-none`}
      >
          <div>
            {/* Brand Logo Header */}
            <div className="p-4 border-b border-[#0F3D8C] bg-white">
              <div className="flex flex-col items-center">
                <img
                  src="1000032310.png"
                  alt="BidsPro - Plan • Manage • Win"
                  className="h-14 w-auto object-contain"
                />
                <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-[#071E4A] border border-[#D49B1A]">
                    Demo only LSCasti
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A2E6E] text-[#F5C342]">
                    Developer LSCastillejo
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Desktop Navigation Menu */}
            <nav className="p-3 flex flex-col gap-1">
              {/* 1. Executive Dashboard */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-[#0F3D8C] to-[#164EB0] text-white border border-[#D49B1A]/60 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'text-[#F5C342]' : 'text-slate-400'}`} />
                  <span>Executive Dashboard</span>
                </div>
              </button>

              {/* 2. Active Bids Pipeline */}
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'pipeline'
                    ? 'bg-gradient-to-r from-[#0F3D8C] to-[#164EB0] text-white border border-[#D49B1A]/60 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Kanban className={`w-4 h-4 shrink-0 ${activeTab === 'pipeline' ? 'text-[#F5C342]' : 'text-slate-400'}`} />
                  <span>Active Bids Pipeline</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'pipeline'
                    ? 'bg-[#D49B1A] text-[#071E4A]'
                    : 'bg-[#0A2E6E] text-slate-300'
                }`}>
                  {bids.length}
                </span>
              </button>

              {/* 3. Task Management & Delegation */}
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'tasks'
                    ? 'bg-gradient-to-r from-[#0F3D8C] to-[#164EB0] text-white border border-[#D49B1A]/60 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ListTodo className={`w-4 h-4 shrink-0 ${activeTab === 'tasks' ? 'text-[#F5C342]' : 'text-slate-400'}`} />
                  <span>Task Management</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'tasks'
                    ? 'bg-[#D49B1A] text-[#071E4A]'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {tasks.filter((t) => t.status !== 'Completed').length} Open
                </span>
              </button>

              {/* 3B. PhilGEPS Sync & Live Opportunity Monitor */}
              <button
                onClick={() => setActiveTab('philgeps')}
                className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'philgeps'
                    ? 'bg-gradient-to-r from-[#0F3D8C] to-[#164EB0] text-white border border-[#D49B1A]/60 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Radio className={`w-4 h-4 shrink-0 ${activeTab === 'philgeps' ? 'text-emerald-400' : 'text-emerald-400/80'}`} />
                  <span>PhilGEPS Sync</span>
                </div>
                {unreadPhilgepsCount > 0 ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-emerald-400 text-[#071E4A]">
                    {unreadPhilgepsCount} New
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#0A2E6E] text-slate-300">
                    Live
                  </span>
                )}
              </button>

              {/* 4. COLLABORATION MENU WITH SUB-MENUS (In-house Chat, Work Flow, Calendar) */}
              <div className="space-y-1">
                <button
                  onClick={() => setCollabMenuOpen(!collabMenuOpen)}
                  className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeTab.startsWith('collab-')
                      ? 'bg-[#0A2E6E] text-[#F5C342] border border-[#D49B1A]/40'
                      : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className={`w-4 h-4 shrink-0 ${activeTab.startsWith('collab-') ? 'text-[#F5C342]' : 'text-slate-400'}`} />
                    <span>Collaboration</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${collabMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {collabMenuOpen && (
                  <div className="flex flex-col gap-1 pl-5 border-l border-[#1A4FA8] ml-5">
                    {[
                      { id: 'collab-chat', label: 'In-house Chat', icon: MessageSquare },
                      { id: 'collab-workflow', label: 'Work Flow', icon: GitBranch },
                      { id: 'collab-calendar', label: 'Calendar', icon: CalendarIcon },
                    ].map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveTab(sub.id)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSubActive
                              ? 'bg-gradient-to-r from-[#0F3D8C] to-[#164EB0] text-white border border-[#D49B1A]/60 shadow-xs'
                              : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/60'
                          }`}
                        >
                          <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-[#F5C342]' : 'text-slate-400'}`} />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. REPORTS MENU (Automated Google Sheet Format Summary) */}
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'reports'
                    ? 'bg-gradient-to-r from-[#0F3D8C] to-[#164EB0] text-white border border-[#D49B1A]/60 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className={`w-4 h-4 shrink-0 ${activeTab === 'reports' ? 'text-emerald-400' : 'text-emerald-400/80'}`} />
                  <span>Reports (Google Sheet)</span>
                </div>
                <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live
                </span>
              </button>

              {/* 6. Secure Document Vault */}
              <button
                onClick={() => setActiveTab('docs')}
                className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'docs'
                    ? 'bg-gradient-to-r from-[#0F3D8C] to-[#164EB0] text-white border border-[#D49B1A]/60 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#0A2E6E]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className={`w-4 h-4 shrink-0 ${activeTab === 'docs' ? 'text-[#F5C342]' : 'text-slate-400'}`} />
                  <span>Secure Document Vault</span>
                </div>
                <Lock className="w-3.5 h-3.5 text-[#F5C342]/80 shrink-0" />
              </button>

              {/* Direct External Link to PhilGEPS */}
              <div className="pt-2 mt-1 border-t border-[#0F3D8C]">
                <a
                  href="https://notices.philgeps.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#0A2E6E] hover:bg-[#0F3D8C] text-[#F5C342] border border-[#D49B1A]/40 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#F5C342] shrink-0" />
                    <span>Open PhilGEPS Portal</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F5C342] shrink-0" />
                </a>
              </div>
            </nav>
          </div>

          {/* Bottom Logged-In Company User Profile, Developer Credit & Sign Out */}
          <div className="p-4 border-t border-[#0F3D8C] space-y-3">
            <div className="bg-[#0A2E6E] rounded-xl p-3 border border-[#1A4FA8]">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D49B1A] to-[#F5C342] flex items-center justify-center text-[#071E4A] text-xs font-extrabold shrink-0">
                  {currentUser.avatar}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-[#F5C342] font-semibold truncate">{currentUser.role}</p>
                  <p className="text-[10px] text-slate-300 truncate">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="w-full py-1.5 px-3 rounded-lg bg-[#071E4A] hover:bg-rose-950/60 text-slate-200 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 border border-[#1A4FA8] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-[#F5C342]" />
                <span>Sign Out / Switch Email</span>
              </button>
            </div>

            <div className="px-2 py-1.5 rounded-lg bg-[#0A2E6E]/60 border border-[#1A4FA8]/60 flex items-center justify-between text-[10px]">
              <span className="font-bold text-[#F5C342] truncate">Developer LSCastillejo</span>
              <span className="text-slate-300 font-semibold shrink-0">Demo only LSCasti</span>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className={`flex-1 flex flex-col min-w-0 ${isForcedMobile ? 'overflow-y-auto pb-20' : 'pb-20 lg:pb-0'}`}>
          {/* COMPACT CELLULAR PHONE TOP BAR (VISIBLE ON MOBILE OR FORCED MOBILE PREVIEW) */}
          <div
            className={`${
              isForcedMobile ? 'flex' : 'flex lg:hidden'
            } bg-white border-b-2 border-[#D49B1A] px-3.5 py-2.5 items-center justify-between gap-2 sticky top-0 z-30 shadow-xs`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <img
                src="1000032310.png"
                alt="BidsPro"
                className="h-9 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-[#071E4A] border border-[#D49B1A] truncate w-fit">
                  Demo only LSCasti
                </span>
                <span className="text-[9px] font-bold text-[#0A2E6E] truncate mt-0.5">
                  Developer LSCastillejo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Viewport Toggle on Mobile Preview Frame */}
              {isForcedMobile && (
                <button
                  onClick={() => setViewportMode('auto')}
                  className="px-2 py-1.5 rounded-lg bg-[#0A2E6E] text-[#F5C342] text-[10px] font-extrabold flex items-center gap-1 cursor-pointer"
                  title="Return to Desktop/Auto View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
              )}

              {/* Mobile PhilGEPS Alert Bell */}
              <button
                onClick={() => {
                  setIsPhilgepsDrawerOpen(true);
                  setPhilgepsOpportunities((prev) => prev.map((o) => ({ ...o, isUnread: false })));
                }}
                className="relative p-2 rounded-xl bg-slate-100 text-[#0A2E6E] cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadPhilgepsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                    {unreadPhilgepsCount}
                  </span>
                )}
              </button>

              {/* Quick + Bid Button */}
              <button
                onClick={() => setIsNewBidOpen(true)}
                className="bg-gradient-to-r from-[#D49B1A] to-[#E5B02B] text-[#071E4A] px-2.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Bid</span>
              </button>
            </div>
          </div>

          {/* MOBILE SUB-HEADER: ACTIVE SECTION TITLE, ROLE SWITCHER & SEARCH */}
          <div
            className={`${
              isForcedMobile ? 'block' : 'block lg:hidden'
            } bg-slate-100/90 border-b border-slate-200 px-3.5 py-2.5 space-y-2`}
          >
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-sm font-extrabold text-[#0A2E6E] truncate">
                {activeTab === 'dashboard' && 'Executive Dashboard'}
                {activeTab === 'pipeline' && 'Active Bidding Pipeline'}
                {activeTab === 'tasks' && 'Task Delegation'}
                {activeTab === 'philgeps' && 'PhilGEPS Live Sync'}
                {activeTab === 'collab-chat' && 'In-House Chat'}
                {activeTab === 'collab-workflow' && 'Approval Work Flow'}
                {activeTab === 'collab-calendar' && 'Master Calendar'}
                {activeTab === 'reports' && 'Google Sheet Report'}
                {activeTab === 'docs' && 'Secure Document Vault'}
              </h1>

              <select
                value={currentUser.id}
                onChange={(e) => handleQuickRoleSwitch(e.target.value)}
                className="text-[11px] font-bold text-[#0A2E6E] bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none max-w-[165px] truncate"
              >
                {INITIAL_TEAM.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.systemRole === 'head' ? 'Head' : 'Staff'})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Project Alpha-Echo, Entity A-E..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 focus:border-[#0A2E6E] rounded-xl text-xs outline-none"
                />
              </div>
              {isHeadOfBidding && (
                <button
                  onClick={() => {
                    setActiveTab('tasks');
                    setIsDelegateModalOpen(true);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-[#0A2E6E] text-white text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <ListTodo className="w-3.5 h-3.5 text-[#F5C342]" />
                  <span>Delegate</span>
                </button>
              )}
            </div>
          </div>

          {/* DESKTOP / LAPTOP TOP HEADER BAR (HIDDEN ON CELLULAR PHONES) */}
          <header
            className={`${
              isForcedMobile ? 'hidden' : 'hidden lg:flex'
            } bg-white border-b border-slate-200 px-8 py-3.5 items-center justify-between gap-3 sticky top-0 z-20`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mb-0.5">
                <span className="font-bold text-[#0A2E6E]">Company ABC • BidsPro</span>
                <span className="text-[#D49B1A] font-bold">•</span>
                <span className="font-semibold text-slate-700">{currentUser.email}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-[#0A2E6E] border border-[#D49B1A]">
                  <Sparkles className="w-3 h-3 text-[#B88412]" />
                  Demo only LSCasti
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A2E6E] text-[#F5C342]">
                  Developer LSCastillejo
                </span>
              </div>
              <h1 className="text-xl xl:text-2xl font-bold text-[#0A2E6E] tracking-tight">
                {activeTab === 'dashboard' && 'Executive Bidding & Tender Dashboard'}
                {activeTab === 'pipeline' && 'Active Bidding Pipeline'}
                {activeTab === 'tasks' && 'Task Management & Delegation Center'}
                {activeTab === 'philgeps' && 'PhilGEPS Merchant Sync & Live Opportunity Monitor'}
                {activeTab === 'collab-chat' && 'Collaboration • In-House Department Chat'}
                {activeTab === 'collab-workflow' && 'Collaboration • Bidding Approval Work Flow'}
                {activeTab === 'collab-calendar' && 'Collaboration • Master Bidding Calendar'}
                {activeTab === 'reports' && 'Reports • Automated Google Sheet Activity Summary'}
                {activeTab === 'docs' && 'Secure Document Vault & Access Audit Trail'}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Dual Interface Preview Toggle (Desktop/Laptop vs Cellular Phone) */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1" title="Switch Dual Responsive View">
                <button
                  onClick={() => setViewportMode('auto')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    viewportMode === 'auto' ? 'bg-white text-[#0A2E6E] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    viewportMode === 'mobile' ? 'bg-[#0A2E6E] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Phone View</span>
                </button>
              </div>

              {/* Real-Time PhilGEPS Alert Bell & Notification Drawer Trigger */}
              <button
                onClick={() => {
                  setIsPhilgepsDrawerOpen(true);
                  setPhilgepsOpportunities((prev) => prev.map((o) => ({ ...o, isUnread: false })));
                }}
                className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-[#0A2E6E]/10 text-[#0A2E6E] border border-slate-200 transition-colors cursor-pointer"
                title="PhilGEPS Live Opportunity Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadPhilgepsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {unreadPhilgepsCount}
                  </span>
                )}
              </button>

              {/* Role Switcher Pill */}
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5">
                <UserCog className="w-3.5 h-3.5 text-[#0A2E6E]" />
                <span className="text-[11px] font-bold text-slate-500">Role:</span>
                <select
                  value={currentUser.id}
                  onChange={(e) => handleQuickRoleSwitch(e.target.value)}
                  className="text-xs font-bold text-[#0A2E6E] bg-transparent outline-none cursor-pointer"
                >
                  {INITIAL_TEAM.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.systemRole === 'head' ? 'Head of Bidding' : 'Personnel'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Input */}
              <div className="relative w-48 xl:w-56">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Project Alpha-Echo..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-transparent focus:bg-white focus:border-[#0A2E6E] rounded-xl text-xs outline-none transition-all"
                />
              </div>

              {/* Delegate Task Quick Button */}
              {isHeadOfBidding && (
                <button
                  onClick={() => {
                    setActiveTab('tasks');
                    setIsDelegateModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
                >
                  <ListTodo className="w-3.5 h-3.5 text-[#F5C342]" />
                  <span>Delegate Task</span>
                </button>
              )}

              {/* Add New Bid Button */}
              <button
                onClick={() => setIsNewBidOpen(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-[#D49B1A] to-[#E5B02B] hover:from-[#B88412] hover:to-[#D49B1A] text-[#071E4A] px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-xs transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Bid</span>
              </button>
            </div>
          </header>

          {/* MAIN VIEWPORT */}
          <main className={`flex-1 ${isForcedMobile ? 'p-3.5 space-y-4' : 'p-3.5 sm:p-6 lg:p-8 space-y-5 lg:space-y-6'} max-w-[1600px] w-full mx-auto`}>
            {/* ================= TAB 1: EXECUTIVE DASHBOARD ================= */}
            {activeTab === 'dashboard' && (
              <>
                {/* BRANDED WELCOME BANNER WITH BIDSPRO LOGO */}
                {showWelcomeBanner && (
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden relative">
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#0A2E6E] via-[#D49B1A] to-[#0A2E6E]" />
                    <div className={`${isForcedMobile ? 'p-4' : 'p-4 sm:p-6'} flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4`}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="bg-white p-1.5 rounded-xl border border-slate-100 shrink-0 hidden sm:block">
                          <img
                            src="1000032310.png"
                            alt="BidsPro - Plan • Manage • Win"
                            className="h-16 w-auto object-contain"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A2E6E] text-[#F5C342]">
                              Company ABC • Plan • Manage • Win
                            </span>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-[#071E4A] border border-[#D49B1A]">
                              Demo only LSCasti
                            </span>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0A2E6E] border border-slate-300">
                              Developer LSCastillejo
                            </span>
                          </div>
                          <h2 className={`${isForcedMobile ? 'text-sm' : 'text-base sm:text-xl'} font-extrabold text-[#0A2E6E]`}>
                            Tender, Task Delegation & Collaboration Command Center
                          </h2>
                          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                            Manage Project Alpha through Project Echo for Company ABC across Procuring Entities A–E with automated email alerts, PhilGEPS sync, and Google Sheet reporting.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-end lg:self-center shrink-0">
                        <button
                          onClick={() => setActiveTab('reports')}
                          className="flex-1 sm:flex-initial justify-center px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Google Sheet Report</span>
                        </button>
                        <button
                          onClick={() => setPrintSummaryBid(bids[0])}
                          className="flex-1 sm:flex-initial justify-center px-3.5 py-2 rounded-xl bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#F5C342]" />
                          <span>Cover Sheet</span>
                        </button>
                        <button
                          onClick={() => setShowWelcomeBanner(false)}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* KPI CARDS (2x2 GRID ON CELLULAR PHONE, 4-COLUMN ON DESKTOP/LAPTOP) */}
                <div className={`grid ${isForcedMobile ? 'grid-cols-2 gap-2.5' : 'grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4'}`}>
                  <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                        Active Tenders
                      </span>
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#0A2E6E]/10 text-[#0A2E6E] flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-3xl font-extrabold text-[#0A2E6E]">{kpis.activeCount}</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        {kpis.totalUnits} Units
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">Project Echo LCB #1</p>
                  </div>

                  <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                        Total ABC
                      </span>
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#D49B1A]/15 text-[#B88412] flex items-center justify-center font-extrabold text-sm sm:text-lg shrink-0">
                        ₱
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-3xl font-extrabold text-slate-900">
                        {formatShortPHP(kpis.totalABC)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">
                      Offer: {formatShortPHP(bids.reduce((a, b) => a + b.bidOffer, 0))}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                        Open Tasks
                      </span>
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-sky-50 text-[#0F3D8C] flex items-center justify-center shrink-0">
                        <ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-3xl font-extrabold text-slate-900">
                        {tasks.filter((t) => t.status !== 'Completed').length}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">
                      {emailNotifications.length} team emails sent
                    </p>
                  </div>

                  <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                        Bid Openings
                      </span>
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-amber-50 text-[#D49B1A] flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-3xl font-extrabold text-slate-900">{kpis.urgentDeadlines}</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-amber-900 bg-[#F5C342]/30 px-1.5 py-0.5 rounded-full">
                        10 Days
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">Next: Project Alpha (Dec 1)</p>
                  </div>
                </div>

                {/* MAIN GRID: ACTIVE TENDERS + LIVE BID ROOM & EMAIL DISPATCH FEED */}
                <div className={`grid ${isForcedMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 xl:grid-cols-3 gap-6'}`}>
                  <div className={`${isForcedMobile ? '' : 'xl:col-span-2'} space-y-3.5`}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm sm:text-base font-bold text-[#0A2E6E]">Active Projects & Procuring Entities</h2>
                      <button
                        onClick={() => setActiveTab('pipeline')}
                        className="text-xs font-bold text-[#0A2E6E] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Pipeline</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D49B1A]" />
                      </button>
                    </div>

                    <div className={`grid ${isForcedMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                      {filteredBids.map((bid) => {
                        const manager = getUser(bid.managerId);
                        const stats = getChecklistStats(bid.checklist);
                        const stageObj = STAGES.find((s) => s.id === bid.stage);

                        return (
                          <div
                            key={bid.id}
                            onClick={() => {
                              setSelectedBidId(bid.id);
                              setDrawerTab('checklist');
                            }}
                            className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 hover:border-[#0A2E6E] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span className="text-[11px] font-mono font-bold text-[#0A2E6E] bg-[#0A2E6E]/5 border border-[#0A2E6E]/20 px-2 py-0.5 rounded flex items-center gap-1">
                                  <Hash className="w-3 h-3 text-[#D49B1A]" /> PhilGEPS {bid.philgepsRef}
                                </span>
                                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${stageObj?.badge}`}>
                                  {stageObj?.short}
                                </span>
                              </div>

                              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-[#0A2E6E] transition-colors leading-snug">
                                {bid.title}
                              </h3>
                              <p className="text-xs text-slate-600 font-semibold flex items-center gap-1.5 mt-1">
                                <Building2 className="w-3.5 h-3.5 text-[#0A2E6E] shrink-0" />
                                <span className="truncate">{bid.client}</span>
                              </p>

                              <div className="mt-3 inline-flex items-center gap-2 bg-[#071E4A] text-white text-xs font-semibold px-3 py-1.5 rounded-xl">
                                <Car className="w-3.5 h-3.5 text-[#F5C342]" />
                                <span>{bid.unitQty}x {bid.bydModel}</span>
                              </div>

                              <div className="grid grid-cols-2 gap-2.5 my-3.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                  <p className="text-[10px] sm:text-[11px] text-slate-500">Approved Budget (ABC)</p>
                                  <p className="text-xs sm:text-sm font-extrabold text-slate-900">{formatFullPHP(bid.abcValue)}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] sm:text-[11px] text-slate-500">Bid Opening Cutoff</p>
                                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                                    {bid.stage === 'submitted' ? 'Opened (LCB #1)' : `${bid.deadline} (${bid.daysLeft}d)`}
                                  </p>
                                </div>
                              </div>

                              <div className="mb-3.5">
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                  <span className="font-medium text-slate-600">Envelope Docs Ready</span>
                                  <span className="font-bold text-slate-900">
                                    {stats.completed}/{stats.total} ({stats.percent}%)
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      stats.percent === 100 ? 'bg-emerald-500' : 'bg-[#0A2E6E]'
                                    }`}
                                    style={{ width: `${stats.percent}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full ${manager.color} text-white text-[10px] font-bold flex items-center justify-center`}>
                                  {manager.avatar}
                                </div>
                                <span className="text-xs font-medium text-slate-600">{manager.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPrintSummaryBid(bid);
                                }}
                                className="p-1.5 rounded-lg hover:bg-[#0A2E6E]/10 text-[#0A2E6E] transition-colors cursor-pointer"
                                title="Printable Bid Cover Summary"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Automated Email Notification Feed & Quick Actions */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#0A2E6E]" />
                          <h2 className="text-sm sm:text-base font-bold text-[#0A2E6E]">Automated Email Alerts</h2>
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                          @company.com Sync
                        </span>
                      </div>

                      <div className="space-y-3">
                        {emailNotifications.slice(0, 3).map((eml) => (
                          <div key={eml.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2E6E] bg-[#F5C342]/30 px-2 py-0.5 rounded">
                                Task Alert Sent
                              </span>
                              <span className="text-[10px] text-slate-400">{eml.sentAt}</span>
                            </div>
                            <p className="text-xs font-bold text-slate-900">{eml.subject}</p>
                            <p className="text-[11px] text-slate-600 truncate">
                              <strong>TO:</strong> <span className="text-[#0A2E6E] font-mono">{eml.to}</span>
                            </p>
                            <p className="text-[11px] text-slate-500">
                              <strong>CC:</strong> All Bidding Staff ({INITIAL_TEAM.length - 1} recipients)
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <button
                        onClick={() => setActiveTab('tasks')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ListTodo className="w-4 h-4 text-[#F5C342]" />
                        <span>Open Task Management</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('reports')}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                        <span>View Google Sheet Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ================= TAB 2: TASK MANAGEMENT & DELEGATION CENTER ================= */}
            {activeTab === 'tasks' && (
              <div className="space-y-6">
                {/* Role Permission Banner & Delegate Button */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A2E6E] text-[#F5C342]">
                        {isHeadOfBidding ? 'Head of Bidding Authority' : 'Bidding Personnel View'}
                      </span>
                      <span className="text-xs text-slate-500">
                        Active Email: <strong className="text-slate-800">{currentUser.email}</strong>
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[#0A2E6E]">
                      Task Delegation & Automated Team Email Notifications
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isHeadOfBidding
                        ? 'As Head of Bidding Department, you can delegate tasks to any personnel. Every assignment automatically emails the assigned staff and notifies all bidding team members.'
                        : 'You can view all department tasks, update status on your assigned tasks, and receive automatic @company.com email notifications when tasks are assigned.'}
                    </p>
                  </div>

                  {isHeadOfBidding ? (
                    <button
                      onClick={() => setIsDelegateModalOpen(true)}
                      className="bg-gradient-to-r from-[#D49B1A] to-[#E5B02B] hover:from-[#B88412] hover:to-[#D49B1A] text-[#071E4A] px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-xs self-start lg:self-center cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Delegate New Task</span>
                    </button>
                  ) : (
                    <div className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 self-start lg:self-center">
                      Switch role to <strong>Camille Santos (Head)</strong> to delegate new tasks
                    </div>
                  )}
                </div>

                {/* Latest Email Notification Broadcast Preview */}
                {latestEmailDispatch && (
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                        <Mail className="w-4 h-4" />
                        <span>Automatic Company Email Dispatched to Assignee & All Team Members</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900">{latestEmailDispatch.subject}</h3>
                      <p className="text-xs text-slate-700">
                        <strong>Primary Recipient (TO):</strong> {latestEmailDispatch.toName} ({latestEmailDispatch.to})
                      </p>
                      <p className="text-xs text-slate-600">
                        <strong>Broadcast Copy (CC All Bidding Staff):</strong> {latestEmailDispatch.ccList.join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={() => setLatestEmailDispatch(null)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-emerald-800 hover:bg-emerald-100 self-start lg:self-center cursor-pointer"
                    >
                      Dismiss Notice
                    </button>
                  </div>
                )}

                {/* Task Filter Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'all', label: `All Department Tasks (${tasks.length})` },
                      { id: 'mine', label: `Assigned to Me (${tasks.filter((t) => t.assignedToId === currentUser.id).length})` },
                      { id: 'urgent', label: 'Urgent & High Priority' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setTaskFilter(tab.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          taskFilter === tab.id
                            ? 'bg-[#0A2E6E] text-white'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tasks Grid & Email Dispatch Sidebar */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-3">
                    {filteredTasks.map((task) => {
                      const assignee = getUser(task.assignedToId);
                      const delegator = getUser(task.delegatedById);
                      const linkedBid = bids.find((b) => b.id === task.bidId);
                      const isCompleted = task.status === 'Completed';

                      return (
                        <div
                          key={task.id}
                          className={`bg-white p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 hover:border-[#0A2E6E]'
                          }`}
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-mono font-bold text-[#0A2E6E] bg-[#0A2E6E]/5 px-2 py-0.5 rounded">
                                {task.id}
                              </span>
                              <span
                                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                  task.priority === 'Urgent'
                                    ? 'bg-rose-100 text-rose-700'
                                    : task.priority === 'High'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-sky-100 text-sky-700'
                                }`}
                              >
                                {task.priority}
                              </span>
                              {linkedBid && (
                                <span className="text-[11px] font-semibold text-slate-500">
                                  • {linkedBid.client} ({linkedBid.id})
                                </span>
                              )}
                            </div>

                            <h3 className={`font-bold text-base ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {task.title}
                            </h3>
                            <p className="text-xs text-slate-600">{task.description}</p>

                            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                              <div className="flex items-center gap-1.5">
                                <div className={`w-5 h-5 rounded-full ${assignee.color} text-white text-[9px] font-bold flex items-center justify-center`}>
                                  {assignee.avatar}
                                </div>
                                <span className="font-bold text-slate-800">{assignee.name}</span>
                                <span className="text-slate-400 font-mono text-[11px]">({assignee.email})</span>
                              </div>
                              <span className="text-slate-500">
                                Due: <strong className="text-slate-800">{task.dueDate}</strong>
                              </span>
                              <span className="text-emerald-700 font-medium flex items-center gap-1">
                                <Mail className="w-3 h-3" /> Notified {task.emailNotifiedAt}
                              </span>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleTaskStatus(task.id)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                                task.status === 'Completed'
                                  ? 'bg-emerald-600 text-white'
                                  : task.status === 'In Progress'
                                  ? 'bg-[#0A2E6E] text-white'
                                  : 'bg-amber-100 text-amber-900 border border-[#D49B1A]'
                              }`}
                            >
                              {task.status === 'Completed' ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              ) : (
                                <Clock className="w-3.5 h-3.5" />
                              )}
                              <span>{task.status}</span>
                            </button>
                            <span className="text-[10px] text-slate-400">By {delegator.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Company Email Outbox Log */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#D49B1A]" />
                        <h3 className="text-sm font-bold text-[#0A2E6E]">Company Email Dispatch Log</h3>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">{emailNotifications.length} Sent</span>
                    </div>

                    <div className="space-y-3">
                      {emailNotifications.map((eml) => (
                        <div key={eml.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span className="font-bold text-emerald-700">✓ DELIVERED</span>
                            <span>{eml.sentAt}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-900">{eml.subject}</p>
                          <p className="text-[11px] text-slate-600">
                            <strong>To:</strong> {eml.to}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            <strong>CC:</strong> Entire Bidding Team (@company.com)
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* ================= TAB 3A: COLLABORATION -> IN-HOUSE CHAT ================= */}
          {activeTab === 'collab-chat' && (
            <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden grid ${isForcedMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'} min-h-[520px]`}>
              {/* Left Channels & Direct Members Sidebar */}
              <div className="bg-[#071E4A] text-slate-200 p-3.5 sm:p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#0F3D8C]">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#F5C342] px-1 mb-2">
                      Bidding Department Channels
                    </p>
                    <div className={`${isForcedMobile ? 'flex gap-1.5 overflow-x-auto pb-1' : 'flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0'}`}>
                      {[
                        { id: 'general-bidding', label: '# general-bidding', desc: 'All department announcements' },
                        { id: 'boq-technical', label: '# boq-technical', desc: 'Specs, engineering & site logs' },
                        { id: 'pricing-approvals', label: '# pricing-approvals', desc: 'ABC margins & Head sign-offs' },
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChannel(ch.id)}
                          className={`text-left px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                            activeChannel === ch.id
                              ? 'bg-[#0F3D8C] text-white border border-[#D49B1A]/60'
                              : 'text-slate-300 hover:bg-[#0A2E6E]'
                          }`}
                        >
                          <div className="text-xs font-bold whitespace-nowrap">{ch.label}</div>
                          <div className="text-[10px] text-slate-400 hidden lg:block">{ch.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={isForcedMobile ? 'hidden' : 'hidden lg:block'}>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-2 mb-2">
                      Online Team (@company.com)
                    </p>
                    <div className="space-y-2 px-2">
                      {INITIAL_TEAM.map((m) => (
                        <div key={m.id} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="text-xs text-slate-200 truncate">{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`pt-4 border-t border-[#0F3D8C] text-[11px] text-slate-400 ${isForcedMobile ? 'hidden' : 'hidden lg:block'}`}>
                  In-House Encrypted Bid Room • DEMO ONLY LASCasti
                </div>
              </div>

              {/* Right Active Chat Stream */}
              <div className={`${isForcedMobile ? '' : 'lg:col-span-3'} flex flex-col justify-between bg-slate-50/50`}>
                <div className="p-3.5 sm:p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-[#0A2E6E]">#{activeChannel}</h2>
                    <p className="text-[11px] text-slate-500">Internal collaboration across Bidding, Technical & Legal</p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold bg-[#0A2E6E]/10 text-[#0A2E6E] px-2.5 py-1 rounded-full shrink-0">
                    {INITIAL_TEAM.length} Online
                  </span>
                </div>

                <div className="flex-1 p-3.5 sm:p-5 space-y-3.5 overflow-y-auto max-h-[380px]">
                  {(channels[activeChannel] || []).map((msg) => {
                    const sender = getUser(msg.userId);
                    const isMe = msg.userId === currentUser.id;
                    return (
                      <div key={msg.id} className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${sender.color} text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0`}>
                          {sender.avatar}
                        </div>
                        <div className={`max-w-[82%] sm:max-w-lg rounded-2xl p-3 border ${
                          isMe
                            ? 'bg-[#0A2E6E] text-white border-[#0A2E6E]'
                            : 'bg-white text-slate-800 border-slate-200'
                        }`}>
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <span className={`text-[11px] font-bold ${isMe ? 'text-[#F5C342]' : 'text-[#0A2E6E]'}`}>
                              {sender.name}
                            </span>
                            <span className={`text-[10px] ${isMe ? 'text-slate-300' : 'text-slate-400'}`}>
                              {msg.time}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendChannelMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
                  <input
                    type="text"
                    value={channelInput}
                    onChange={(e) => setChannelInput(e.target.value)}
                    placeholder={`Message #${activeChannel}...`}
                    className="flex-1 px-3.5 py-2 bg-slate-100 focus:bg-white border border-transparent focus:border-[#0A2E6E] rounded-xl text-xs sm:text-sm outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 text-[#F5C342]" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================= TAB 3B: COLLABORATION -> WORK FLOW ================= */}
          {activeTab === 'collab-workflow' && (
            <div className="space-y-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0A2E6E]">Standard Bidding Approval & Handoff Work Flow</h2>
                    <p className="text-xs text-slate-500">
                      End-to-end departmental handoff sequence from PhilGEPS/RFQ Notice Intake to Head of Bidding Sign-Off & Submission.
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-[#D49B1A]/20 text-[#0A2E6E] px-3 py-1.5 rounded-xl border border-[#D49B1A]">
                    5-Gate Governance Model
                  </span>
                </div>

                {/* Visual Horizontal Step-by-Step Workflow Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {STAGES.map((st, idx) => {
                    const count = bids.filter((b) => b.stage === st.id).length;
                    const stageOwners = [
                      'Head of Bidding (Camille)',
                      'Technical & Liaison (Jerome / Trisha)',
                      'Pricing Analyst (Rafael)',
                      'Head of Bidding & Legal (Camille / Atty. Miguel)',
                      'BAC Liaison Officer (Trisha)'
                    ];
                    return (
                      <div key={st.id} className="relative bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-full bg-[#0A2E6E] text-[#F5C342] text-xs font-extrabold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-[10px] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                              SLA: {st.sla}
                            </span>
                          </div>
                          <h3 className="text-sm font-extrabold text-[#0A2E6E] mb-1">{st.short}</h3>
                          <p className="text-[11px] text-slate-500 mb-3">{stageOwners[idx]}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">{count} Active Bids</span>
                          <button
                            onClick={() => {
                              setStageFilter(st.id);
                              setActiveTab('pipeline');
                            }}
                            className="text-[11px] font-bold text-[#0A2E6E] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            View <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Tenders Mapped to Workflow Gates */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#0A2E6E]">Live Tender Gate Progression</h3>
                <div className="space-y-3">
                  {bids.map((bid) => {
                    const currentIdx = STAGES.findIndex((s) => s.id === bid.stage);
                    return (
                      <div key={bid.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-mono font-bold text-[#0A2E6E]">{bid.id}</span>
                            <h4 className="text-sm font-bold text-slate-900">{bid.client} — {bid.title}</h4>
                          </div>
                          <span className="text-xs font-extrabold text-[#0A2E6E] bg-white border border-slate-200 px-3 py-1 rounded-lg">
                            Gate {currentIdx + 1} of 5: {STAGES[currentIdx]?.short}
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {STAGES.map((s, sIdx) => (
                            <div
                              key={s.id}
                              onClick={() => handleStageChange(bid.id, s.id)}
                              className={`h-2.5 rounded-full cursor-pointer transition-all ${
                                sIdx <= currentIdx ? 'bg-gradient-to-r from-[#0A2E6E] to-[#D49B1A]' : 'bg-slate-200'
                              }`}
                              title={`Click to move to ${s.title}`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3C: COLLABORATION -> CALENDAR ================= */}
          {activeTab === 'collab-calendar' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Monthly Visual Calendar Grid (November / December 2026) */}
              <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0A2E6E]">Master Bidding & Task Calendar — Dec 2026</h2>
                    <p className="text-xs text-slate-500">Synchronized Bid Submission Deadlines, Pre-Bid Conferences & Delegated Task Due Dates</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="px-2.5 py-1 rounded bg-[#0A2E6E] text-white">Bid Opening</span>
                    <span className="px-2.5 py-1 rounded bg-[#D49B1A] text-[#071E4A]">Task Due</span>
                    <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-800">Pre-Bid</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-slate-400 pb-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {/* Dec 2026 starts on Tuesday (2 blank cells for Sun, Mon) */}
                  <div className="h-24 rounded-xl bg-slate-50/50 border border-slate-100 p-1.5 text-[11px] text-slate-300">Nov 29</div>
                  <div className="h-24 rounded-xl bg-slate-50/50 border border-slate-100 p-1.5 text-[11px] text-slate-300">Nov 30</div>
                  {Array.from({ length: 28 }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const dateStr = `2026-12-${String(dayNum).padStart(2, '0')}`;
                    const dayEvents = calendarEvents.filter((ev) => ev.date === dateStr);

                    return (
                      <div
                        key={dateStr}
                        className={`h-24 rounded-xl border p-1.5 flex flex-col justify-between overflow-hidden transition-all ${
                          dayEvents.length > 0
                            ? 'bg-[#0A2E6E]/[0.02] border-[#0A2E6E]/40'
                            : 'bg-white border-slate-200/80'
                        }`}
                      >
                        <span className={`text-xs font-bold ${dayEvents.length > 0 ? 'text-[#0A2E6E]' : 'text-slate-600'}`}>
                          {dayNum}
                        </span>
                        <div className="space-y-1 overflow-y-auto">
                          {dayEvents.map((ev) => (
                            <button
                              key={ev.id}
                              onClick={() => setSelectedCalendarEvent(ev)}
                              className={`w-full text-left text-[9px] font-bold px-1.5 py-0.5 rounded truncate block cursor-pointer ${ev.badgeColor}`}
                              title={ev.title}
                            >
                              {ev.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Chronological Agenda */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#0A2E6E] border-b border-slate-100 pb-3">
                  Upcoming Chronological Schedule
                </h3>
                <div className="space-y-3 max-h-[520px] overflow-y-auto">
                  {calendarEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => {
                        if (ev.bidId) setSelectedBidId(ev.bidId);
                      }}
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-[#0A2E6E]/[0.04] border border-slate-200/80 cursor-pointer transition-all space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${ev.badgeColor}`}>
                          {ev.type}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700">{ev.date}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{ev.title}</p>
                      <p className="text-[11px] text-slate-500">{ev.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: REPORTS MENU (AUTOMATED GOOGLE SHEET FORMAT) ================= */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              {/* Google Sheets Authentic Top Header & Export Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                {/* Google Sheets Green Title Bar */}
                <div className="px-4 py-3 bg-[#107C41] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm sm:text-base font-bold tracking-tight">
                          BidsPro_Master_Bidding_Activity_Status_2026.gsheet
                        </h2>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-[#107C41]">
                          Auto-Synced Live
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-100">
                        Automatically summarizes all Bidding Pipeline stages, financial totals, readiness %, and assigned leads
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyGoogleSheetTable}
                      className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copiedSheetLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSheetLink ? 'Copied for Sheets!' : 'Copy for Google Sheets'}</span>
                    </button>
                    <button
                      onClick={handleExportGoogleSheetsCSV}
                      className="px-3.5 py-1.5 rounded-lg bg-white text-[#107C41] hover:bg-emerald-50 text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .CSV (Google Sheets)</span>
                    </button>
                  </div>
                </div>

                {/* Google Sheets Formula Bar (fx) & Stage Filter */}
                <div className="px-4 py-2 bg-slate-100 border-b border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-mono font-bold bg-white border border-slate-300 px-2.5 py-1 rounded text-slate-700">
                      {selectedSheetCell}
                    </span>
                    <span className="font-serif italic font-bold text-slate-500 px-1">fx</span>
                    <div className="flex-1 bg-white border border-slate-300 px-3 py-1 rounded font-mono text-[11px] text-slate-700 truncate">
                      =QUERY(BIDS_PIPELINE!A2:L{sheetRows.length + 1}, "SELECT * WHERE STATUS IS ACTIVE", 1)
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={sheetFilterStage}
                      onChange={(e) => setSheetFilterStage(e.target.value)}
                      className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none"
                    >
                      <option value="all">Filter Sheet: All Stages ({bids.length})</option>
                      {STAGES.map((st) => (
                        <option key={st.id} value={st.id}>
                          Stage: {st.short}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live Formula Summary Strip (Row 1 KPIs) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-300 bg-emerald-50/50 text-xs">
                  <div className="p-3 border-r border-slate-300">
                    <span className="text-[10px] font-mono text-slate-500 block">=COUNTA(A2:A{sheetRows.length + 1})</span>
                    <span className="font-extrabold text-slate-900">Total Tenders Listed: {sheetRows.length}</span>
                  </div>
                  <div className="p-3 border-r border-slate-300">
                    <span className="text-[10px] font-mono text-slate-500 block">=SUM(F2:F{sheetRows.length + 1})</span>
                    <span className="font-extrabold text-[#0A2E6E]">
                      Total ABC: {formatFullPHP(sheetRows.reduce((s, r) => s + r.abcValue, 0))}
                    </span>
                  </div>
                  <div className="p-3 border-r border-slate-300">
                    <span className="text-[10px] font-mono text-slate-500 block">=SUM(G2:G{sheetRows.length + 1})</span>
                    <span className="font-extrabold text-emerald-700">
                      Total Bid Offer: {formatFullPHP(sheetRows.reduce((s, r) => s + r.bidOffer, 0))}
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-mono text-slate-500 block">=AVERAGE(I2:I{sheetRows.length + 1})</span>
                    <span className="font-extrabold text-slate-900">
                      Avg Readiness:{' '}
                      {sheetRows.length === 0
                        ? '0%'
                        : `${Math.round(sheetRows.reduce((s, r) => s + r.readinessPercent, 0) / sheetRows.length)}%`}
                    </span>
                  </div>
                </div>

                {/* Spreadsheet Grid Table (Columns A - L) */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                        <th className="py-2 px-2.5 border-r border-slate-300 w-10 text-center bg-slate-200/70">#</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">A • Bid ID</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">B • PhilGEPS #</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">C • Procuring Entity</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">D • Project Title</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">E • Package & Qty</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap text-right">F • ABC (PHP)</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap text-right">G • Bid Offer</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">H • Stage</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap text-center">I • Ready %</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">J • Lead</th>
                        <th className="py-2 px-3 border-r border-slate-300 whitespace-nowrap">K • Activity Status</th>
                        <th className="py-2 px-3 whitespace-nowrap">L • Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {sheetRows.map((row, idx) => {
                        const rowNum = idx + 2;
                        return (
                          <tr key={row.bidId} className="hover:bg-emerald-50/40">
                            <td className="py-2 px-2.5 border-r border-slate-300 text-center font-mono text-slate-500 bg-slate-50">
                              {rowNum}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`A${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-mono font-bold text-[#0A2E6E] whitespace-nowrap cursor-pointer"
                            >
                              {row.bidId}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`B${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-mono whitespace-nowrap cursor-pointer"
                            >
                              {row.philgepsRef}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`C${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900 whitespace-nowrap cursor-pointer"
                            >
                              {row.client}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`D${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-bold text-slate-800 whitespace-nowrap cursor-pointer"
                            >
                              {row.projectTitle}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`E${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 text-slate-700 whitespace-nowrap cursor-pointer"
                            >
                              {row.fleetSpec}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`F${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-mono font-bold text-right whitespace-nowrap cursor-pointer"
                            >
                              {formatFullPHP(row.abcValue)}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`G${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-mono font-bold text-emerald-700 text-right whitespace-nowrap cursor-pointer"
                            >
                              {formatFullPHP(row.bidOffer)}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`H${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-semibold whitespace-nowrap cursor-pointer"
                            >
                              {row.stageShort}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`I${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 font-mono font-bold text-center whitespace-nowrap cursor-pointer"
                            >
                              {row.readinessPercent}%
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`J${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 text-slate-700 whitespace-nowrap cursor-pointer"
                            >
                              {row.leadName}
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`K${rowNum}`)}
                              className="py-2 px-3 border-r border-slate-200 whitespace-nowrap cursor-pointer"
                            >
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                  row.activityStatus.includes('SUBMITTED')
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : row.activityStatus.includes('READY')
                                    ? 'bg-sky-100 text-sky-800'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {row.activityStatus}
                              </span>
                            </td>
                            <td
                              onClick={() => setSelectedSheetCell(`L${rowNum}`)}
                              className="py-2 px-3 text-slate-600 max-w-xs truncate cursor-pointer"
                            >
                              {row.remarks}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Google Sheets Tab Strip */}
                <div className="px-4 py-2 bg-slate-100 border-t border-slate-300 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <span className="px-3 py-1 bg-white border border-slate-300 rounded font-bold text-[#107C41] shadow-2xs">
                      ✓ Bidding_Activity_Summary
                    </span>
                    <span className="px-3 py-1 text-slate-500">Task_Delegation_Log</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Ready for Google Sheets import via .CSV or Copy/Paste
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 5: PIPELINE (DUAL CELLULAR PHONE SINGLE-STAGE VIEW & DESKTOP KANBAN/LIST) ================= */}
          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                  <button
                    onClick={() => setPipelineView('kanban')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      pipelineView === 'kanban'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" /> {isForcedMobile ? 'Stage Board' : 'Pipeline Board'}
                  </button>
                  <button
                    onClick={() => setPipelineView('list')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      pipelineView === 'list'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" /> All Bids Table
                  </button>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <span>
                    ABC: <strong className="text-[#0A2E6E]">{formatShortPHP(kpis.totalABC)}</strong>
                  </span>
                  <button
                    onClick={() => setIsNewBidOpen(true)}
                    className="bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F5C342]" /> Add Bid
                  </button>
                </div>
              </div>

              {pipelineView === 'kanban' ? (
                <>
                  {/* CELLULAR PHONE STAGE SELECTOR PILLS (TOUCH-FRIENDLY SINGLE-STAGE VIEW) */}
                  <div className={`${isForcedMobile ? 'block' : 'block lg:hidden'} space-y-3`}>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {STAGES.map((st, i) => {
                        const count = filteredBids.filter((b) => b.stage === st.id).length;
                        const active = mobileStageId === st.id;
                        return (
                          <button
                            key={st.id}
                            onClick={() => setMobileStageId(st.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                              active
                                ? 'bg-[#0A2E6E] text-white border border-[#D49B1A]'
                                : 'bg-white text-slate-600 border border-slate-200'
                            }`}
                          >
                            <span>{i + 1}. {st.short}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-[#D49B1A] text-[#071E4A]' : 'bg-slate-100 text-slate-700'}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {(() => {
                      const activeStageObj = STAGES.find((s) => s.id === mobileStageId) || STAGES[0];
                      const stageBids = filteredBids.filter((b) => b.stage === activeStageObj.id);
                      return (
                        <div className="bg-slate-100/90 rounded-2xl border border-slate-200 p-3 space-y-3">
                          <div className={`border-t-4 ${activeStageObj.color} bg-white rounded-xl p-3 shadow-xs flex items-center justify-between`}>
                            <div>
                              <h3 className="font-bold text-xs text-slate-900">{activeStageObj.title}</h3>
                              <p className="text-[11px] text-slate-500">
                                Stage Total: {formatFullPHP(stageBids.reduce((a, b) => a + b.abcValue, 0))}
                              </p>
                            </div>
                            <span className="text-xs font-extrabold bg-[#0A2E6E]/10 text-[#0A2E6E] px-2.5 py-1 rounded-full">
                              {stageBids.length} Bids
                            </span>
                          </div>

                          {stageBids.length === 0 ? (
                            <div className="text-center py-8 px-4 bg-white border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                              No projects in {activeStageObj.short}
                            </div>
                          ) : (
                            stageBids.map((bid) => {
                              const manager = getUser(bid.managerId);
                              const stats = getChecklistStats(bid.checklist);
                              return (
                                <div
                                  key={bid.id}
                                  onClick={() => {
                                    setSelectedBidId(bid.id);
                                    setDrawerTab('checklist');
                                  }}
                                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2.5"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono font-bold text-[#0A2E6E] bg-[#0A2E6E]/5 px-2 py-0.5 rounded">
                                      PhilGEPS #{bid.philgepsRef}
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-[#D49B1A]/40">
                                      {bid.stage === 'submitted' ? 'LCB #1' : `${bid.daysLeft}d left`}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-extrabold text-base text-slate-900">{bid.title}</h4>
                                    <p className="text-xs font-semibold text-slate-600">{bid.client}</p>
                                  </div>
                                  <div className="flex items-center justify-between text-xs font-extrabold bg-slate-50 px-3 py-2 rounded-lg">
                                    <span>ABC: {formatShortPHP(bid.abcValue)}</span>
                                    <span className="text-emerald-600">Offer: {formatShortPHP(bid.bidOffer)}</span>
                                  </div>
                                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center gap-1.5">
                                      <div className={`w-6 h-6 rounded-full ${manager.color} text-white text-[10px] font-bold flex items-center justify-center`}>
                                        {manager.avatar}
                                      </div>
                                      <span className="text-xs text-slate-600 font-medium">{stats.percent}% Ready</span>
                                    </div>
                                    <select
                                      value={bid.stage}
                                      onChange={(e) => {
                                        handleStageChange(bid.id, e.target.value);
                                        setMobileStageId(e.target.value);
                                      }}
                                      className="text-xs font-bold bg-[#0A2E6E] text-white rounded-lg px-2.5 py-1.5 outline-none"
                                    >
                                      {STAGES.map((s) => (
                                        <option key={s.id} value={s.id}>
                                          Move: {s.short}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* DESKTOP / LAPTOP 5-COLUMN KANBAN PIPELINE */}
                  <div className={`${isForcedMobile ? 'hidden' : 'hidden lg:flex'} gap-4 overflow-x-auto pb-4 items-start`}>
                    {STAGES.map((stage) => {
                      const stageBids = filteredBids.filter((b) => b.stage === stage.id);
                      const stageTotal = stageBids.reduce((acc, b) => acc + b.abcValue, 0);

                      return (
                        <div
                          key={stage.id}
                          className="w-80 shrink-0 bg-slate-100/90 rounded-2xl border border-slate-200/90 p-3 flex flex-col gap-3"
                        >
                          <div className={`border-t-4 ${stage.color} bg-white rounded-xl p-3 shadow-xs`}>
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-xs text-slate-900">{stage.title}</h3>
                              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                                {stageBids.length}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-500">{formatFullPHP(stageTotal)}</p>
                          </div>

                          <div className="space-y-3">
                            {stageBids.length === 0 ? (
                              <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                                No tenders in this stage
                              </div>
                            ) : (
                              stageBids.map((bid) => {
                                const manager = getUser(bid.managerId);
                                const stats = getChecklistStats(bid.checklist);

                                return (
                                  <div
                                    key={bid.id}
                                    onClick={() => {
                                      setSelectedBidId(bid.id);
                                      setDrawerTab('checklist');
                                    }}
                                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#0A2E6E] hover:shadow-md transition-all cursor-pointer group"
                                  >
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                      <span className="text-[10px] font-mono font-bold text-[#0A2E6E] bg-[#0A2E6E]/5 px-1.5 py-0.5 rounded">
                                        PhilGEPS #{bid.philgepsRef}
                                      </span>
                                      {bid.stage !== 'submitted' && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-[#D49B1A]/40">
                                          {bid.daysLeft}d left
                                        </span>
                                      )}
                                    </div>

                                    <h4 className="font-extrabold text-base text-slate-900 group-hover:text-[#0A2E6E] transition-colors mb-0.5">
                                      {bid.title}
                                    </h4>
                                    <p className="text-xs font-semibold text-slate-600 mb-2.5">{bid.client}</p>

                                    <div className="flex items-center justify-between text-xs font-extrabold text-slate-900 mb-3 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                                      <span>ABC: {formatShortPHP(bid.abcValue)}</span>
                                      <span className="text-emerald-600 font-semibold">Offer: {formatShortPHP(bid.bidOffer)}</span>
                                    </div>

                                    <div className="mb-3">
                                      <div className="flex justify-between text-[11px] mb-1">
                                        <span className="text-slate-500">Envelopes Ready</span>
                                        <span className="font-semibold text-slate-700">
                                          {stats.completed}/{stats.total}
                                        </span>
                                      </div>
                                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full rounded-full ${
                                            stats.percent === 100 ? 'bg-emerald-500' : 'bg-[#0A2E6E]'
                                          }`}
                                          style={{ width: `${stats.percent}%` }}
                                        />
                                      </div>
                                    </div>

                                    <div
                                      className="pt-2.5 border-t border-slate-100 flex items-center justify-between"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className={`w-6 h-6 rounded-full ${manager.color} text-white text-[10px] font-bold flex items-center justify-center`}>
                                        {manager.avatar}
                                      </div>

                                      <select
                                        value={bid.stage}
                                        onChange={(e) => handleStageChange(bid.id, e.target.value)}
                                        className="text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-2 py-1 outline-none cursor-pointer"
                                      >
                                        {STAGES.map((s) => (
                                          <option key={s.id} value={s.id}>
                                            Move: {s.short}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3.5 px-4 whitespace-nowrap">PhilGEPS # & Project</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Procuring Entity</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">ABC Amount</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Stage</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Bid Opening</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredBids.map((bid) => {
                        const stageObj = STAGES.find((s) => s.id === bid.stage);
                        return (
                          <tr
                            key={bid.id}
                            onClick={() => setSelectedBidId(bid.id)}
                            className="hover:bg-[#0A2E6E]/[0.03] cursor-pointer transition-colors"
                          >
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-mono text-[11px] font-bold text-[#0A2E6E]">
                                PhilGEPS #{bid.philgepsRef} • {bid.id}
                              </div>
                              <div className="font-bold text-slate-900">{bid.title}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-semibold whitespace-nowrap">{bid.client}</td>
                            <td className="py-3.5 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                              {formatFullPHP(bid.abcValue)}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stageObj?.badge}`}>
                                {stageObj?.short}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 whitespace-nowrap">
                              {bid.bidOpeningTime}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 6: PHILGEPS MERCHANT SYNC & LIVE OPPORTUNITIES ================= */}
          {activeTab === 'philgeps' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {philgepsAccount.autoSyncEnabled ? 'Live Sync Active' : 'Paused'}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0A2E6E]">
                      Merchant ID: {philgepsAccount.merchantId}
                    </span>
                    <span className="text-xs text-slate-400">• {philgepsAccount.lastSyncedAt}</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-[#0A2E6E]">
                    {philgepsAccount.organizationName} — PhilGEPS Opportunity Feed
                  </h2>
                  <p className="text-xs text-slate-600">
                    {philgepsAccount.membershipTier} • Alert Inbox: <strong>{philgepsAccount.syncEmail}</strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      setPhilgepsAccount((prev) => ({
                        ...prev,
                        autoSyncEnabled: !prev.autoSyncEnabled,
                        lastSyncedAt: !prev.autoSyncEnabled ? 'Just now (Resumed)' : 'Paused manually'
                      }))
                    }
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5 text-[#0A2E6E]" />
                    <span>{philgepsAccount.autoSyncEnabled ? 'Pause Sync' : 'Resume Sync'}</span>
                  </button>
                  <button
                    onClick={handleSimulatePhilgepsOpportunity}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D49B1A] to-[#E5B02B] hover:from-[#B88412] hover:to-[#D49B1A] text-[#071E4A] text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Simulate New PhilGEPS Posting</span>
                  </button>
                </div>
              </div>

              {/* Watched Categories Filter */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#D49B1A]" />
                    <span>Watched Business & UNSPSC Categories</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">Click category to toggle alert filter</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {philgepsAccount.categories.map((cat) => {
                    const active = philgepsAccount.activeCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => handleTogglePhilgepsCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#0A2E6E] text-white border-[#0A2E6E]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Matched Opportunities Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {philgepsOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-[#0A2E6E] bg-[#0A2E6E]/5 border border-[#0A2E6E]/20 px-2 py-0.5 rounded">
                          Ref #{opp.philgepsRef}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {opp.isUnread && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              NEW
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400">{opp.postedAt}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900">{opp.title}</h3>
                      <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#0A2E6E] shrink-0" />
                        <span>{opp.procuringEntity} • {opp.region}</span>
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Approved Budget (ABC):</span>
                          <span className="font-extrabold text-slate-900">{formatFullPHP(opp.abcValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Suggested Package:</span>
                          <span className="font-bold text-[#0A2E6E]">{opp.unitQty}x {opp.suggestedModel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Closing Date:</span>
                          <span className="font-bold text-rose-700">{opp.closingDate}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleImportPhilgepsToPipeline(opp)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        opp.imported
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white'
                      }`}
                    >
                      <span>{opp.imported ? '✓ Imported to Pipeline — Open' : 'Import to Bid Pipeline (Go/No-Go)'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F5C342]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 7: SECURE DOCUMENT VAULT & AUDIT TRAIL ================= */}
          {activeTab === 'docs' && (
            <div className="space-y-6">
              {/* Vault Header & Security Status */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#071E4A] text-[#F5C342] flex items-center gap-1">
                      <Lock className="w-3 h-3" /> 2FA PIN + RBAC Protected
                    </span>
                    <span className="text-xs text-slate-500">
                      Unlocked in Session: <strong>{unlockedDocIds.length}</strong> / {biddingDocs.length}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-[#0A2E6E]">
                    Corporate Bidding & Compliance Document Vault
                  </h2>
                  <p className="text-xs text-slate-500">
                    Protected files require 6-digit Security PIN verification (Demo PIN: <strong>202688</strong>) and role-based clearance.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                    <button
                      onClick={() => setVaultSubTab('documents')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        vaultSubTab === 'documents' ? 'bg-white text-[#0A2E6E] shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Documents ({biddingDocs.length})
                    </button>
                    <button
                      onClick={() => setVaultSubTab('audit')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                        vaultSubTab === 'audit' ? 'bg-white text-[#0A2E6E] shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>Audit Trail ({securityAuditLogs.length})</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setIsAddDocModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D49B1A] to-[#E5B02B] text-[#071E4A] text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Document Slot</span>
                  </button>
                </div>
              </div>

              {/* Vault Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Verified Docs</p>
                  <p className="text-2xl font-extrabold text-emerald-700 mt-1">{docStats.verified}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Uploaded</p>
                  <p className="text-2xl font-extrabold text-[#0A2E6E] mt-1">{docStats.uploaded}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Expiring Soon</p>
                  <p className="text-2xl font-extrabold text-amber-700 mt-1">{docStats.expiring}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Missing Slots</p>
                  <p className="text-2xl font-extrabold text-rose-700 mt-1">{docStats.missing}</p>
                </div>
              </div>

              {vaultSubTab === 'documents' ? (
                <div className="space-y-4">
                  {/* Envelope Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      'all',
                      "Class 'A' Legal & Eligibility",
                      'Technical Envelope (1st Envelope)',
                      'Financial Envelope (2nd Envelope)'
                    ].map((env) => (
                      <button
                        key={env}
                        onClick={() => setDocEnvelopeFilter(env)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          docEnvelopeFilter === env
                            ? 'bg-[#0A2E6E] text-white'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {env === 'all' ? 'All Envelopes' : env}
                      </button>
                    ))}
                  </div>

                  {/* Protected Document Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredDocs.map((doc) => {
                      const isUnlocked = unlockedDocIds.includes(doc.id);
                      const allowed = hasDocumentClearance(doc);
                      const isRestricted = doc.classification === 'Restricted - Financial/Pricing';

                      return (
                        <div
                          key={doc.id}
                          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4"
                        >
                          <div className="space-y-2.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-[#0A2E6E] bg-[#0A2E6E]/5 px-2.5 py-0.5 rounded-full">
                                {doc.envelope}
                              </span>
                              <span
                                className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                                  isRestricted
                                    ? 'bg-rose-100 text-rose-800'
                                    : doc.classification === 'Confidential - Legal/Eligibility'
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'bg-sky-100 text-sky-800'
                                }`}
                              >
                                <Lock className="w-2.5 h-2.5" />
                                {doc.classification}
                              </span>
                            </div>

                            <h3 className="text-base font-extrabold text-slate-900">{doc.name}</h3>
                            <p className="text-xs text-slate-600">{doc.description}</p>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <p className="font-mono font-bold text-slate-800">
                                  {doc.fileName || 'No file uploaded yet'}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {doc.fileSize ? `${doc.fileSize} • ` : ''}
                                  Valid / Expiry: <strong>{doc.expiryDate}</strong>
                                </p>
                              </div>
                              <span
                                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                                  doc.status === 'Verified'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : doc.status === 'Expiring Soon'
                                    ? 'bg-amber-100 text-amber-900'
                                    : doc.status === 'Uploaded'
                                    ? 'bg-sky-100 text-sky-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {doc.status}
                              </span>
                            </div>

                            {/* Head of Bidding Temporary Clearance Grant Controls for Restricted Docs */}
                            {isHeadOfBidding && isRestricted && clearanceRequestedDocIds.includes(doc.id) && (
                              <div className="p-3 rounded-xl bg-amber-50 border border-[#D49B1A] space-y-2">
                                <p className="text-[11px] font-extrabold text-[#071E4A]">
                                  Temporary Access Requested by Personnel:
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {INITIAL_TEAM.filter((u) => u.systemRole !== 'head').map((staff) => {
                                    const granted = (doc.tempApprovedUserIds || []).includes(staff.id);
                                    return (
                                      <button
                                        key={staff.id}
                                        onClick={() => handleGrantTempClearance(doc.id, staff.id)}
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                                          granted
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-white border border-slate-300 text-slate-800 hover:bg-amber-100'
                                        }`}
                                      >
                                        {granted ? '✓ ' : '+ '}
                                        {staff.name}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              {doc.fileName && (
                                <>
                                  <button
                                    onClick={() => requestSecuredDocumentAction('view', doc)}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0A2E6E]/10 text-[#0A2E6E] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                                  >
                                    {isUnlocked && allowed ? (
                                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Lock className="w-3.5 h-3.5 text-[#D49B1A]" />
                                    )}
                                    <span>{isUnlocked && allowed ? 'Preview' : 'Unlock & View'}</span>
                                  </button>

                                  <button
                                    onClick={() => requestSecuredDocumentAction('download', doc)}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download</span>
                                  </button>
                                </>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              {isHeadOfBidding && doc.fileName && (
                                <button
                                  onClick={() => handleVerifyDoc(doc.id)}
                                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold cursor-pointer"
                                >
                                  {doc.status === 'Verified' ? 'Unverify' : 'Verify'}
                                </button>
                              )}
                              <button
                                onClick={() => requestSecuredDocumentAction('upload', doc)}
                                className="px-3 py-1.5 rounded-xl bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5 text-[#F5C342]" />
                                <span>{doc.fileName ? 'Replace File' : 'Upload File'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Immutable Security Access Audit Trail Table */
                <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-4 whitespace-nowrap">Timestamp</th>
                        <th className="py-3 px-4 whitespace-nowrap">User & Email</th>
                        <th className="py-3 px-4 whitespace-nowrap">Protected Document</th>
                        <th className="py-3 px-4 whitespace-nowrap">Action</th>
                        <th className="py-3 px-4 whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {securityAuditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-bold text-slate-900">{log.userName}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{log.userEmail}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <div className="font-semibold text-slate-800 truncate">{log.docName}</div>
                            <div className="text-[10px] text-slate-500">{log.classification}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#0A2E6E] whitespace-nowrap">
                            {log.action}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                                log.status === 'GRANTED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : log.status.startsWith('DENIED')
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          </main>

          {/* SHARED WORKSPACE FOOTER (DESKTOP & MOBILE) */}
          <footer className="mt-auto px-4 sm:px-8 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#0A2E6E]">Company ABC</span>
              <span>•</span>
              <span className="font-bold text-[#0A2E6E]">Developer LSCastillejo</span>
            </div>
            <span className="font-extrabold text-amber-900 bg-amber-100 border border-[#D49B1A] px-2.5 py-0.5 rounded-full">
              Demo only LSCasti
            </span>
          </footer>
        </div>

        {/* ================= CELLULAR PHONE BOTTOM NAVIGATION BAR ================= */}
        <nav
          className={`${
            isForcedMobile ? 'flex' : 'flex lg:hidden'
          } ${
            isForcedMobile ? 'absolute bottom-0 left-0 right-0' : 'fixed bottom-0 left-0 right-0'
          } z-30 bg-[#071E4A] text-slate-300 border-t-2 border-[#D49B1A] px-1.5 py-1.5 items-center justify-around shadow-2xl`}
        >
          {[
            { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
            { id: 'pipeline', label: 'Pipeline', icon: Kanban },
            { id: 'tasks', label: 'Tasks', icon: ListTodo, badge: tasks.filter((t) => t.status !== 'Completed').length },
            { id: 'philgeps', label: 'PhilGEPS', icon: Radio, badge: unreadPhilgepsCount },
          ].map((navItem) => {
            const Icon = navItem.icon;
            const isActive = activeTab === navItem.id;
            return (
              <button
                key={navItem.id}
                onClick={() => {
                  setActiveTab(navItem.id);
                  setIsMobileMoreOpen(false);
                }}
                className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'text-[#F5C342] bg-[#0F3D8C]' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] font-bold">{navItem.label}</span>
                {navItem.badge > 0 && (
                  <span className="absolute top-0.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 text-[#071E4A] text-[9px] font-extrabold flex items-center justify-center">
                    {navItem.badge}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isMobileMoreOpen || ['collab-chat', 'collab-workflow', 'collab-calendar', 'reports', 'docs'].includes(activeTab)
                ? 'text-[#F5C342] bg-[#0F3D8C]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MoreHorizontal className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">More</span>
          </button>
        </nav>

        {/* ================= CELLULAR PHONE "MORE" DRAWER SHEET ================= */}
        {isMobileMoreOpen && (
          <div
            className={`${
              isForcedMobile ? 'absolute inset-0' : 'fixed inset-0 lg:hidden'
            } z-40 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end`}
            onClick={() => setIsMobileMoreOpen(false)}
          >
            <div
              className="bg-white rounded-t-3xl border-t-2 border-[#D49B1A] p-5 pb-20 space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E6E] text-[#F5C342] text-xs font-extrabold flex items-center justify-center">
                    {currentUser.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMoreOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Collaboration Suite
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'collab-chat', label: 'In-House Chat', icon: MessageSquare },
                    { id: 'collab-workflow', label: 'Work Flow', icon: GitBranch },
                    { id: 'collab-calendar', label: 'Calendar', icon: CalendarIcon },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMoreOpen(false);
                        }}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer ${
                          activeTab === item.id
                            ? 'bg-[#0A2E6E] text-white border-[#0A2E6E]'
                            : 'bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#D49B1A]" />
                        <span className="text-[11px] font-bold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Reports, Security & Account
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveTab('reports');
                      setIsMobileMoreOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-extrabold flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                      Reports (Google Sheet Format)
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('docs');
                      setIsMobileMoreOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0A2E6E] text-xs font-extrabold flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D49B1A]" />
                      Secure Document Vault (2FA PIN)
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMoreOpen(false);
                      setIsAuthenticated(false);
                    }}
                    className="w-full p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out / Switch Company Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* ================= DELEGATE TASK MODAL (HEAD OF BIDDING DEPARTMENT) ================= */}
      {isDelegateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-[#071E4A] text-white flex items-center justify-between border-b-2 border-[#D49B1A]">
              <div>
                <h2 className="text-base font-bold">Delegate Bidding Task</h2>
                <p className="text-xs text-[#F5C342]">Automatically emails Assignee & CCs all Bidding Personnel</p>
              </div>
              <button
                onClick={() => setIsDelegateModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDelegateTask} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  placeholder="e.g., Prepare Technical Compliance Matrix & Brochures"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:border-[#0A2E6E] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assign To Personnel *</label>
                  <select
                    value={newTaskForm.assignedToId}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, assignedToId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold bg-white outline-none"
                  >
                    {INITIAL_TEAM.filter((m) => m.systemRole !== 'head').map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} ({member.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Linked Tender / Bid</label>
                  <select
                    value={newTaskForm.bidId}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, bidId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold bg-white outline-none"
                  >
                    {bids.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} — {b.client}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority Level</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white outline-none"
                  >
                    <option>Urgent</option>
                    <option>High</option>
                    <option>Medium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={newTaskForm.dueDate}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instructions & Deliverables</label>
                <textarea
                  rows={2}
                  value={newTaskForm.description}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
                  placeholder="Specify exact documents, pricing sheets, or compliance items required..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-[#D49B1A]/50 text-xs text-slate-700 flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#0A2E6E] shrink-0 mt-0.5" />
                <span>
                  Clicking <strong>Assign & Send Email</strong> will notify <strong>{getUser(newTaskForm.assignedToId).email}</strong> and CC all bidding team members.
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDelegateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#D49B1A] hover:bg-[#B88412] text-[#071E4A] shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Assign & Send Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SLIDE-OVER TENDER WORKSPACE DRAWER ================= */}
      {selectedBid && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-slate-900/50 backdrop-blur-xs"
          onClick={() => setSelectedBidId(null)}
        >
          <div
            className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 bg-[#071E4A] text-white shrink-0 border-b-2 border-[#D49B1A]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-[#0F3D8C] border border-[#D49B1A]/50 px-2.5 py-1 rounded text-[#F5C342]">
                    PhilGEPS #{selectedBid.philgepsRef}
                  </span>
                  <select
                    value={selectedBid.stage}
                    onChange={(e) => handleStageChange(selectedBid.id, e.target.value)}
                    className="bg-[#D49B1A] text-[#071E4A] text-xs font-extrabold px-3 py-1 rounded-lg outline-none cursor-pointer"
                  >
                    {STAGES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPrintSummaryBid(selectedBid)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5C342] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Print Cover Sheet</span>
                  </button>
                  <button
                    onClick={() => setSelectedBidId(null)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">{selectedBid.title}</h2>
              <p className="text-xs text-slate-200 mt-1">{selectedBid.client} • {selectedBid.location}</p>
            </div>

            <div className="flex border-b border-slate-200 bg-slate-50 px-4 shrink-0">
              {[
                { id: 'checklist', label: 'Envelope Checklist', icon: CheckSquare },
                { id: 'chat', label: 'Tender Notes', icon: MessageSquare },
                { id: 'units', label: 'Site & Unit Logs', icon: Car },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = drawerTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDrawerTab(tab.id)}
                    className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                      active
                        ? 'border-[#0A2E6E] text-[#0A2E6E] bg-white'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white">
              {drawerTab === 'checklist' && (
                <div className="space-y-4">
                  {/* Protected Bid Documents Banner inside Tender Drawer */}
                  <div className="p-3.5 rounded-xl bg-[#071E4A] text-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-4 h-4 text-[#F5C342] shrink-0" />
                      <div>
                        <p className="text-xs font-bold">Protected Bid Envelopes & Security Gate Active</p>
                        <p className="text-[11px] text-slate-300">
                          Financial Bid Forms require Head of Bidding clearance & 6-digit Security PIN.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {selectedBid.checklist.map((item) => {
                      const isFinancial = item.envelope === 'Financial';
                      const virtualDoc = {
                        id: `${selectedBid.id}-${item.id}`,
                        name: item.label,
                        envelope: `${item.envelope} Envelope`,
                        classification: isFinancial
                          ? 'Restricted - Financial/Pricing'
                          : item.envelope === 'Eligibility'
                          ? 'Confidential - Legal/Eligibility'
                          : 'Internal - Technical',
                        fileName: item.fileName || 'Tender_Attachment_Secured.pdf',
                        fileSize: '1.6 MB',
                        uploadedBy: getUser(selectedBid.managerId).name,
                        uploadedDate: '2026-11-25',
                        status: item.completed ? 'Verified' : 'Pending',
                        tempApprovedUserIds: []
                      };

                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            item.completed ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-slate-200'
                          }`}
                        >
                          <div
                            onClick={() => handleToggleChecklist(selectedBid.id, item.id)}
                            className="flex items-start gap-3 cursor-pointer flex-1"
                          >
                            {item.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {item.envelope}
                                </span>
                                {isFinancial && (
                                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 flex items-center gap-0.5">
                                    <Lock className="w-2.5 h-2.5" /> Restricted
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-semibold text-slate-900 mt-0.5">{item.label}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.fileName && (
                              <button
                                onClick={() => requestSecuredDocumentAction('view', virtualDoc)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0A2E6E]/10 text-[#0A2E6E] text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Lock className="w-3 h-3" />
                                <span>Inspect</span>
                              </button>
                            )}
                            <button
                              onClick={() =>
                                requestSecuredDocumentAction('upload', virtualDoc, {
                                  bidId: selectedBid.id,
                                  checkId: item.id
                                })
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#0A2E6E] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5 text-[#F5C342]" />
                              <span>{item.fileName ? 'Replace' : 'Upload'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {drawerTab === 'chat' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {selectedBid.chat.map((msg) => {
                      const user = getUser(msg.userId);
                      return (
                        <div key={msg.id} className="p-3.5 rounded-2xl border bg-slate-50 border-slate-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#0A2E6E]">{user.name}</span>
                            <span className="text-[11px] text-slate-400">{msg.time}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-800">{msg.text}</p>
                        </div>
                      );
                    })}
                  </div>
                  <form onSubmit={handleSendChat} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Add bid remark..."
                      className="flex-1 px-3.5 py-2 bg-slate-100 rounded-xl text-sm outline-none"
                    />
                    <button type="submit" className="bg-[#0A2E6E] text-white px-4 py-2 rounded-xl text-xs font-bold">
                      Send
                    </button>
                  </form>
                </div>
              )}

              {drawerTab === 'units' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Site & Unit Allocation Logs</h3>
                    <button
                      onClick={() => setIsAddingUnitLog(!isAddingUnitLog)}
                      className="bg-[#0A2E6E] text-white px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      + Add Log
                    </button>
                  </div>
                  {isAddingUnitLog && (
                    <form onSubmit={handleAddUnitLog} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex gap-2">
                      <input
                        type="text"
                        value={unitNote}
                        onChange={(e) => setUnitNote(e.target.value)}
                        placeholder="Log inspection or unit milestone..."
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      <button type="submit" className="px-3 py-1.5 bg-[#D49B1A] text-[#071E4A] rounded-lg text-xs font-bold">
                        Save
                      </button>
                    </form>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedBid.unitLogs.map((log) => (
                      <div key={log.id} className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                        <div className={`h-24 bg-gradient-to-br ${log.palette} p-3 text-white flex flex-col justify-between`}>
                          <span className="text-[10px] font-bold uppercase">{log.tag}</span>
                          <p className="text-xs font-bold truncate">{log.title}</p>
                        </div>
                        <p className="p-3 text-xs text-slate-600">{log.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD NEW BID MODAL ================= */}
      {isNewBidOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-[#071E4A] text-white flex items-center justify-between border-b-2 border-[#D49B1A]">
              <div>
                <h2 className="text-base font-bold">Register New Bid Opportunity</h2>
                <p className="text-xs text-[#F5C342]">BidsPro • Plan • Manage • Win</p>
              </div>
              <button onClick={() => setIsNewBidOpen(false)} className="p-1.5 rounded-lg bg-white/10 text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBid} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ref # *</label>
                  <input
                    type="text"
                    required
                    value={newBidForm.philgepsRef}
                    onChange={(e) => setNewBidForm({ ...newBidForm, philgepsRef: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Client / Procuring Entity *</label>
                  <input
                    type="text"
                    required
                    value={newBidForm.client}
                    onChange={(e) => setNewBidForm({ ...newBidForm, client: e.target.value })}
                    placeholder="e.g., Provincial Government of Isabela"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contract / Project Title *</label>
                <input
                  type="text"
                  required
                  value={newBidForm.title}
                  onChange={(e) => setNewBidForm({ ...newBidForm, title: e.target.value })}
                  placeholder="e.g., Project Mike"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Approved Budget (ABC in ₱)</label>
                  <input
                    type="number"
                    required
                    value={newBidForm.abcValue}
                    onChange={(e) => setNewBidForm({ ...newBidForm, abcValue: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={newBidForm.deadline}
                    onChange={(e) => setNewBidForm({ ...newBidForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsNewBidOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#D49B1A] text-[#071E4A]">
                  Create Tender Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ADD CUSTOM REQUIREMENT MODAL ================= */}
      {isAddDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-[#071E4A] text-white flex items-center justify-between border-b-2 border-[#D49B1A]">
              <h2 className="text-base font-bold">Add Protected Document Slot</h2>
              <button onClick={() => setIsAddDocModalOpen(false)} className="p-1.5 rounded-lg bg-white/10 text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddCustomDocSlot} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Security Classification *</label>
                <select
                  value={newDocForm.classification}
                  onChange={(e) => setNewDocForm({ ...newDocForm, classification: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white font-semibold"
                >
                  <option>Restricted - Financial/Pricing</option>
                  <option>Confidential - Legal/Eligibility</option>
                  <option>Internal - Technical</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Envelope Category</label>
                <select
                  value={newDocForm.envelope}
                  onChange={(e) => setNewDocForm({ ...newDocForm, envelope: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                >
                  <option>Class 'A' Legal & Eligibility</option>
                  <option>Technical Envelope (1st Envelope)</option>
                  <option>Financial Envelope (2nd Envelope)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Requirement Name *</label>
                <input
                  type="text"
                  required
                  value={newDocForm.name}
                  onChange={(e) => setNewDocForm({ ...newDocForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddDocModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#0A2E6E] text-white">
                  Add Protected Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SECURITY PIN / 2FA & RBAC ACCESS GATE MODAL ================= */}
      {securityModalState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border-2 border-[#D49B1A] overflow-hidden">
            <div className="p-5 bg-[#071E4A] text-white flex items-center justify-between border-b border-[#0F3D8C]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D49B1A]/20 border border-[#D49B1A] flex items-center justify-center">
                  {securityModalState.denied ? (
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                  ) : (
                    <KeyRound className="w-5 h-5 text-[#F5C342]" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-extrabold">
                    {securityModalState.denied
                      ? 'Clearance Restricted — Head Approval Required'
                      : 'Security PIN / 2FA Verification'}
                  </h2>
                  <p className="text-[11px] text-[#F5C342]">{securityModalState.doc.classification}</p>
                </div>
              </div>
              <button
                onClick={() => setSecurityModalState(null)}
                className="p-1.5 rounded-lg bg-white/10 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {securityModalState.denied ? (
              <div className="p-5 space-y-4">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                  <p className="font-extrabold">Access Denied — Insufficient Security Clearance</p>
                  <p>
                    <strong>{securityModalState.doc.name}</strong> is classified as{' '}
                    <strong>{securityModalState.doc.classification}</strong>. Your current role ({currentUser.role}) requires explicit temporary clearance from the Head of Bidding Department.
                  </p>
                </div>
                <p className="text-[11px] text-slate-500">
                  This access attempt has been recorded in the Immutable Security Audit Trail.
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSecurityModalState(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleRequestTempClearance(securityModalState.doc)}
                    className="px-4 py-2 rounded-xl bg-[#0A2E6E] hover:bg-[#0F3D8C] text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F5C342]" />
                    <span>Request Temporary Clearance</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifySecurityPin} className="p-5 space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="text-slate-500">Protected File:</p>
                  <p className="font-bold text-slate-900">{securityModalState.doc.name}</p>
                  <p className="text-[11px] text-slate-500">
                    Authenticated Session: <strong className="text-[#0A2E6E]">{currentUser.email}</strong>
                  </p>
                </div>

                {pinError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {pinError}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Enter 6-Digit Security PIN</label>
                    <button
                      type="button"
                      onClick={() => setPinInput('202688')}
                      className="text-[11px] font-extrabold text-[#0A2E6E] bg-amber-100 hover:bg-amber-200 border border-[#D49B1A] px-2.5 py-0.5 rounded-full cursor-pointer"
                    >
                      Use Demo PIN: 202688
                    </button>
                  </div>
                  <input
                    type="password"
                    maxLength={6}
                    required
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••••"
                    className="w-full px-4 py-2.5 border border-slate-300 focus:border-[#0A2E6E] rounded-xl text-center text-lg font-mono tracking-[0.4em] outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSecurityModalState(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D49B1A] to-[#E5B02B] text-[#071E4A] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Verify PIN & Proceed</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= ENCRYPTED DOCUMENT PREVIEW MODAL ================= */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border-2 border-[#0A2E6E] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#071E4A] text-white flex items-center justify-between border-b-2 border-[#D49B1A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Decrypted Secure Preview • {previewDoc.classification}
                </span>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-1 rounded-lg bg-white/10 text-slate-300 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="text-[11px] font-bold text-[#0A2E6E] uppercase">{previewDoc.envelope}</p>
                <h3 className="text-base font-extrabold text-slate-900">{previewDoc.name}</h3>
                <p className="text-xs font-mono text-slate-600">{previewDoc.fileName} ({previewDoc.fileSize})</p>
              </div>
              <div className="p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-center space-y-2">
                <FileCheck2 className="w-10 h-10 text-[#0A2E6E] mx-auto" />
                <p className="text-xs font-bold text-slate-800">
                  Verified Encrypted Document Viewer • Watermarked for {currentUser.email}
                </p>
                <p className="text-[11px] text-slate-500">
                  Access logged in Immutable Security Audit Trail • Demo only LSCasti • Developer LSCastillejo
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl bg-[#0A2E6E] text-white text-xs font-bold cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PHILGEPS LIVE NOTIFICATION DRAWER ================= */}
      {isPhilgepsDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs"
          onClick={() => setIsPhilgepsDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-[#071E4A] text-white flex items-center justify-between border-b-2 border-[#D49B1A]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-extrabold">PhilGEPS Live Opportunity Alerts</h3>
                  <p className="text-[11px] text-slate-300">Merchant ID: {philgepsAccount.merchantId}</p>
                </div>
              </div>
              <button
                onClick={() => setIsPhilgepsDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">{philgepsOpportunities.length} Matched Notices</span>
              <button
                onClick={handleSimulatePhilgepsOpportunity}
                className="px-3 py-1.5 rounded-lg bg-[#0A2E6E] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-[#F5C342]" /> Simulate New Alert
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {philgepsOpportunities.map((opp) => (
                <div key={opp.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#0A2E6E]">Ref #{opp.philgepsRef}</span>
                    <span className="text-[10px] text-slate-400">{opp.postedAt}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900">{opp.title}</p>
                  <p className="text-[11px] text-slate-600">{opp.procuringEntity} • ABC: {formatShortPHP(opp.abcValue)}</p>
                  <button
                    onClick={() => handleImportPhilgepsToPipeline(opp)}
                    className="w-full py-2 rounded-lg bg-[#D49B1A] text-[#071E4A] text-xs font-extrabold cursor-pointer"
                  >
                    {opp.imported ? '✓ View in Pipeline' : 'Import to Bid Pipeline (Go/No-Go)'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= PRINTABLE BID COVER SUMMARY MODAL ================= */}
      {printSummaryBid && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setPrintSummaryBid(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-300 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-3.5 bg-[#071E4A] text-white flex items-center justify-between border-b-2 border-[#D49B1A]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5C342]">
                <Printer className="w-4 h-4" />
                <span>Official BidsPro Tender Cover Summary</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-lg bg-[#D49B1A] text-[#071E4A] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button onClick={() => setPrintSummaryBid(null)} className="p-1.5 rounded-lg bg-white/10 text-slate-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-white text-slate-900 space-y-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#0A2E6E]">
                <img src="1000032310.png" alt="BidsPro Logo" className="h-16 sm:h-20 w-auto object-contain" />
                <div className="sm:text-right space-y-1">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-100 text-[#071E4A] border border-[#D49B1A]">
                    Demo only LSCasti
                  </span>
                  <p className="text-[11px] font-bold text-[#0A2E6E]">Developer LSCastillejo</p>
                  <p className="text-xs font-mono font-bold text-[#0A2E6E]">Ref No.: {printSummaryBid.philgepsRef}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-500">PROCURING ENTITY</p>
                <p className="text-base font-extrabold text-[#0A2E6E]">{printSummaryBid.client}</p>
                <p className="text-sm font-bold text-slate-900">{printSummaryBid.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Approved Budget (ABC)</p>
                  <p className="text-base font-extrabold text-slate-900 mt-1">{formatFullPHP(printSummaryBid.abcValue)}</p>
                </div>
                <div className="p-4 rounded-xl border border-[#D49B1A]/50 bg-[#F5C342]/10">
                  <p className="text-[10px] font-bold uppercase text-[#B88412]">Financial Bid Offer</p>
                  <p className="text-base font-extrabold text-[#0A2E6E] mt-1">{formatFullPHP(printSummaryBid.bidOffer)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CALENDAR EVENT DETAIL MODAL ================= */}
      {selectedCalendarEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          onClick={() => setSelectedCalendarEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#071E4A] text-white flex items-center justify-between border-b-2 border-[#D49B1A]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#F5C342]">
                {selectedCalendarEvent.type} • {selectedCalendarEvent.date}
              </span>
              <button
                onClick={() => setSelectedCalendarEvent(null)}
                className="p-1 rounded-lg bg-white/10 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-base font-extrabold text-slate-900">{selectedCalendarEvent.title}</h3>
              <p className="text-xs text-slate-600">{selectedCalendarEvent.subtitle}</p>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                {selectedCalendarEvent.bidId && (
                  <button
                    onClick={() => {
                      setSelectedBidId(selectedCalendarEvent.bidId);
                      setSelectedCalendarEvent(null);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#0A2E6E] text-white text-xs font-bold cursor-pointer"
                  >
                    Open Tender Drawer
                  </button>
                )}
                <button
                  onClick={() => setSelectedCalendarEvent(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LIVE PHILGEPS TOAST BANNER ================= */}
      {livePhilgepsAlert && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 max-w-sm w-full bg-[#071E4A] text-white rounded-2xl border-2 border-[#D49B1A] p-4 shadow-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400 text-[#071E4A]">
              New PhilGEPS Notice
            </span>
            <button
              onClick={() => setLivePhilgepsAlert(null)}
              className="text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#F5C342]">
              Ref #{livePhilgepsAlert.philgepsRef} • {livePhilgepsAlert.title}
            </p>
            <p className="text-xs text-white font-semibold mt-0.5">
              {livePhilgepsAlert.procuringEntity} — ABC {formatShortPHP(livePhilgepsAlert.abcValue)}
            </p>
          </div>
          <button
            onClick={() => handleImportPhilgepsToPipeline(livePhilgepsAlert)}
            className="w-full py-2 rounded-xl bg-[#D49B1A] hover:bg-[#B88412] text-[#071E4A] text-xs font-extrabold cursor-pointer"
          >
            Import to Pipeline
          </button>
        </div>
      )}

      {/* ================= ACTION TOAST NOTIFICATION ================= */}
      {toast && (
        <div className="fixed bottom-20 lg:bottom-6 left-4 z-50 bg-[#071E4A] text-white border border-[#D49B1A] px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}