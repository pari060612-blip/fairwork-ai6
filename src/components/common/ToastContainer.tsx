import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-lg border shadow-md transition-all flex items-start gap-3 ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : isWarning
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-slate-900 border-slate-800 text-white'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {!isSuccess && !isWarning && <Info className="w-4 h-4 text-teal-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold leading-tight">{toast.title}</div>
              {toast.description && (
                <div
                  className={`text-[11px] mt-1 leading-normal ${
                    isSuccess
                      ? 'text-emerald-800'
                      : isWarning
                      ? 'text-amber-800'
                      : 'text-slate-300'
                  }`}
                >
                  {toast.description}
                </div>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
