import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Send,
  Check,
  Target,
  Zap,
  Clock,
  Globe,
  Share2,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { JobMatch, UserProfile } from '../types';
import { resolveJobPortalUrls } from '../utils/jobPortalUtils';

interface JobDetailModalProps {
  job: JobMatch | null;
  profile: UserProfile;
  userApiKey?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  profile,
  userApiKey,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showDraftNote, setShowDraftNote] = useState(false);

  // Stage 2: On-Demand Deep Analysis State
  const [isDeepAnalyzing, setIsDeepAnalyzing] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState<{
    strategicFitSummary?: string;
    topStrengthsToHighlight?: string[];
    potentialConcernsAndMitigations?: { concern: string; mitigation: string }[];
    customOutreachNote?: string;
    interviewPreparationTip?: string;
  } | null>(null);

  if (!isOpen || !job) return null;

  const portalInfo = resolveJobPortalUrls(
    job.company,
    job.jobTitle,
    job.location,
    job.applicationUrl,
    job.postedDate
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60 shadow-sm';
    if (score >= 80) return 'bg-blue-950/90 text-cyan-300 border-blue-700/60 shadow-sm';
    return 'bg-amber-950/90 text-amber-300 border-amber-700/60 shadow-sm';
  };

  const sampleOutreachNote = deepAnalysis?.customOutreachNote || `Hi ${job.company} Hiring Team,

I noticed the ${job.jobTitle} opening at ${job.company} in ${job.location} (verified active in the past 7 days). With my background in ${profile.currentRole || 'Product Execution'} (${profile.yearsExperience || '8'} years) and focus in ${job.domain}, I have driven impactful feature launches and technical cross-functional delivery.

I would welcome the opportunity to discuss how my skillset aligns with ${job.company}'s product roadmap.

Best regards,
${profile.fullName || 'Candidate'}`;

  const handleCopyNote = () => {
    navigator.clipboard.writeText(sampleOutreachNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleOpenLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleRunDeepAnalysis = async () => {
    if (!userApiKey) return;
    setIsDeepAnalyzing(true);
    try {
      const res = await fetch('/api/pm/deep-analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': userApiKey
        },
        body: JSON.stringify({
          job,
          profile
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setDeepAnalysis(data.analysis);
      }
    } catch {
      // Graceful error handling
    } finally {
      setIsDeepAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 text-slate-900 relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono-data font-bold border ${getScoreColor(job.matchScore)}`}>
                {job.matchScore}% FIT SCORE
              </span>
              <span className="text-xs text-slate-700 font-semibold px-2.5 py-0.5 rounded-md bg-white border border-slate-300">
                {job.domain}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{portalInfo.freshnessLabel} (Past 7 Days Verified)</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight font-display">
              {job.jobTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mt-2">
              <span className="flex items-center gap-1 text-slate-900 font-bold">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                {job.company}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {job.location}
              </span>
              {job.salaryRange && (
                <>
                  <span>•</span>
                  <span className="text-emerald-700 font-mono-data font-bold">{job.salaryRange}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition shrink-0 cursor-pointer border border-transparent"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 relative z-10 custom-scrollbar">
          {/* VERIFIED 7-DAY PORTAL DIRECT ACCESS CARD */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-900 text-xs font-display">
                  Official Career Portal Access (Past 7-Day Active Opening)
                </span>
              </div>
              <span className="text-[11px] text-emerald-800 font-mono-data font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full w-fit">
                🟢 Live Portal Route
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Open the verified direct application page on the official <strong>{job.company}</strong> careers portal:
            </p>

            <div className="pt-1">
              {/* Primary Direct Link */}
              <a
                href={portalInfo.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleOpenLink(portalInfo.primaryUrl)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm transition shadow-sm cursor-pointer text-center font-display"
              >
                <span>Open Official {job.company} Careers Portal</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* Direct URL copy helper */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
              <span className="truncate max-w-xs font-mono-data text-[10px] text-slate-500">{portalInfo.primaryUrl}</span>
              <button
                type="button"
                onClick={() => handleCopyUrl(portalInfo.primaryUrl)}
                className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1.5 cursor-pointer shrink-0 ml-2"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied link!' : 'Copy Portal URL'}</span>
              </button>
            </div>
          </div>

          {/* Section 1: Why this matches you */}
          <div>
            <h3 className="text-xs font-mono-data font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Match Assessment</span>
            </h3>
            <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-medium">
              {job.whyItMatches}
            </p>
          </div>

          {/* Section 2: Your relevant experience */}
          {job.directExperience && job.directExperience.length > 0 && (
            <div>
              <h3 className="text-xs font-mono-data font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                Direct Strengths from Profile
              </h3>
              <div className="space-y-2">
                {job.directExperience.map((exp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Transferable skills */}
          {job.transferableExperience && job.transferableExperience.length > 0 && (
            <div>
              <h3 className="text-xs font-mono-data font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                Transferable Domain Elements
              </h3>
              <div className="space-y-2">
                {job.transferableExperience.map((t, idx) => (
                  <div key={`t-${idx}`} className="flex items-start gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Important skill gaps */}
          {job.skillGaps && job.skillGaps.length > 0 && (
            <div>
              <h3 className="text-xs font-mono-data font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                Identified Growth & Prep Gaps
              </h3>
              <div className="space-y-2">
                {job.skillGaps.map((gap, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 2: ON-DEMAND DEEP ANALYSIS ACCORDION */}
          <div className="pt-2 border-t border-slate-200">
            {!deepAnalysis ? (
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 font-display">
                    <Zap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Deep Strategic Interview & Prep Analysis</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Generate recruiter talking points and tailored positioning on demand.
                  </p>
                </div>

                <button
                  onClick={handleRunDeepAnalysis}
                  disabled={isDeepAnalyzing || !userApiKey}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-xs shrink-0 cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5 font-display"
                >
                  {isDeepAnalyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <span>Run Deep Analysis ⚡</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs font-display">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Strategic Positioning Breakdown</span>
                </div>

                {deepAnalysis.strategicFitSummary && (
                  <p className="text-xs text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed font-medium">
                    {deepAnalysis.strategicFitSummary}
                  </p>
                )}

                {deepAnalysis.topStrengthsToHighlight && deepAnalysis.topStrengthsToHighlight.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Top Strengths to Pitch
                    </h5>
                    <div className="space-y-1.5">
                      {deepAnalysis.topStrengthsToHighlight.map((str, i) => (
                        <div key={i} className="text-xs text-slate-800 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {deepAnalysis.interviewPreparationTip && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <strong>💡 Key Interview Angle:</strong> {deepAnalysis.interviewPreparationTip}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick outreach note toggle */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowDraftNote(!showDraftNote)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{showDraftNote ? 'Hide introduction note' : 'Draft tailored recruiter introduction note'}</span>
            </button>

            {showDraftNote && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-150 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-data font-bold text-slate-500 uppercase">Ready-to-Send Outreach</span>
                  <button
                    onClick={handleCopyNote}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-800 bg-white px-3 py-1 rounded-lg border border-slate-300 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Note'}</span>
                  </button>
                </div>
                <pre className="text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {sampleOutreachNote}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3 relative z-10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
          >
            Close
          </button>

          <a
            id="view-application-page-modal-btn"
            href={portalInfo.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleOpenLink(portalInfo.primaryUrl)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer font-display"
          >
            <span>View Application Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};


