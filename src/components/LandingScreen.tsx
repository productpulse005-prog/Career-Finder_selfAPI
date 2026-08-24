import React from 'react';
import {
  Sparkles,
  Target,
  Compass,
  Lock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Radio,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface LandingScreenProps {
  onGetStartedWithGoogle: () => void;
  isSignedIn: boolean;
  userEmail?: string;
  userName?: string;
  onDirectEnterRadar?: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onGetStartedWithGoogle,
  isSignedIn,
  userEmail,
  userName,
  onDirectEnterRadar
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900 bg-grid-subtle relative overflow-hidden font-sans">
      {/* Top minimal brand bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 text-lg">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                Just My <span className="text-blue-600">Type</span> 🎯
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold tracking-wide bg-blue-50 text-blue-700 border border-blue-200">
                PRO 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Find jobs that are actually your type.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSignedIn && onDirectEnterRadar ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600 hidden sm:inline font-medium">
                Signed in as <strong className="text-slate-900">{userName || userEmail}</strong>
              </span>
              <button
                onClick={onDirectEnterRadar}
                className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-1.5"
              >
                <span>Open My Type</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onGetStartedWithGoogle}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Connect AI Key</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center">
        {/* Dynamic 7-Day Live Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-xs backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono-data uppercase tracking-wider text-[11px] text-slate-700 font-bold">
            Live 7-Day Discovery Active
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-bold">100% Verified Direct Portals</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.1] font-display mb-6">
          Find jobs that are <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600">
            actually your type.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8 font-normal">
          Stop scrolling dead job boards. Configure your target tech domains and let your personal AI uncover active openings posted in the <strong className="text-slate-900 font-semibold">past 7 days</strong> that are actually your type across different cities of India.
        </p>

        {/* Primary CTA & High-Impact Action Button */}
        <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
          <button
            id="landing-start-radar-btn"
            onClick={onGetStartedWithGoogle}
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-bold transition shadow-lg shadow-blue-600/25 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 group cursor-pointer font-display"
          >
            <span>Find Jobs That Are My Type 🎯</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
          </button>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Zero Mailbox Scrapes
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-blue-600" /> In-Memory Privacy
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-700" /> 7-Day Freshness
            </span>
          </div>
        </div>

        {/* 3 High-Impact Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14 text-left max-w-4xl w-full">
          {/* Pillar 1 */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-slate-300 hover:shadow-md transition group">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
              Laser Target Alignment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pinpoint target roles (AI PM, Technical PM, Platform PM) and exact Indian tech hubs with zero domain noise.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-slate-300 hover:shadow-md transition group">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-105 transition-transform">
              <Radio className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
              7-Day Fresh Openings
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every job is filtered for active requisition links posted within 7 days on verified official corporate careers portals.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-slate-300 hover:shadow-md transition group">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
              Quantified Fit Scores
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detailed AI evaluation of your exact strengths, skill gaps, compensation brackets, and tailored outreach drafts.
            </p>
          </div>
        </div>

        {/* Live Teaser Sample Card */}
        <div className="w-full max-w-3xl mt-10 bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
            <div className="flex items-center gap-2">
              <span className="font-mono-data text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                JUST MY TYPE MATCH 🎯
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                🟢 Posted 1 day ago • Active
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono-data font-extrabold text-xs border border-emerald-300">
              95% FIT SCORE
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900 font-display">
                Principal Product Manager — Azure Cloud Platforms
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-1 flex items-center gap-2">
                <span className="font-bold text-slate-900">Microsoft IDC</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> Hyderabad, Telangana
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-mono-data font-bold">₹48 - 72 LPA</span>
              </p>
            </div>
          </div>

          <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-semibold">AI Trajectory Insight: </strong>
              “Top tier leadership role building enterprise AI cloud infrastructure. Your 10+ years in technical architecture and platform execution gives you an immediate competitive advantage.”
            </div>
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-white/60">
        <div>Just My Type 🎯 &copy; {new Date().getFullYear()} — Find jobs that are actually your type</div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">Zero Recruiter Spam</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">Direct Verified Careers Portals</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-semibold">7-Day Freshness Guarantee</span>
        </div>
      </footer>
    </div>
  );
};


