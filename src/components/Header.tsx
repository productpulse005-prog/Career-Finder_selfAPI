import React from 'react';
import {
  Compass,
  Sparkles,
  MapPin,
  FileDown,
  MessageSquare,
  UserCheck,
  ShieldCheck,
  Key,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  userApiKey: string | null;
  onOpenConnectModal: () => void;
  onOpenProfileModal: () => void;
  onOpenAdvisor: () => void;
  onOpenReport: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  userApiKey,
  onOpenConnectModal,
  onOpenProfileModal,
  onOpenAdvisor,
  onOpenReport,
  activeTab,
  setActiveTab
}) => {
  const tabs = [
    { id: 'overview', label: 'Domain & Career Map' },
    { id: 'companies', label: 'India Companies (20+)' },
    { id: 'jobs', label: 'Current Jobs & Matches' },
    { id: 'skills', label: 'PM Skills Matrix' },
    { id: 'tools', label: 'PM Tools' },
    { id: 'domain_deep_dive', label: 'Domain Knowledge' },
    { id: 'ai_pm', label: 'AI / GenAI PM' },
    { id: 'outreach', label: 'Outreach Generator' }
  ];

  const initials = profile.fullName
    ? profile.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'PM';

  const isKeyConnected = Boolean(userApiKey);

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white border-b border-slate-800 shadow-sm">
      {/* High Density Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-14 gap-2 sm:gap-3">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setActiveTab('overview')}
            id="brand-logo-btn"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-sm sm:text-base text-white shadow-xs">
              M
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                PM Career Mapper
                <span className="text-blue-400 font-normal text-xs sm:text-sm">// India AI</span>
              </h1>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 hidden sm:flex">
                <span className="text-emerald-400 font-medium">Verified India Hubs</span>
                <span>•</span>
                <span>{profile.targetDomain} Focus</span>
              </div>
            </div>
          </div>

          {/* Active User Persona & Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* BYOK Gemini API Key Status Button */}
            <button
              id="byok-header-btn"
              onClick={onOpenConnectModal}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all border ${
                isKeyConnected
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 shadow-xs'
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/50 shadow-xs animate-pulse'
              }`}
              title={
                isKeyConnected
                  ? 'Using your Gemini API key (Session Active)'
                  : 'Connect your Gemini API key to run AI workflows'
              }
            >
              {isKeyConnected ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Using your Gemini API key</span>
                  <span className="sm:hidden">Gemini Key ✓</span>
                </>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Connect Gemini API</span>
                  <span className="sm:hidden">Connect Key</span>
                </>
              )}
            </button>

            {/* User Profile Pill */}
            <button
              id="profile-toggle-btn"
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-left transition-colors"
              title="Click to edit candidate profile"
            >
              <div className="text-right hidden md:block">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Candidate</p>
                <p className="text-xs font-semibold text-slate-100 truncate max-w-[130px]">
                  {profile.fullName || 'Candidate'} • {profile.yearsExperience}y {profile.currentRole || 'SWE'}
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-700 border-2 border-blue-500 flex items-center justify-center font-bold text-[10px] text-blue-300">
                {initials}
              </div>
            </button>

            {/* AI Advisor Button */}
            <button
              id="ai-advisor-btn"
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>

            {/* Export Report Button */}
            <button
              id="export-report-btn"
              onClick={onOpenReport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>

        {/* High-Density Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar space-x-1 border-t border-slate-800/80 py-1 text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 font-semibold rounded text-[11px] sm:text-xs whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

