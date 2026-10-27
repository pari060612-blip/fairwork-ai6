export type Sector = 'construction' | 'education';
export type UserRole = 'worker' | 'admin';
export type Language = 'en' | 'hi' | 'ta';

export type ShiftStatus = 'scheduled' | 'checked_in' | 'completed' | 'missed';
export type ReportSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ReportStatus = 'submitted' | 'under_review' | 'resolved';

export interface ShiftRecord {
  id: string;
  sector: Sector;
  workerId: string;
  workerName: string;
  date: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualCheckIn?: string;
  actualCheckOut?: string;
  status: ShiftStatus;
  overtimeHours: number;
  totalHours: number;
  location: string;
  roleTitle: string;
  notes?: string;
  isSimulatedCheckIn?: boolean;
}

export interface PayslipItem {
  id: string;
  sector: Sector;
  workerId: string;
  workerName: string;
  month: string;
  year: number;
  currency: string;
  basePay: number;
  regularHoursWorked: number;
  hourlyRate: number;
  overtimeHours: number;
  overtimeRateMultiplier: number;
  overtimePay: number;
  hazardOrSpecialAllowance: number;
  deductions: {
    epf: number; // Employee Provident Fund (12%)
    esi: number; // Employee State Insurance (0.75%)
    professionalTax: number;
    welfareFund: number;
    tdsTax: number;
  };
  grossPay: number;
  totalDeductions: number;
  netPay: number;
  disbursementStatus: 'transferred' | 'processing';
  disbursementDate: string;
  bankAccountMasked: string;
  explanationNotes: {
    en: string;
    hi: string;
    ta: string;
  };
}

export interface SafetyReport {
  id: string; // e.g. FW-HAZ-2026-001
  sector: Sector;
  reporterId: string;
  reporterName: string; // Confidential in feedback, but recorded internally for safety follow-up unless marked fully anonymous
  isAnonymous: boolean;
  category: string;
  title: string;
  description: string;
  location: string;
  severity: ReportSeverity;
  status: ReportStatus;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  actionTaken?: string;
}

export interface FeedbackEntry {
  id: string;
  sector: Sector;
  topic: 'management' | 'workload' | 'safety_culture' | 'equipment' | 'compensation';
  rating: number; // 1 to 5
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  createdAt: string;
  resolvedInTheme?: boolean;
}

export interface SkillCredential {
  id: string;
  sector: Sector;
  workerId: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  isVerified: boolean; // Differentiate user-entered vs institution verified
  verificationSource?: string;
  hoursLogged: number;
  category: string;
  description: string;
}

export interface FatigueAlert {
  id: string;
  sector: Sector;
  workerId: string;
  workerName: string;
  roleTitle: string;
  severity: 'moderate' | 'high' | 'critical';
  weeklyHoursLogged: number;
  maxRecommendedWeeklyHours: number;
  consecutiveDaysWorked: number;
  lastRestIntervalHours: number;
  minRecommendedRestGap: number;
  reason: string;
  recommendation: string;
  timestamp: string;
  acknowledgedBySupervisor?: boolean;
}

export interface WorkerProfile {
  id: string;
  name: string;
  sector: Sector;
  roleTitle: string;
  badgeNumber: string;
  department: string;
  hourlyRate: number;
  joinedDate: string;
  weeklyHoursLimit: number;
  avatarSeed: string;
}
