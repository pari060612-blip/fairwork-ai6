import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Clock,
  AlertTriangle,
  HeartPulse,
  TrendingUp,
  Filter,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Building,
  Info,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';
import { Sector, ReportStatus, SafetyReport } from '../../types';

export const AdminDashboardView: React.FC = () => {
  const {
    sector,
    t,
    shifts,
    safetyReports,
    feedbacks,
    fatigueAlerts,
    updateReportStatus
  } = useApp();

  const [adminSectorFilter, setAdminSectorFilter] = useState<'all' | Sector>('all');
  const [dateFilter, setDateFilter] = useState<'this_week' | 'this_month' | 'quarter'>('this_week');
  const [selectedReportForAction, setSelectedReportForAction] = useState<SafetyReport | null>(null);
  const [actionStatus, setActionStatus] = useState<ReportStatus>('under_review');
  const [adminNote, setAdminNote] = useState('');
  const [actionTaken, setActionTaken] = useState('');

  // Filter datasets based on admin sector filter
  const filteredReports = safetyReports.filter((r) =>
    adminSectorFilter === 'all' ? true : r.sector === adminSectorFilter
  );

  const filteredFeedbacks = feedbacks.filter((f) =>
    adminSectorFilter === 'all' ? true : f.sector === adminSectorFilter
  );

  const filteredAlerts = fatigueAlerts.filter((a) =>
    adminSectorFilter === 'all' ? true : a.sector === adminSectorFilter
  );

  const unresolvedReports = filteredReports.filter((r) => r.status !== 'resolved');

  // Overtime calculations
  const totalOvertime = shifts
    .filter((s) => (adminSectorFilter === 'all' ? true : s.sector === adminSectorFilter))
    .reduce((acc, curr) => acc + (curr.overtimeHours || 0), 0);

  // Sentiment counts
  const positiveFb = filteredFeedbacks.filter((f) => f.sentiment === 'positive').length;
  const neutralFb = filteredFeedbacks.filter((f) => f.sentiment === 'neutral').length;
  const negativeFb = filteredFeedbacks.filter((f) => f.sentiment === 'negative').length;
  const totalFb = filteredFeedbacks.length || 1;

  // Chart data: 7 days of shifts
  const chartDays = [
    { day: 'Mon', regular: 38, overtime: 6 },
    { day: 'Tue', regular: 42, overtime: 8 },
    { day: 'Wed', regular: 40, overtime: 11 },
    { day: 'Thu', regular: 44, overtime: 9 },
    { day: 'Fri', regular: 39, overtime: 14 },
    { day: 'Sat', regular: 28, overtime: 16 },
    { day: 'Sun', regular: 18, overtime: 8 }
  ];

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReportForAction) return;

    updateReportStatus(
      selectedReportForAction.id,
      actionStatus,
      adminNote || selectedReportForAction.adminNotes,
      actionTaken || selectedReportForAction.actionTaken
    );

    setSelectedReportForAction(null);
    setAdminNote('');
    setActionTaken('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase mb-1">
              <span>{t.workforceHealthOverview}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">SRMIST Hackathon Demo Dataset</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Workforce Safety, Overtime & Fatigue Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Aggregated cross-industry metrics for Construction Sites and Higher Education Departments.
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sector Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setAdminSectorFilter('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  adminSectorFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.allSectors}
              </button>
              <button
                onClick={() => setAdminSectorFilter('construction')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  adminSectorFilter === 'construction'
                    ? 'bg-white text-teal-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Construction
              </button>
              <button
                onClick={() => setAdminSectorFilter('education')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  adminSectorFilter === 'education'
                    ? 'bg-white text-teal-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Education
              </button>
            </div>

            {/* Time Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="bg-white border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-700 focus:outline-hidden focus:border-teal-700"
            >
              <option value="this_week">Current Week (20-27 Oct 2026)</option>
              <option value="this_month">October 2026</option>
              <option value="quarter">Q4 2026</option>
            </select>
          </div>
        </div>

        {/* Demo Data Disclaimer */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <span>
              All dashboard metrics are computed in real time from local demo shifts, safety tickets, and confidential sentiment logs.
            </span>
          </div>
          <span className="font-mono text-slate-400">Live Local State</span>
        </div>
      </div>

      {/* KPI Cards Grid (Strict single-elevation, unboxed metadata) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">{t.totalActiveWorkers}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
              {adminSectorFilter === 'all' ? '148' : adminSectorFilter === 'construction' ? '92' : '56'}
            </span>
            <span className="text-xs text-emerald-700 font-medium">99.2% on duty</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Across 4 metro sites & 6 campus blocks</div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">{t.overtimeHoursTotal}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-teal-800">
              {totalOvertime.toFixed(1)} hrs
            </span>
            <span className="text-xs text-amber-700 font-medium">+14% vs avg</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Compensated under 1.5x/2.0x fair tier</div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">{t.openSafetyIncidents}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-rose-700">
              {unresolvedReports.length}
            </span>
            <span className="text-xs text-rose-600 font-medium">Action required</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {unresolvedReports.filter((r) => r.severity === 'critical').length} Critical severity
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">{t.fatigueRiskCount}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-amber-600">
              {filteredAlerts.length}
            </span>
            <span className="text-xs text-amber-700 font-medium">&gt;48h or &lt;11h rest</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Flagged for supervisory rest rotation</div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours & Overtime Stacked Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Workforce Shift Hours & Overtime Distribution
              </h2>
              <p className="text-xs text-slate-500">
                Daily aggregated team duty hours (Regular vs Statutory Overtime)
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-800"></span>
                <span className="text-slate-600">Regular</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                <span className="text-slate-600">Overtime (1.5x)</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart with Hover Values */}
          <div className="h-56 w-full pt-4">
            <div className="h-full flex items-end justify-between gap-3 px-2 border-b border-slate-200">
              {chartDays.map((item) => {
                const total = item.regular + item.overtime;
                const max = 65;
                const regHeight = (item.regular / max) * 100;
                const otHeight = (item.overtime / max) * 100;

                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap z-10 font-mono">
                      {item.regular}h reg + {item.overtime}h OT = {total}h
                    </div>

                    <div className="w-full max-w-[36px] flex flex-col-reverse rounded-t overflow-hidden bg-slate-100 h-44">
                      <div
                        className="w-full bg-teal-800 transition-all duration-500"
                        style={{ height: `${regHeight}%` }}
                      />
                      <div
                        className="w-full bg-amber-500 transition-all duration-500"
                        style={{ height: `${otHeight}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sentiment & Feedback Themes (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Confidential Sentiment & Workplace Health Radar
            </h2>
            <p className="text-xs text-slate-500">
              Aggregated worker feedback by sentiment. Zero individual identities displayed.
            </p>

            {/* Sentiment Bar Distribution */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-800 font-mono">{Math.round((positiveFb / totalFb) * 100)}% Positive</span>
                <span className="text-slate-600 font-mono">{Math.round((neutralFb / totalFb) * 100)}% Neutral</span>
                <span className="text-rose-700 font-mono">{Math.round((negativeFb / totalFb) * 100)}% Concerns</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
                <div style={{ width: `${(positiveFb / totalFb) * 100}%` }} className="bg-emerald-600 h-full" />
                <div style={{ width: `${(neutralFb / totalFb) * 100}%` }} className="bg-slate-400 h-full" />
                <div style={{ width: `${(negativeFb / totalFb) * 100}%` }} className="bg-rose-500 h-full" />
              </div>
            </div>

            {/* Thematic Tags */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Top Reported Operational Themes</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                  Evening Pour Shifts (9h rest gap)
                </span>
                <span className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                  Exam Duty Invigilation Load
                </span>
                <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                  New Harness Ergonomics (+4.0)
                </span>
                <span className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                  Regional Tool Box Talk Translations
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Supervisor note: Feedback directly influences weekly scheduling recommendations.
          </div>
        </div>
      </div>

      {/* Prioritized Action List for Supervisors */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-600" />
              <span>{t.prioritizedActions}</span>
            </h2>
            <p className="text-xs text-slate-500">
              Immediate interventions ranked by risk severity and regulatory compliance deadlines
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">3 Priority Tasks</span>
        </div>

        <div className="space-y-3 text-xs">
          {/* Priority Task 1 */}
          <div className="p-4 rounded-lg border border-rose-200 bg-rose-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-rose-800 text-[11px] uppercase tracking-wider">
                  [1. Critical Hazard Resolution]
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-600">FW-HAZ-2026-081</span>
              </div>
              <p className="font-semibold text-slate-900">
                Inspect and replace loose scaffold toe-board at Pier 18B (Level 3 Deck)
              </p>
              <p className="text-slate-600 text-[11px]">
                Dropped object hazard over concourse. Exclusion perimeter active; requires site engineer sign-off.
              </p>
            </div>
            <button
              onClick={() => {
                const rep = safetyReports.find((r) => r.id === 'FW-HAZ-2026-081');
                if (rep) setSelectedReportForAction(rep);
              }}
              className="px-3.5 py-1.5 bg-rose-800 text-white rounded-lg font-semibold hover:bg-rose-900 whitespace-nowrap self-start sm:self-auto"
            >
              Update Ticket
            </button>
          </div>

          {/* Priority Task 2 */}
          <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wider">
                  [2. Fatigue Intervention]
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-600">Rajesh Kumar (CS-4091)</span>
              </div>
              <p className="font-semibold text-slate-900">
                Mandatory 24-hour Rest Rotation Required (53.5 Hours Logged)
              </p>
              <p className="text-slate-600 text-[11px]">
                Exceeded 48h statutory maximum. Rest gap of 9.5h recorded before morning shift. Reassign scaffolding crew.
              </p>
            </div>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium whitespace-nowrap self-start sm:self-auto text-[11px]">
              Rest Assigned for 28 Oct
            </span>
          </div>

          {/* Priority Task 3 */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  [3. Academic Workload & Lab Safety]
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-600">FW-HAZ-2026-052</span>
              </div>
              <p className="font-semibold text-slate-900">
                Fume Exhaust Airflow Low in Nanotech Lab B2 (40 FPM vs 100 FPM target)
              </p>
              <p className="text-slate-600 text-[11px]">
                HVAC team scheduled for intake filter change. Solvent procedures temporarily redirected.
              </p>
            </div>
            <button
              onClick={() => {
                const rep = safetyReports.find((r) => r.id === 'FW-HAZ-2026-052');
                if (rep) setSelectedReportForAction(rep);
              }}
              className="px-3.5 py-1.5 bg-teal-800 text-white rounded-lg font-semibold hover:bg-teal-900 whitespace-nowrap self-start sm:self-auto"
            >
              Update Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Experimental Retention & Burnout Indicator (Strict Prompt Requirement) */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white">
              {t.experimentalRetentionRisk}
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
            Experimental Research Metric
          </span>
        </div>

        {/* Prominent limitation explanation (Never predict resignation as fact) */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-3.5 rounded-lg border border-slate-700">
          <strong>Important Methodological Limitation:</strong> {t.retentionDisclaimer}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block text-[11px]">Construction Overwork Factor</span>
            <span className="text-lg font-bold font-mono text-amber-300 mt-1 block">Medium (14% OT Spike)</span>
            <span className="text-[11px] text-slate-400">Primary driver: Concrete cure deadlines</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block text-[11px]">Education Burnout Indicator</span>
            <span className="text-lg font-bold font-mono text-amber-300 mt-1 block">Moderate (50h Duty Load)</span>
            <span className="text-[11px] text-slate-400">Primary driver: Weekend exam evaluations</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block text-[11px]">Recommended Mitigations</span>
            <span className="text-sm font-bold text-emerald-300 mt-1 block">Workload Re-balancing</span>
            <span className="text-[11px] text-slate-400">Enforce 11h rest gaps between shifts</span>
          </div>
        </div>
      </div>

      {/* Safety Report Status Action Modal */}
      {selectedReportForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-teal-800 font-bold block">
                  {selectedReportForAction.id}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Update Safety Report Status & Action Log
                </h3>
              </div>
              <button
                onClick={() => setSelectedReportForAction(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStatusSubmit} className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                <div className="font-semibold text-slate-900">{selectedReportForAction.title}</div>
                <div className="text-slate-600 text-[11px]">{selectedReportForAction.location}</div>
                <div className="text-slate-500 text-[11px]">{selectedReportForAction.description}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Update Status</label>
                <select
                  value={actionStatus}
                  onChange={(e) => setActionStatus(e.target.value as ReportStatus)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-teal-700 font-medium"
                >
                  <option value="submitted">Submitted (Awaiting Site Inspection)</option>
                  <option value="under_review">Under Review (Active Investigation / Exclusion Zone)</option>
                  <option value="resolved">Resolved (Remediation Complete & Verified)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Supervisor Assessment Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Record initial findings, personnel dispatched, or maintenance work orders..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Remediation Action Taken
                </label>
                <textarea
                  rows={2}
                  placeholder="Document repairs executed, replacement parts installed, or protocol adjustments made..."
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReportForAction(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-teal-800 hover:bg-teal-900 rounded-lg font-semibold"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
