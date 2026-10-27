import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  HelpCircle,
  Calculator,
  Download,
  AlertTriangle,
  Building,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const PayslipView: React.FC = () => {
  const { sector, language, t, activeWorker, payslips } = useApp();
  const [simulatedOT, setSimulatedOT] = useState<number>(10);
  const [showExplanationModal, setShowExplanationModal] = useState<string | null>(null);

  // Active worker's payslip
  const payslip = payslips.find((p) => p.workerId === activeWorker.id && p.sector === sector) || payslips[0];

  // Dynamic calculations for overtime simulator
  const simHourlyRate = activeWorker.hourlyRate;
  const simRegularHours = 160;
  const simBase = simHourlyRate * simRegularHours;
  const simOTPay = simulatedOT * (simHourlyRate * 1.5);
  const simAllowance = sector === 'construction' ? 2500 : 3200;
  const simGross = simBase + simOTPay + simAllowance;
  const simEPF = Math.round(simBase * 0.12);
  const simESI = sector === 'construction' ? Math.round(simGross * 0.0075) : 0;
  const simTotalDeductions = simEPF + simESI + 200 + 150;
  const simNet = simGross - simTotalDeductions;

  return (
    <div className="space-y-6">
      {/* Header and Disclaimers */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase mb-1">
              <span>{t.payslipTitle}</span>
              <span aria-hidden="true">·</span>
              <span>{payslip.month} {payslip.year}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {activeWorker.name} ({activeWorker.badgeNumber})
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {activeWorker.roleTitle} · {activeWorker.department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Mandatory Sample Notice */}
        <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
          <div>
            <span className="font-semibold">{t.payslipNotice}</span>
            <div className="text-[11px] text-amber-800 mt-0.5">
              Disbursed to: {payslip.bankAccountMasked} on {payslip.disbursementDate}. Status: Verified Direct Deposit.
            </div>
          </div>
        </div>
      </div>

      {/* Main Payslip Breakdown Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Detailed Ledger (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Transparent Earnings & Deductions Breakdown</span>
            <span className="text-xs text-slate-500 font-mono">Currency: INR (₹)</span>
          </div>

          <div className="p-6 space-y-6">
            {/* Earnings Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-3 flex items-center justify-between">
                <span>1. Gross Earnings</span>
                <span className="text-slate-500 lowercase font-normal">Calculated from verified shift logs</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900">{t.basePay}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {payslip.regularHoursWorked} regular hours @ ₹{payslip.hourlyRate}/hr
                    </div>
                  </div>
                  <div className="font-mono tabular-nums font-semibold text-slate-900 text-sm">
                    ₹{payslip.basePay.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-teal-50/60 border border-teal-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-medium text-teal-950">
                      <span>{t.overtimePay}</span>
                      <button
                        onClick={() => setShowExplanationModal('ot')}
                        className="text-teal-700 hover:text-teal-900"
                        title="Explain overtime formula"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-teal-800 font-mono">
                      {payslip.overtimeHours} hrs @ ₹{(payslip.hourlyRate * payslip.overtimeRateMultiplier).toFixed(0)}/hr (1.5x)
                    </div>
                  </div>
                  <div className="font-mono tabular-nums font-bold text-teal-900 text-sm">
                    +₹{payslip.overtimePay.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900">{t.allowances}</div>
                    <div className="text-[11px] text-slate-500">
                      {sector === 'construction'
                        ? 'High-altitude scaffolding & heat hydration allowance'
                        : 'Senior lab coordinator & safety protocol stipend'}
                    </div>
                  </div>
                  <div className="font-mono tabular-nums font-semibold text-slate-900 text-sm">
                    +₹{payslip.hazardOrSpecialAllowance.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-semibold text-xs">
                  <span className="text-slate-800">{t.grossSalary}</span>
                  <span className="font-mono tabular-nums text-slate-950 text-base">
                    ₹{payslip.grossPay.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Deductions Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-3 flex items-center justify-between">
                <span>2. Statutory Deductions</span>
                <span className="text-slate-500 lowercase font-normal">Social security & mandatory protections</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-900">
                      <span>{t.epfDeduction}</span>
                      <button
                        onClick={() => setShowExplanationModal('epf')}
                        className="text-slate-400 hover:text-slate-600"
                        title="Explain EPF deduction"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Govt Employees Provident Fund (12% of basic). Matched by employer.
                    </div>
                  </div>
                  <div className="font-mono tabular-nums font-medium text-rose-800">
                    -₹{payslip.deductions.epf.toLocaleString()}
                  </div>
                </div>

                {payslip.deductions.esi > 0 && (
                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 font-medium text-slate-900">
                        <span>{t.esiDeduction}</span>
                        <button
                          onClick={() => setShowExplanationModal('esi')}
                          className="text-slate-400 hover:text-slate-600"
                          title="Explain ESI health deduction"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Employees State Insurance medical healthcare scheme (0.75%).
                      </div>
                    </div>
                    <div className="font-mono tabular-nums font-medium text-rose-800">
                      -₹{payslip.deductions.esi.toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900">Professional Tax & Labour Welfare</div>
                    <div className="text-[11px] text-slate-500">State statutory council standard contribution</div>
                  </div>
                  <div className="font-mono tabular-nums font-medium text-rose-800">
                    -₹{(payslip.deductions.professionalTax + payslip.deductions.welfareFund).toLocaleString()}
                  </div>
                </div>

                {payslip.deductions.tdsTax > 0 && (
                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                    <div>
                      <div className="font-medium text-slate-900">TDS Income Tax Withholding</div>
                      <div className="text-[11px] text-slate-500">Estimated slab deduction</div>
                    </div>
                    <div className="font-mono tabular-nums font-medium text-rose-800">
                      -₹{payslip.deductions.tdsTax.toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-semibold text-xs">
                  <span className="text-slate-800">{t.deductions}</span>
                  <span className="font-mono tabular-nums text-rose-700 text-sm">
                    -₹{payslip.totalDeductions.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Pay Callout */}
            <div className="p-4 rounded-xl bg-teal-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-200 font-semibold block">
                  {t.netPayable}
                </span>
                <span className="text-[11px] text-teal-100">
                  Directly credited without concealed cuts
                </span>
              </div>
              <div className="font-mono tabular-nums font-extrabold text-2xl sm:text-3xl">
                ₹{payslip.netPay.toLocaleString()}
              </div>
            </div>

            {/* Trilingual Explanation Box */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                <span>Plain Language Explanation ({language.toUpperCase()})</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {payslip.explanationNotes[language] || payslip.explanationNotes.en}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Overtime & Wage Theft Protection Simulator */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Calculator className="w-4 h-4 text-teal-700" />
              <h3 className="font-bold text-sm text-slate-900">{t.simulateOvertime}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Understand how each overtime hour directly impacts your take-home pay based on your statutory ₹{simHourlyRate}/hr rate.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5">
                  <span>Simulated Extra Hours:</span>
                  <span className="font-mono tabular-nums text-teal-800">{simulatedOT} hours</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={simulatedOT}
                  onChange={(e) => setSimulatedOT(Number(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>0 hrs</span>
                  <span>20 hrs</span>
                  <span>40 hrs (Overwork Cap)</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Overtime Rate (1.5x):</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    ₹{(simHourlyRate * 1.5).toFixed(0)}/hr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Additional Earnings:</span>
                  <span className="font-mono tabular-nums font-semibold text-teal-800">
                    +₹{simOTPay.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Projected Gross:</span>
                  <span className="font-mono tabular-nums text-slate-700">
                    ₹{simGross.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Projected Net Pay:</span>
                  <span className="font-mono tabular-nums font-bold text-teal-900 text-sm">
                    ₹{simNet.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Security Rights Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-700 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Know Your Statutory Rights</span>
            </h4>
            <div className="space-y-2 text-[11px] text-slate-600 leading-normal">
              <p>
                <strong>1. Overtime Threshold:</strong> Any duty exceeding 8 hours/day or 48 hours/week legally mandates minimum 1.5x to 2x wage rate.
              </p>
              <p>
                <strong>2. Transparent Deductions:</strong> No employer is permitted to deduct for broken tools or safety equipment; all such charges are illegal.
              </p>
              <p>
                <strong>3. EPF Match:</strong> For every ₹100 deducted for your Provident Fund, your employer is legally obliged to contribute an equivalent matching amount.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Dialog */}
      {showExplanationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {showExplanationModal === 'ot' && 'How Overtime Pay is Calculated'}
                {showExplanationModal === 'epf' && 'Understanding Your EPF Deduction'}
                {showExplanationModal === 'esi' && 'Understanding ESI Healthcare'}
              </h3>
              <button
                onClick={() => setShowExplanationModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed space-y-3">
              {showExplanationModal === 'ot' && (
                <>
                  <p>{t.overtimeRateExplained}</p>
                  <div className="bg-slate-50 p-2.5 rounded font-mono text-[11px] border border-slate-100">
                    Formula: Regular Hourly Rate × 1.5 × Overtime Hours Logged
                  </div>
                </>
              )}
              {showExplanationModal === 'epf' && (
                <>
                  <p>{t.epfExplained}</p>
                  <p>You can check your accumulated EPF balance anytime on the EPFO Member e-Sewa portal using your Universal Account Number (UAN).</p>
                </>
              )}
              {showExplanationModal === 'esi' && (
                <>
                  <p>{t.esiExplained}</p>
                  <p>Covers outpatient visits, maternity support, occupational disease therapy, and hospitalization for wage earners earning under ₹21,000/month.</p>
                </>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowExplanationModal(null)}
                className="w-full py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
