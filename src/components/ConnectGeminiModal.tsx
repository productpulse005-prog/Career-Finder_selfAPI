import React, { useState } from 'react';
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  Sparkles,
  ExternalLink,
  Lock,
  Zap,
  Info
} from 'lucide-react';

interface ConnectGeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  userApiKey: string | null;
  onConnectKey: (key: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  onRemoveKey: () => void;
  isValidating: boolean;
  validationError: string | null;
  successMessage: string | null;
}

export const ConnectGeminiModal: React.FC<ConnectGeminiModalProps> = ({
  isOpen,
  onClose,
  userApiKey,
  onConnectKey,
  onRemoveKey,
  isValidating,
  validationError,
  successMessage
}) => {
  const [inputKey, setInputKey] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isConnected = Boolean(userApiKey);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const trimmed = inputKey.trim();
    if (!trimmed) {
      setLocalError('Please enter a valid Gemini API key.');
      return;
    }

    const result = await onConnectKey(trimmed);
    if (result.success) {
      setInputKey('');
    }
  };

  const handleRemove = () => {
    onRemoveKey();
    setInputKey('');
    setLocalError(null);
  };

  return (
    <div
      id="connect-gemini-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        id="connect-gemini-modal-container"
        className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col text-slate-900 relative"
      >
        {/* Modal Header */}
        <div className="bg-slate-50 text-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-display">
                Connect Gemini API
                {isConnected && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Connected
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-500">
                Bring Your Own Key (BYOK) • Personal Session Execution
              </p>
            </div>
          </div>
          <button
            id="close-connect-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs text-slate-700 relative z-10">
          {/* Explanatory banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 leading-relaxed text-xs">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 text-xs mb-1 font-display">
                  Your Gemini API key is used directly to run personal AI requests.
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Your usage and quota are determined by your personal Gemini API account. All AI workflows (Live 7-Day Radar, Strategic Fit Analysis, Domain Mapper, and Outreach generation) run securely with your key.
                </p>
              </div>
            </div>
          </div>

          {/* Active Key Status View */}
          {isConnected ? (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs font-display">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Active Gemini API Session</span>
                </div>
                <span className="text-[10px] font-mono-data font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Verified & Ready
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Your key is verified in memory for this session and will automatically execute live searches. Key text is masked and never permanently stored.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono-data text-slate-500 text-xs tracking-widest select-none">
                  ••••••••••••••••••••••••••••••••
                </div>
                <button
                  id="remove-api-key-btn"
                  type="button"
                  onClick={handleRemove}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove key</span>
                </button>
              </div>
            </div>
          ) : (
            /* Connect Form */
            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <label
                  htmlFor="gemini-key-input"
                  className="block text-[11px] font-mono-data font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Enter your Gemini API key
                </label>
                <div className="relative">
                  <input
                    id="gemini-key-input"
                    type="password"
                    autoComplete="off"
                    value={inputKey}
                    onChange={(e) => {
                      setInputKey(e.target.value);
                      setLocalError(null);
                    }}
                    placeholder="Paste your Gemini API key (AIzaSy...)"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono-data transition"
                    disabled={isValidating}
                  />
                  <div className="absolute right-3.5 top-3 text-slate-400 pointer-events-none">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {(localError || validationError) && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-rose-900 text-xs animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[11px] uppercase tracking-wider text-rose-800">Validation Notice</div>
                    <div className="text-[11px] mt-0.5 text-rose-700">{localError || validationError}</div>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-emerald-800 text-xs animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-semibold">{successMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 gap-2">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-bold"
                >
                  <span>Get a Gemini API Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    id="connect-api-key-btn"
                    type="submit"
                    disabled={isValidating || !inputKey.trim()}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition shadow-xs disabled:opacity-50 cursor-pointer font-display"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-white ${isValidating ? 'animate-spin' : ''}`} />
                    <span>{isValidating ? 'Verifying Key...' : 'Connect Key'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Privacy & In-Memory Guarantee Checklist */}
          <div className="border-t border-slate-200 pt-3 mt-2 space-y-2 text-[10px] text-slate-500">
            <div className="font-mono-data font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Security & In-Memory Policy</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-slate-600 leading-tight">
              <li>
                <span className="font-semibold text-slate-800">In-Memory Only:</span> Resides exclusively in client session memory during your active tab visit.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Zero Storage:</span> Never written to disk, database, or third-party servers.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Direct Quota:</span> All Gemini 3.7 Flash calls are billed directly to your own account quota.
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs relative z-10">
          <span className="text-[10px] font-mono-data text-slate-500">
            STATUS: {isConnected ? 'ACTIVE SESSION' : 'NOT CONNECTED'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
