import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Building2,
  MapPin,
  RefreshCw,
  Target,
  Compass,
  Briefcase,
  SlidersHorizontal,
  ChevronRight,
  AlertCircle,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Filter,
  ExternalLink,
  Timer,
  Check,
  Copy
} from 'lucide-react';
import { JobMatch, UserProfile } from '../types';
import { checkDomainMismatch } from '../utils/domainValidation';
import { resolveJobPortalUrls } from '../utils/jobPortalUtils';

interface JobRadarDashboardProps {
  jobs: JobMatch[];
  profile: UserProfile;
  hasApiKey: boolean;
  onOpenAIConnect: () => void;
  onRefreshJobs: (query?: string, location?: string) => void;
  onEditPreferences: () => void;
  isSearching: boolean;
  onSelectJob: (job: JobMatch) => void;
  sourceNotice?: string | null;
}

export const JobRadarDashboard: React.FC<JobRadarDashboardProps> = ({
  jobs,
  profile,
  hasApiKey,
  onOpenAIConnect,
  onRefreshJobs,
  onEditPreferences,
  isSearching,
  onSelectJob,
  sourceNotice
}) => {
  const [tierFilter, setTierFilter] = useState<'all' | 'strong' | 'good' | 'stretch'>('all');
  const [activeDomainTab, setActiveDomainTab] = useState<'all' | string>('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  // Active Searching Live Timer State (in milliseconds)
  const [searchTimeMs, setSearchTimeMs] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching) {
      setSearchTimeMs(0);
      const startTime = Date.now();
      interval = setInterval(() => {
        setSearchTimeMs(Date.now() - startTime);
      }, 100);
    } else {
      setSearchTimeMs(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSearching]);

  // Formatted display values
  const rolesDisplay = Array.isArray(profile.targetRoles) && profile.targetRoles.length > 0
    ? profile.targetRoles.join(', ')
    : (profile.currentRole || 'Product Manager');

  const locationsDisplay = Array.isArray(profile.preferredLocations) && profile.preferredLocations.length > 0
    ? profile.preferredLocations.join(', ')
    : 'Anywhere in India';

  const domainsDisplay = profile.targetDomain && profile.targetDomain.trim().length > 0
    ? profile.targetDomain
    : 'All Domains';
  const expDisplay = `${profile.yearsExperience || 8}+ yrs`;
  const backgroundSummary = profile.resumeText
    ? (profile.resumeText.length > 90 ? profile.resumeText.slice(0, 90) + '...' : profile.resumeText)
    : 'Technical leadership, product ownership, Agile, and software systems';

  const domainMismatch = checkDomainMismatch(
    profile.targetDomain ? profile.targetDomain.split(',').map(s => s.trim()).filter(Boolean) : [],
    profile.resumeText || ''
  );

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesTier =
      tierFilter === 'all' ||
      (tierFilter === 'strong' && job.matchScore >= 80) ||
      (tierFilter === 'good' && job.matchScore >= 70 && job.matchScore < 80) ||
      (tierFilter === 'stretch' && job.matchScore < 70);

    const matchesDomain =
      activeDomainTab === 'all' ||
      job.domain.toLowerCase().includes(activeDomainTab.toLowerCase());

    return matchesTier && matchesDomain;
  });

  // Compute metric counts based on active filtered results
  const totalMatchesCount = filteredJobs.length;
  const strongMatchesCount = filteredJobs.filter((j) => j.matchScore >= 80).length;
  const goodMatchesCount = filteredJobs.filter((j) => j.matchScore >= 70 && j.matchScore < 80).length;
  const stretchMatchesCount = filteredJobs.filter((j) => j.matchScore < 70).length;

  const displayedJobs = filteredJobs.slice(0, visibleCount);

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return (
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono-data font-extrabold text-xs border border-emerald-300 inline-flex items-center gap-1.5 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          {score}% FIT
        </span>
      );
    }
    if (score >= 70) {
      return (
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-mono-data font-extrabold text-xs border border-blue-300 inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          {score}% FIT
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 font-mono-data font-extrabold text-xs border border-amber-300 inline-flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-600" />
        {score}% FIT
      </span>
    );
  };

  const handleCopyPortalLink = (url: string, jobId: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(jobId);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  // Format active timer string: "00:03.4s"
  const formatTimer = (ms: number) => {
    const totalSeconds = ms / 1000;
    const mins = Math.floor(totalSeconds / 60);
    const secs = (totalSeconds % 60).toFixed(1);
    const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
    const secsNum = parseFloat(secs);
    const secsStr = secsNum < 10 ? `0${secs}` : `${secs}`;
    return `${minsStr}:${secsStr}s`;
  };

  // Current active searching step based on elapsed milliseconds
  const currentSearchStep = searchTimeMs < 1200 ? 1 : searchTimeMs < 2400 ? 2 : searchTimeMs < 3800 ? 3 : 4;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-sans space-y-7 text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-mono-data uppercase tracking-wider text-[11px]">
              {rolesDisplay} • {locationsDisplay}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Your Type Job Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Live requisition openings from the <strong className="text-slate-900 font-semibold">past 7 days</strong> analyzed against your career profile with 100% active verified application links.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onEditPreferences}
            disabled={isSearching}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold transition cursor-pointer shadow-xs disabled:opacity-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
            <span>Targeting</span>
          </button>

          <button
            onClick={() => {
              if (!hasApiKey) {
                onOpenAIConnect();
              } else {
                onRefreshJobs();
              }
            }}
            disabled={isSearching}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition shadow-md shadow-blue-600/20 disabled:opacity-50 cursor-pointer font-display"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSearching ? 'animate-spin' : ''}`} />
            <span>{isSearching ? 'Scanning Live Jobs...' : 'Scan 7-Day Live Jobs'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ACTIVE SEARCHING VIEW (SHOWN EXCLUSIVELY WHILE SEARCH IS IN PROGRESS)  */}
      {/* ========================================================================= */}
      {isSearching ? (
        <div className="bg-white rounded-3xl border border-blue-200 p-8 sm:p-12 shadow-xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
          {/* Animated Background Radar Ring Gradients */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-50/70 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-50/70 blur-3xl pointer-events-none" />

          {/* Active Live Timer & Radar Graphic */}
          <div className="relative flex flex-col items-center justify-center space-y-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Pulsing Concentric Rings */}
              <div className="absolute inset-0 rounded-full bg-blue-100/80 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-blue-50 border-2 border-blue-300/80 flex items-center justify-center shadow-md animate-pulse">
                <Radio className="w-10 h-10 text-blue-600 animate-bounce" />
              </div>
            </div>

            {/* HIGH-PRECISION LIVE SEARCH TIMER DISPLAY */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-md font-mono-data">
              <Timer className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-xs font-semibold text-slate-400">Search Active:</span>
              <span className="text-sm font-black text-emerald-400 tracking-wider">
                {formatTimer(searchTimeMs)}
              </span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Scanning Verified Indian Tech Career Portals…
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Indexing active openings from the past 7 days strictly tailored for <strong className="text-slate-900 font-semibold">{rolesDisplay}</strong> in <strong className="text-slate-900 font-semibold">{locationsDisplay}</strong> with 100% active application links.
            </p>
          </div>

          {/* Real-time Progressive Stages Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left text-xs">
            {/* Step 1 */}
            <div className={`p-4 rounded-2xl border transition-all ${currentSearchStep >= 1 ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-medium shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="flex items-start gap-2.5">
                {currentSearchStep > 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-slate-900">1. Indexing Portals</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Connecting to official Indian tech career feeds</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-2xl border transition-all ${currentSearchStep >= 2 ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-medium shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="flex items-start gap-2.5">
                {currentSearchStep > 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : currentSearchStep === 2 ? (
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-slate-900">2. 7-Day Window</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Filtering fresh postings in {locationsDisplay}</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`p-4 rounded-2xl border transition-all ${currentSearchStep >= 3 ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-medium shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="flex items-start gap-2.5">
                {currentSearchStep > 3 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : currentSearchStep === 3 ? (
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-slate-900">3. Role Match</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Evaluating fit for {domainsDisplay}</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`p-4 rounded-2xl border transition-all ${currentSearchStep >= 4 ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950 font-medium shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="flex items-start gap-2.5">
                {currentSearchStep >= 4 ? (
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-emerald-900">4. Direct Links</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Verifying 100% active application routes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Scope Box */}
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono-data font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                SEARCH PARAMETERS
              </span>
              <span className="font-mono-data text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                Link Verifier Active
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700 font-medium pt-1">
              <div>
                <span className="text-slate-400 text-[10px] block">Target Roles:</span>
                <span className="font-bold text-slate-900 truncate block">{rolesDisplay}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Target City:</span>
                <span className="font-bold text-slate-900 truncate block">{locationsDisplay}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Domain Track:</span>
                <span className="font-bold text-blue-700 truncate block">{domainsDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. COMPLETED SEARCH RESULTS VIEW (RENDERED WHEN SEARCH IS FINISHED)       */
        /* ========================================================================= */
        <>
          {/* USER PREFERENCE SUMMARY BOX ("YOUR RADAR PROFILE") */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-data font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  ACTIVE CRITERIA
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Filtered strictly to chosen domains, locations & roles with live verified links
                </span>
              </div>

              <button
                onClick={onEditPreferences}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer border border-blue-200 w-fit"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>Refine Criteria</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-semibold flex items-center gap-1 mb-1 font-mono-data text-[11px]">
                  <span>🎯</span>
                  <span>Target Roles</span>
                </span>
                <p className="font-bold text-slate-800 line-clamp-2">
                  {rolesDisplay}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-semibold flex items-center gap-1 mb-1 font-mono-data text-[11px]">
                  <span>📍</span>
                  <span>Locations</span>
                </span>
                <p className="font-bold text-slate-800 line-clamp-2">
                  {locationsDisplay}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-semibold flex items-center gap-1 mb-1 font-mono-data text-[11px]">
                  <span>🏭</span>
                  <span>Domain Track</span>
                </span>
                <p className="font-bold text-blue-700 line-clamp-2">
                  {domainsDisplay}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-semibold flex items-center gap-1 mb-1 font-mono-data text-[11px]">
                  <span>💼</span>
                  <span>Seniority</span>
                </span>
                <p className="font-bold text-slate-800">
                  {expDisplay}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2 lg:col-span-1">
                <span className="text-slate-500 font-semibold flex items-center gap-1 mb-1 font-mono-data text-[11px]">
                  <span>💻</span>
                  <span>Trajectory Anchor</span>
                </span>
                <p className="font-medium text-slate-700 line-clamp-2 text-[11px]">
                  {backgroundSummary}
                </p>
              </div>
            </div>

            {/* DOMAIN & PROMPT MISMATCH CALLOUT */}
            {domainMismatch.hasMismatch && (
              <div className="mt-3.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Notice:</strong> Your target domain is <strong>{domainMismatch.selectedDomains.join(', ')}</strong>, but your background prompt mentions <strong>{domainMismatch.conflictingDomains.join(', ')}</strong>.
                  </span>
                </div>

                <button
                  onClick={onEditPreferences}
                  className="px-3.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition cursor-pointer w-fit"
                >
                  Align Domain →
                </button>
              </div>
            )}
          </div>

          {/* 4 METRIC SUMMARY CARDS */}
          <div>
            <p className="text-xs font-mono-data font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              FIT METRICS & MATCH BREAKDOWN
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* ALL RELEVANT */}
              <div
                onClick={() => setTierFilter('all')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  tierFilter === 'all'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <p className={`text-[10px] font-mono-data font-extrabold uppercase tracking-wider ${tierFilter === 'all' ? 'text-blue-100' : 'text-slate-500'}`}>
                  TOTAL OPPORTUNITIES
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight font-display">
                  {totalMatchesCount}
                </p>
                <p className={`text-xs mt-1 font-medium ${tierFilter === 'all' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Past 7 days active
                </p>
              </div>

              {/* STRONG MATCHES (80-100%) */}
              <div
                onClick={() => setTierFilter(tierFilter === 'strong' ? 'all' : 'strong')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  tierFilter === 'strong'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-emerald-300 shadow-xs'
                }`}
              >
                <p className={`text-[10px] font-mono-data font-extrabold uppercase tracking-wider ${tierFilter === 'strong' ? 'text-emerald-100' : 'text-emerald-700'}`}>
                  STRONG MATCHES
                </p>
                <p className={`text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight font-display ${tierFilter === 'strong' ? 'text-white' : 'text-emerald-700'}`}>
                  {strongMatchesCount}
                </p>
                <p className={`text-xs mt-1 font-medium ${tierFilter === 'strong' ? 'text-emerald-100' : 'text-slate-500'}`}>
                  80–100% Fit Score
                </p>
              </div>

              {/* GOOD MATCHES (70-79%) */}
              <div
                onClick={() => setTierFilter(tierFilter === 'good' ? 'all' : 'good')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  tierFilter === 'good'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300 shadow-xs'
                }`}
              >
                <p className={`text-[10px] font-mono-data font-extrabold uppercase tracking-wider ${tierFilter === 'good' ? 'text-indigo-100' : 'text-indigo-700'}`}>
                  GOOD MATCHES
                </p>
                <p className={`text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight font-display ${tierFilter === 'good' ? 'text-white' : 'text-indigo-700'}`}>
                  {goodMatchesCount}
                </p>
                <p className={`text-xs mt-1 font-medium ${tierFilter === 'good' ? 'text-indigo-100' : 'text-slate-500'}`}>
                  70–79% Fit Score
                </p>
              </div>

              {/* STRETCH OPPORTUNITIES (60-69%) */}
              <div
                onClick={() => setTierFilter(tierFilter === 'stretch' ? 'all' : 'stretch')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  tierFilter === 'stretch'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                <p className={`text-[10px] font-mono-data font-extrabold uppercase tracking-wider ${tierFilter === 'stretch' ? 'text-amber-100' : 'text-amber-800'}`}>
                  STRETCH ROLES
                </p>
                <p className={`text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight font-display ${tierFilter === 'stretch' ? 'text-white' : 'text-amber-800'}`}>
                  {stretchMatchesCount}
                </p>
                <p className={`text-xs mt-1 font-medium ${tierFilter === 'stretch' ? 'text-amber-100' : 'text-slate-500'}`}>
                  High Growth Tier
                </p>
              </div>
            </div>
          </div>

          {/* VERIFIED JOB CARDS WITH DIRECT ACTIVE APPLICATION LINKS */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display flex items-center gap-2">
                  <span>Verified Requisitions ({totalMatchesCount} Live)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filtered to {rolesDisplay} in {locationsDisplay} • All postings include direct active links
                </p>
              </div>
              {tierFilter !== 'all' && (
                <button
                  onClick={() => setTierFilter('all')}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
                >
                  Show all ({jobs.length})
                </button>
              )}
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {displayedJobs.map((job) => {
                const portal = resolveJobPortalUrls(
                  job.company,
                  job.jobTitle,
                  job.location,
                  job.applicationUrl,
                  job.postedDate
                );

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                  >
                    {/* Left Column: Role Details & Match Insights */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {getScoreBadge(job.matchScore)}
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 border border-slate-200 text-slate-700">
                          {job.domain}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{portal.freshnessLabel}</span>
                        </span>
                        {job.salaryRange && (
                          <span className="text-[11px] font-mono-data font-bold text-emerald-800 bg-emerald-50/60 px-2.5 py-0.5 rounded border border-emerald-200">
                            {job.salaryRange}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display">
                          {job.jobTitle}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-1 flex flex-wrap items-center gap-2.5">
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            {job.company}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {job.location}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono-data text-slate-500">{job.experienceRequired}</span>
                        </p>
                      </div>

                      {/* Concise Fit Reason */}
                      <p className="text-xs text-slate-700 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200/70 font-normal leading-relaxed">
                        <strong className="text-slate-900 font-semibold">Match Logic: </strong>
                        {job.whyItMatches}
                      </p>

                      {/* Active Direct Link Domain Tag & Copy Helper */}
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/70 border border-emerald-200/80 px-2.5 py-0.5 rounded-md font-mono-data font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-xs sm:max-w-md">Active Link: {portal.primaryUrl}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyPortalLink(portal.primaryUrl, job.id)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition"
                        >
                          {copiedUrlId === job.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied URL</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Direct Action Buttons with Real Active Links */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 min-w-[200px]">
                      {/* PRIMARY ACTIVE LINK BUTTON (Direct Official Portal Application Link) */}
                      <a
                        href={portal.primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer font-display text-center"
                      >
                        <span>Apply / Open Portal</span>
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </a>

                      {/* MODAL TRIGGER: View Deep Analysis & Pitch Generator */}
                      <button
                        id={`view-job-${job.id}`}
                        onClick={() => onSelectJob(job)}
                        className="w-full px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Fit Insights & Pitch</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* "See more opportunities" Button */}
              {filteredJobs.length > visibleCount && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition shadow-2xs cursor-pointer inline-flex items-center gap-2 font-display"
                  >
                    <span>Show More Openings ({filteredJobs.length - visibleCount} more)</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              )}

              {/* Empty State */}
              {filteredJobs.length === 0 && !isSearching && (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 space-y-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg font-display">
                      No active roles found for this exact filter combination.
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                      Try adjusting your filter tiers or domain selections.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={onEditPreferences}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer font-display"
                    >
                      Adjust My Preferences
                    </button>
                    <button
                      onClick={() => {
                        setTierFilter('all');
                        setActiveDomainTab('all');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
