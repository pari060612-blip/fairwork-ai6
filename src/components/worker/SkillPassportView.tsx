import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Plus,
  Printer,
  Clock,
  Shield,
  FileText,
  UserCheck,
  X,
  ExternalLink
} from 'lucide-react';
import { SkillCredential } from '../../types';

export const SkillPassportView: React.FC = () => {
  const { sector, t, activeWorker, skills, addSkillCredential } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'self_reported'>('all');

  // Form states for adding record
  const [title, setTitle] = useState('');
  const [issuingOrg, setIssuingOrg] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [hoursLogged, setHoursLogged] = useState(40);
  const [category, setCategory] = useState(sector === 'construction' ? 'Workplace Safety' : 'Pedagogy & Lab Protocols');
  const [description, setDescription] = useState('');

  const workerSkills = skills.filter((s) => s.sector === sector && s.workerId === activeWorker.id);

  const filteredSkills = workerSkills.filter((s) => {
    if (filterVerified === 'verified') return s.isVerified;
    if (filterVerified === 'self_reported') return !s.isVerified;
    return true;
  });

  const verifiedCount = workerSkills.filter((s) => s.isVerified).length;
  const selfReportedCount = workerSkills.filter((s) => !s.isVerified).length;
  const totalExperienceHours = workerSkills.reduce((acc, curr) => acc + (curr.hoursLogged || 0), 0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuingOrg.trim()) return;

    addSkillCredential({
      sector,
      workerId: activeWorker.id,
      title: title.trim(),
      issuingOrganization: issuingOrg.trim(),
      issueDate,
      hoursLogged: Number(hoursLogged) || 0,
      category,
      description: description.trim(),
      isVerified: false // User additions are clearly marked self-reported
    });

    setShowAddModal(false);
    setTitle('');
    setIssuingOrg('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase mb-1">
              <span>{t.skillPassportTitle}</span>
              <span aria-hidden="true">·</span>
              <span>Portable Worker Credentials</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {activeWorker.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {activeWorker.roleTitle} · Badge ID: <span className="font-mono">{activeWorker.badgeNumber}</span> · {activeWorker.department}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addSkillOrTraining}</span>
            </button>

            <button
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>{t.printSummary}</span>
            </button>
          </div>
        </div>

        {/* Verification Status Legend & Hours Counter */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Verified Accreditations</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xl font-bold font-mono text-teal-900">{verifiedCount}</span>
              <span className="text-[11px] text-teal-700 font-medium">Officially Audited</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Self-Reported Training</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xl font-bold font-mono text-slate-700">{selfReportedCount}</span>
              <span className="text-[11px] text-slate-500">Pending Verification</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Verified Practical Hours</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xl font-bold font-mono text-slate-900">{totalExperienceHours}</span>
              <span className="text-[11px] text-slate-500">Duty Hours Logged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
          <button
            onClick={() => setFilterVerified('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterVerified === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Credentials ({workerSkills.length})
          </button>
          <button
            onClick={() => setFilterVerified('verified')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterVerified === 'verified' ? 'bg-white text-teal-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verified Only ({verifiedCount})
          </button>
          <button
            onClick={() => setFilterVerified('self_reported')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterVerified === 'self_reported' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Self-Reported ({selfReportedCount})
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline">
          Showing records for {sector === 'construction' ? 'Construction Discipline' : 'Higher Education & Research'}
        </span>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Category & Verified distinction (Strict unboxed metadata with separators) */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="font-medium text-slate-700">{skill.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{skill.issueDate}</span>
                </div>

                {/* Explicit Verified vs Self-Reported Distinction */}
                {skill.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.verifiedCredential}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    <span>{t.userEnteredCredential}</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {skill.title}
              </h3>

              <div className="text-xs text-teal-800 font-medium mt-1">
                Issued by: {skill.issuingOrganization}
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Bottom details */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono tabular-nums font-semibold text-slate-700">
                  {skill.hoursLogged} hrs
                </span>
                <span>logged experience</span>
              </div>

              {skill.credentialId && (
                <span className="font-mono text-slate-500">
                  ID: {skill.credentialId}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                Add New Training or Skill Record
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Credential / Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scaffolding Level 2 Certification or Python Data Science Workshop"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t.issuingOrg} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NSCI, L&T CSTI, or NPTEL"
                    value={issuingOrg}
                    onChange={(e) => setIssuingOrg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Issue Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-teal-700"
                  >
                    <option value="Workplace Safety">Workplace Safety & Standards</option>
                    <option value="Technical Craftsmanship">Technical Craftsmanship</option>
                    <option value="Heavy Equipment">Heavy Equipment Operations</option>
                    <option value="Academic Accreditation">Academic Accreditation</option>
                    <option value="Laboratory Safety">Laboratory Safety</option>
                    <option value="Pedagogical Excellence">Pedagogical Excellence</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Practical Hours Logged
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={hoursLogged}
                    onChange={(e) => setHoursLogged(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Scope & Skills Demonstrated *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail key proficiencies, machines operated, or pedagogical methods mastered..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700 text-xs"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <strong>Notice on Verification:</strong> Self-entered credentials will be tagged as <em>Self-Reported Record</em> until supervisor or registrar document audit confirms institutional authenticity.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-teal-800 hover:bg-teal-900 rounded-lg font-semibold"
                >
                  Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Summary Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                  FairWork AI · Verified Worker Skill Passport
                </span>
                <h3 className="font-bold text-lg text-slate-900">
                  {activeWorker.name} — Comprehensive Summary
                </h3>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Worker Badge</span>
                  <span className="font-bold font-mono text-slate-900">{activeWorker.badgeNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Industry Sector</span>
                  <span className="font-bold capitalize text-slate-900">{activeWorker.sector}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Experience</span>
                  <span className="font-bold font-mono text-slate-900">{totalExperienceHours} Hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Verified Status</span>
                  <span className="font-bold text-emerald-700">{verifiedCount} Verified</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2">Authenticated Competencies</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                  {workerSkills.map((s) => (
                    <div key={s.id} className="p-3 bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{s.title}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          s.isVerified ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {s.isVerified ? 'VERIFIED' : 'SELF-REPORTED'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {s.issuingOrganization} · {s.hoursLogged} Practical Hours
                      </div>
                      <div className="text-[11px] text-slate-600">{s.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-xs"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-white bg-teal-800 hover:bg-teal-900 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
