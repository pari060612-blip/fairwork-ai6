import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, RotateCcw, ShieldCheck, Briefcase, UserCheck, HardHat, GraduationCap } from 'lucide-react';
import { Language } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    sector,
    setSector,
    role,
    setRole,
    language,
    setLanguage,
    t,
    activeWorker,
    resetToDemoDefaults
  } = useApp();

  const isWorker = role === 'worker';

  const workerNavLinks = [
    { id: 'shifts', label: t.navShifts },
    { id: 'payslip', label: t.navPayslip },
    { id: 'safety', label: t.navSafety },
    { id: 'feedback', label: t.navFeedback },
    { id: 'skills', label: t.navSkills },
    { id: 'fatigue', label: t.navFatigue }
  ];

  const adminNavLinks = [
    { id: 'overview', label: t.workforceHealthOverview },
    { id: 'safety_admin', label: t.openSafetyIncidents },
    { id: 'feedback_admin', label: t.honestFeedback },
    { id: 'fatigue_admin', label: t.fatigueAlertsTitle }
  ];

  const navLinks = isWorker ? workerNavLinks : adminNavLinks;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top Bar: Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab(isWorker ? 'shifts' : 'overview')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold tracking-tight text-sm shadow-sm group-hover:bg-teal-900 transition-colors">
              FW
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              FairWork<span className="text-teal-700">AI</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, no pill enclosures, subtle underline) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 text-xs lg:text-sm ${
                  isActive
                    ? 'border-teal-700 text-teal-900 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Quick Action / Role Switch */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => {
                setRole('worker');
                setActiveTab('shifts');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-all whitespace-nowrap ${
                role === 'worker'
                  ? 'bg-white text-teal-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>{t.roleWorker}</span>
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setActiveTab('overview');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-all whitespace-nowrap ${
                role === 'admin'
                  ? 'bg-white text-teal-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>{t.roleAdmin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-bar: Sector Adaptation, Language Selector & Demo Tools */}
      <div className="bg-slate-50/90 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Sector Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium whitespace-nowrap">{t.switchSector}:</span>
            <div className="inline-flex rounded-md border border-slate-200 bg-white p-0.5 shadow-2xs">
              <button
                onClick={() => setSector('construction')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  sector === 'construction'
                    ? 'bg-teal-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HardHat className="w-3.5 h-3.5" />
                <span>{t.sectorConstruction}</span>
              </button>
              <button
                onClick={() => setSector('education')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  sector === 'education'
                    ? 'bg-teal-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{t.sectorEducation}</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 pl-2 text-slate-500 text-[11px]">
              <span aria-hidden="true">·</span>
              <span>Active Profile:</span>
              <span className="font-semibold text-slate-800">{activeWorker.name}</span>
              <span className="text-slate-400">({activeWorker.badgeNumber})</span>
            </div>
          </div>

          {/* Right Tools: Multilingual dropdown, Demo reset, Judge notice */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-teal-700" />
              <select
                value={language}
                onChange={handleLanguageChange}
                aria-label="Interface Language"
                className="bg-transparent text-xs font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिंदी (HI)</option>
                <option value="ta">தமிழ் (TA)</option>
              </select>
            </div>

            {/* Reset Demo Data */}
            <button
              onClick={resetToDemoDefaults}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-teal-900 bg-white hover:bg-slate-50 px-2 py-1 rounded border border-slate-200 transition-colors"
              title="Reset all demo records in local storage to original sample data"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex items-center overflow-x-auto gap-2 px-4 py-2 border-t border-slate-200 bg-white scrollbar-none">
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-teal-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
