import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  MapPin,
  Sparkles,
  FileText,
  Clock,
  Target,
  Briefcase,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { UserProfile } from '../types';
import { checkDomainMismatch } from '../utils/domainValidation';

interface CareerProfileWizardProps {
  initialProfile: UserProfile;
  onFinishWizard: (profile: UserProfile) => void;
  onBackToLanding?: () => void;
}

export const CareerProfileWizard: React.FC<CareerProfileWizardProps> = ({
  initialProfile,
  onFinishWizard,
  onBackToLanding
}) => {
  // Section 1: Roles
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    initialProfile.targetRoles && initialProfile.targetRoles.length > 0
      ? initialProfile.targetRoles
      : ['Product Manager']
  );
  const [customRole, setCustomRole] = useState('');

  // Section 2: Locations
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    initialProfile.preferredLocations && initialProfile.preferredLocations.length > 0
      ? initialProfile.preferredLocations
      : ['Hyderabad']
  );

  // Section 3: Primary Target Domain (Single Select Only)
  const getInitialDomain = () => {
    if (!initialProfile.targetDomain) return 'Ecommerce';
    const first = initialProfile.targetDomain.split(',')[0].trim();
    return first || 'Ecommerce';
  };

  const [selectedDomain, setSelectedDomain] = useState<string>(getInitialDomain());
  const [customInterest, setCustomInterest] = useState('');

  // Section 4: Experience
  const [experienceSummary, setExperienceSummary] = useState(
    initialProfile.resumeText ||
      '8+ years in technical software product ownership, Agile execution, and system architecture.'
  );
  const [yearsOfExp, setYearsOfExp] = useState<number>(initialProfile.yearsExperience || 8);
  const [showMismatchConfirm, setShowMismatchConfirm] = useState(false);

  // Active domain string
  const activeDomainString = selectedDomain === 'Other' && customInterest.trim()
    ? customInterest.trim()
    : selectedDomain;

  // Real-time mismatch detection
  const domainMismatch = checkDomainMismatch(
    [activeDomainString],
    experienceSummary
  );

  // Toggle helpers
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

  // Single Domain Selection handler
  const selectDomain = (domainId: string) => {
    setSelectedDomain(domainId);
  };

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

  const executeSubmit = (overrideSummary?: string, overrideDomain?: string) => {
    const activeDomain = overrideDomain || (selectedDomain === 'Other' && customInterest.trim() ? customInterest.trim() : selectedDomain);
    const finalRoles = selectedRoles.includes('Other') && customRole.trim()
      ? [...selectedRoles.filter((r) => r !== 'Other'), customRole.trim()]
      : selectedRoles.filter((r) => r !== 'Other');

    const finalSummary = overrideSummary !== undefined ? overrideSummary : experienceSummary;

    const updatedProfile: UserProfile = {
      ...initialProfile,
      targetRoles: finalRoles.length > 0 ? finalRoles : (selectedRoles.length > 0 ? selectedRoles : ['Product Manager']),
      currentRole: finalRoles[0] || selectedRoles[0] || 'Product Manager',
      preferredLocations: selectedLocations.length > 0 ? selectedLocations : ['Hyderabad'],
      targetDomain: activeDomain || 'E-Commerce & Quick Commerce',
      yearsExperience: yearsOfExp,
      resumeText: finalSummary,
      careerGoal: finalSummary
    };

    onFinishWizard(updatedProfile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (domainMismatch.hasMismatch) {
      setShowMismatchConfirm(true);
      return;
    }

    executeSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900 py-8 px-4 sm:px-6 relative overflow-hidden bg-grid-subtle">
      <div className="max-w-3xl mx-auto w-full space-y-7 relative z-10">
        
        {/* Header with Back button */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3.5">
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:border-slate-400 transition cursor-pointer shadow-xs"
                title="Back to home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono-data font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md mb-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Single-Page Calibration</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Career Preferences & Filter Criteria
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Customize your target roles, locations, domains, and background for live radar tracking.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: TARGET ROLES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-sm">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Target Role(s)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Select one or more roles you are actively targeting
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono-data font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full w-fit">
                {selectedRoles.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {ROLE_OPTIONS.map((opt) => {
                const isSelected = selectedRoles.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleRole(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs ring-1 ring-blue-500 font-bold'
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{opt.icon}</span>
                      <span className="text-xs sm:text-sm">{opt.label}</span>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedRoles.includes('Other') && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                  Specify other target role title:
                </label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="e.g. Director of Product, Chief Product Officer"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 outline-none text-xs text-slate-900 bg-white transition"
                />
              </div>
            )}
          </div>

          {/* SECTION 2: TARGET LOCATIONS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Preferred Location(s)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Select cities or remote hubs for radar coverage
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono-data font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
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
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs sm:text-sm">{loc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: DOMAIN (SINGLE SELECTION ONLY) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-bold text-sm">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Primary Target Domain
                  </h2>
                  <p className="text-xs text-slate-500">
                    Choose 1 focused industry domain for precise matching
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono-data font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full w-fit">
                Single Selection: {selectedDomain === 'Other' ? (customInterest || 'Other') : (INTEREST_OPTIONS.find(o => o.id === selectedDomain)?.label || selectedDomain)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {INTEREST_OPTIONS.map((area) => {
                const isSelected = selectedDomain === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => selectDomain(area.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs ring-1 ring-purple-500 font-bold'
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{area.icon}</span>
                      <span className="text-xs sm:text-sm">{area.label}</span>
                    </div>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
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
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                  Specify other domain or industry:
                </label>
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="e.g. Climate Tech, Robotics, Agritech"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs text-slate-900 bg-white transition"
                />
              </div>
            )}
          </div>

          {/* SECTION 4: EXPERIENCE & BACKGROUND */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold text-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Experience & Background Calibration
                </h2>
                <p className="text-xs text-slate-500">
                  Calibrate matching seniority, transferable skills, and verified highlights
                </p>
              </div>
            </div>

            {/* Years of experience */}
            <div>
              <label className="block text-xs font-mono-data font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>TOTAL YEARS OF EXPERIENCE</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {EXP_BRACKETS.map((b) => {
                  const isSelected = yearsOfExp === b.value;
                  return (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setYearsOfExp(b.value)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-mono-data font-bold border transition text-center cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience Summary text area */}
            <div>
              <label className="block text-xs font-mono-data font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>SUMMARY & KEY HIGHLIGHTS</span>
              </label>
              <textarea
                rows={3}
                value={experienceSummary}
                onChange={(e) => setExperienceSummary(e.target.value)}
                placeholder="Example: 8+ years in software product ownership, Agile execution, technical leadership, and domain platforms."
                className={`w-full p-4 rounded-xl border outline-none text-xs sm:text-sm text-slate-800 leading-relaxed bg-white transition ${
                  domainMismatch.hasMismatch
                    ? 'border-amber-400 bg-amber-50/40'
                    : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>

            {/* DOMAIN & PROMPT MISMATCH WARNING ALERT */}
            {domainMismatch.hasMismatch && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 space-y-2.5 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-800 text-xs uppercase tracking-wide bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                        Preference & Prompt Mismatch
                      </span>
                    </div>
                    <p className="font-bold text-amber-900 text-xs leading-relaxed">
                      ⚠️ Alignment Notice: Your preference and prompt do not match!
                    </p>
                    <p className="text-amber-800 leading-relaxed text-[11.5px]">
                      You selected <strong className="text-slate-900 font-bold">{domainMismatch.selectedDomains.join(', ')}</strong> in your domain preferences, but your experience prompt mentions <strong className="text-slate-900 font-bold underline decoration-amber-500">{domainMismatch.conflictingDomains.join(', ')}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200">
                  <span className="text-[11px] font-semibold text-amber-800">Quick Fix:</span>
                  {domainMismatch.suggestedPrompt && (
                    <button
                      type="button"
                      onClick={() => setExperienceSummary(domainMismatch.suggestedPrompt!)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
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
                      className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold text-xs transition cursor-pointer"
                    >
                      Switch Domain to {confDomain}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900">Active Profile: </span>
              {selectedRoles.join(', ')} • {selectedLocations.join(', ')} • {yearsOfExp}+ yrs
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onBackToLanding && (
                <button
                  type="button"
                  onClick={onBackToLanding}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                id="wizard-save-all-btn"
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer font-display"
              >
                <span>Save Preferences & View Your Type →</span>
              </button>
            </div>
          </div>

        </form>
      </div>

      {/* MISMATCH PROMPT CONFIRMATION MODAL */}
      {showMismatchConfirm && domainMismatch.hasMismatch && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150 text-slate-900">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  Preference and Prompt Do Not Match!
                </h3>
                <p className="text-xs text-slate-500">
                  We noticed a conflict between your selected domain and background summary text.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <p className="leading-relaxed">
                You selected <strong className="text-slate-900 font-bold">{domainMismatch.selectedDomains.join(', ')}</strong> in your preferences, but your prompt mentions <strong className="text-slate-900 font-bold">{domainMismatch.conflictingDomains.join(', ')}</strong>.
              </p>
              <p className="text-[11px] text-amber-700">
                Aligning your prompt ensures the AI finds accurate opportunities in your desired industry.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {domainMismatch.suggestedPrompt && (
                <button
                  type="button"
                  onClick={() => {
                    setExperienceSummary(domainMismatch.suggestedPrompt!);
                    setShowMismatchConfirm(false);
                    executeSubmit(domainMismatch.suggestedPrompt);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer font-display"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Auto-Sync Prompt to {domainMismatch.selectedDomains[0]} & Continue</span>
                </button>
              )}

              {domainMismatch.conflictingDomains.map((confDomain) => (
                <button
                  key={confDomain}
                  type="button"
                  onClick={() => {
                    setSelectedDomain(confDomain);
                    setShowMismatchConfirm(false);
                    executeSubmit(undefined, confDomain);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs transition cursor-pointer"
                >
                  Switch Target Domain to {confDomain} & Continue
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
                    executeSubmit();
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  Keep As Is & Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
