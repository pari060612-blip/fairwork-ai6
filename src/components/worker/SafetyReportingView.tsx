import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertOctagon,
  Camera,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  MapPin,
  UploadCloud,
  FileCheck
} from 'lucide-react';
import { VoiceInputButton } from '../common/VoiceInputButton';
import { ReportSeverity } from '../../types';

export const SafetyReportingView: React.FC = () => {
  const { sector, t, activeWorker, safetyReports, submitSafetyReport } = useApp();

  const [category, setCategory] = useState(
    sector === 'construction' ? 'Scaffolding & Fall Hazards' : 'Chemical & Fume Ventilation'
  );
  const [severity, setSeverity] = useState<ReportSeverity>('medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(
    sector === 'construction' ? 'Pier 18 Flyover Deck' : 'Academic Block 3, Lab B-04'
  );
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(
    sector === 'construction' ? '/src/assets/images/safety_inspection_scaffold_1793082558901.jpg' : undefined
  );
  const [newlyCreatedId, setNewlyCreatedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'under_review' | 'resolved'>('all');

  const constructionCategories = [
    'Scaffolding & Fall Hazards',
    'Heavy Machinery Clearance',
    'PPE Non-Compliance',
    'Electrical & Power Cords',
    'Heat Stress & Hydration',
    'Excavation & Trench Stability'
  ];

  const educationCategories = [
    'Chemical & Fume Ventilation',
    'Electrical & Exposed Cables',
    'Trip Hazard & Stairwell Safety',
    'Ergonomic Repetitive Strain',
    'Emergency Exit Obstruction',
    'Excessive Cognitive Fatigue'
  ];

  const categories = sector === 'construction' ? constructionCategories : educationCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const reportId = submitSafetyReport({
      sector,
      reporterId: activeWorker.id,
      reporterName: activeWorker.name,
      isAnonymous,
      category,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      severity,
      photoUrl
    });

    setNewlyCreatedId(reportId);
    setTitle('');
    setDescription('');
  };

  const filteredReports = safetyReports.filter((r) => {
    if (r.sector !== sector) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase mb-1">
            <span>{t.reportHazard}</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Retaliation Safety Voice</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Workplace Hazard Reporting & Resolution Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Report unsafe conditions, near-misses, or malfunctioning equipment. Every submission receives an immutable tracking ID and triggers supervisory review.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Submit New Hazard Report (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-700" />
              <span>Log Workplace Incident / Hazard</span>
            </h2>
          </div>

          {newlyCreatedId && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start justify-between">
              <div>
                <span className="font-bold flex items-center gap-1.5 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Report Registered Successfully!
                </span>
                <p className="mt-1 text-[11px] text-emerald-800">
                  Assigned ID: <span className="font-mono font-bold">{newlyCreatedId}</span>. Status: <strong>Submitted</strong>.
                </p>
              </div>
              <button
                onClick={() => setNewlyCreatedId(null)}
                className="text-emerald-700 hover:text-emerald-900 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Category Select */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.hazardCategory}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:border-teal-700"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.severityLevel}</label>
              <div className="grid grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'critical'] as ReportSeverity[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeverity(lvl)}
                    className={`py-1.5 px-2 rounded-md font-semibold text-[11px] uppercase tracking-wider border transition-colors ${
                      severity === lvl
                        ? lvl === 'critical'
                          ? 'bg-rose-900 text-white border-rose-900'
                          : lvl === 'high'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : lvl === 'medium'
                          ? 'bg-teal-800 text-white border-teal-800'
                          : 'bg-slate-700 text-white border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Title / Short Summary */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Incident Headline / Summary *</label>
              <input
                type="text"
                required
                placeholder="e.g. Loose clamp on secondary scaffold deck"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700"
              />
            </div>

            {/* Location Area */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.locationArea} *</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Block C, Level 3 Stairwell"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700"
                />
              </div>
            </div>

            {/* Description with Voice Input Button */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">{t.hazardDescription} *</label>
                <VoiceInputButton
                  onTranscript={(text) => setDescription((prev) => (prev ? `${prev} ${text}` : text))}
                  targetFieldLabel="Hazard Description"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Describe the condition, immediate risks to personnel, and any provisional measures taken..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700 text-xs"
              />
            </div>

            {/* Photo Attachment (Sample or upload) */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.attachPhoto}</label>
              <div className="flex items-center gap-3">
                {photoUrl ? (
                  <div className="relative w-20 h-14 rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={photoUrl}
                      alt="Inspection hazard preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(undefined)}
                      className="absolute top-0 right-0 bg-slate-900/80 text-white text-[10px] px-1 rounded-bl"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('/src/assets/images/safety_inspection_scaffold_1793082558901.jpg')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 text-xs"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
                    <span>Attach Inspection Sample Photo</span>
                  </button>
                )}
                <span className="text-[11px] text-slate-400">Optional evidence</span>
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">Submit Anonymously</span>
                <span className="text-[11px] text-slate-500">Omits your name from supervisor notifications</span>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-teal-800 rounded cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>{t.submitHazardReport}</span>
            </button>
          </form>
        </div>

        {/* Right Tracker: List of Tracked Reports (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.hazardHistory}</h2>
              <p className="text-xs text-slate-500">Track escalation, review status, and maintenance action logs</p>
            </div>

            {/* Status Filter buttons */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
              {(['all', 'submitted', 'under_review', 'resolved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                    statusFilter === st
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredReports.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No safety reports found matching this filter in {sector}.
              </div>
            ) : (
              filteredReports.map((rep) => {
                const isCritical = rep.severity === 'critical';
                const isHigh = rep.severity === 'high';
                const isResolved = rep.status === 'resolved';

                return (
                  <div key={rep.id} className="p-5 hover:bg-slate-50/60 transition-colors space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {/* Unboxed metadata with typographic separators */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-mono font-bold text-teal-900">{rep.id}</span>
                          <span aria-hidden="true">·</span>
                          <span>{rep.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{rep.severity} Severity</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{rep.title}</h3>
                      </div>

                      {/* Status display */}
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded border capitalize shrink-0 ${
                          isResolved
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : rep.status === 'under_review'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {rep.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rep.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 pt-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{rep.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>Reported by: {rep.isAnonymous ? 'Confidential Worker' : rep.reporterName}</span>
                      </div>
                      <span className="font-mono">
                        {new Date(rep.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Action Taken or Supervisor Note */}
                    {(rep.actionTaken || rep.adminNotes) && (
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 text-xs text-slate-700 space-y-1">
                        {rep.adminNotes && (
                          <div>
                            <span className="font-semibold text-slate-900">Supervisor Assessment: </span>
                            {rep.adminNotes}
                          </div>
                        )}
                        {rep.actionTaken && (
                          <div className="text-emerald-900 font-medium">
                            <span className="font-semibold text-emerald-950">Action Logged: </span>
                            {rep.actionTaken}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
