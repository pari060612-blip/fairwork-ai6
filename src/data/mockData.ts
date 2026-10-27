import {
  WorkerProfile,
  ShiftRecord,
  PayslipItem,
  SafetyReport,
  FeedbackEntry,
  SkillCredential,
  FatigueAlert
} from '../types';

export const WORKER_PROFILES: Record<string, WorkerProfile> = {
  // Construction Worker
  'CS-4091': {
    id: 'CS-4091',
    name: 'Rajesh Kumar',
    sector: 'construction',
    roleTitle: 'Senior Steel Fixer & Rigging Tech',
    badgeNumber: 'CS-4091',
    department: 'Civil Infrastructure - Bridge Span 3',
    hourlyRate: 260, // INR per hour
    joinedDate: '2023-04-15',
    weeklyHoursLimit: 48,
    avatarSeed: 'Rajesh'
  },
  // Education Worker
  'EDU-8820': {
    id: 'EDU-8820',
    name: 'Dr. Priya Sharma',
    sector: 'education',
    roleTitle: 'Assistant Professor & Lab Coordinator',
    badgeNumber: 'EDU-8820',
    department: 'Electrical Sciences & Robotics Lab',
    hourlyRate: 420, // INR per hour equivalent
    joinedDate: '2021-08-10',
    weeklyHoursLimit: 44,
    avatarSeed: 'Priya'
  }
};

export const INITIAL_SHIFTS: ShiftRecord[] = [
  // Construction Shifts
  {
    id: 'shift-c-1',
    sector: 'construction',
    workerId: 'CS-4091',
    workerName: 'Rajesh Kumar',
    date: '2026-10-26',
    scheduledStart: '07:30',
    scheduledEnd: '16:00',
    actualCheckIn: '07:25',
    actualCheckOut: '17:45',
    status: 'completed',
    overtimeHours: 1.75,
    totalHours: 10.25,
    location: 'Metro Flyover Sector 4 - Pier 18B',
    roleTitle: 'Senior Steel Fixer',
    notes: 'Reinforcement cage tying for column footing; 1.75h planned critical pour overtime.',
    isSimulatedCheckIn: true
  },
  {
    id: 'shift-c-2',
    sector: 'construction',
    workerId: 'CS-4091',
    workerName: 'Rajesh Kumar',
    date: '2026-10-27',
    scheduledStart: '07:30',
    scheduledEnd: '16:00',
    actualCheckIn: '07:28',
    status: 'checked_in',
    overtimeHours: 0,
    totalHours: 5.5,
    location: 'Metro Flyover Sector 4 - Pier 19 Deck',
    roleTitle: 'Senior Steel Fixer',
    notes: 'Morning safety briefing completed. Scaffolding inspection clearance received.',
    isSimulatedCheckIn: true
  },
  {
    id: 'shift-c-3',
    sector: 'construction',
    workerId: 'CS-4091',
    workerName: 'Rajesh Kumar',
    date: '2026-10-28',
    scheduledStart: '07:30',
    scheduledEnd: '16:00',
    status: 'scheduled',
    overtimeHours: 0,
    totalHours: 8,
    location: 'Central Yard Fabrication Shed',
    roleTitle: 'Senior Steel Fixer'
  },
  {
    id: 'shift-c-4',
    sector: 'construction',
    workerId: 'CS-3122',
    workerName: 'Sunita Devi',
    date: '2026-10-26',
    scheduledStart: '08:00',
    scheduledEnd: '17:00',
    actualCheckIn: '07:55',
    actualCheckOut: '17:10',
    status: 'completed',
    overtimeHours: 0.25,
    totalHours: 8.25,
    location: 'Station Concourse Level 2',
    roleTitle: 'Masonry & Safety Marshall'
  },

  // Education Shifts
  {
    id: 'shift-e-1',
    sector: 'education',
    workerId: 'EDU-8820',
    workerName: 'Dr. Priya Sharma',
    date: '2026-10-26',
    scheduledStart: '08:30',
    scheduledEnd: '16:30',
    actualCheckIn: '08:20',
    actualCheckOut: '19:15',
    status: 'completed',
    overtimeHours: 2.75,
    totalHours: 10.75,
    location: 'Academic Block 3 - Robotics & Embedded Systems Lab',
    roleTitle: 'Assistant Professor & Lab Coordinator',
    notes: 'Semester project defense panel followed by evening equipment calibration duty.',
    isSimulatedCheckIn: true
  },
  {
    id: 'shift-e-2',
    sector: 'education',
    workerId: 'EDU-8820',
    workerName: 'Dr. Priya Sharma',
    date: '2026-10-27',
    scheduledStart: '08:30',
    scheduledEnd: '16:30',
    actualCheckIn: '08:26',
    status: 'checked_in',
    overtimeHours: 0,
    totalHours: 4.5,
    location: 'Hall B - Digital Electronics Lecture',
    roleTitle: 'Assistant Professor & Lab Coordinator',
    notes: 'Mid-term paper evaluation scheduled during 14:00-16:00 office hours.',
    isSimulatedCheckIn: true
  },
  {
    id: 'shift-e-3',
    sector: 'education',
    workerId: 'EDU-8820',
    workerName: 'Dr. Priya Sharma',
    date: '2026-10-28',
    scheduledStart: '09:00',
    scheduledEnd: '17:00',
    status: 'scheduled',
    overtimeHours: 0,
    totalHours: 8,
    location: 'Conference Wing - Curriculum Review',
    roleTitle: 'Assistant Professor & Lab Coordinator'
  },
  {
    id: 'shift-e-4',
    sector: 'education',
    workerId: 'EDU-6104',
    workerName: 'Prof. Anand Varma',
    date: '2026-10-26',
    scheduledStart: '09:00',
    scheduledEnd: '17:00',
    actualCheckIn: '08:50',
    actualCheckOut: '18:45',
    status: 'completed',
    overtimeHours: 1.75,
    totalHours: 9.75,
    location: 'CS Lab 402 - Cloud Architecture',
    roleTitle: 'Senior Lecturer'
  }
];

export const INITIAL_PAYSLIPS: PayslipItem[] = [
  // Construction Payslip
  {
    id: 'pay-cs-2026-10',
    sector: 'construction',
    workerId: 'CS-4091',
    workerName: 'Rajesh Kumar',
    month: 'October',
    year: 2026,
    currency: '₹',
    basePay: 41600, // 160 hrs * 260
    regularHoursWorked: 160,
    hourlyRate: 260,
    overtimeHours: 18.5,
    overtimeRateMultiplier: 1.5,
    overtimePay: 7215, // 18.5 * (260 * 1.5 = 390)
    hazardOrSpecialAllowance: 2500, // Site height & safety allowance
    deductions: {
      epf: 4992, // 12% of basic
      esi: 385,  // 0.75% of gross
      professionalTax: 200,
      welfareFund: 150,
      tdsTax: 0
    },
    grossPay: 51315,
    totalDeductions: 5727,
    netPay: 45588,
    disbursementStatus: 'transferred',
    disbursementDate: '2026-10-25',
    bankAccountMasked: 'HDFC •••• 8412',
    explanationNotes: {
      en: 'Standard 160 regular hours logged at ₹260/hr. 18.5 overtime hours logged under statutory 1.5x multiplier (₹390/hr). Site hazard allowance applied for bridge span deck shifts.',
      hi: '₹260/घंटे की दर से 160 नियमित घंटे। 1.5 गुना दर (₹390/घंटे) से 18.5 घंटे ओवरटाइम दर्ज किया गया। ऊंचाई पर कार्य हेतु ₹2,500 विशेष भत्ता शामिल है।',
      ta: 'மணிக்கு ₹260 வீதம் 160 வழக்கமான வேலை நேரம். கூடுதல் நேரத்திற்கு 1.5x மடங்கு (மணிக்கு ₹390) வீதம் 18.5 மணி நேரம் கணக்கிடப்பட்டது.'
    }
  },
  // Education Payslip
  {
    id: 'pay-edu-2026-10',
    sector: 'education',
    workerId: 'EDU-8820',
    workerName: 'Dr. Priya Sharma',
    month: 'October',
    year: 2026,
    currency: '₹',
    basePay: 67200, // 160 hrs * 420
    regularHoursWorked: 160,
    hourlyRate: 420,
    overtimeHours: 14,
    overtimeRateMultiplier: 1.5,
    overtimePay: 8820, // 14 * (420 * 1.5 = 630)
    hazardOrSpecialAllowance: 3200, // Lab coordinator & chemical protocol allowance
    deductions: {
      epf: 8064, // 12% of basic
      esi: 0, // Above ESI statutory ceiling, covered by University Group Mediclaim
      professionalTax: 200,
      welfareFund: 100,
      tdsTax: 3400
    },
    grossPay: 79220,
    totalDeductions: 11764,
    netPay: 67456,
    disbursementStatus: 'transferred',
    disbursementDate: '2026-10-25',
    bankAccountMasked: 'SBI •••• 1944',
    explanationNotes: {
      en: 'Regular academic load 160 hrs at ₹420/hr equivalent. 14 hours weekend exam duty and evening lab supervision credited at 1.5x. TDS estimated for Old Tax Regime bracket.',
      hi: '₹420/घंटे की दर से 160 नियमित शैक्षणिक घंटे। सप्ताहांत परीक्षा ड्यूटी और शाम की लैब निगरानी के लिए 14 घंटे 1.5 गुना दर पर दिए गए।',
      ta: 'மணிக்கு ₹420 வீதம் 160 கல்வி நேரம். வார இறுதி தேர்வுப் பணி மற்றும் மாலை ஆய்வக மேற்பார்வைக்காக 14 கூடுதல் மணி நேரம் 1.5x வீதம் வழங்கப்பட்டுள்ளது.'
    }
  }
];

export const INITIAL_SAFETY_REPORTS: SafetyReport[] = [
  {
    id: 'FW-HAZ-2026-081',
    sector: 'construction',
    reporterId: 'CS-4091',
    reporterName: 'Rajesh Kumar',
    isAnonymous: false,
    category: 'Scaffolding & Fall Hazards',
    title: 'Missing safety toe-board & loose guardrail at Pier 18',
    description: 'During 07:30 inspection, observed that the secondary toe-board on level 3 scaffolding is detached, creating dropped object risk for ground crew below.',
    location: 'Sector 4 Flyover Pier 18B, Level 3 Deck',
    severity: 'critical',
    status: 'under_review',
    photoUrl: '/src/assets/images/safety_inspection_scaffold_1793082558901.jpg',
    createdAt: '2026-10-26T08:15:00Z',
    updatedAt: '2026-10-26T10:30:00Z',
    adminNotes: 'Site engineer inspected at 10:15. Temporary work suspension tag placed. Scaffolding team dispatched for re-clamping.',
    actionTaken: 'Exclusion zone barricaded below pier; repair crew actively reinforcing clamp joints.'
  },
  {
    id: 'FW-HAZ-2026-064',
    sector: 'construction',
    reporterId: 'CS-3122',
    reporterName: 'Sunita Devi',
    isAnonymous: true,
    category: 'Heat & Hydration Stress',
    title: 'Water chiller offline near Pier 14 rebar yard',
    description: 'Ambient temperature reached 36°C with 68% humidity. Main hydration dispenser is empty since morning shift; workers drinking non-potable curing water.',
    location: 'Pier 14 Rebar Storage Yard',
    severity: 'high',
    status: 'resolved',
    createdAt: '2026-10-25T11:20:00Z',
    updatedAt: '2026-10-25T13:40:00Z',
    adminNotes: 'Emergency 200L potable water tanker dispatched; permanent dispenser compressor replaced.',
    actionTaken: 'Potable water supply verified with chlorine test strips. Shaded cooling canopy erected.'
  },
  {
    id: 'FW-HAZ-2026-052',
    sector: 'education',
    reporterId: 'EDU-8820',
    reporterName: 'Dr. Priya Sharma',
    isAnonymous: false,
    category: 'Chemical & Fume Ventilation',
    title: 'Fume exhaust airflow low in Nanotech Synthesis Lab B2',
    description: 'Fume hood anemometer reading only 40 FPM (standard requirement is 80-100 FPM). Organic solvent vapor lingering after etching experiments.',
    location: 'Academic Block 3, Ground Floor Lab B-04',
    severity: 'high',
    status: 'under_review',
    createdAt: '2026-10-26T09:40:00Z',
    updatedAt: '2026-10-26T11:00:00Z',
    adminNotes: 'Campus Facilities and HVAC engineers contacted. Filter bag clogging suspected.',
    actionTaken: 'High-vapor volatile procedures temporarily redirected to Central Analytical Lab.'
  },
  {
    id: 'FW-HAZ-2026-039',
    sector: 'education',
    reporterId: 'EDU-6104',
    reporterName: 'Prof. Anand Varma',
    isAnonymous: true,
    category: 'Electrical & Trip Safety',
    title: 'Exposed power daisy-chain across aisle in Computer Lab 402',
    description: 'Extension cords crossing pedestrian corridor between student terminals without rubber floor ramp protectors.',
    location: 'Block 1, Fourth Floor, Lab 402',
    severity: 'medium',
    status: 'resolved',
    createdAt: '2026-10-24T14:10:00Z',
    updatedAt: '2026-10-25T09:15:00Z',
    adminNotes: 'Overhead raceway trunking installed by university electrical squad.',
    actionTaken: 'All floor extension cords removed; ceiling drop raceways installed.'
  }
];

export const INITIAL_FEEDBACK: FeedbackEntry[] = [
  {
    id: 'fb-c-1',
    sector: 'construction',
    topic: 'workload',
    rating: 2,
    comment: 'Pours are consistently scheduled past 18:00 without prior notice. Shift gaps between evening pour and 07:00 morning shift leave under 9 hours of rest.',
    sentiment: 'negative',
    createdAt: '2026-10-25T19:30:00Z'
  },
  {
    id: 'fb-c-2',
    sector: 'construction',
    topic: 'equipment',
    rating: 4,
    comment: 'New fall-arrest harnesses issued this month are significantly lighter and more ergonomic. Great upgrade for high-elevation bridge work.',
    sentiment: 'positive',
    createdAt: '2026-10-24T16:45:00Z'
  },
  {
    id: 'fb-c-3',
    sector: 'construction',
    topic: 'safety_culture',
    rating: 3,
    comment: 'Daily 10-minute tool box talks are useful, but translated summaries in regional languages (Bhojpuri/Bengali) are needed for migrant helpers.',
    sentiment: 'neutral',
    createdAt: '2026-10-23T11:15:00Z'
  },
  {
    id: 'fb-e-1',
    sector: 'education',
    topic: 'workload',
    rating: 2,
    comment: 'Continuous exam invigilation over the weekend combined with weekday 18-credit lecture schedule is creating extreme cognitive fatigue among junior faculty.',
    sentiment: 'negative',
    createdAt: '2026-10-25T18:20:00Z'
  },
  {
    id: 'fb-e-2',
    sector: 'education',
    topic: 'management',
    rating: 4,
    comment: 'Department Head has been transparent regarding research seed grant distributions and scheduling lab hours evenly.',
    sentiment: 'positive',
    createdAt: '2026-10-24T15:00:00Z'
  },
  {
    id: 'fb-e-3',
    sector: 'education',
    topic: 'equipment',
    rating: 2,
    comment: 'Faculty workstations in Block 2 lack basic lumbar support chairs. Back strain complaints are rising during the exam paper grading period.',
    sentiment: 'negative',
    createdAt: '2026-10-23T14:30:00Z'
  }
];

export const INITIAL_SKILLS: SkillCredential[] = [
  // Construction
  {
    id: 'sk-c-1',
    sector: 'construction',
    workerId: 'CS-4091',
    title: 'OSHA 30-Hour Construction Safety Standards',
    issuingOrganization: 'National Safety Council of India / OSHA Affiliated',
    issueDate: '2024-03-12',
    expiryDate: '2029-03-12',
    credentialId: 'NSCI-CS-8921-24',
    isVerified: true,
    verificationSource: 'NSCI Central Credential Registry',
    hoursLogged: 420,
    category: 'Workplace Safety & Standards',
    description: 'Covers scaffolding safety, hazard communication, electrical safety, trenching & fall arrest protocols.'
  },
  {
    id: 'sk-c-2',
    sector: 'construction',
    workerId: 'CS-4091',
    title: 'Heavy Rigging & Crane Signal Person Level 2',
    issuingOrganization: 'L&T Construction Skills Training Institute (CSTI)',
    issueDate: '2023-09-18',
    credentialId: 'CSTI-RIG-4410',
    isVerified: true,
    verificationSource: 'CSTI Enterprise Verification API',
    hoursLogged: 680,
    category: 'Heavy Equipment & Operations',
    description: 'Certified for tandem crane lifts, sling load angle calculation, and standard international hand signals.'
  },
  {
    id: 'sk-c-3',
    sector: 'construction',
    workerId: 'CS-4091',
    title: 'Advanced Pre-Stressed Concrete Rebar Layout',
    issuingOrganization: 'Self-Reported Field Experience',
    issueDate: '2025-01-10',
    isVerified: false,
    hoursLogged: 310,
    category: 'Technical Craftsmanship',
    description: 'Practical on-site experience executing high-tensile strand placement and hydraulic post-tensioning duct alignment.'
  },

  // Education
  {
    id: 'sk-e-1',
    sector: 'education',
    workerId: 'EDU-8820',
    title: 'UGC National Eligibility Test (NET) & JRF in Engineering Sciences',
    issuingOrganization: 'University Grants Commission (UGC) / NTA',
    issueDate: '2020-11-20',
    credentialId: 'UGC-NET-ES-91044',
    isVerified: true,
    verificationSource: 'National Academic Depository (NAD)',
    hoursLogged: 1200,
    category: 'Academic Accreditation',
    description: 'Nationwide qualification validating university-level pedagogical competency and technical research eligibility.'
  },
  {
    id: 'sk-e-2',
    sector: 'education',
    workerId: 'EDU-8820',
    title: 'Institutional Chemical Hygiene & Hazardous Material Protocol',
    issuingOrganization: 'SRMIST Environmental Health & Safety Division',
    issueDate: '2024-02-15',
    expiryDate: '2027-02-15',
    credentialId: 'SRM-EHS-LAB-2024-118',
    isVerified: true,
    verificationSource: 'Campus Safety Registry',
    hoursLogged: 240,
    category: 'Laboratory Safety',
    description: 'Protocol compliance for acid fume scrubbing, toxic gas cylinder changeovers, and emergency eyewash maintenance.'
  },
  {
    id: 'sk-e-3',
    sector: 'education',
    workerId: 'EDU-8820',
    title: 'Outcome-Based Education (OBE) Curriculum Design',
    issuingOrganization: 'NPTEL-AICTE Faculty Development Program',
    issueDate: '2025-06-25',
    isVerified: false,
    hoursLogged: 90,
    category: 'Pedagogical Excellence',
    description: 'Self-reported completion of Course Outcome (CO) and Program Outcome (PO) mapping workshop series.'
  }
];

export const INITIAL_FATIGUE_ALERTS: FatigueAlert[] = [
  {
    id: 'fatigue-c-1',
    sector: 'construction',
    workerId: 'CS-4091',
    workerName: 'Rajesh Kumar',
    roleTitle: 'Senior Steel Fixer',
    severity: 'high',
    weeklyHoursLogged: 53.5,
    maxRecommendedWeeklyHours: 48,
    consecutiveDaysWorked: 6,
    lastRestIntervalHours: 9.5,
    minRecommendedRestGap: 11,
    reason: 'Weekly hours logged (53.5 hrs) exceeded statutory safety threshold of 48 hrs. Rest gap between yesterday 17:45 checkout and today 07:28 check-in was 9.7 hrs (below 11h recommendation).',
    recommendation: 'Mandatory 24-hour rest day recommended before next shift. Reassign high-altitude scaffolding shifts to alternate certified crew.',
    timestamp: '2026-10-27T08:00:00Z',
    acknowledgedBySupervisor: false
  },
  {
    id: 'fatigue-e-1',
    sector: 'education',
    workerId: 'EDU-8820',
    workerName: 'Dr. Priya Sharma',
    roleTitle: 'Assistant Professor & Lab Coordinator',
    severity: 'moderate',
    weeklyHoursLogged: 50.0,
    maxRecommendedWeeklyHours: 44,
    consecutiveDaysWorked: 6,
    lastRestIntervalHours: 10.2,
    minRecommendedRestGap: 11,
    reason: 'Back-to-back Sunday exam evaluation and Monday morning 08:30 laboratory supervision resulted in 50 cumulative duty hours.',
    recommendation: 'Reallocate Thursday grading backlog to teaching assistants and ensure 12h rest before subsequent laboratory practicals.',
    timestamp: '2026-10-27T08:30:00Z',
    acknowledgedBySupervisor: false
  }
];
