import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  FileCode,
  Layers,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { DomainConcept, UserProfile } from '../types';

interface DomainKnowledgeDeepDiveProps {
  concepts: DomainConcept[];
  profile: UserProfile;
}

export const DomainKnowledgeDeepDive: React.FC<DomainKnowledgeDeepDiveProps> = ({
  concepts,
  profile
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [masteredConcepts, setMasteredConcepts] = useState<Record<string, boolean>>({});

  const toggleMastered = (id: string) => {
    setMasteredConcepts((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredConcepts = concepts.filter((c) => {
    if (filterType !== 'all' && c.conceptType !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.realWorldIndianExample.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Workflow':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Metric / KPI':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Customer Problem':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Regulatory / Architecture':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Trade-off':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const masteredCount = Object.values(masteredConcepts).filter(Boolean).length;

  return (
    <div className="space-y-3.5">
      {/* High Density Banner & Filter */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Domain Immersion // {concepts.length} Core Concepts
            </h2>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Domain Expertise & Indian Tech Regulations for {profile.targetDomain}
            </h3>
          </div>

          <div className="bg-slate-50 rounded p-2 border border-slate-200 text-xs min-w-[180px]">
            <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] mb-1">
              <span>Domain Fluency</span>
              <span className="text-emerald-700 font-bold">
                {masteredCount}/{concepts.length} Mastered
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((masteredCount / (concepts.length || 1)) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-3 text-xs">
          <div className="sm:col-span-8 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, regulations, or Indian examples..."
              className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-4 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400 shrink-0" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="all">All Types</option>
              <option value="Workflow">Workflows</option>
              <option value="Metric / KPI">Metrics & KPIs</option>
              <option value="Regulatory / Architecture">Regulatory / Arch</option>
              <option value="Trade-off">Trade-offs</option>
            </select>
          </div>
        </div>
      </div>

      {/* High Density Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredConcepts.map((concept) => {
          const isMastered = Boolean(masteredConcepts[concept.id]);
          return (
            <div
              key={concept.id || concept.title}
              className={`rounded-lg border p-3.5 flex flex-col justify-between transition-all duration-150 ${
                isMastered
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getBadgeColor(
                        concept.conceptType
                      )}`}
                    >
                      {concept.conceptType}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs">{concept.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleMastered(concept.id)}
                    className={`p-1 rounded border transition ${
                      isMastered
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                    }`}
                    title={isMastered ? 'Mark unmastered' : 'Mark as mastered'}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 leading-relaxed mb-2">{concept.description}</p>

                {/* Indian Real-World Example */}
                {concept.realWorldIndianExample && (
                  <div className="mb-2 p-2 bg-slate-50 rounded border border-slate-200 text-[11px]">
                    <span className="font-bold text-slate-800 block mb-0.5">
                      🇮🇳 India Case:
                    </span>
                    <span className="text-slate-600 leading-relaxed">{concept.realWorldIndianExample}</span>
                  </div>
                )}
              </div>

              {/* Actionable PM Takeaway */}
              {concept.pmActionableTakeaway && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-[11px]">
                  <span className="font-bold text-slate-900">PM Takeaway: </span>
                  <span className="text-slate-700">{concept.pmActionableTakeaway}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
