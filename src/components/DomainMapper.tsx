import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2,
  Building,
  Target,
  Send
} from 'lucide-react';
import { AdjacentDomain, CareerMappingResult, UserProfile } from '../types';

interface DomainMapperProps {
  result: CareerMappingResult;
  profile: UserProfile;
  onSelectAdjacentDomain: (domainName: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const DomainMapper: React.FC<DomainMapperProps> = ({
  result,
  profile,
  onSelectAdjacentDomain,
  onNavigateToTab
}) => {
  const [selectedDomain, setSelectedDomain] = useState<AdjacentDomain | null>(
    result.adjacentDomainsMap[0] || null
  );

  const { domainUnderstood, adjacentDomainsMap, recommendedCareerDirection } = result;

  return (
    <div className="space-y-4">
      {/* Top High Density Grid: Primary Target & Direction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Primary Target Domain Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wider">
                  Primary Domain Focus
                </span>
                <span className="text-xs font-bold text-slate-800">{domainUnderstood.primaryDomain}</span>
              </div>
              <div className="text-[11px] font-semibold text-slate-500">
                {profile.preferredLocations.join(', ') || 'Pan-India'} • {profile.yearsExperience}y exp
              </div>
            </div>

            {/* Target Sub-domain Pill */}
            <div className="p-3 bg-blue-50/80 border-l-4 border-blue-500 rounded-r mb-3">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Primary Target Area</p>
              <p className="text-sm font-bold text-slate-900">{domainUnderstood.subDomainFocus}</p>
              <p className="text-xs text-slate-600 mt-1">
                Optimized for candidates transitioning from <span className="font-semibold text-slate-800">{profile.currentRole || 'Engineering'}</span> to high-growth Indian tech product teams.
              </p>
            </div>

            {/* Recommended Direction Summary */}
            {recommendedCareerDirection && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs mt-3">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    Recommended Path
                  </div>
                  <p className="font-bold text-slate-900 text-xs line-clamp-1">{recommendedCareerDirection.headline}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{recommendedCareerDirection.primaryPath}</p>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Next 30-60 Days
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    {recommendedCareerDirection.immediateNextSteps.slice(0, 2).map((step, idx) => (
                      <li key={idx} className="line-clamp-1">• {step}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    Timeline & Risk
                  </div>
                  <p className="text-[11px] font-semibold text-slate-800">{recommendedCareerDirection.timelineMonths}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{recommendedCareerDirection.keyRiskAndMitigation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-slate-100 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Hiring Demand</span>
              <span className="font-bold text-emerald-600 text-xs flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {domainUnderstood.hiringDemandTier}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Avg Comp (INR)</span>
              <span className="font-bold text-slate-800 text-xs">
                {domainUnderstood.averageCompensationRangeINR}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Market Stage</span>
              <span className="font-semibold text-slate-700 text-xs truncate block">
                {domainUnderstood.marketMaturityInIndia.slice(0, 24)}...
              </span>
            </div>
          </div>
        </div>

        {/* High Density Dark Pitch / Quick Outreach Widget */}
        <div className="lg:col-span-4 bg-[#1E293B] text-white rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Quick Outreach Pitch</h2>
              <span className="text-[10px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">
                India PM
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
              "Hi [Hiring Leader], I noticed your product scale at [Company] in {domainUnderstood.primaryDomain}. As a {profile.currentRole || 'SWE'} ({profile.yearsExperience}y exp) with hands-on depth in {profile.technicalSkills.slice(0, 2).join(', ') || 'API Architecture'}, I've put together a lightweight teardown..."
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onNavigateToTab('outreach')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Send className="w-3 h-3" />
              Generate Personalized Pitch
            </button>
            <div className="flex justify-between text-[10px] text-slate-400 px-1">
              <span>Recruiter InMail</span>
              <span>•</span>
              <span>Peer PM</span>
              <span>•</span>
              <span>Cold Proof-of-Work</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Adjacent Domains Map (6-10 Domains) */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Adjacent Domains Map // India Tech Crossovers
            </h2>
            <p className="text-xs text-slate-700 font-semibold mt-0.5">
              Explore 6–10 High-Synergy Adjacent Domains for Your Transition
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any domain card to inspect crossover mechanics
          </span>
        </div>

        {/* Adjacent Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {adjacentDomainsMap.map((adj) => {
            const isSelected = selectedDomain?.id === adj.id;
            return (
              <div
                key={adj.id}
                onClick={() => setSelectedDomain(adj)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-400'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-slate-900 text-xs">{adj.name}</h3>
                    <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {adj.crossoverScore}% Match
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-2 line-clamp-2">{adj.description}</p>

                  <div className="space-y-1 text-[10px]">
                    <div className="line-clamp-1">
                      <span className="font-bold text-slate-700">Transferable: </span>
                      <span className="text-slate-600">{adj.transferableHooks.join(' • ')}</span>
                    </div>
                    <div className="line-clamp-1">
                      <span className="font-bold text-slate-700">Mechanics: </span>
                      <span className="text-slate-600">{adj.sharedMechanics.join(' • ')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-[10px] text-slate-400 truncate max-w-[170px]">
                    {adj.indiaMarketContext}
                  </span>
                  <span className="text-blue-600 font-bold flex items-center gap-0.5 text-[10px]">
                    Inspect <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Domain Breakdown Drawer */}
      {selectedDomain && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Adjacent Domain Crossover Breakdown
              </div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                {selectedDomain.name}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {selectedDomain.crossoverScore}% Transferability
                </span>
              </h3>
            </div>

            <button
              onClick={() => onSelectAdjacentDomain(selectedDomain.name)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              Switch Primary Target to This Domain <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="font-bold text-blue-700 text-xs mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Transferable Experience Hooks
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {selectedDomain.transferableHooks.map((h, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="font-bold text-emerald-700 text-xs mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Shared Product Mechanics
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                {selectedDomain.sharedMechanics.map((m, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="font-bold text-purple-700 text-xs mb-1.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  Indian Market Context & Hubs
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">{selectedDomain.indiaMarketContext}</p>
              </div>
              <button
                onClick={() => onNavigateToTab('companies')}
                className="mt-2 text-blue-600 hover:text-blue-700 font-bold text-[11px] flex items-center gap-1"
              >
                <span>View matching India companies</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation Strip */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Next: Target {result.indiaCompanyTargetList.length} companies across Early, Growth, and Large Tech hubs.</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToTab('companies')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition flex items-center gap-1"
          >
            Target Companies <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => onNavigateToTab('jobs')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center gap-1"
          >
            Current Job Matches
          </button>
        </div>
      </div>
    </div>
  );
};
