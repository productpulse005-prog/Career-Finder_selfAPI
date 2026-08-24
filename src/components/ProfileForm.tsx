import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Layers,
  MapPin,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Sliders,
  DollarSign,
  FileText,
  X
} from 'lucide-react';
import {
  UserProfile,
  PMExperienceLevel,
  WorkMode,
  CompanyStage,
  ClarifyingQuestion
} from '../types';
import {
  INDIAN_LOCATIONS,
  PM_TARGET_ROLES,
  DEFAULT_DOMAINS,
  PROFILE_PRESETS
} from '../data/pmEcosystemData';

interface ProfileFormProps {
  initialProfile: UserProfile;
  userApiKey: string | null;
  onOpenConnectModal: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  onGenerateAI: (profile: UserProfile) => void;
  onFindJobsDirectly?: (profile: UserProfile) => void;
  isLoading: boolean;
  clarifyingQuestions?: ClarifyingQuestion[];
  onClose?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialProfile,
  userApiKey,
  onOpenConnectModal,
  onSaveProfile,
  onGenerateAI,
  onFindJobsDirectly,
  isLoading,
  clarifyingQuestions = [],
  onClose
}) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [skillInput, setSkillInput] = useState('');
  const [activePreset, setActivePreset] = useState<string>('');
  const [showKeyWarning, setShowKeyWarning] = useState(false);

  const isConnected = Boolean(userApiKey);

  const pmExpLevels: PMExperienceLevel[] = [
    'Aspiring / No PM Exp',
    'Associate PM (0-2 yrs)',
    'Product Manager (2-5 yrs)',
    'Senior PM (5-8 yrs)',
    'Principal / Lead PM (8-12 yrs)',
    'Group PM / Director (12+ yrs)'
  ];

  const workModes: WorkMode[] = ['Hybrid', 'Remote', 'On-site', 'Any'];

  const handleApplyPreset = (presetName: string) => {
    const found = PROFILE_PRESETS.find((p) => p.name === presetName);
    if (found && found.profile) {
      setProfile((prev) => ({
        ...prev,
        ...found.profile,
        clarifyingAnswers: found.profile.clarifyingAnswers || {}
      }));
      setActivePreset(presetName);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profile.technicalSkills.includes(skillInput.trim())) {
      setProfile((prev) => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((s) => s !== skillToRemove)
    }));
  };

  const toggleTargetRole = (role: string) => {
    setProfile((prev) => {
      const exists = prev.targetRoles.includes(role);
      if (exists) {
        return { ...prev, targetRoles: prev.targetRoles.filter((r) => r !== role) };
      } else {
        return { ...prev, targetRoles: [...prev.targetRoles, role] };
      }
    });
  };

  const toggleLocation = (loc: string) => {
    setProfile((prev) => {
      const exists = prev.preferredLocations.includes(loc);
      if (exists) {
        return {
          ...prev,
          preferredLocations: prev.preferredLocations.filter((l) => l !== loc)
        };
      } else {
        return {
          ...prev,
          preferredLocations: [...prev.preferredLocations, loc]
        };
      }
    });
  };

  const handleClarifyingAnswer = (questionId: string, answer: string) => {
    setProfile((prev) => ({
      ...prev,
      clarifyingAnswers: {
        ...prev.clarifyingAnswers,
        [questionId]: answer
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    if (!isConnected) {
      setShowKeyWarning(true);
      onOpenConnectModal();
      return;
    }
    setShowKeyWarning(false);
    onGenerateAI(profile);
  };

  const handleFindJobsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    if (!isConnected) {
      setShowKeyWarning(true);
      onOpenConnectModal();
      return;
    }
    setShowKeyWarning(false);
    if (onFindJobsDirectly) {
      onFindJobsDirectly(profile);
    } else {
      onGenerateAI(profile);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-4xl mx-auto overflow-hidden">
      {/* Header bar */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100">
              Candidate Profile & PM Career Target Settings
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Personalized for Indian tech ecosystems, compensation benchmarks, and target domains
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Preset Selector */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Quick Persona Presets (Click to load realistic India candidate profiles)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PROFILE_PRESETS.map((preset) => {
              const isSelected = activePreset === preset.name;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset.name)}
                  className={`text-left p-2 rounded border text-xs transition ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 font-bold shadow-2xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900 flex items-center justify-between text-xs">
                    {preset.name}
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-blue-600" />}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 1: Candidate Background */}
        <div className="border-t border-slate-100 pt-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            1. Current Profile & Background
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="e.g. Arjun Sharma"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Current / Previous Role
              </label>
              <input
                type="text"
                value={profile.currentRole}
                onChange={(e) => setProfile({ ...profile, currentRole: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="e.g. Backend SDE, QA Lead, Consultant"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Total Years of Experience
              </label>
              <input
                type="number"
                min="0"
                max="30"
                step="0.5"
                value={profile.yearsExperience}
                onChange={(e) =>
                  setProfile({ ...profile, yearsExperience: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                PM Experience Level
              </label>
              <select
                value={profile.pmExperienceLevel}
                onChange={(e) =>
                  setProfile({ ...profile, pmExperienceLevel: e.target.value as PMExperienceLevel })
                }
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                {pmExpLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Current Industry / Domain
              </label>
              <input
                type="text"
                value={profile.currentIndustry}
                onChange={(e) => setProfile({ ...profile, currentIndustry: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="e.g. Banking, IT Services, Automotive, Retail"
              />
            </div>
          </div>

          {/* Technical Skills Tag Input */}
          <div className="mt-2.5">
            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
              Technical & Domain Skills (Press Enter or Add)
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="e.g. SQL, REST APIs, System Design, Python, Telematics, AWS"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-bold border border-slate-200"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {profile.technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Target Domains, Roles & Indian Geography */}
        <div className="border-t border-slate-100 pt-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            2. Target PM Domain, Roles & Location Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Primary Target Domain
              </label>
              <select
                value={profile.targetDomain}
                onChange={(e) => setProfile({ ...profile, targetDomain: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white font-bold text-slate-900"
              >
                {DEFAULT_DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Work Mode Preference
              </label>
              <select
                value={profile.workMode}
                onChange={(e) =>
                  setProfile({ ...profile, workMode: e.target.value as WorkMode })
                }
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                {workModes.map((wm) => (
                  <option key={wm} value={wm}>
                    {wm}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-600" />
                Target Compensation (INR LPA)
              </label>
              <input
                type="text"
                value={profile.salaryExpectationINR}
                onChange={(e) => setProfile({ ...profile, salaryExpectationINR: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="e.g. 28-36 LPA + ESOPs"
              />
            </div>
          </div>

          {/* Target PM Roles Multi-Select */}
          <div className="mt-2.5">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Target PM Roles (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-1">
              {PM_TARGET_ROLES.map((role) => {
                const isSelected = profile.targetRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleTargetRole(role)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Indian Tech Locations */}
          <div className="mt-2.5">
            <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              Preferred Indian Tech Hubs
            </label>
            <div className="flex flex-wrap gap-1">
              {INDIAN_LOCATIONS.map((loc) => {
                const isSelected = profile.preferredLocations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Company Stage Preference */}
          <div className="mt-2.5">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Company Stage Target Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'all', label: 'All Stages', sub: 'Early, Growth & Tech Giants' },
                { id: 'early', label: '(A) Early-Stage', sub: 'Seed to Series B Startups' },
                { id: 'growth', label: '(B) Growth-Stage', sub: 'Series C+ & Unicorns' },
                { id: 'large', label: '(C) Large Tech', sub: 'Public Giants & MNC GCCs' }
              ].map((stage) => {
                const isSelected = profile.companyStagePreference === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() =>
                      setProfile({ ...profile, companyStagePreference: stage.id as CompanyStage })
                    }
                    className={`p-2 rounded border text-left text-xs transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 font-bold'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-[11px]">{stage.label}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{stage.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Transition Goal & Portfolio Notes */}
        <div className="border-t border-slate-100 pt-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            3. Transition Goal, Highlights & Portfolio Context
          </h3>

          <div className="space-y-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Specific Career Transition Goal
              </label>
              <textarea
                rows={2}
                value={profile.careerGoal}
                onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                placeholder="e.g. Move from Backend SDE to Technical PM at high-growth B2B SaaS firms in Bengaluru, leveraging my API architecture background."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Key Portfolio Projects / Highlights
                </label>
                <textarea
                  rows={2}
                  value={profile.portfolioProjects}
                  onChange={(e) => setProfile({ ...profile, portfolioProjects: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  placeholder="e.g. Automated checkout error recovery flow; Designed developer portal for 15 engineering teams."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Resume Summary / Background Notes
                </label>
                <textarea
                  rows={2}
                  value={profile.resumeText}
                  onChange={(e) => setProfile({ ...profile, resumeText: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  placeholder="Paste key achievements, metrics moved, or past team leadership experience."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Clarifying Questions when Goal is Vague */}
        {clarifyingQuestions && clarifyingQuestions.length > 0 && (
          <div className="border-t border-amber-200 bg-amber-50/60 rounded p-3">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              Target Refinement: Clarifying Questions from Career Mapper AI
            </div>
            <p className="text-[10px] text-amber-800 mb-2">
              Answering these helps sharpen your adjacent domain crossover and specific company fit:
            </p>
            <div className="space-y-2">
              {clarifyingQuestions.map((q) => (
                <div key={q.id} className="bg-white rounded p-2 border border-amber-200 text-xs">
                  <div className="font-bold text-slate-900 mb-1">{q.question}</div>
                  {q.options && q.options.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {q.options.map((opt) => {
                        const isChosen = profile.clarifyingAnswers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleClarifyingAnswer(q.id, opt)}
                            className={`px-2 py-0.5 rounded text-xs transition ${
                              isChosen
                                ? 'bg-amber-600 text-white font-bold'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={profile.clarifyingAnswers[q.id] || ''}
                      onChange={(e) => handleClarifyingAnswer(q.id, e.target.value)}
                      placeholder="Type your response..."
                      className="w-full px-2 py-1 text-xs rounded border border-slate-200"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disconnected Warning Alert if triggered */}
        {showKeyWarning && !isConnected && (
          <div
            id="profile-form-key-warning"
            className="border border-amber-300 bg-amber-50 rounded-md p-2.5 text-xs text-amber-900 flex items-center justify-between gap-2 animate-in fade-in"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">Notice:</span>
              <span>Please connect your Gemini API key before starting the AI job search.</span>
            </div>
            <button
              type="button"
              onClick={onOpenConnectModal}
              className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0"
            >
              Connect Key
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-slate-200 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-[11px] text-slate-500">
            Selected: <span className="font-bold text-slate-800">{profile.targetDomain}</span> •{' '}
            <span>{profile.preferredLocations.join(', ') || 'Pan-India'}</span>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition border border-slate-200"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              onClick={handleFindJobsClick}
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              Find My Best Jobs
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Analyzing PM Path...' : 'Map PM Career Roadmap'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
