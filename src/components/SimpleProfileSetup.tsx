import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Briefcase, MapPin, Compass, FileText, User } from 'lucide-react';
import { UserProfile } from '../types';

interface SimpleProfileSetupProps {
  initialProfile: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  isLoading?: boolean;
}

const ROLE_OPTIONS = [
  'Product Manager',
  'AI Product Manager',
  'Technical Product Manager',
  'Product Owner',
  'Other'
];

const LOCATION_OPTIONS = [
  'Pune',
  'Bangalore',
  'Mumbai',
  'Hyderabad',
  'Remote',
  'Other'
];

const AREA_OPTIONS = [
  'AI / GenAI',
  'SaaS',
  'Automotive',
  'FinTech',
  'Healthcare',
  'Ecommerce',
  'Industrial Technology',
  'Other'
];

export const SimpleProfileSetup: React.FC<SimpleProfileSetupProps> = ({
  initialProfile,
  onSubmit,
  isLoading = false
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    initialProfile.targetRoles && initialProfile.targetRoles.length > 0
      ? initialProfile.targetRoles.map(r => {
          if (r.includes('AI')) return 'AI Product Manager';
          if (r.includes('Technical')) return 'Technical Product Manager';
          if (r.includes('Product Manager')) return 'Product Manager';
          return r;
        })
      : []
  );
  const [customRole, setCustomRole] = useState('');

  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    initialProfile.preferredLocations && initialProfile.preferredLocations.length > 0
      ? initialProfile.preferredLocations.map(l => {
          if (l.toLowerCase().includes('bengaluru') || l.toLowerCase().includes('bangalore')) return 'Bangalore';
          if (l.toLowerCase().includes('pune')) return 'Pune';
          if (l.toLowerCase().includes('mumbai')) return 'Mumbai';
          if (l.toLowerCase().includes('hyderabad')) return 'Hyderabad';
          if (l.toLowerCase().includes('remote')) return 'Remote';
          return l;
        })
      : []
  );
  const [customLocation, setCustomLocation] = useState('');

  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    initialProfile.targetDomain && initialProfile.targetDomain.trim().length > 0
      ? initialProfile.targetDomain.split(',').map(s => s.trim()).filter(Boolean)
      : []
  );
  const [customArea, setCustomArea] = useState('');

  const [experienceText, setExperienceText] = useState(
    initialProfile.resumeText ||
      initialProfile.careerGoal ||
      '12 years in automotive software, testing, Agile and product ownership...'
  );

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const toggleLocation = (loc: string) => {
    if (selectedLocations.includes(loc)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== loc));
    } else {
      setSelectedLocations([...selectedLocations, loc]);
    }
  };

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map selections back into UserProfile
    const finalRoles = selectedRoles.includes('Other') && customRole.trim()
      ? [...selectedRoles.filter((r) => r !== 'Other'), customRole.trim()]
      : selectedRoles;

    const finalLocations = selectedLocations.includes('Other') && customLocation.trim()
      ? [...selectedLocations.filter((l) => l !== 'Other'), customLocation.trim()]
      : selectedLocations;

    const finalAreas = selectedAreas.includes('Other') && customArea.trim()
      ? [...selectedAreas.filter((a) => a !== 'Other'), customArea.trim()]
      : selectedAreas;

    // Detect domain string
    let targetDomain = 'B2B SaaS & DevTools';
    if (finalAreas.includes('Automotive')) targetDomain = 'Mobility, Automotive & EVs';
    else if (finalAreas.includes('FinTech')) targetDomain = 'Fintech & Payments';
    else if (finalAreas.includes('AI / GenAI')) targetDomain = 'AI / GenAI & DeepTech';
    else if (finalAreas.includes('Healthcare')) targetDomain = 'HealthTech & InsurTech';
    else if (finalAreas.includes('Ecommerce')) targetDomain = 'E-Commerce & Quick Commerce';
    else if (finalAreas[0]) targetDomain = finalAreas[0];

    // Detect approximate years of experience from text if present
    let years = 5;
    const matchYears = experienceText.match(/(\d+)\s*(?:years|yrs|y)/i);
    if (matchYears && matchYears[1]) {
      years = parseInt(matchYears[1], 10);
    }

    const updatedProfile: UserProfile = {
      ...initialProfile,
      fullName: initialProfile.fullName || 'Candidate',
      currentRole: finalRoles[0] || 'Product Manager',
      yearsExperience: years,
      targetDomain,
      targetRoles: finalRoles.length > 0 ? finalRoles : ['Product Manager'],
      preferredLocations: finalLocations.length > 0 ? finalLocations : ['Bangalore', 'Pune'],
      currentIndustry: finalAreas[0] || 'Software',
      resumeText: experienceText,
      careerGoal: experienceText
    };

    onSubmit(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 flex justify-center font-sans">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalize Your Recommendations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Tell us what you're looking for
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
            Just a few quick questions to match you with top product roles in India.
          </p>
        </div>

        {/* Card Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-7"
        >
          {/* Question 1: Roles */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. What kind of role are you looking for?
            </label>
            <div className="flex flex-wrap gap-2">
              {ROLE_OPTIONS.map((role) => {
                const isSelected = selectedRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {role} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
            {selectedRoles.includes('Other') && (
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="Specify your target role title..."
                className="mt-2.5 w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
              />
            )}
          </div>

          {/* Question 2: Locations */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Where do you want to work?
            </label>
            <div className="flex flex-wrap gap-2">
              {LOCATION_OPTIONS.map((loc) => {
                const isSelected = selectedLocations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {loc} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
            {selectedLocations.includes('Other') && (
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Specify preferred city (e.g. Chennai, Noida, Delhi-NCR)..."
                className="mt-2.5 w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
              />
            )}
          </div>

          {/* Question 3: Areas / Domains */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              3. What areas interest you?
            </label>
            <div className="flex flex-wrap gap-2">
              {AREA_OPTIONS.map((area) => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {area} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
            {selectedAreas.includes('Other') && (
              <input
                type="text"
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                placeholder="Specify area (e.g. EdTech, Logistics, DeepTech)..."
                className="mt-2.5 w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
              />
            )}
          </div>

          {/* Question 4: Experience */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              4. Tell us about your experience
            </label>
            <textarea
              id="experience-input"
              rows={3}
              value={experienceText}
              onChange={(e) => setExperienceText(e.target.value)}
              placeholder="Example: 12 years in automotive software, testing, Agile and product ownership…"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800 transition bg-slate-50/50 leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Briefly describe your years in industry, skills, and past domains.
            </p>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              id="submit-profile-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Matching Jobs with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>See Job Recommendations</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
