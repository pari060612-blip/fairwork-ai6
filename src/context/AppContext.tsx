import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Sector,
  UserRole,
  Language,
  ShiftRecord,
  PayslipItem,
  SafetyReport,
  FeedbackEntry,
  SkillCredential,
  FatigueAlert,
  WorkerProfile
} from '../types';
import {
  WORKER_PROFILES,
  INITIAL_SHIFTS,
  INITIAL_PAYSLIPS,
  INITIAL_SAFETY_REPORTS,
  INITIAL_FEEDBACK,
  INITIAL_SKILLS,
  INITIAL_FATIGUE_ALERTS
} from '../data/mockData';
import { translations, TranslationDictionary } from '../i18n/translations';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'warning' | 'info';
}

export interface SafetyThresholds {
  maxWeeklyHours: number;
  minRestInterval: number;
  maxDailyHours: number;
}

interface AppContextType {
  sector: Sector;
  setSector: (s: Sector) => void;
  role: UserRole;
  setRole: (r: UserRole) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: TranslationDictionary;
  activeWorker: WorkerProfile;
  activeWorkerId: string;
  setActiveWorkerId: (id: string) => void;

  shifts: ShiftRecord[];
  payslips: PayslipItem[];
  safetyReports: SafetyReport[];
  feedbacks: FeedbackEntry[];
  skills: SkillCredential[];
  fatigueAlerts: FatigueAlert[];
  thresholds: SafetyThresholds;

  // Actions
  punchAttendance: (shiftId: string, actionType: 'in' | 'out', note?: string) => void;
  submitSafetyReport: (report: Omit<SafetyReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateReportStatus: (id: string, status: SafetyReport['status'], adminNotes?: string, actionTaken?: string) => void;
  submitFeedback: (feedback: Omit<FeedbackEntry, 'id' | 'createdAt' | 'sentiment'>) => void;
  addSkillCredential: (credential: Omit<SkillCredential, 'id'>) => void;
  acknowledgeFatigueAlert: (id: string) => void;
  updateThresholds: (thresholds: SafetyThresholds) => void;
  resetToDemoDefaults: () => void;

  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

const STORAGE_KEYS = {
  SECTOR: 'fairwork_sector',
  ROLE: 'fairwork_role',
  LANG: 'fairwork_language',
  SHIFTS: 'fairwork_shifts_v1',
  REPORTS: 'fairwork_reports_v1',
  FEEDBACK: 'fairwork_feedback_v1',
  SKILLS: 'fairwork_skills_v1',
  FATIGUE: 'fairwork_fatigue_v1',
  THRESHOLDS: 'fairwork_thresholds_v1'
};

const DEFAULT_THRESHOLDS: SafetyThresholds = {
  maxWeeklyHours: 48,
  minRestInterval: 11,
  maxDailyHours: 10
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sector, setSectorState] = useState<Sector>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SECTOR);
    return (saved === 'education' || saved === 'construction') ? saved : 'construction';
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved === 'admin' || saved === 'worker') ? saved : 'worker';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'hi' || saved === 'ta' || saved === 'en') ? saved : 'en';
  });

  const [activeWorkerId, setActiveWorkerId] = useState<string>(
    sector === 'construction' ? 'CS-4091' : 'EDU-8820'
  );

  // Synchronize active worker when sector changes
  useEffect(() => {
    if (sector === 'construction' && activeWorkerId !== 'CS-4091') {
      setActiveWorkerId('CS-4091');
    } else if (sector === 'education' && activeWorkerId !== 'EDU-8820') {
      setActiveWorkerId('EDU-8820');
    }
  }, [sector]);

  // Persisted state collections
  const [shifts, setShifts] = useState<ShiftRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHIFTS);
      return saved ? JSON.parse(saved) : INITIAL_SHIFTS;
    } catch {
      return INITIAL_SHIFTS;
    }
  });

  const [payslips] = useState<PayslipItem[]>(INITIAL_PAYSLIPS);

  const [safetyReports, setSafetyReports] = useState<SafetyReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return saved ? JSON.parse(saved) : INITIAL_SAFETY_REPORTS;
    } catch {
      return INITIAL_SAFETY_REPORTS;
    }
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
    } catch {
      return INITIAL_FEEDBACK;
    }
  });

  const [skills, setSkills] = useState<SkillCredential[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  });

  const [fatigueAlerts, setFatigueAlerts] = useState<FatigueAlert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FATIGUE);
      return saved ? JSON.parse(saved) : INITIAL_FATIGUE_ALERTS;
    } catch {
      return INITIAL_FATIGUE_ALERTS;
    }
  });

  const [thresholds, setThresholds] = useState<SafetyThresholds>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THRESHOLDS);
      return saved ? JSON.parse(saved) : DEFAULT_THRESHOLDS;
    } catch {
      return DEFAULT_THRESHOLDS;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SECTOR, sector);
  }, [sector]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(safetyReports));
  }, [safetyReports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FATIGUE, JSON.stringify(fatigueAlerts));
  }, [fatigueAlerts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THRESHOLDS, JSON.stringify(thresholds));
  }, [thresholds]);

  // Toast Helpers
  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setSector = (s: Sector) => {
    setSectorState(s);
    showToast(
      `Sector switched to ${s === 'construction' ? 'Construction' : 'Education'}`,
      'Workplace terminology, schedules, and hazards have adapted.',
      'info'
    );
  };

  const setRole = (r: UserRole) => {
    setRoleState(r);
    showToast(
      `Switched to ${r === 'admin' ? 'Admin / Workforce Health Overview' : 'Worker Portal'}`,
      r === 'admin' ? 'Reviewing aggregated trends, safety reports, and fatigue radar.' : 'Viewing shift check-ins, transparent payslips, and skill passport.',
      'info'
    );
  };

  const setLanguage = (l: Language) => {
    setLanguageState(l);
  };

  const activeWorker: WorkerProfile = WORKER_PROFILES[activeWorkerId] || WORKER_PROFILES['CS-4091'];

  // Shift Punch Action
  const punchAttendance = (shiftId: string, actionType: 'in' | 'out', note?: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setShifts((prev) =>
      prev.map((shift) => {
        if (shift.id === shiftId) {
          if (actionType === 'in') {
            return {
              ...shift,
              actualCheckIn: timeStr,
              status: 'checked_in',
              isSimulatedCheckIn: true,
              notes: note || shift.notes
            };
          } else {
            return {
              ...shift,
              actualCheckOut: timeStr,
              status: 'completed',
              totalHours: 8.5,
              overtimeHours: 0.5,
              notes: note || shift.notes
            };
          }
        }
        return shift;
      })
    );

    showToast(
      actionType === 'in' ? 'Check-In Recorded' : 'Shift Check-Out Recorded',
      `Simulated time stamped at ${timeStr}. Attendance saved to local shift log.`,
      'success'
    );
  };

  // Submit Safety Report
  const submitSafetyReport = (report: Omit<SafetyReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>): string => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const reportId = `FW-HAZ-2026-${randomNum}`;
    const timestamp = new Date().toISOString();

    const newReport: SafetyReport = {
      ...report,
      id: reportId,
      status: 'submitted',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setSafetyReports((prev) => [newReport, ...prev]);

    showToast(
      'Safety Report Submitted',
      `Assigned tracking ID: ${reportId}. Status: Submitted.`,
      'success'
    );

    return reportId;
  };

  // Admin Update Safety Report
  const updateReportStatus = (id: string, status: SafetyReport['status'], adminNotes?: string, actionTaken?: string) => {
    const timestamp = new Date().toISOString();
    setSafetyReports((prev) =>
      prev.map((rep) => {
        if (rep.id === id) {
          return {
            ...rep,
            status,
            adminNotes: adminNotes !== undefined ? adminNotes : rep.adminNotes,
            actionTaken: actionTaken !== undefined ? actionTaken : rep.actionTaken,
            updatedAt: timestamp
          };
        }
        return rep;
      })
    );

    showToast(
      'Safety Report Updated',
      `Report ${id} status updated to ${status.replace('_', ' ').toUpperCase()}.`,
      'info'
    );
  };

  // Submit Feedback
  const submitFeedback = (fb: Omit<FeedbackEntry, 'id' | 'createdAt' | 'sentiment'>) => {
    const sentiment: 'positive' | 'neutral' | 'negative' =
      fb.rating >= 4 ? 'positive' : fb.rating === 3 ? 'neutral' : 'negative';

    const newFb: FeedbackEntry = {
      ...fb,
      id: 'fb-' + Math.random().toString(36).substr(2, 9),
      sentiment,
      createdAt: new Date().toISOString()
    };

    setFeedbacks((prev) => [newFb, ...prev]);
    showToast(
      'Confidential Feedback Logged',
      'Thank you. Your feedback is aggregated without personal identifying markers.',
      'success'
    );
  };

  // Add Skill Credential
  const addSkillCredential = (cred: Omit<SkillCredential, 'id'>) => {
    const newCred: SkillCredential = {
      ...cred,
      id: 'sk-' + Math.random().toString(36).substr(2, 9)
    };

    setSkills((prev) => [newCred, ...prev]);
    showToast(
      'Training Credential Added',
      `${newCred.title} successfully added to your Skill Passport.`,
      'success'
    );
  };

  // Fatigue alert acknowledge
  const acknowledgeFatigueAlert = (id: string) => {
    setFatigueAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, acknowledgedBySupervisor: true } : alert))
    );
    showToast('Fatigue Alert Acknowledged', 'Logged supervisor intervention in shift notes.', 'info');
  };

  // Update thresholds
  const updateThresholds = (newThresh: SafetyThresholds) => {
    setThresholds(newThresh);
    showToast('Thresholds Updated', 'Fatigue risk calculation will reflect the new parameters.', 'info');
  };

  // Reset to initial demo defaults
  const resetToDemoDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.SHIFTS);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.FATIGUE);
    localStorage.removeItem(STORAGE_KEYS.THRESHOLDS);

    setShifts(INITIAL_SHIFTS);
    setSafetyReports(INITIAL_SAFETY_REPORTS);
    setFeedbacks(INITIAL_FEEDBACK);
    setSkills(INITIAL_SKILLS);
    setFatigueAlerts(INITIAL_FATIGUE_ALERTS);
    setThresholds(DEFAULT_THRESHOLDS);

    showToast('Demo Data Reset', 'All records restored to initial hackathon showcase state.', 'info');
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        sector,
        setSector,
        role,
        setRole,
        language,
        setLanguage,
        t,
        activeWorker,
        activeWorkerId,
        setActiveWorkerId,
        shifts,
        payslips,
        safetyReports,
        feedbacks,
        skills,
        fatigueAlerts,
        thresholds,
        punchAttendance,
        submitSafetyReport,
        updateReportStatus,
        submitFeedback,
        addSkillCredential,
        acknowledgeFatigueAlert,
        updateThresholds,
        resetToDemoDefaults,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
