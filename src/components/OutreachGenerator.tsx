import React, { useState } from 'react';
import {
  Send,
  Copy,
  Check,
  Sparkles,
  Users,
  Briefcase,
  Zap,
  RefreshCw,
  Mail
} from 'lucide-react';
import { OutreachTemplate, UserProfile, CompanyTarget, JobMatch } from '../types';
import { DEFAULT_OUTREACH_TEMPLATES } from '../data/pmEcosystemData';

interface OutreachGeneratorProps {
  profile: UserProfile;
  userApiKey: string | null;
  onOpenConnectModal: () => void;
  initialCompany?: CompanyTarget | null;
  initialJob?: JobMatch | null;
}

export const OutreachGenerator: React.FC<OutreachGeneratorProps> = ({
  profile,
  userApiKey,
  onOpenConnectModal,
  initialCompany,
  initialJob
}) => {
  const [activeType, setActiveType] = useState<'recruiter' | 'networking' | 'cold_pitch'>('recruiter');
  const [targetCompany, setTargetCompany] = useState(
    initialCompany?.name || initialJob?.company || 'Razorpay'
  );
  const [targetRole, setTargetRole] = useState(
    initialJob?.jobTitle || (initialCompany?.potentialRoles[0] || 'Product Manager')
  );
  const [specificFeature, setSpecificFeature] = useState('UPI Autopay & Smart Checkout Router');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Template state
  const [customSubject, setCustomSubject] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [customTips, setCustomTips] = useState<string[]>([]);

  // Update body when inputs or type changes
  const baseTemplate = DEFAULT_OUTREACH_TEMPLATES.find((t) => t.type === activeType) || DEFAULT_OUTREACH_TEMPLATES[0];

  const getPopulatedTemplate = () => {
    let sub = customSubject || baseTemplate.subjectLine;
    let body = customBody || baseTemplate.body;

    sub = sub
      .replace(/\[Company\]/g, targetCompany)
      .replace(/\[Target Role\]/g, targetRole)
      .replace(/\[Specific Product Area\]/g, specificFeature);

    body = body
      .replace(/\[Recruiter Name\]/g, 'Hiring Leader')
      .replace(/\[Target Role\]/g, targetRole)
      .replace(/\[Company\]/g, targetCompany)
      .replace(/\[X\]/g, `${profile.yearsExperience}`)
      .replace(/\[Current Domain \/ Tech Strength\]/g, profile.technicalSkills.slice(0, 3).join(', ') || profile.currentIndustry)
      .replace(/\[Specific Key Metric \/ Milestone\]/g, profile.portfolioProjects ? profile.portfolioProjects.slice(0, 45) : 'accelerated core conversion by 22%')
      .replace(/\[Peer Name\]/g, 'Fellow Product Leader')
      .replace(/\[Alumni Network \/ Shared Interest \/ Tech Hub\]/g, `India tech ecosystem & ${targetCompany}'s recent scale`)
      .replace(/\[Product Area\]/g, specificFeature)
      .replace(/\[Hiring Manager Name\]/g, 'Hiring Manager')
      .replace(/\[Specific Problem Observation\]/g, `reducing latency and drop-offs during payment intent in high-load scenarios`)
      .replace(/\[Proposed Solution \/ Feature Idea\]/g, `a lightweight pre-cached intent validation flow`)
      .replace(/\[Your Name\]/g, profile.fullName || 'Candidate');

    return { subject: sub, body };
  };

  const currentOutreach = getPopulatedTemplate();

  const handleCopy = () => {
    const textToCopy = `Subject: ${currentOutreach.subject}\n\n${currentOutreach.body}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAIGenerate = async () => {
    if (!userApiKey) {
      setErrorMessage('Please connect your Gemini API key before using AI Deep Polish.');
      onOpenConnectModal();
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/pm/generate-outreach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': userApiKey || ''
        },
        body: JSON.stringify({
          type: activeType,
          companyName: targetCompany,
          roleTitle: targetRole,
          specificFeature,
          userProfile: profile
        })
      });
      const data = await response.json();
      if (!data.success && data.error) {
        setErrorMessage(data.error);
        return;
      }
      if (data.success && data.data) {
        setCustomSubject(data.data.subjectLine || '');
        setCustomBody(data.data.body || '');
        setCustomTips(data.data.customizationTips || []);
      }
    } catch {
      setErrorMessage('Something went wrong while generating the message. Please check your Gemini connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="space-y-3.5">
      {/* High Density Banner & Config */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Outreach & Networking // Proof of Work
            </h2>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              High-Converting Outreach Generator for Indian Tech PM Roles
            </h3>
          </div>

          {/* Type Selector */}
          <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 gap-1 text-xs">
            {[
              { id: 'recruiter', label: 'Recruiter InMail', icon: Briefcase },
              { id: 'networking', label: 'Peer Referral', icon: Users },
              { id: 'cold_pitch', label: 'Proof-of-Work Pitch', icon: Zap }
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = activeType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveType(t.id as any);
                    setCustomSubject('');
                    setCustomBody('');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Target Company</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              placeholder="e.g. Swiggy, Razorpay, Zepto"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Target Role Title</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              placeholder="e.g. Product Manager - Core Payments"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Specific Product / Feature Area</label>
            <input
              type="text"
              value={specificFeature}
              onChange={(e) => setSpecificFeature(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Checkout drop-off reduction, UPI 2.0"
            />
          </div>
        </div>
      </div>

      {/* Message Output Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-3 shadow-xs">
        {errorMessage && (
          <div className="p-2.5 rounded bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center justify-between gap-2">
            <span>{errorMessage}</span>
            <button
              onClick={onOpenConnectModal}
              className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px]"
            >
              Connect Key
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {baseTemplate.title}
            </span>
            <div className="text-[11px] text-slate-500">Target Recipient: <span className="font-semibold text-slate-700">{baseTemplate.recipientRole}</span></div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAIGenerate}
              disabled={isGenerating}
              className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className={`w-3 h-3 text-blue-600 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Polishing...' : 'AI Deep Polish'}
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy Template'}
            </button>
          </div>
        </div>

        {/* Subject Line */}
        <div className="space-y-0.5">
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Subject Line:</label>
          <input
            type="text"
            value={currentOutreach.subject}
            onChange={(e) => setCustomSubject(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Message Body */}
        <div className="space-y-0.5">
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Message Body:</label>
          <textarea
            rows={7}
            value={currentOutreach.body}
            onChange={(e) => setCustomBody(e.target.value)}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>

        {/* Best Practice Tips */}
        <div className="bg-slate-50 rounded p-2.5 border border-slate-200 text-xs">
          <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">India Outreach Best Practices:</div>
          <ul className="space-y-0.5 text-slate-600 list-disc list-inside text-[11px]">
            {customTips.length > 0
              ? customTips.map((tip, i) => <li key={i}>{tip}</li>)
              : baseTemplate.customizationTips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
