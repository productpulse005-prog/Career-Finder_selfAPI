import React, { useState } from 'react';
import {
  Wrench,
  Layers,
  BarChart3,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Cpu,
  Database,
  Layout,
  GitBranch,
  Split,
  Target
} from 'lucide-react';
import { PMToolItem, UserProfile } from '../types';

interface PMToolsGuideProps {
  coreTools: PMToolItem[];
  domainTools: PMToolItem[];
  analyticsTools: PMToolItem[];
  profile: UserProfile;
}

export const PMToolsGuide: React.FC<PMToolsGuideProps> = ({
  coreTools,
  domainTools,
  analyticsTools,
  profile
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'domain' | 'analytics'>('all');
  const [knownTools, setKnownTools] = useState<Record<string, boolean>>({});
  const [copiedArtifact, setCopiedArtifact] = useState<string | null>(null);

  const toggleToolKnown = (id: string) => {
    setKnownTools((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyArtifact = (artifact: string, id: string) => {
    navigator.clipboard.writeText(artifact);
    setCopiedArtifact(id);
    setTimeout(() => setCopiedArtifact(null), 2000);
  };

  const allTools = [
    ...coreTools.map((t) => ({ ...t, catTag: 'A. Core PM Toolkit' })),
    ...domainTools.map((t) => ({ ...t, catTag: `B. ${profile.targetDomain} Domain Tools` })),
    ...analyticsTools.map((t) => ({ ...t, catTag: 'C. Analytics & Experimentation' }))
  ];

  const filteredTools = allTools.filter((tool) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'core') return tool.category === 'core';
    if (activeCategory === 'domain') return tool.category === 'domain';
    if (activeCategory === 'analytics') return tool.category === 'analytics';
    return true;
  });

  const totalCount = allTools.length;
  const knownCount = Object.values(knownTools).filter(Boolean).length;
  const progressPercent = Math.round((knownCount / (totalCount || 1)) * 100);

  return (
    <div className="space-y-3.5">
      {/* High Density Banner & Tracker */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              PM Stack // 1-Sentence Usage Guide
            </h2>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Tools Directory for {profile.targetDomain} Product Teams in India
            </h3>
          </div>

          {/* Self-Assessment Progress Bar */}
          <div className="bg-slate-50 rounded p-2 border border-slate-200 min-w-[180px] text-xs">
            <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] mb-1">
              <span>Stack Proficiency</span>
              <span className="text-blue-600">{knownCount}/{totalCount} ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* High Density Category Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-3 text-xs">
          {[
            { id: 'all', label: `All (${allTools.length})` },
            { id: 'core', label: `A. Core Toolkit (${coreTools.length})` },
            { id: 'domain', label: `B. Domain-Specific (${domainTools.length})` },
            { id: 'analytics', label: `C. Analytics & Experiments (${analyticsTools.length})` }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* High Density Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTools.map((tool) => {
          const isKnown = Boolean(knownTools[tool.id]);
          return (
            <div
              key={tool.id}
              className={`rounded-lg border p-3.5 flex flex-col justify-between transition-all duration-150 ${
                isKnown
                  ? 'border-emerald-300 bg-emerald-50/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {tool.catTag}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs">{tool.name}</h3>
                  </div>

                  <button
                    onClick={() => toggleToolKnown(tool.id)}
                    className={`p-1 rounded border transition ${
                      isKnown
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                    }`}
                    title={isKnown ? 'Mark as unfamiliar' : 'Mark as known / proficient'}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 1-Sentence PM Usage Explanation (Mandatory Guideline) */}
                <div className="my-2 p-2 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-800 leading-relaxed font-medium">
                  "{tool.pmUsageSentence}"
                </div>

                {/* Sample Deliverable Artifact */}
                {tool.sampleArtifact && (
                  <div className="text-[10px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-0.5">
                      Sample Artifact:
                    </span>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-slate-800 font-mono text-[10px]">{tool.sampleArtifact}</span>
                      <button
                        onClick={() => handleCopyArtifact(tool.sampleArtifact, tool.id)}
                        className="text-slate-400 hover:text-slate-600 p-0.5 shrink-0"
                        title="Copy sample deliverable text"
                      >
                        {copiedArtifact === tool.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Status footer */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-medium">
                  {isKnown ? 'Proficient' : 'Learning Opportunity'}
                </span>
                <span
                  onClick={() => toggleToolKnown(tool.id)}
                  className="text-blue-600 font-bold cursor-pointer hover:underline"
                >
                  {isKnown ? 'Uncheck' : 'Mark Known'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
