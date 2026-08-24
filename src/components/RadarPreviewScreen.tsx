import React from 'react';
import { Target, MapPin, Sparkles, Zap, Compass, ArrowRight, ShieldCheck, Radio } from 'lucide-react';
import { UserProfile } from '../types';

interface RadarPreviewScreenProps {
  profile: UserProfile;
  onActivateRadar: () => void;
  onEditProfile: () => void;
}

export const RadarPreviewScreen: React.FC<RadarPreviewScreenProps> = ({
  profile,
  onActivateRadar,
  onEditProfile
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900 bg-grid-subtle relative overflow-hidden">
      {/* Top brand header */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-200/80 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs text-sm">
            🎯
          </div>
          <span className="text-lg font-extrabold text-slate-900 tracking-tight font-display">
            Just My <span className="text-blue-600">Type 🎯</span>
          </span>
        </div>
        <button
          onClick={onEditProfile}
          className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-3.5 py-1.5 rounded-xl transition cursor-pointer shadow-2xs"
        >
          Edit Preferences
        </button>
      </header>

      {/* Main Preview Container */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 py-10 flex-1 flex flex-col justify-center">
        {/* Title & Radar Status */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-2xs">
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span className="font-mono-data">YOUR TYPE IS READY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Your Profile Blueprint is Ready 🚀
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
            Configured with precision targeting for the Indian Tech Ecosystem.
          </p>
        </div>

        {/* Visual Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          {/* 🎯 Target Roles */}
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
              <span>🎯</span>
              <span>Target Role Profile</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.targetRoles && profile.targetRoles.length > 0 ? (
                profile.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>{role}</span>
                  </span>
                ))
              ) : (
                <span className="text-xs font-semibold text-slate-800">Product Manager</span>
              )}
            </div>
          </div>

          {/* 📍 Preferred Locations */}
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
              <span>📍</span>
              <span>Target Geographic Locations</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.preferredLocations && profile.preferredLocations.length > 0 ? (
                profile.preferredLocations.map((loc) => (
                  <span
                    key={loc}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{loc}</span>
                  </span>
                ))
              ) : (
                <span className="text-xs font-medium text-slate-500">Anywhere in India</span>
              )}
            </div>
          </div>

          {/* ✨ Primary Domain & Track */}
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
              <span>✨</span>
              <span>Selected Industry Track</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.targetDomain && profile.targetDomain.trim().length > 0 ? (
                profile.targetDomain.split(',').map((domain) => (
                  <span
                    key={domain.trim()}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{domain.trim()}</span>
                  </span>
                ))
              ) : (
                <span className="text-xs font-medium text-slate-500">All Domains</span>
              )}
            </div>
          </div>

          {/* ⚡ Experience Baseline */}
          <div>
            <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1.5">
              <span>⚡</span>
              <span>Experience Baseline ({profile.yearsExperience || 8} Years)</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {profile.resumeText || profile.careerGoal || 'Experience across Agile product execution, software delivery, and technical systems leadership.'}
            </p>
          </div>
        </div>

        {/* Transition message & High-Impact CTA */}
        <div className="text-center mt-7 space-y-3.5">
          <button
            id="power-up-radar-btn"
            onClick={onActivateRadar}
            className="w-full sm:w-auto px-9 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold transition shadow-md shadow-blue-600/25 inline-flex items-center justify-center gap-3 cursor-pointer group font-display"
          >
            <span>Activate Just My Type 🎯</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
          </button>

          <p className="text-xs text-slate-500 font-medium">
            Next: Connect your Gemini API Key for private live opportunity evaluation.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto px-6 py-5 text-center text-xs text-slate-500 border-t border-slate-200">
        Just My Type 🎯 &copy; {new Date().getFullYear()} — Find jobs that are actually your type.
      </footer>
    </div>
  );
};

