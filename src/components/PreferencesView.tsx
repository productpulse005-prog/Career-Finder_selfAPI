import React, { useState } from 'react';
import {
  Lock,
  Trash2,
  Save,
  CheckCircle2,
  MapPin,
  FileText,
  LogOut,
  Target,
  Clock,
  Briefcase,
  Layers,
  Check,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { UserProfile, AuthUser } from '../types';
import { checkDomainMismatch } from '../utils/domainValidation';

interface PreferencesViewProps {
  profile: UserProfile;
  authUser: AuthUser | null;
  onSaveProfile: (profile: UserProfile) => void;
  hasApiKey: boolean;
  onOpenAIConnect: () => void;
  onDisconnectAI: () => void;
  onSignOut: () => void;
  onOpenSecurityVault?: () => void;
  onResetAllData?: () => void;
}

export const PreferencesView: React.FC<PreferencesViewProps> = ({
  profile,
  authUser,
  onSaveProfile,
  hasApiKey,
  onOpenAIConnect,
  onDisconnectAI,
  onSignOut,
  onOpenSecurityVault,
  onResetAllData
}) => {
  const [activeSection, setActiveSection] = useState<'career' | 'privacy_key'>('career');

  // Interactive Career Preferences State
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    profile.targetRoles && profile.targetRoles.length > 0
      ? profile.targetRoles
      : ['Product Manager']
  );
  const [customRole, setCustomRole] = useState('');

  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    profile.preferredLocations && profile.preferredLocations.length > 0
      ? profile.preferredLocations
      : ['Hyderabad']
  );

  // Section 3: Primary Target Domain (Single Select Only)
  const getInitialDomain = () => {
    if (!profile.targetDomain) return 'Ecommerce';
    const first = profile.targetDomain.split(',')[0].trim();
    return first || 'Ecommerce';
  };

  const [selectedDomain, setSelectedDomain] = useState<string>(getInitialDomain());
  const [customInterest, setCustomInterest] = useState('');

  const [yearsExperience, setYearsExperience] = useState(profile.yearsExperience || 8);
  const [experienceSummary, setExperienceSummary] = useState(
    profile.resumeText || profile.careerGoal || ''
  );
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showMismatchConfirm, setShowMismatchConfirm] = useState(false);

  // Active domain string
  const activeDomainString = selectedDomain === 'Other' && customInterest.trim()
    ? customInterest.trim()
    : selectedDomain;

  // Real-time domain mismatch check
  const domainMismatch = checkDomainMismatch(
    [activeDomainString],
    experienceSummary
  );

  const ROLE_OPTIONS = [
    { id: 'AI Product Manager', label: 'AI Product Manager', icon: '🤖' },
    { id: 'Technical Product Manager', label: 'Technical Product Manager', icon: '💻' },
    { id: 'Product Manager', label: 'Product Manager', icon: '🎯' },
    { id: 'Product Owner', label: 'Product Owner', icon: '🧩' },
    { id: 'Platform Product Manager', label: 'Platform Product Manager', icon: '⚡' },
    { id: 'Other', label: 'Other Role', icon: '✨' }
  ];

  const LOCATION_OPTIONS = [
    'Hyderabad',
    'Pune',
    'Bangalore',
    'Mumbai',
    'Delhi NCR',
    'Chennai',
    'Remote',
    'Anywhere in India'
  ];

  const INTEREST_OPTIONS = [
    { id: 'Ecommerce', label: 'E-Commerce & Retail', icon: '🛒' },
    { id: 'FinTech', label: 'FinTech & Payments', icon: '💳' },
    { id: 'AI / GenAI', label: 'AI / GenAI & DeepTech', icon: '🤖' },
    { id: 'SaaS', label: 'B2B SaaS & DevTools', icon: '💻' },
    { id: 'Automotive', label: 'Automotive & EVs', icon: '🚗' },
    { id: 'Healthcare', label: 'HealthTech & InsurTech', icon: '🏥' },
    { id: 'Data & Analytics', label: 'Data & Analytics', icon: '📊' },
    { id: 'Industrial Technology', label: 'Industrial Tech & IoT', icon: '🏭' },
    { id: 'Other', label: 'Other Domain', icon: '✨' }
  ];

  const EXP_BRACKETS = [
    { label: '0–2 yrs', value: 2 },
    { label: '3–5 yrs', value: 4 },
    { label: '6–9 yrs', value: 8 },
    { label: '10–14 yrs', value: 12 },
    { label: '15+ yrs', value: 16 }
  ];

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== role));
      }
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const toggleLocation = (loc: string) => {
    if (selectedLocations.includes(loc)) {
      if (selectedLocations.length > 1) {
        setSelectedLocations(selectedLocations.filter((l) => l !== loc));
      }
    } else {
      if (loc === 'Anywhere in India') {
        setSelectedLocations(['Anywhere in India']);
      } else {
        const withoutAnywhere = selectedLocations.filter((l) => l !== 'Anywhere in India');
        setSelectedLocations([...withoutAnywhere, loc]);
      }
    }
  };

  const selectDomain = (domainId: string) => {
    setSelectedDomain(domainId);
  };

  const executeSave = (overrideSummary?: string, overrideDomain?: string) => {
    const activeDomain = overrideDomain || (selectedDomain === 'Other' && customInterest.trim() ? customInterest.trim() : selectedDomain);
    const finalRoles = selectedRoles.includes('Other') && customRole.trim()
      ? [...selectedRoles.filter((r) => r !== 'Other'), customRole.trim()]
      : selectedRoles.filter((r) => r !== 'Other');

    const finalSummary = overrideSummary !== undefined ? overrideSummary : experienceSummary;

    const updated: UserProfile = {
      ...profile,
      targetRoles: finalRoles.length > 0 ? finalRoles : (selectedRoles.length > 0 ? selectedRoles : ['Product Manager']),
      currentRole: finalRoles[0] || selectedRoles[0] || 'Product Manager',
      yearsExperience: Number(yearsExperience) || 8,
      targetDomain: activeDomain || 'E-Commerce & Quick Commerce',
      preferredLocations: selectedLocations.length > 0 ? selectedLocations : ['Hyderabad'],
      resumeText: finalSummary,
      careerGoal: finalSummary
    };

    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (domainMismatch.hasMismatch) {
      setShowMismatchConfirm(true);
      return;
    }

    executeSave();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 font-sans space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Preferences & Privacy Key
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your career target criteria and your personal Career Privacy Key in one single place
        </p>
      </div>

      {/* Sub-tabs: Career Preferences | Career Privacy Key */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSection('career')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'career'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Career Preferences (Single Page)</span>
        </button>
        <button
          onClick={() => setActiveSection('privacy_key')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'privacy_key'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Career Privacy Key (Your AI Access)</span>
        </button>
      </div>

      {/* SECTION 1: CAREER PREFERENCES */}
      {activeSection === 'career' && (
        <form
          onSubmit={handleSave}
          className="space-y-6"
        >
          {savedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Preferences saved successfully! Your Type matching weights have been updated.</span>
            </div>
          )}

          {/* Target Roles */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Target Role(s)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Select the role titles you want Just My Type to prioritize
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full w-fit">
                {selectedRoles.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              {ROLE_OPTIONS.map((opt) => {
                const isSelected = selectedRoles.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleRole(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-slate-900 shadow-2xs ring-1 ring-blue-600 font-semibold'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{opt.icon}</span>
                      <span className="text-xs sm:text-sm">{opt.label}</span>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedRoles.includes('Other') && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specify other role title:
                </label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="e.g. Director of Product, VP of Product"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>
            )}
          </div>

          {/* Locations */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Preferred Location(s)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Target cities and hubs for job discovery
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full w-fit">
                {selectedLocations.join(', ')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {LOCATION_OPTIONS.map((loc) => {
                const isSelected = selectedLocations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold shadow-2xs ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs sm:text-sm">{loc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Target Domain (Single Selection Only) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Primary Target Domain
                  </h2>
                  <p className="text-xs text-slate-500">
                    Choose 1 focused industry domain for precise matching
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-1 rounded-full w-fit">
                Single Selection: {selectedDomain === 'Other' ? (customInterest || 'Other') : (INTEREST_OPTIONS.find(o => o.id === selectedDomain)?.label || selectedDomain)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {INTEREST_OPTIONS.map((area) => {
                const isSelected = selectedDomain === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => selectDomain(area.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/80 text-purple-950 shadow-xs ring-2 ring-purple-600 font-bold'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{area.icon}</span>
                      <span className="text-xs sm:text-sm">{area.label}</span>
                    </div>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedDomain === 'Other' && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specify other domain or industry:
                </label>
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="e.g. Climate Tech, Robotics, Agritech"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-xs text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Experience & Background
                </h2>
                <p className="text-xs text-slate-500">
                  Calibrate seniority level and relevant domain strengths
                </p>
              </div>
            </div>

            {/* Years of experience */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Total Years of Experience</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {EXP_BRACKETS.map((b) => {
                  const isSelected = yearsExperience === b.value;
                  return (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setYearsExperience(b.value)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience Summary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Summary / Key Highlights</span>
              </label>
              <textarea
                rows={3}
                value={experienceSummary}
                onChange={(e) => setExperienceSummary(e.target.value)}
                placeholder="Describe your background, skills, and past domains..."
                className={`w-full p-3.5 rounded-xl border outline-none text-xs sm:text-sm text-slate-900 leading-relaxed bg-slate-50 focus:bg-white transition ${
                  domainMismatch.hasMismatch
                    ? 'border-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 bg-amber-50/30'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
              />
            </div>

            {/* DOMAIN & PROMPT MISMATCH WARNING ALERT */}
            {domainMismatch.hasMismatch && (
              <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 space-y-2.5 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 font-bold mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-900 text-xs uppercase tracking-wide bg-amber-200/80 px-2 py-0.5 rounded">
                        Preference & Prompt Mismatch
                      </span>
                    </div>
                    <p className="font-bold text-amber-950 text-xs leading-relaxed">
                      ⚠️ Incorrect: Your preference and prompt do not match!
                    </p>
                    <p className="text-amber-800 leading-relaxed text-[11.5px]">
                      You selected <strong className="text-amber-950 font-bold">{domainMismatch.selectedDomains.join(', ')}</strong> in your domain preferences, but your experience prompt mentions <strong className="text-amber-950 font-bold underline decoration-amber-500">{domainMismatch.conflictingDomains.join(', ')}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/80">
                  <span className="text-[11px] font-semibold text-amber-800">Quick Fix:</span>
                  {domainMismatch.suggestedPrompt && (
                    <button
                      type="button"
                      onClick={() => setExperienceSummary(domainMismatch.suggestedPrompt!)}
                      className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Auto-sync prompt to match {domainMismatch.selectedDomains[0]}</span>
                    </button>
                  )}
                  {domainMismatch.conflictingDomains.map((confDomain) => (
                    <button
                      key={confDomain}
                      type="button"
                      onClick={() => setSelectedDomain(confDomain)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-semibold text-xs transition cursor-pointer"
                    >
                      Switch Domain to {confDomain}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Authenticated user: <strong>{authUser?.email || 'Guest Explorer'}</strong>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Career Preferences</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 2: CAREER PRIVACY KEY */}
      {activeSection === 'privacy_key' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Career Privacy Key</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Connects your personal Gemini AI to evaluate opportunities privately
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                hasApiKey
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {hasApiKey ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Connected</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Not Connected</span>
                </>
              )}
            </span>
          </div>

          {/* Privacy clarification note */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 leading-relaxed space-y-1">
            <p className="font-bold text-blue-900">
              How the Career Privacy Key works:
            </p>
            <p className="text-blue-800">
              Your Career Privacy Key connects your own Gemini AI to Just My Type. It allows us to use your AI to analyze opportunities based on your saved preferences without sharing your job search data with employers or third parties.
            </p>
          </div>

          {hasApiKey ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-800 mb-1">
                  Your Career Privacy Key is active for this session.
                </p>
                <p className="text-slate-500">
                  Requests use your own Gemini account directly. The key is kept securely in memory and discarded when you leave or refresh the session.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={onOpenAIConnect}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Change Career Privacy Key
                </button>
                <button
                  onClick={onDisconnectAI}
                  className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Disconnect Key</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your Career Privacy Key to enable personalized opportunity matching, live company discovery, and skill gap assessments.
              </p>
              <button
                onClick={onOpenAIConnect}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                🚀 Connect My Career Privacy Key
              </button>
            </div>
          )}
        </div>
      )}

      {/* Account Identity, Security Vault & Sign Out */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
            {authUser?.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <p className="font-bold text-slate-900">{authUser?.name || 'Career Explorer'}</p>
            <p className="text-slate-400">{authUser?.email || 'guest@just-my-type.local'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenSecurityVault && (
            <button
              onClick={onOpenSecurityVault}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Security Vault</span>
            </button>
          )}

          {onResetAllData && (
            <button
              onClick={() => {
                if (window.confirm('Wipe all session data, reset profile, and start fresh?')) {
                  onResetAllData();
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold transition flex items-center gap-1.5 cursor-pointer"
              title="Completely wipe all stored data for new user"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Reset All Data</span>
            </button>
          )}

          <button
            onClick={onSignOut}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* MISMATCH PROMPT CONFIRMATION MODAL */}
      {showMismatchConfirm && domainMismatch.hasMismatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Preference and Prompt Do Not Match!
                </h3>
                <p className="text-xs text-slate-500">
                  We noticed a conflict between your selected domain and background summary text.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
              <p className="leading-relaxed">
                You selected <strong className="text-amber-950 font-bold">{domainMismatch.selectedDomains.join(', ')}</strong> in your preferences, but your prompt mentions <strong className="text-amber-950 font-bold">{domainMismatch.conflictingDomains.join(', ')}</strong>.
              </p>
              <p className="text-[11px] text-amber-800">
                Aligning your prompt ensures the AI finds accurate opportunities in your desired industry.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {domainMismatch.suggestedPrompt && (
                <button
                  type="button"
                  onClick={() => {
                    setExperienceSummary(domainMismatch.suggestedPrompt!);
                    setShowMismatchConfirm(false);
                    executeSave(domainMismatch.suggestedPrompt);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Auto-Sync Prompt to {domainMismatch.selectedDomains[0]} & Save</span>
                </button>
              )}

              {domainMismatch.conflictingDomains.map((confDomain) => (
                <button
                  key={confDomain}
                  type="button"
                  onClick={() => {
                    setSelectedDomain(confDomain);
                    setShowMismatchConfirm(false);
                    executeSave(undefined, confDomain);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition cursor-pointer"
                >
                  Switch Target Domain to {confDomain} & Save
                </button>
              ))}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowMismatchConfirm(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  Edit Manually
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowMismatchConfirm(false);
                    executeSave();
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  Keep As Is & Save →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
