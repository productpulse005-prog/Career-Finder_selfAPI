import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Target,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  ArrowLeft,
  X,
  CreditCard
} from 'lucide-react';

interface GeminiActivationFlowProps {
  onConnected: (apiKey: string) => void;
  onBack?: () => void;
  initialKey?: string | null;
}

export const GeminiActivationFlow: React.FC<GeminiActivationFlowProps> = ({
  onConnected,
  onBack,
  initialKey
}) => {
  // Screens: 'intro' (Meet your Career Privacy Key) | 'input' (Paste key) | 'success' (Celebration)
  const [screen, setScreen] = useState<'intro' | 'input' | 'success'>('intro');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [apiKey, setApiKey] = useState(initialKey || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Cleans quotes, prefixes, and whitespace from pasted API keys.
   */
  const cleanKeyInput = (raw: string) => {
    let key = raw.trim();
    key = key.replace(/^(GEMINI_API_KEY|API_KEY|VITE_GEMINI_API_KEY)\s*[:=]\s*/i, '');
    key = key.replace(/^Bearer\s+/i, '');
    key = key.replace(/^["'`]|["'`]$/g, '').trim();
    return key;
  };

  const handleLaunchRadar = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cleanKeyInput(apiKey);
    
    if (!cleaned) {
      setErrorMessage('Please paste your Gemini API key to activate Just My Type.');
      return;
    }
    
    if (cleaned.length < 15) {
      setErrorMessage('Key appears too short or incomplete. Please copy the full API key from Google AI Studio.');
      return;
    }

    setIsActivating(true);
    setErrorMessage(null);

    try {
      // Real-time verification call to check key validity and operational status
      const res = await fetch('/api/gemini/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': cleaned
        }
      });

      const data = await res.json();

      if (data.success) {
        setIsActivating(false);
        setScreen('success');

        setTimeout(() => {
          onConnected(cleaned);
        }, 1200);
      } else {
        setIsActivating(false);
        setErrorMessage(
          data.error ||
          'Could not verify this Gemini API key. Please check that the key is active in Google AI Studio and has available quota.'
        );
      }
    } catch {
      // Fallback: If network glitch on validation, allow user to proceed safely
      setIsActivating(false);
      setScreen('success');
      setTimeout(() => {
        onConnected(cleaned);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top minimal brand header */}
      <header className="w-full max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs text-sm">
            🎯
          </div>
          <span className="text-base font-bold text-slate-900 tracking-tight font-display">Just My Type 🎯</span>
        </div>
        {onBack && screen !== 'success' && (
          <button
            onClick={() => {
              if (screen === 'input') {
                setScreen('intro');
              } else {
                onBack();
              }
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-xl mx-auto px-6 py-6 flex-1 flex flex-col justify-center">
        {/* SCREEN 1: MEET YOUR CAREER PRIVACY KEY */}
        {screen === 'intro' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Main Intro Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-8 space-y-6">
              {/* Header */}
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 mb-3">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Privacy-First AI Connection</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Meet your Career Privacy Key 🔐
                </h1>
                <p className="text-sm font-semibold text-blue-600 mt-1">
                  Your AI. Your goals. Your career search.
                </p>
              </div>

              {/* Simple Language Explanation */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Your Career Privacy Key connects your own Gemini AI to Just My Type. It allows us to use your AI to analyze opportunities based on the preferences you just shared.
                </p>
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium">
                  💡 <strong>Important:</strong> Your Career Privacy Key does <u>NOT</u> contain your job preferences.
                </div>
              </div>

              {/* Visual Formula Box */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                    <span className="text-base block mb-1">🎯</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      YOUR PREFERENCES
                    </span>
                    <p className="text-xs font-semibold text-slate-800 mt-1">
                      “What you want”
                    </p>
                  </div>

                  <div className="flex items-center justify-center text-slate-400 font-bold text-lg">
                    +
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                    <span className="text-base block mb-1">🔐</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      CAREER PRIVACY KEY
                    </span>
                    <p className="text-xs font-semibold text-slate-800 mt-1">
                      “Access to your own AI”
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/70 text-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-950">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                      = YOUR TYPE 🎯 🚀
                    </span>
                    <p className="text-xs font-bold text-blue-900 mt-0.5">
                      “Personalized opportunities”
                    </p>
                  </div>
                </div>
              </div>

              {/* Expandable "How does this work?" Section */}
              <div className="border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setShowHowItWorks(!showHowItWorks)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between w-full py-1 cursor-pointer"
                >
                  <span>How does this work?</span>
                  {showHowItWorks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showHowItWorks && (
                  <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 leading-relaxed animate-in fade-in duration-150">
                    <p>
                      Your Career Privacy Key doesn't know what jobs you want.
                    </p>
                    <p>
                      You tell Just My Type your goals, experience, locations and interests.
                    </p>
                    <p>
                      Your Career Privacy Key simply allows Just My Type to use your own Gemini AI to analyze that information and find relevant opportunities.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy / Trust Section */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-slate-900">
                <Lock className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-extrabold uppercase tracking-wide">
                  Your career search is yours. 🔐
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    🎯 PERSONALIZED
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Your recommendations are based on your goals, experience and preferences.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    🔐 PRIVATE
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Your career interests are personal to you. They aren't shared with recruiters, employers or other users.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    💳 NO PAYMENT TO US
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    You use your own AI access. Just My Type does not charge you for Gemini usage.
                  </p>
                </div>
              </div>
            </div>

            {/* Ready to power your Radar activation section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 text-center space-y-4 shadow-xl">
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Ready to find jobs that are your type? ⚡
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Connect your Career Privacy Key and let your personal AI start finding opportunities made for you.
                </p>
              </div>

              <button
                id="connect-privacy-key-primary-btn"
                onClick={() => setScreen('input')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold transition shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🚀 Connect My Career Privacy Key</span>
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: CAREER PRIVACY KEY INPUT */}
        {screen === 'input' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-7 sm:p-8 animate-in fade-in zoom-in-95 duration-150 space-y-6">
            <div className="text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-2xs">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                Connect your Career Privacy Key 🔐
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Paste your Gemini API key here to connect your own AI.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-2 animate-in fade-in duration-100">
                <p className="font-semibold">{errorMessage}</p>
                <div className="pt-1.5 border-t border-red-200/60 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-red-600">Need a valid key?</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-red-700 hover:text-red-900 underline text-[11px]"
                  >
                    <span>Get free key in Google AI Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleLaunchRadar} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Career Privacy Key
                </label>
                <div className="relative">
                  <input
                    id="career-privacy-key-input"
                    type={showPassword ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste your key"
                    autoFocus
                    className="w-full pl-4 pr-11 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-900 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title={showPassword ? 'Hide key' : 'Show key'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="launch-career-radar-btn"
                disabled={isActivating || !apiKey.trim()}
                className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isActivating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting your AI...</span>
                  </>
                ) : (
                  <>
                    <span>✨ Launch Just My Type</span>
                  </>
                )}
              </button>
            </form>

            {/* Help for Non-Technical Users link */}
            <div className="pt-2 border-t border-slate-100 text-center flex items-center justify-center gap-1 text-xs">
              <span className="text-slate-500">Don't have your key yet?</span>
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                Show me how →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: SHORT CELEBRATION (SUCCESS) */}
        {screen === 'success' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              🎉 Your Type is live!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-3">
              Your AI is ready. Let's find opportunities that fit you.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-5">
              <span>Your Career Privacy Key is connected ✓</span>
            </div>

            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          </div>
        )}
      </main>

      {/* HELP MODAL: "Get your Career Privacy Key ✨" */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-left space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Get your Career Privacy Key ✨</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Your Career Privacy Key is your Gemini API key. It lets Just My Type use your own Gemini AI for your personal job search.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      Open Google AI Studio <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Sign in with your Google account</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Create your Gemini API key</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <span>Copy it</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <span>Return here and paste it</span>
                </div>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
              >
                Got it, let me paste my key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-3xl mx-auto px-6 py-6 text-center text-xs text-slate-400">
        Just My Type 🎯 &copy; {new Date().getFullYear()} — Find jobs that are actually your type.
      </footer>
    </div>
  );
};
