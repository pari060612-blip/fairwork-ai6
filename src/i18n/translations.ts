import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  demoNotice: string;
  roleWorker: string;
  roleAdmin: string;
  switchSector: string;
  sectorConstruction: string;
  sectorEducation: string;
  navShifts: string;
  navPayslip: string;
  navSafety: string;
  navFeedback: string;
  navSkills: string;
  navFatigue: string;
  navDashboard: string;
  
  // Shift tracking
  shiftSchedule: string;
  checkIn: string;
  checkOut: string;
  checkedIn: string;
  completed: string;
  scheduled: string;
  overtime: string;
  hoursWorked: string;
  simulatedQRCheckIn: string;
  qrModalTitle: string;
  qrModalNotice: string;
  scanCamera: string;
  enterPin: string;
  punchSuccess: string;

  // Payslip
  payslipTitle: string;
  payslipNotice: string;
  basePay: string;
  overtimePay: string;
  allowances: string;
  grossSalary: string;
  deductions: string;
  epfDeduction: string;
  esiDeduction: string;
  netPayable: string;
  transparentBreakdown: string;
  overtimeRateExplained: string;
  epfExplained: string;
  esiExplained: string;
  simulateOvertime: string;

  // Safety
  reportHazard: string;
  hazardHistory: string;
  hazardCategory: string;
  severityLevel: string;
  locationArea: string;
  hazardDescription: string;
  attachPhoto: string;
  submitHazardReport: string;
  reportId: string;
  statusSubmitted: string;
  statusReview: string;
  statusResolved: string;
  voiceInput: string;
  voiceListening: string;
  voiceUnsupported: string;

  // Feedback
  honestFeedback: string;
  confidentialNoticeTitle: string;
  confidentialNoticeBody: string;
  feedbackTopic: string;
  ratingScore: string;
  feedbackComments: string;
  submitFeedback: string;
  feedbackSuccess: string;

  // Skill passport
  skillPassportTitle: string;
  verifiedCredential: string;
  userEnteredCredential: string;
  addSkillOrTraining: string;
  downloadSummary: string;
  printSummary: string;
  issuingOrg: string;
  loggedExperience: string;

  // Fatigue
  fatigueAlertsTitle: string;
  fatigueDisclaimer: string;
  weeklyHoursRisk: string;
  restIntervalWarning: string;
  recommendedAction: string;
  configureThresholds: string;

  // Admin
  workforceHealthOverview: string;
  totalActiveWorkers: string;
  overtimeHoursTotal: string;
  openSafetyIncidents: string;
  fatigueRiskCount: string;
  prioritizedActions: string;
  experimentalRetentionRisk: string;
  retentionDisclaimer: string;
  allSectors: string;
  timeFilter: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'FairWork AI',
    tagline: 'Workforce Health, Transparent Pay & Safety Voice',
    demoNotice: 'Demo Mode: All records are simulated for the SRMIST Prompt Wars 2026 hackathon.',
    roleWorker: 'Worker View',
    roleAdmin: 'Workforce Health Admin',
    switchSector: 'Switch Industry',
    sectorConstruction: 'Construction',
    sectorEducation: 'Education',
    navShifts: 'Shift & Attendance',
    navPayslip: 'Transparent Payslip',
    navSafety: 'Safety Reporting',
    navFeedback: 'Honest Feedback',
    navSkills: 'Skill Passport',
    navFatigue: 'Fatigue Alerts',
    navDashboard: 'Health Overview',

    // Shift
    shiftSchedule: 'Shift Schedule & Real-Time Tracking',
    checkIn: 'Simulated QR Check-In',
    checkOut: 'Check-Out Shift',
    checkedIn: 'On Shift',
    completed: 'Completed',
    scheduled: 'Upcoming',
    overtime: 'Overtime Hours',
    hoursWorked: 'Hours Logged',
    simulatedQRCheckIn: 'QR Attendance Verification (Simulated)',
    qrModalTitle: 'Scan Station QR Code',
    qrModalNotice: 'Simulated check-in for hackathon demonstration. This flow does not access hardware biometric scanners or verify legal physical GPS coordinates.',
    scanCamera: 'Scan with Camera / Virtual Scanner',
    enterPin: 'Punch with Station Badge ID',
    punchSuccess: 'Attendance logged successfully into local records.',

    // Payslip
    payslipTitle: 'Clear & Transparent Salary Breakdown',
    payslipNotice: 'Illustrative sample payslip. Displays how base pay, overtime multipliers, and statutory social security deductions are calculated to prevent wage theft.',
    basePay: 'Basic Pay',
    overtimePay: 'Overtime Earnings (1.5x / 2.0x)',
    allowances: 'Site / Hazard Allowance',
    grossSalary: 'Gross Earnings',
    deductions: 'Statutory Deductions',
    epfDeduction: 'Provident Fund (EPF 12%)',
    esiDeduction: 'State Insurance (ESI 0.75%)',
    netPayable: 'Estimated Take-Home (Net Pay)',
    transparentBreakdown: 'Why This Number?',
    overtimeRateExplained: 'Overtime is compensated at 1.5x standard hourly rate on weekdays and 2.0x on weekends/holidays in accordance with fair labor safety guidelines.',
    epfExplained: 'EPF (12% of basic) is deposited into your government retirement security fund with a matching employer contribution.',
    esiExplained: 'ESI (0.75% of gross) secures medical healthcare coverage for you and your dependents at network clinics.',
    simulateOvertime: 'Overtime Calculator',

    // Safety
    reportHazard: 'Report a Workplace Hazard',
    hazardHistory: 'Tracked Safety Reports',
    hazardCategory: 'Hazard Category',
    severityLevel: 'Severity Level',
    locationArea: 'Exact Location / Zone',
    hazardDescription: 'Detailed Hazard Description',
    attachPhoto: 'Attach Inspection Photo',
    submitHazardReport: 'Submit Safety Report',
    reportId: 'Report ID',
    statusSubmitted: 'Submitted',
    statusReview: 'Under Review',
    statusResolved: 'Resolved',
    voiceInput: 'Voice Input',
    voiceListening: 'Listening... Speak clearly',
    voiceUnsupported: 'Speech recognition is not supported in this browser or language. Please use text input.',

    // Feedback
    honestFeedback: 'Confidential Management & Workplace Feedback',
    confidentialNoticeTitle: 'Confidentiality vs. Cryptographic Anonymity',
    confidentialNoticeBody: 'FairWork AI safeguards your personal identity: your name is never shown to supervisors, and feedback is presented only as aggregated thematic insights. However, this is administrative confidentiality rather than mathematical zero-knowledge proof. Avoid mentioning distinct identifying personal details in freeform text.',
    feedbackTopic: 'Feedback Area',
    ratingScore: 'Experience Rating (1-5)',
    feedbackComments: 'Your Constructive Feedback or Concerns',
    submitFeedback: 'Submit Confidential Feedback',
    feedbackSuccess: 'Feedback safely submitted to workforce sentiment themes.',

    // Skills
    skillPassportTitle: 'Worker Skill Passport & Verified Training',
    verifiedCredential: 'Verified Credential',
    userEnteredCredential: 'Self-Reported Record',
    addSkillOrTraining: 'Add Training / Skill',
    downloadSummary: 'Download Summary',
    printSummary: 'Print Passport',
    issuingOrg: 'Issuing Body / Institution',
    loggedExperience: 'Practical Experience',

    // Fatigue
    fatigueAlertsTitle: 'Workforce Fatigue & Shift Spacing Alerts',
    fatigueDisclaimer: 'Operational safety notice only. FairWork fatigue alerts highlight excessive hours and short shift intervals (>48h/week or <11h rest gap) to prevent accidental injury and burnout. This does not constitute a clinical or medical diagnosis.',
    weeklyHoursRisk: 'Weekly Hours Risk Indicator',
    restIntervalWarning: 'Short Turnaround (<11h rest)',
    recommendedAction: 'Recommended Safety Action',
    configureThresholds: 'Adjust Safety Thresholds',

    // Admin
    workforceHealthOverview: 'Workforce Health & Operations Intelligence',
    totalActiveWorkers: 'Active Workers Tracked',
    overtimeHoursTotal: 'Total Overtime Hours',
    openSafetyIncidents: 'Open Safety Concerns',
    fatigueRiskCount: 'Fatigue Alerts Active',
    prioritizedActions: 'Prioritized Supervisor Actions',
    experimentalRetentionRisk: 'Experimental Sentiment & Burnout Risk Indicator',
    retentionDisclaimer: 'Experimental workforce sentiment indicator - not a prediction of employee resignation. Based solely on logged overtime spikes, short rest gaps, and confidential workload feedback.',
    allSectors: 'All Sectors (Cross-Industry)',
    timeFilter: 'Time Window'
  },

  hi: {
    appName: 'FairWork AI',
    tagline: 'श्रमिक स्वास्थ्य, पारदर्शी वेतन और सुरक्षा आवाज़',
    demoNotice: 'डेमो मोड: सभी रिकॉर्ड SRMIST Prompt Wars 2026 हैकाथॉन के लिए सिम्युलेटेड हैं।',
    roleWorker: 'श्रमिक दृश्य (Worker)',
    roleAdmin: 'कार्यबल स्वास्थ्य व्यवस्थापक (Admin)',
    switchSector: 'उद्योग बदलें',
    sectorConstruction: 'निर्माण (Construction)',
    sectorEducation: 'शिक्षा (Education)',
    navShifts: 'शिफ्ट और उपस्थिति',
    navPayslip: 'पारदर्शी वेतन पर्ची',
    navSafety: 'सुरक्षा रिपोर्टिंग',
    navFeedback: 'गोपनीय सुझाव',
    navSkills: 'कौशल पासपोर्ट',
    navFatigue: 'थकान चेतावनी',
    navDashboard: 'स्वास्थ्य अवलोकन',

    // Shift
    shiftSchedule: 'शिफ्ट समय-सारणी और ट्रैकिंग',
    checkIn: 'सिम्युलेटेड क्यूआर चेक-इन',
    checkOut: 'शिफ्ट समाप्त (Check-Out)',
    checkedIn: 'ड्यूटी पर',
    completed: 'पूर्ण',
    scheduled: 'आगामी',
    overtime: 'अतिरिक्त कार्य (Overtime)',
    hoursWorked: 'कुल कार्य घंटे',
    simulatedQRCheckIn: 'क्यूआर उपस्थिति सत्यापन (सिम्युलेटेड)',
    qrModalTitle: 'साइट क्यूआर कोड स्कैन करें',
    qrModalNotice: 'हैकाथॉन प्रदर्शन के लिए सिम्युलेटेड चेक-इन। यह हार्डवेयर बायोमेट्रिक्स या वास्तविक जीपीएस का सत्यापन नहीं करता है।',
    scanCamera: 'कैमरा या वर्चुअल स्कैनर से स्कैन करें',
    enterPin: 'स्टेशन बैज आईडी दर्ज करें',
    punchSuccess: 'उपस्थिति स्थानीय रिकॉर्ड में दर्ज कर ली गई है।',

    // Payslip
    payslipTitle: 'स्पष्ट और पारदर्शी वेतन विवरण',
    payslipNotice: 'उदाहरणात्मक नमूना वेतन पर्ची। मूल वेतन, ओवरटाइम दरें और ईपीएफ/ईएसआई कटौतियों की स्पष्ट गणना प्रदर्शित करती है।',
    basePay: 'मूल वेतन (Basic Pay)',
    overtimePay: 'ओवरटाइम कमाई (1.5x / 2.0x)',
    allowances: 'कार्यस्थल / जोखिम भत्ता',
    grossSalary: 'कुल कमाई (Gross)',
    deductions: 'वैधानिक कटौतियां (Deductions)',
    epfDeduction: 'भविष्य निधि (EPF 12%)',
    esiDeduction: 'राज्य बीमा (ESI 0.75%)',
    netPayable: 'हाथ में आने वाला वेतन (Net Pay)',
    transparentBreakdown: 'यह राशि कैसे बनी?',
    overtimeRateExplained: 'कार्य दिवसों पर 1.5 गुना और सप्ताहांत/छुट्टियों पर 2.0 गुना दर से ओवरटाइम का भुगतान किया जाता है।',
    epfExplained: 'ईपीएफ (मूल वेतन का 12%) आपके सरकारी सेवानिवृत्ति कोष में नियोक्ता के समान योगदान के साथ जमा होता है।',
    esiExplained: 'ईएसआई (कुल वेतन का 0.75%) आपको और आपके परिवार को मान्यता प्राप्त क्लीनिकों में मुफ्त चिकित्सा सुविधा प्रदान करता है।',
    simulateOvertime: 'ओवरटाइम कैलकुलेटर',

    // Safety
    reportHazard: 'कार्यस्थल खतरे की रिपोर्ट करें',
    hazardHistory: 'सुरक्षा रिपोर्टों की स्थिति',
    hazardCategory: 'खतरे की श्रेणी',
    severityLevel: 'गंभीरता का स्तर',
    locationArea: 'सटीक स्थान या कक्ष',
    hazardDescription: 'खतरे का विस्तृत विवरण',
    attachPhoto: 'निरीक्षण फोटो संलग्न करें',
    submitHazardReport: 'सुरक्षा रिपोर्ट सबमिट करें',
    reportId: 'रिपोर्ट आईडी',
    statusSubmitted: 'दर्ज किया गया',
    statusReview: 'समीक्षाधीन',
    statusResolved: 'समाधानित',
    voiceInput: 'आवाज इनपुट (Voice)',
    voiceListening: 'सुन रहा है... कृपया स्पष्ट बोलें',
    voiceUnsupported: 'इस ब्राउज़र में वाक् पहचान उपलब्ध नहीं है। कृपया टेक्स्ट लिखें।',

    // Feedback
    honestFeedback: 'प्रबंधन और कार्य परिस्थितियों पर गोपनीय सुझाव',
    confidentialNoticeTitle: 'गोपनीयता बनाम पूर्ण तकनीकी गुमनामी',
    confidentialNoticeBody: 'FairWork AI आपकी व्यक्तिगत पहचान की रक्षा करता है: आपका नाम पर्यवेक्षकों को नहीं दिखाया जाता है। यह प्रशासनिक गोपनीयता है, गणितीय शून्य-ज्ञान प्रमाण नहीं। टिप्पणियों में विशिष्ट व्यक्तिगत विवरण न लिखें।',
    feedbackTopic: 'सुझाव का विषय',
    ratingScore: 'अनुभव रेटिंग (1-5)',
    feedbackComments: 'आपकी रचनात्मक प्रतिक्रिया या चिंताएं',
    submitFeedback: 'गोपनीय सुझाव भेजें',
    feedbackSuccess: 'सुझाव सुरक्षित रूप से विश्लेषण के लिए भेज दिया गया है।',

    // Skills
    skillPassportTitle: 'श्रमिक कौशल पासपोर्ट और सत्यापित प्रशिक्षण',
    verifiedCredential: 'सत्यापित प्रमाणपत्र',
    userEnteredCredential: 'स्व-घोषित रिकॉर्ड',
    addSkillOrTraining: 'नया प्रशिक्षण / कौशल जोड़ें',
    downloadSummary: 'सारांश डाउनलोड करें',
    printSummary: 'पासपोर्ट प्रिंट करें',
    issuingOrg: 'जारी करने वाली संस्था',
    loggedExperience: 'व्यावहारिक अनुभव घंटे',

    // Fatigue
    fatigueAlertsTitle: 'कार्यबल थकान और शिफ्ट अंतर अलर्ट',
    fatigueDisclaimer: 'केवल संचालन सुरक्षा सूचना। अत्यधिक कार्य घंटों (>48 घंटे/सप्ताह या <11 घंटे विश्राम) की पहचान दुर्घटना से बचाव हेतु की जाती है। यह कोई चिकित्सा या चिकित्सीय निदान नहीं है।',
    weeklyHoursRisk: 'साप्ताहिक घंटे जोखिम संकेतक',
    restIntervalWarning: 'कम विश्राम अंतर (<11 घंटे)',
    recommendedAction: 'सुझाई गई सुरक्षा कार्रवाई',
    configureThresholds: 'सीमाएं समायोजित करें',

    // Admin
    workforceHealthOverview: 'कार्यबल स्वास्थ्य एवं संचालन विश्लेषण',
    totalActiveWorkers: 'सक्रिय श्रमिक',
    overtimeHoursTotal: 'कुल ओवरटाइम घंटे',
    openSafetyIncidents: 'लंबित सुरक्षा चिंताएं',
    fatigueRiskCount: 'सक्रिय थकान अलर्ट',
    prioritizedActions: 'पर्यवेक्षक प्राथमिकता कार्य',
    experimentalRetentionRisk: 'प्रायोगिक तनाव एवं थकान सूचकांक',
    retentionDisclaimer: 'प्रायोगिक कार्यबल भावना संकेतक - कर्मचारी इस्तीफे की कोई निश्चित भविष्यवाणी नहीं है। यह केवल दर्ज ओवरटाइम और कार्यभार प्रतिक्रिया पर आधारित है।',
    allSectors: 'सभी क्षेत्र',
    timeFilter: 'समय सीमा'
  },

  ta: {
    appName: 'FairWork AI',
    tagline: 'பணியாளர் நலம், வெளிப்படையான ஊதியம் மற்றும் பாதுகாப்பு குரல்',
    demoNotice: 'டெமோ பயன்முறை: SRMIST Prompt Wars 2026 ஹேக்கத்தானுக்கான உருவகப்படுத்தப்பட்ட தரவு.',
    roleWorker: 'தொழிலாளர் பார்வை (Worker)',
    roleAdmin: 'பணியாளர் நல நிர்வாகி (Admin)',
    switchSector: 'துறையை மாற்றுக',
    sectorConstruction: 'கட்டுமானத் துறை (Construction)',
    sectorEducation: 'கல்வித்துறை (Education)',
    navShifts: 'ஷிப்ட் & வருகை',
    navPayslip: 'வெளிப்படையான சம்பளச் சீட்டு',
    navSafety: 'பாதுகாப்பு அறிக்கை',
    navFeedback: 'ரகசிய பின்னூட்டம்',
    navSkills: 'திறன் பாஸ்போர்ட்',
    navFatigue: 'சோர்வு எச்சரிக்கைகள்',
    navDashboard: 'நலக் கண்ணோட்டம்',

    // Shift
    shiftSchedule: 'ஷிப்ட் அட்டவணை & நேரடி கண்காணிப்பு',
    checkIn: 'QR செக்-இன் (உருவகப்படுத்தப்பட்டது)',
    checkOut: 'ஷிப்ட் நிறைவு (Check-Out)',
    checkedIn: 'பணியில் உள்ளார்',
    completed: 'முடிந்தது',
    scheduled: 'வரவிருக்கும்',
    overtime: 'கூடுதல் பணி நேரம் (Overtime)',
    hoursWorked: 'வேலை செய்த நேரம்',
    simulatedQRCheckIn: 'QR வருகை சரிபார்ப்பு (மாதிரி)',
    qrModalTitle: 'தளத்தின் QR குறியீட்டை ஸ்கேன் செய்யவும்',
    qrModalNotice: 'ஹேக்கத்தான் விளக்கத்திற்கான மாதிரி செக்-இன். இது பயோமெட்ரிக் அல்லது உண்மையான GPS இருப்பிடத்தை சரிபார்க்காது.',
    scanCamera: 'கேமரா அல்லது மெய்நிகர் ஸ்கேனர்',
    enterPin: 'நிலைய அடையாள அட்டையை உள்ளிடவும்',
    punchSuccess: 'வருகை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது.',

    // Payslip
    payslipTitle: 'தெளிவான & வெளிப்படையான சம்பள விவரம்',
    payslipNotice: 'மாதிரி சம்பளச் சீட்டு. அடிப்படை ஊதியம், கூடுதல் நேரக் கட்டணம் மற்றும் சட்டப்பூர்வ பிடித்தங்கள் எவ்வாறு கணக்கிடப்படுகின்றன என்பதை விளக்குகிறது.',
    basePay: 'அடிப்படை ஊதியம் (Basic Pay)',
    overtimePay: 'கூடுதல் நேர வருமானம் (1.5x / 2.0x)',
    allowances: 'தள / அபாயப் படி',
    grossSalary: 'மொத்த வருமானம் (Gross)',
    deductions: 'சட்டப்பூர்வ பிடித்தங்கள் (Deductions)',
    epfDeduction: 'வருங்கால வைப்பு நிதி (EPF 12%)',
    esiDeduction: 'காப்பீடு (ESI 0.75%)',
    netPayable: 'கைக்கு வரும் சம்பளம் (Net Pay)',
    transparentBreakdown: 'இந்த தொகை எப்படி கணக்கிடப்பட்டது?',
    overtimeRateExplained: 'வேலை நாட்களில் 1.5 மடங்கும், வார விடுமுறை/விடுமுறை நாட்களில் 2.0 மடங்கும் கூடுதல் நேர ஊதியம் வழங்கப்படுகிறது.',
    epfExplained: 'EPF (அடிப்படை ஊதியத்தில் 12%) ஓய்வூதியப் பாதுகாப்புக்காக உங்கள் கணக்கில் முதலாளி பங்களிப்புடன் சேமிக்கப்படுகிறது.',
    esiExplained: 'ESI (மொத்த ஊதியத்தில் 0.75%) உங்களுக்கும் உங்கள் குடும்பத்திற்கும் இலவச மருத்துவ சேவையை உறுதி செய்கிறது.',
    simulateOvertime: 'கூடுதல் நேர கால்குலேட்டர்',

    // Safety
    reportHazard: 'பணிவிட அபாயத்தைப் புகாரளிக்கவும்',
    hazardHistory: 'பதிவு செய்யப்பட்ட பாதுகாப்பு அறிக்கைகள்',
    hazardCategory: 'அபாய வகை',
    severityLevel: 'தீவிரத்தன்மை நிலை',
    locationArea: 'துல்லியமான இடம் / பகுதி',
    hazardDescription: 'அபாயத்தின் விரிவான விளக்கம்',
    attachPhoto: 'ஆய்வுப் புகைப்படத்தை இணைக்கவும்',
    submitHazardReport: 'பாதுகாப்பு அறிக்கையைச் சமர்ப்பிக்கவும்',
    reportId: 'அறிக்கை எண் (ID)',
    statusSubmitted: 'சமர்ப்பிக்கப்பட்டது',
    statusReview: 'பரிசீலனையில்',
    statusResolved: 'தீர்க்கப்பட்டது',
    voiceInput: 'குரல் உள்ளீடு (Voice Input)',
    voiceListening: 'கேட்கிறது... தெளிவாகப் பேசவும்',
    voiceUnsupported: 'உங்கள் உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை. உரையைத் தட்டச்சு செய்யவும்.',

    // Feedback
    honestFeedback: 'நிர்வாகம் & பணிச்சூழல் பற்றிய ரகசிய பின்னூட்டம்',
    confidentialNoticeTitle: 'ரகசியத்தன்மை vs பூஜ்ஜிய அறிவு அடையாளம்',
    confidentialNoticeBody: 'FairWork AI உங்கள் தனிப்பட்ட அடையாளத்தைப் பாதுகாக்கிறது: உங்கள் பெயர் மேற்பார்வையாளர்களுக்குத் தெரியாது. இது நிர்வாக ரகசியத்தன்மை மட்டுமே. தனிப்பட்ட அடையாள விவரங்களை உரையில் குறிப்பிடுவதைத் தவிர்க்கவும்.',
    feedbackTopic: 'பின்னூட்டப் பிரிவு',
    ratingScore: 'அனுபவ மதிப்பீடு (1-5)',
    feedbackComments: 'உங்கள் ஆக்கபூர்வமான கருத்துக்கள் அல்லது கவலைகள்',
    submitFeedback: 'ரகசிய கருத்தைச் சமர்ப்பிக்கவும்',
    feedbackSuccess: 'கருத்து பாதுகாப்பாகப் பகுப்பாய்வுக்குச் சமர்ப்பிக்கப்பட்டது.',

    // Skills
    skillPassportTitle: 'பணியாளர் திறன் பாஸ்போர்ட் & பயிற்சி பதிவுகள்',
    verifiedCredential: 'சரிபார்க்கப்பட்ட சான்றிதழ்',
    userEnteredCredential: 'பணியாளர் உள்ளிட்ட பதிவு',
    addSkillOrTraining: 'புதிய பயிற்சி / திறனைச் சேர்க்கவும்',
    downloadSummary: 'சுருக்கத்தைப் பதிவிறக்குக',
    printSummary: 'பாஸ்போர்ட் அச்சிடுக',
    issuingOrg: 'வழங்கிய நிறுவனம்',
    loggedExperience: 'நடைமுறை அனுபவ நேரம்',

    // Fatigue
    fatigueAlertsTitle: 'பணியாளர் சோர்வு & ஓய்வு இடைவெளி எச்சரிக்கைகள்',
    fatigueDisclaimer: 'செயல்பாட்டுப் பாதுகாப்பு அறிவிப்பு மட்டுமே. வாரத்திற்கு 48 மணி நேரத்திற்கு மேல் பணிபுரிதல் அல்லது 11 மணி நேரத்திற்கும் குறைவான ஓய்வு விபத்துக்களைத் தடுக்க எச்சரிக்கப்படுகிறது. இது மருத்துவ நோயறிதல் அல்ல.',
    weeklyHoursRisk: 'வாராந்திர பணிச்சுமை எச்சரிக்கை',
    restIntervalWarning: 'குறைந்த ஓய்வு இடைவெளி (<11 மணி நேரம்)',
    recommendedAction: 'பரிந்துரைக்கப்பட்ட நடவடிக்கை',
    configureThresholds: 'பாதுகாப்பு வரம்புகளை அமை',

    // Admin
    workforceHealthOverview: 'பணியாளர் நலம் & செயல்பாட்டு நுண்ணறிவு',
    totalActiveWorkers: 'செயலில் உள்ள தொழிலாளர்கள்',
    overtimeHoursTotal: 'மொத்த கூடுதல் பணி நேரம்',
    openSafetyIncidents: 'தீர்க்கப்படாத பாதுகாப்பு புகார்கள்',
    fatigueRiskCount: 'செயலில் உள்ள சோர்வு எச்சரிக்கைகள்',
    prioritizedActions: 'மேற்பார்வையாளர் முன்னுரிமைப் பணிகள்',
    experimentalRetentionRisk: 'பரிசோதனை சோர்வு & பணியாளர் விலகல் குறியீடு',
    retentionDisclaimer: 'பரிசோதனை குறியீடு மட்டுமே - பணியாளர் ராஜினாமா செய்வதற்கான உறுதியான கணிப்பு அல்ல. அதிக பணிச்சுமை மற்றும் பின்னூட்டத்தின் அடிப்படையில் கணக்கிடப்பட்டது.',
    allSectors: 'அனைத்துத் துறைகளும்',
    timeFilter: 'கால இடைவெளி'
  }
};
