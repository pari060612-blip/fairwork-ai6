import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  Clock,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Info,
  Calendar,
  HeartPulse
} from 'lucide-react';

export const FatigueAlertsView: React.FC = () => {
  const {
    sector,
    t,
    activeWorker,
    fatigueAlerts,
    thresholds,
    updateThresholds,
    acknowledgeFatigueAlert
  } = useApp();

  const [showConfig, setShowConfig] = useState(false);
  const [tempWeekly, setTempWeekly] = useState(thresholds.maxWeeklyHours);
  const [tempRest, setTempRest] = useState(thresholds.minRestInterval);
  const [tempDaily, setTempDaily] = useState(thresholds.maxDailyHours);

  const workerAlerts = fatigueAlerts.filter(
    (a) => a.sector === sector && a.workerId === activeWorker.id
  );

  const activeAlert = workerAlerts[0];

  const handleSaveThresholds = (e: React.FormEvent) => {
    e.preventDefault();
    updateThresholds({
      maxWeeklyHours: Number(tempWeekly),
      minRestInterval: Number(tempRest),
      maxDailyHours: Number(tempDaily)
    });
    setShowConfig(false);
  };

  const weeklyHours = activeAlert ? activeAlert.weeklyHoursLogged : 42;
  const weeklyPct = Math.min(100, Math.round((weeklyHours / thresholds.maxWeeklyHours) * 100));
  const isOverWeeklyLimit = weeklyHours > thresholds.maxWeeklyHours;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase mb-1">
              <span>{t.fatigueAlertsTitle}</span>
              <span aria-hidden="true">·</span>
              <span>Accident & Burnout Prevention</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Workforce Fatigue & Shift Spacing Alerts
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Active Monitoring for {activeWorker.name} ({activeWorker.roleTitle})
            </p>
          </div>

          <button
            onClick={() => setShowConfig(!showConfig)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>{showConfig ? 'Hide Settings' : t.configureThresholds}</span>
          </button>
        </div>

        {/* Mandatory Medical Disclaimer (Strict Requirement) */}
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Safety & Compliance Notice:</strong> {t.fatigueDisclaimer}
          </p>
        </div>
      </div>

      {/* Configurable Thresholds Drawer */}
      {showConfig && (
        <form
          onSubmit={handleSaveThresholds}
          className="bg-white border border-teal-200 rounded-xl p-5 shadow-xs space-y-4 text-xs"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-700" />
              <span>Configure Operational Safety Thresholds (Demo Rules)</span>
            </h3>
            <span className="text-[11px] text-slate-500">Industry Standard: ILO & Factories Act</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Max Weekly Duty Hours
              </label>
              <input
                type="number"
                min="30"
                max="60"
                value={tempWeekly}
                onChange={(e) => setTempWeekly(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Default: 48h statutory maximum</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Min Rest Gap Between Shifts
              </label>
              <input
                type="number"
                min="8"
                max="16"
                value={tempRest}
                onChange={(e) => setTempRest(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Default: 11h minimum recovery gap</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Max Daily Shift Length
              </label>
              <input
                type="number"
                min="6"
                max="14"
                value={tempDaily}
                onChange={(e) => setTempDaily(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Default: 10h overtime ceiling</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="px-3.5 py-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-teal-800 text-white rounded-md font-semibold hover:bg-teal-900"
            >
              Save Thresholds
            </button>
          </div>
        </form>
      )}

      {/* Primary Fatigue Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Weekly Hours Load Gauge */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Weekly Duty Load</span>
            <span className={`font-mono tabular-nums font-bold ${isOverWeeklyLimit ? 'text-rose-700' : 'text-teal-800'}`}>
              {weeklyHours.toFixed(1)} / {thresholds.maxWeeklyHours} hrs
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isOverWeeklyLimit ? 'bg-rose-600' : weeklyPct > 80 ? 'bg-amber-500' : 'bg-teal-700'
              }`}
              style={{ width: `${weeklyPct}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Status: {isOverWeeklyLimit ? 'Exceeded Limit' : 'Within Limits'}</span>
            <span className="font-mono">{weeklyPct}% Capacity</span>
          </div>
        </div>

        {/* Rest Interval Check */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-700 block">Consecutive Shift Rest Gap</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {activeAlert ? activeAlert.lastRestIntervalHours : 13.5} hrs
            </span>
            <span className="text-xs text-slate-500">
              (Min target: {thresholds.minRestInterval} hrs)
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            {activeAlert && activeAlert.lastRestIntervalHours < thresholds.minRestInterval ? (
              <span className="text-rose-700 font-semibold">Short recovery gap detected between shifts</span>
            ) : (
              <span className="text-emerald-700 font-medium">Adequate sleep & recovery interval</span>
            )}
          </div>
        </div>

        {/* Consecutive Days Streak */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-700 block">Consecutive Days On Duty</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {activeAlert ? activeAlert.consecutiveDaysWorked : 4} days
            </span>
            <span className="text-xs text-slate-500">(Max recommended: 6 days)</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Mandatory 24-hour weekly rest day required after 6 consecutive days.
          </div>
        </div>
      </div>

      {/* Active Operational Warning Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-teal-800" />
          <span>Active Operational Safety Alerts for Current Sector</span>
        </h2>

        {workerAlerts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-semibold text-slate-800">No active fatigue warnings</p>
            <p className="text-slate-500 mt-0.5">
              Working hours and shift intervals are within healthy compliance limits.
            </p>
          </div>
        ) : (
          workerAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white border rounded-xl p-5 shadow-xs space-y-4 ${
                alert.severity === 'critical'
                  ? 'border-rose-300 bg-rose-50/20'
                  : alert.severity === 'high'
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs">
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      alert.severity === 'critical'
                        ? 'text-rose-600'
                        : alert.severity === 'high'
                        ? 'text-amber-600'
                        : 'text-teal-700'
                    }`}
                  />
                  <span className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    {alert.severity} Fatigue Alert · {alert.workerName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-500 text-[11px]">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {alert.acknowledgedBySupervisor ? (
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Supervisor Acknowledged
                  </span>
                ) : (
                  <button
                    onClick={() => acknowledgeFatigueAlert(alert.id)}
                    className="text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors self-start sm:self-auto"
                  >
                    Acknowledge Notice
                  </button>
                )}
              </div>

              {/* Reason for warning */}
              <div className="text-xs text-slate-700 space-y-1">
                <span className="font-semibold text-slate-900">Why was this alert triggered?</span>
                <p className="leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {alert.reason}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="text-xs text-teal-950 bg-teal-50/80 p-3.5 rounded-lg border border-teal-200 space-y-1">
                <span className="font-bold text-teal-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{t.recommendedAction}:</span>
                </span>
                <p className="leading-relaxed text-teal-900">
                  {alert.recommendation}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
