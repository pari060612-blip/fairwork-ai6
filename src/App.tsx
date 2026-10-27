import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { ShiftTrackingView } from './components/worker/ShiftTrackingView';
import { PayslipView } from './components/worker/PayslipView';
import { SafetyReportingView } from './components/worker/SafetyReportingView';
import { HonestFeedbackView } from './components/worker/HonestFeedbackView';
import { SkillPassportView } from './components/worker/SkillPassportView';
import { FatigueAlertsView } from './components/worker/FatigueAlertsView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import {
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  HardHat,
  GraduationCap,
  ArrowRight,
  Info
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { sector, setSector, role, setRole, t, activeWorker } = useApp();
  const [activeTab, setActiveTab] = useState<string>('shifts');
  const [showGuide, setShowGuide] = useState(false);

  // Sync tab if user toggles role
  const isWorker = role === 'worker';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero / Quick Judge Walkthrough Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                Prompt Wars 2026 @ SRMIST
              </span>
              <span className="text-slate-500 hidden sm:inline">
                Cross-Industry Workforce Health, Fair Pay & Safety Platform
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGuide(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-md border border-teal-200 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Judge Quick Walkthrough</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Worker Views */}
        {isWorker && (
          <>
            {activeTab === 'shifts' && <ShiftTrackingView />}
            {activeTab === 'payslip' && <PayslipView />}
            {activeTab === 'safety' && <SafetyReportingView />}
            {activeTab === 'feedback' && <HonestFeedbackView />}
            {activeTab === 'skills' && <SkillPassportView />}
            {activeTab === 'fatigue' && <FatigueAlertsView />}
          </>
        )}

        {/* Admin Views */}
        {!isWorker && (
          <>
            <AdminDashboardView />
          </>
        )}
      </main>

      {/* Quiet, Professional Footer (No AI Slop / No Telemetry Ticker) */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900">FairWork AI</span>
            <span aria-hidden="true">·</span>
            <span>SRM Institute of Science and Technology (SRMIST)</span>
            <span aria-hidden="true">·</span>
            <span>Prompt Wars Hackathon 2026</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Built with React 19, TypeScript & Tailwind CSS</span>
            <span aria-hidden="true">·</span>
            <span>Simulated Local Sandbox</span>
          </div>
        </div>
      </footer>

      {/* Judge Walkthrough Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  FairWork AI — Hackathon Evaluation Guide
                </h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-700 leading-relaxed">
              <p>
                Welcome to <strong>FairWork AI</strong>, built for the <strong>Prompt Wars 2026 Hackathon</strong>. This platform demonstrates end-to-end workforce transparency, safety voice, and fatigue prevention across <strong>Construction</strong> and <strong>Education</strong>.
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">
                    1. Cross-Industry Adaptation
                  </span>
                  Use the top sub-bar to switch between <strong>Construction</strong> (Rajesh Kumar, Pier 18 Scaffolding, High-Altitude Allowance, Fall Hazards) and <strong>Education</strong> (Dr. Priya Sharma, Nanotech Lab, Exam Invigilation Load, Chemical Fume Hoods). All records and terminology adapt seamlessly.
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">
                    2. Worker Mode Features to Test
                  </span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Shift Tracking & QR Check-in:</strong> Click "Simulated QR Check-In" to test virtual station scanning and attendance logging.</li>
                    <li><strong>Transparent Payslips:</strong> Review itemized base pay, 1.5x overtime multiplier, EPF (12%), and try the interactive Overtime Simulator. Available in English, Hindi, and Tamil!</li>
                    <li><strong>Safety Reporting:</strong> Log a workplace hazard with voice-input support and severity level; view the real-time status tracker.</li>
                    <li><strong>Honest Feedback:</strong> Read the educational notice on administrative confidentiality vs cryptographic anonymity, and submit feedback.</li>
                    <li><strong>Skill Passport:</strong> Observe clear distinctions between verified credentials and self-reported training; test the "Add Skill" and "Print Summary" actions.</li>
                    <li><strong>Fatigue Alerts:</strong> Review the weekly duty gauge, rest gap indicator (&lt;11h), configurable threshold sliders, and medical disclaimers.</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">
                    3. Admin Mode Features to Test
                  </span>
                  Switch to <strong>Admin Mode</strong> in the header:
                  <ul className="list-disc pl-4 space-y-1 mt-1">
                    <li>Inspect workforce health overview, overtime totals, and shift hour trends.</li>
                    <li>Resolve or update open safety hazard reports with supervisor assessment notes.</li>
                    <li>Review anonymous feedback sentiment themes.</li>
                    <li>Check the <strong>Prioritized Action List</strong> and the <strong>Experimental Retention & Burnout Indicator</strong> (with full methodological limitation notices).</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 text-teal-950 text-[11px]">
                <strong>Persistence:</strong> Changes you make (check-ins, new safety reports, added skills, feedback) persist in browser localStorage. You can click "Reset Data" in the top bar at any time to return to initial defaults.
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-semibold hover:bg-teal-900"
              >
                Start Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
