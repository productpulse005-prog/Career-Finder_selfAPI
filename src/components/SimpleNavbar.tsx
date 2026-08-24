import React from 'react';
import { Compass, Lock, CheckCircle2, ShieldCheck, RefreshCw, Radio } from 'lucide-react';
import { UserProfile, AuthUser } from '../types';

interface SimpleNavbarProps {
  activeTab: 'home' | 'matches' | 'preferences';
  onSelectTab: (tab: 'home' | 'matches' | 'preferences') => void;
  profile: UserProfile;
  authUser: AuthUser | null;
  hasApiKey: boolean;
  onOpenAIConnect: () => void;
  onEditProfile: () => void;
  onSignOut: () => void;
  onOpenSecurityVault?: () => void;
  onResetAllData?: () => void;
}

export const SimpleNavbar: React.FC<SimpleNavbarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  authUser,
  hasApiKey,
  onOpenAIConnect,
  onEditProfile,
  onSignOut,
  onOpenSecurityVault,
  onResetAllData
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 shadow-xs backdrop-blur-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Title */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform text-sm">
              🎯
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight font-display flex items-center gap-1.5">
                Just My <span className="text-blue-600">Type 🎯</span>
                <span className="text-[9px] font-mono-data font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
                  LIVE
                </span>
              </span>
            </div>
          </div>

          {/* Bold Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="nav-home-btn"
              onClick={() => onSelectTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer font-display ${
                activeTab === 'home'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Your Type Feed
            </button>
            <button
              id="nav-matches-btn"
              onClick={() => onSelectTab('matches')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer font-display ${
                activeTab === 'matches'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Top Matches
            </button>
            <button
              id="nav-preferences-btn"
              onClick={() => onSelectTab('preferences')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer font-display ${
                activeTab === 'preferences'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Preferences
            </button>
          </nav>

          {/* Right Action Bar: Career Privacy Key Status & Identity */}
          <div className="flex items-center gap-2">
            {/* Security Vault Button */}
            {onOpenSecurityVault && (
              <button
                id="nav-security-vault-btn"
                onClick={onOpenSecurityVault}
                className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition cursor-pointer"
                title="Security & Privacy Vault (Zero Mailbox Access & No Key Logging)"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </button>
            )}

            {/* Career Privacy Key Status Badge */}
            <button
              id="nav-privacy-key-status-btn"
              onClick={onOpenAIConnect}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                hasApiKey
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 shadow-2xs'
                  : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
              title={hasApiKey ? 'Career Privacy Key Connected' : 'Connect Career Privacy Key'}
            >
              {hasApiKey ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline font-mono-data text-[11px]">Key Active</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline font-mono-data text-[11px]">Connect Key</span>
                </>
              )}
            </button>

            {/* Profile Avatar / User Info */}
            <button
              onClick={onEditProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
              title="Edit Profile"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px] font-extrabold font-mono-data">
                {authUser?.name ? authUser.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden md:inline truncate max-w-[110px]">
                {authUser?.name || 'My Profile'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

