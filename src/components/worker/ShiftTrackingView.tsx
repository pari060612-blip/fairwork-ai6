import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  QrCode,
  Clock,
  MapPin,
  CheckCircle,
  Calendar,
  AlertCircle,
  Info,
  Camera,
  KeyRound,
  X
} from 'lucide-react';
import { ShiftRecord } from '../../types';

export const ShiftTrackingView: React.FC = () => {
  const { sector, t, activeWorker, shifts, punchAttendance } = useApp();
  const [selectedShiftForQR, setSelectedShiftForQR] = useState<ShiftRecord | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Filter shifts for active worker and current sector
  const workerShifts = shifts.filter((s) => s.workerId === activeWorker.id && s.sector === sector);

  // Find active or upcoming shift
  const currentShift = workerShifts.find((s) => s.status === 'checked_in') ||
    workerShifts.find((s) => s.status === 'scheduled') ||
    workerShifts[0];

  const totalHoursWorked = workerShifts
    .filter((s) => s.status === 'completed' || s.status === 'checked_in')
    .reduce((acc, curr) => acc + (curr.totalHours || 0), 0);

  const totalOvertime = workerShifts
    .filter((s) => s.status === 'completed')
    .reduce((acc, curr) => acc + (curr.overtimeHours || 0), 0);

  const handleSimulateScan = () => {
    if (!selectedShiftForQR) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      punchAttendance(selectedShiftForQR.id, 'in', 'Simulated QR station check-in verified');
      setSelectedShiftForQR(null);
    }, 1200);
  };

  const handleManualPunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShiftForQR) return;
    punchAttendance(selectedShiftForQR.id, 'in', `Manual station code punch: ${manualCode || 'STN-PUNCH-DEFAULT'}`);
    setSelectedShiftForQR(null);
    setManualCode('');
  };

  const stationCode = sector === 'construction' ? 'STN-METRO-PIER18-QR' : 'STN-SRM-LAB-B2-QR';

  return (
    <div className="space-y-6">
      {/* Contextual Banner */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase mb-1">
              <span>{sector === 'construction' ? 'Construction Operations' : 'Academic & Lab Operations'}</span>
              <span aria-hidden="true">·</span>
              <span>{activeWorker.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t.shiftSchedule}
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Track working hours accurately with transparent overtime logging. Check in to scheduled shifts using the simulated QR station.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap md:flex-col gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
              <span className="text-slate-500 block">Logged This Week</span>
              <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                {totalHoursWorked.toFixed(1)} hrs
              </span>
              <span className="text-slate-500 block text-[11px] mt-0.5">
                Target: {activeWorker.weeklyHoursLimit} hrs max
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
              <span className="text-slate-500 block">{t.overtime}</span>
              <span className="text-lg font-bold font-mono tabular-nums text-teal-700">
                +{totalOvertime.toFixed(1)} hrs
              </span>
              <span className="text-slate-500 block text-[11px] mt-0.5">
                Paid at 1.5x / 2.0x rates
              </span>
            </div>
          </div>
        </div>

        {/* Clear Notice about Simulated Attendance */}
        <div className="bg-teal-50/70 border-t border-teal-100 px-6 py-2.5 flex items-center gap-2.5 text-xs text-teal-900">
          <Info className="w-4 h-4 shrink-0 text-teal-700" />
          <span>
            <strong>Transparency Notice:</strong> All check-in timestamps and QR scans are locally simulated for this hackathon preview. FairWork AI does not track personal hardware GPS or access unauthorized device biometrics.
          </span>
        </div>
      </div>

      {/* Current / Active Shift Hero Card */}
      {currentShift && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-700">{currentShift.date}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {currentShift.scheduledStart} - {currentShift.scheduledEnd}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {currentShift.roleTitle}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>{currentShift.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentShift.status === 'scheduled' && (
                <button
                  onClick={() => setSelectedShiftForQR(currentShift)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-colors whitespace-nowrap"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{t.checkIn}</span>
                </button>
              )}

              {currentShift.status === 'checked_in' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded">
                    Checked in at {currentShift.actualCheckIn}
                  </span>
                  <button
                    onClick={() => punchAttendance(currentShift.id, 'out', 'Shift ended normally')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>{t.checkOut}</span>
                  </button>
                </div>
              )}

              {currentShift.status === 'completed' && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    Completed ({currentShift.actualCheckIn} - {currentShift.actualCheckOut})
                  </span>
                </div>
              )}
            </div>
          </div>

          {currentShift.notes && (
            <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-700">Supervisor Shift Briefing: </span>
              {currentShift.notes}
            </div>
          )}
        </div>
      )}

      {/* Shifts History Log */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Attendance & Shift Records</h3>
            <p className="text-xs text-slate-500">Every logged punch and verified overtime interval is permanently preserved</p>
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-500">
            {workerShifts.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Date & Shift</th>
                <th className="py-3 px-4">Location / Station</th>
                <th className="py-3 px-4 text-center">Scheduled</th>
                <th className="py-3 px-4 text-center">Actual In / Out</th>
                <th className="py-3 px-4 text-right">Overtime</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {workerShifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{shift.date}</div>
                    <div className="text-[11px] text-slate-500">{shift.roleTitle}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                    {shift.location}
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-600">
                    {shift.scheduledStart} - {shift.scheduledEnd}
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums">
                    {shift.actualCheckIn ? (
                      <span className="text-slate-900">
                        {shift.actualCheckIn}
                        {shift.actualCheckOut ? ` → ${shift.actualCheckOut}` : ' (Active)'}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {shift.overtimeHours > 0 ? (
                      <span className="text-teal-800 font-semibold">
                        +{shift.overtimeHours.toFixed(2)}h
                      </span>
                    ) : (
                      <span className="text-slate-400">0.0h</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {shift.status === 'completed' && (
                      <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                        {t.completed}
                      </span>
                    )}
                    {shift.status === 'checked_in' && (
                      <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-medium border border-teal-200">
                        {t.checkedIn}
                      </span>
                    )}
                    {shift.status === 'scheduled' && (
                      <button
                        onClick={() => setSelectedShiftForQR(shift)}
                        className="text-[11px] text-teal-800 hover:text-teal-950 font-semibold underline underline-offset-2"
                      >
                        {t.checkIn}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated QR Check-in Modal */}
      {selectedShiftForQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {t.qrModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedShiftForQR(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700">
                <div className="font-semibold text-slate-900 mb-1">
                  Target Station: {selectedShiftForQR.location}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Station Hardware ID: {stationCode}
                </div>
              </div>

              {/* Virtual Scanner Box */}
              <div className="relative aspect-4/3 bg-slate-950 rounded-lg overflow-hidden flex flex-col items-center justify-center text-white border border-slate-800">
                {/* Viewfinder corner guides */}
                <div className="w-48 h-48 border-2 border-teal-400/80 rounded-lg relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-teal-500/10"></div>
                  {/* Laser line animation */}
                  <div className={`absolute left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_8px_#2dd4bf] transition-all duration-1000 ${
                    isScanning ? 'top-full animate-bounce' : 'top-1/2'
                  }`} />
                  <QrCode className="w-24 h-24 text-white/40" />
                </div>
                <div className="absolute bottom-3 text-center px-4">
                  <span className="text-[11px] text-teal-200 font-mono">
                    {isScanning ? 'Decoding station signature...' : 'Align station QR within viewbox'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" />
                  <span>{isScanning ? 'Processing Attendance...' : 'Simulate Camera QR Detection'}</span>
                </button>

                {/* Manual station code entry fallback */}
                <form onSubmit={handleManualPunch} className="pt-2 border-t border-slate-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Or enter station badge ID (e.g. STN-401)"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-hidden focus:border-teal-700"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200 flex items-center gap-1"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Punch</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Transparency Notice */}
              <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <span>{t.qrModalNotice}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
