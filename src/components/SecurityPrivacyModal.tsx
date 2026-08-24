import React from 'react';
import { ShieldCheck, Lock, MailCheck, Trash2, CheckCircle2, X, Github, RefreshCw } from 'lucide-react';

interface SecurityPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetAllData: () => void;
}

export const SecurityPrivacyModal: React.FC<SecurityPrivacyModalProps> = ({
  isOpen,
  onClose,
  onResetAllData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 relative overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Privacy & Security
            </h2>
            <p className="text-xs text-slate-500">
              Clear principles protecting your privacy, credentials, and career search
            </p>
          </div>
        </div>

        {/* Security Principles */}
        <div className="space-y-3.5 text-xs text-slate-600 mb-6">
          {/* Principle 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <MailCheck className="w-4 h-4 text-emerald-600" />
              <span>Your career search is personal.</span>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Your preferences are not shared with recruiters or other users. The application never accesses Gmail, Drive, contacts, or external mailboxes.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Your Gemini connection is used to power your personal AI requests.</span>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              When you enter a personal Gemini API key, it is held strictly in temporary session memory. It is never stored in a database, localStorage, or cookies, and is cleared when you disconnect or sign out.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Never enter your Google password here.</span>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              This application will never ask for your Google password or Gmail credentials. Google identity features and Gemini AI access remain strictly separate.
            </p>
          </div>

          {/* Principle 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>Session Isolation & Clean Start</span>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Every user session is isolated. You can clear your current preferences, temporary search results, and API credentials at any time by resetting your session.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              if (window.confirm('Wipe all session data, connected keys, and search history for a fresh start?')) {
                onResetAllData();
                onClose();
              }
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Data & Start Fresh</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
