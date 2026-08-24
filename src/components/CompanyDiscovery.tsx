import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  ExternalLink,
  Send,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Layers,
  Sparkles,
  Tag
} from 'lucide-react';
import { CompanyTarget, CompanyStage, UserProfile } from '../types';

interface CompanyDiscoveryProps {
  companies: CompanyTarget[];
  profile: UserProfile;
  onOpenOutreachForCompany: (company: CompanyTarget) => void;
  onSelectStageFilter: (stage: CompanyStage) => void;
}

export const CompanyDiscovery: React.FC<CompanyDiscoveryProps> = ({
  companies,
  profile,
  onOpenOutreachForCompany,
  onSelectStageFilter
}) => {
  const [stageFilter, setStageFilter] = useState<CompanyStage>(
    profile.companyStagePreference || 'all'
  );
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fitFilter, setFitFilter] = useState<string>('all');

  const indianCities = [
    'all',
    'Bengaluru',
    'Gurugram',
    'Mumbai',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Noida'
  ];

  const handleStageChange = (newStage: CompanyStage) => {
    setStageFilter(newStage);
    onSelectStageFilter(newStage);
  };

  const filteredCompanies = companies.filter((comp) => {
    // Stage Filter
    if (stageFilter !== 'all' && comp.stage !== stageFilter) {
      return false;
    }
    // City Filter
    if (cityFilter !== 'all' && !comp.indiaPresence.toLowerCase().includes(cityFilter.toLowerCase())) {
      return false;
    }
    // Fit Filter
    if (fitFilter !== 'all' && comp.fitLevel !== fitFilter) {
      return false;
    }
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = comp.name.toLowerCase().includes(q);
      const matchDomain = comp.domain.toLowerCase().includes(q);
      const matchRoles = comp.potentialRoles.some((r) => r.toLowerCase().includes(q));
      const matchTech = (comp.techStackDomain || []).some((t) => t.toLowerCase().includes(q));
      return matchName || matchDomain || matchRoles || matchTech;
    }
    return true;
  });

  return (
    <div className="space-y-3.5">
      {/* High Density Stage Selector & Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Target Companies // India Ecosystem ({companies.length} Identified)
            </h2>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Prioritized by {profile.targetDomain} & Candidate Strengths
            </h3>
          </div>

          {/* High-Density Stage Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Stages' },
              { id: 'early', label: '(A) Early-Stage' },
              { id: 'growth', label: '(B) Growth / Scale-up' },
              { id: 'large', label: '(C) Tech Giants / GCCs' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => handleStageChange(s.id as CompanyStage)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  stageFilter === s.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 bg-slate-100 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* High Density Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-3 text-xs">
          {/* Search Box */}
          <div className="sm:col-span-5 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, tech stack, roles..."
              className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* City Filter */}
          <div className="sm:col-span-4 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="all">All Indian Cities</option>
              {indianCities.slice(1).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Fit Level Filter */}
          <div className="sm:col-span-3 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400 shrink-0" />
            <select
              value={fitFilter}
              onChange={(e) => setFitFilter(e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="all">All Fit Levels</option>
              <option value="High">High Fit Only</option>
              <option value="Medium">Medium Fit</option>
              <option value="BORDERLINE">BORDERLINE Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stage Shortlist Strip */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="text-slate-800 font-medium">
            Quick Stage Shortlists: Target (A) Seed to Series B, (B) Unicorns & Series C+, or (C) Global MNC GCCs
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handleStageChange('early')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
              stageFilter === 'early' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            Top 10 Early
          </button>
          <button
            onClick={() => handleStageChange('growth')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
              stageFilter === 'growth' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            Top 10 Growth
          </button>
          <button
            onClick={() => handleStageChange('large')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
              stageFilter === 'large' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            Top 10 Large
          </button>
        </div>
      </div>

      {/* High Density Company Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filteredCompanies.map((comp) => {
          const isBorderline = comp.fitLevel === 'BORDERLINE';
          return (
            <div
              key={comp.id || comp.name}
              className={`rounded-lg border p-3.5 flex flex-col justify-between transition-all duration-150 ${
                isBorderline
                  ? 'border-amber-300 bg-amber-50/40'
                  : comp.fitLevel === 'High'
                  ? 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div>
                {/* Header: Name, Stage & Fit Badges */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm">{comp.name}</h3>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                        {comp.stageLabel || comp.stage}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{comp.indiaPresence}</span>
                    </div>
                  </div>

                  {/* Fit Level Badge */}
                  <div className="shrink-0">
                    {isBorderline ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        <AlertTriangle className="w-3 h-3 text-amber-700" />
                        BORDERLINE
                      </span>
                    ) : comp.fitLevel === 'High' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        High Fit
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        Medium Fit
                      </span>
                    )}
                  </div>
                </div>

                {/* Borderline Reason Callout */}
                {isBorderline && comp.borderlineReason && (
                  <div className="mb-2 p-2 rounded bg-amber-100/70 border border-amber-300 text-[11px] text-amber-900 leading-relaxed">
                    <span className="font-bold">Why Borderline: </span>
                    {comp.borderlineReason}
                  </div>
                )}

                {/* Domain & Why It Fits */}
                <div className="space-y-1 text-xs mb-2.5">
                  <div className="text-[11px]">
                    <span className="font-bold text-slate-700">Domain: </span>
                    <span className="text-slate-600">{comp.domain}</span>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    <span className="font-bold text-slate-700">Why It Fits: </span>
                    <span className="text-slate-600">{comp.whyItFits}</span>
                  </div>
                </div>

                {/* Potential PM Roles */}
                <div className="mb-2">
                  <div className="flex flex-wrap gap-1">
                    {comp.potentialRoles.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PM Culture Note */}
                {comp.pmTeamCulture && (
                  <p className="text-[10px] text-slate-500 italic mb-2">
                    <span className="font-semibold not-italic text-slate-600">Culture: </span>
                    {comp.pmTeamCulture}
                  </p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                {comp.careersUrl && (
                  <a
                    href={comp.careersUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-600 hover:text-slate-900 text-[11px] font-bold inline-flex items-center gap-1"
                  >
                    Careers Portal <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  onClick={() => onOpenOutreachForCompany(comp)}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition flex items-center gap-1"
                >
                  <Send className="w-3 h-3 text-blue-600" />
                  Outreach Pitch
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 text-center text-slate-500 text-xs">
          No companies found matching your active filters. Try clearing search keywords or selecting "All Stages".
        </div>
      )}
    </div>
  );
};
