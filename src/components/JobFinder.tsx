import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Search,
  Send,
  Zap,
  DollarSign,
  ShieldCheck,
  Key,
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { JobMatch, UserProfile } from '../types';
import { resolveJobPortalUrls } from '../utils/jobPortalUtils';

interface JobFinderProps {
  jobs: JobMatch[];
  profile: UserProfile;
  userApiKey: string | null;
  onOpenConnectModal: () => void;
  onSearchLiveJobs: (query: string, location: string) => void;
  isSearching: boolean;
  onOpenOutreachForJob: (job: JobMatch) => void;
}

export const JobFinder: React.FC<JobFinderProps> = ({
  jobs,
  profile,
  userApiKey,
  onOpenConnectModal,
  onSearchLiveJobs,
  isSearching,
  onOpenOutreachForJob
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(
    profile.preferredLocations && profile.preferredLocations.length > 0
      ? profile.preferredLocations[0]
      : 'all'
  );
  const [scoreTierFilter, setScoreTierFilter] = useState('all');
  const [showKeyWarning, setShowKeyWarning] = useState(false);

  const isConnected = Boolean(userApiKey);

  const handleFindMyBestJobs = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isConnected) {
      setShowKeyWarning(true);
      onOpenConnectModal();
      return;
    }
    setShowKeyWarning(false);
    onSearchLiveJobs(searchQuery, selectedCity);
  };

  const filteredJobs = jobs.filter((job) => {
    // City filter
    if (selectedCity !== 'all' && !job.location.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    // Score tier filter
    if (scoreTierFilter === 'excellent' && job.matchScore < 90) return false;
    if (scoreTierFilter === 'strong' && (job.matchScore < 80 || job.matchScore >= 90)) return false;
    if (scoreTierFilter === 'good' && (job.matchScore < 70 || job.matchScore >= 80)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchComp = job.company.toLowerCase().includes(q);
      const matchTitle = job.jobTitle.toLowerCase().includes(q);
      const matchDomain = job.domain.toLowerCase().includes(q);
      return matchComp || matchTitle || matchDomain;
    }
    return true;
  });

  const getScoreCircleStyle = (score: number) => {
    if (score >= 90) return 'border-emerald-500 text-emerald-700 bg-emerald-50';
    if (score >= 80) return 'border-blue-500 text-blue-700 bg-blue-50';
    if (score >= 70) return 'border-indigo-500 text-indigo-700 bg-indigo-50';
    return 'border-amber-500 text-amber-700 bg-amber-50';
  };

  return (
    <div className="space-y-3.5">
      {/* 6-Step Workflow Guide Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-3.5 border border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                BYOK AI Job Search Workflow // 6 Steps to India PM Matches
              </h2>
              <p className="text-[11px] text-slate-400">
                Grounds real-time Indian job data with Google Search using your personal Gemini API key
              </p>
            </div>
          </div>

          {/* Key Status Indicator */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div
                id="job-finder-connected-badge"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Using your Gemini API key</span>
              </div>
            ) : (
              <button
                id="job-finder-connect-btn"
                type="button"
                onClick={onOpenConnectModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold transition"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Connect Gemini API</span>
              </button>
            )}
          </div>
        </div>

        {/* 6-Step Micro Visual Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 pt-2.5 text-[10px]">
          {[
            {
              step: 'STEP 1',
              title: 'Connect API',
              desc: isConnected ? 'Key Active ✓' : 'Connect Key',
              done: isConnected
            },
            {
              step: 'STEP 2',
              title: 'Career Profile',
              desc: `${profile.yearsExperience}y ${profile.currentRole || 'SWE'}`,
              done: Boolean(profile.fullName)
            },
            {
              step: 'STEP 3',
              title: 'Target Target',
              desc: `${profile.targetDomain}`,
              done: Boolean(profile.targetDomain)
            },
            {
              step: 'STEP 4',
              title: 'Find Jobs',
              desc: 'Click CTA Button',
              done: false
            },
            {
              step: 'STEP 5',
              title: 'AI Search',
              desc: 'Grounding Live Hubs',
              done: isSearching
            },
            {
              step: 'STEP 6',
              title: 'Ranked Matches',
              desc: `${filteredJobs.length} Ranked Openings`,
              done: filteredJobs.length > 0
            }
          ].map((s, idx) => (
            <div
              key={idx}
              className={`p-1.5 rounded border text-left transition ${
                s.done
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
              }`}
            >
              <div className="font-bold text-[9px] text-slate-400 uppercase">{s.step}</div>
              <div className="font-semibold text-slate-100 truncate text-[10px]">{s.title}</div>
              <div className="text-[9px] text-slate-400 truncate">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Disconnected Warning Alert if triggered */}
      {(!isConnected || showKeyWarning) && (
        <div
          id="byok-missing-key-warning"
          className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-900 flex items-start justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-900 text-xs">
                Please connect your Gemini API key before starting the AI job search.
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                To respect quota boundaries, this application does NOT consume default keys. All real-time grounded search workflows run exclusively on your personal session key.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenConnectModal}
            className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition"
          >
            Connect Key
          </button>
        </div>
      )}

      {/* High Density Filter & Header Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              PM Job Matches // Verified India Openings
            </h2>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Current Openings Scored Against Candidate Background
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 90%+ Match
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-bold text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> 80–89% Strong
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> 60–79% Stretch
            </span>
          </div>
        </div>

        {/* Live Search Form & Find My Best Jobs Button */}
        <form onSubmit={handleFindMyBestJobs} className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-3 text-xs">
          <div className="sm:col-span-4 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies (Swiggy, Razorpay), title, or keywords..."
              className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="all">All Indian Locations</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Gurugram">Gurugram / NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Remote">Remote (India)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              value={scoreTierFilter}
              onChange={(e) => setScoreTierFilter(e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="all">All Match Scores</option>
              <option value="excellent">90+ (Excellent)</option>
              <option value="strong">80–89 (Strong)</option>
              <option value="good">70–79 (Good)</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <button
              id="find-my-best-jobs-btn"
              type="submit"
              disabled={isSearching}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-blue-200 ${isSearching ? 'animate-spin' : ''}`} />
              {isSearching ? 'Grounding Live Jobs...' : 'Find My Best Jobs'}
            </button>
          </div>
        </form>
      </div>

      {/* High Density Jobs List */}
      <div className="space-y-3">
        {filteredJobs.map((job) => {
          return (
            <div
              key={job.id}
              className="bg-white rounded-lg border border-slate-200 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-all duration-150"
            >
              {/* Job Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-sm">{job.jobTitle}</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200 uppercase">
                      {job.company}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">
                      {job.domain}
                    </span>
                    {job.verified !== false && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        Verified Opening
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
                      Exp: {job.experienceRequired}
                    </span>
                    {job.salaryRange && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">
                          {job.salaryRange}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Score Circular Meter */}
                <div className="shrink-0 flex items-center gap-2">
                  <div
                    className={`w-11 h-11 rounded-full border-2 flex flex-col items-center justify-center font-bold text-xs shadow-2xs ${getScoreCircleStyle(
                      job.matchScore
                    )}`}
                  >
                    <span>{job.matchScore}%</span>
                    <span className="text-[8px] uppercase tracking-tighter opacity-80">Match</span>
                  </div>
                </div>
              </div>

              {/* Match Rationale */}
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                <strong className="text-slate-900 font-bold">Why it matches: </strong>
                {job.whyItMatches}
              </p>

              {/* High Density 3-Column Strength & Gap Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2.5 text-[11px]">
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded p-2">
                  <div className="font-bold text-emerald-800 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Direct Experience
                  </div>
                  <ul className="space-y-0.5 text-emerald-900">
                    {job.directExperience.map((d, i) => (
                      <li key={i} className="line-clamp-1">• {d}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50/60 border border-blue-200/80 rounded p-2">
                  <div className="font-bold text-blue-800 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-blue-600" />
                    Transferable Strengths
                  </div>
                  <ul className="space-y-0.5 text-blue-900">
                    {job.transferableExperience.map((t, i) => (
                      <li key={i} className="line-clamp-1">• {t}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/60 border border-amber-200/80 rounded p-2">
                  <div className="font-bold text-amber-800 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                    Skill Gaps to Address
                  </div>
                  <ul className="space-y-0.5 text-amber-900">
                    {job.skillGaps.map((g, i) => (
                      <li key={i} className="line-clamp-1">• {g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-700">
                <span className="font-bold text-slate-900">Recommendation: </span>
                <span>{job.recommendation}</span>
              </div>

              {/* Action Strip */}
              {(() => {
                const portal = resolveJobPortalUrls(job.company, job.jobTitle, job.location, job.applicationUrl, job.postedDate);
                return (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      🟢 {portal.freshnessLabel} • Active
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenOutreachForJob(job)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3 h-3 text-blue-600" />
                        Tailored Outreach
                      </button>

                      <a
                        href={portal.primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        Apply / View Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-6 text-center text-slate-500 text-xs">
            No matching jobs found with the selected criteria. Try adjusting the city or match score filter, or click "Find My Best Jobs" to fetch fresh openings with your Gemini API key.
          </div>
        )}
      </div>
    </div>
  );
};

