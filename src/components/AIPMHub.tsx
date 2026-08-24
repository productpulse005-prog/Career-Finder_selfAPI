import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Brain,
  ShieldAlert,
  Database,
  Layers,
  ArrowRightLeft,
  FileCheck,
  Zap,
  HelpCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { AI_PM_CONCEPTS } from '../data/pmEcosystemData';

export const AIPMHub: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState(AI_PM_CONCEPTS[0]);
  const [activeTab, setActiveTab] = useState<'concepts' | 'comparison' | 'deliverables'>('concepts');

  const comparisonData = [
    {
      dimension: 'System Determinism',
      traditional: 'Deterministic: Input A always produces Output B via fixed code rules.',
      aiPm: 'Probabilistic: Same prompt may yield variations; requires evaluation rubrics & confidence scoring.'
    },
    {
      dimension: 'Specification & PRD',
      traditional: 'Wireframes, detailed functional requirements, error codes, and strict acceptance criteria.',
      aiPm: 'Evaluation datasets (Golden set), prompt templates, context windows, guardrails, fallback thresholds.'
    },
    {
      dimension: 'Unit Economics & Latency',
      traditional: 'Fixed server hosting/cloud infra costs; predictable millisecond response times.',
      aiPm: 'Token economics (Prompt vs Output tokens), caching (Semantic Cache), TTFT (Time-to-First-Token) & streaming.'
    },
    {
      dimension: 'Quality & Testing',
      traditional: 'QA automation, unit tests, regression suites.',
      aiPm: 'LLM-as-a-Judge, benchmark rubrics, RAG context retrieval precision/recall, human evaluation (HITL).'
    },
    {
      dimension: 'Data & Privacy (India)',
      traditional: 'Relational DB compliance, encryption at rest/transit.',
      aiPm: 'India DPDP Act (Digital Personal Data Protection), PII scrubbing before LLM context, zero-data-retention agreements.'
    }
  ];

  const aiDeliverables = [
    {
      title: 'AI Product Requirement Document (AI PRD)',
      description: 'Defines task objectives, baseline vs LLM benchmark, target accuracy/recall, context limits, and graceful degradation fallback.',
      exampleArtifact: 'PRD: Automated Customer Ticket Resolution with 88% RAG Recall & Escalation Guardrails.'
    },
    {
      title: 'Golden Evaluation Benchmark (Evals Suite)',
      description: 'A curated dataset of 200+ representative real-world test cases with ground-truth outputs to prevent regression when updating models.',
      exampleArtifact: 'Evaluation Rubric: Factuality Score (0-5), Tone Adherence (0-5), Toxicity Check (Pass/Fail).'
    },
    {
      title: 'Guardrails & Safety Matrix',
      description: 'System prompts, moderation filters, hallucination detection heuristics, and India DPDP compliance rules.',
      exampleArtifact: 'Safety Spec: Reject financial advice requests; scrub Aadhaar/PAN numbers from prompt context.'
    },
    {
      title: 'Latency & Token Cost Budget Sheet',
      description: 'Mathematical trade-off sheet calculating cost per 1,000 queries, caching hit rates, and model tiers (Flash vs Pro).',
      exampleArtifact: 'Cost Model: Router sending 80% queries to Gemini Flash and 20% complex reasoning to Gemini Pro.'
    }
  ];

  return (
    <div className="space-y-3.5">
      {/* High Density Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-3.5 sm:p-4 shadow-xs border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider mb-1">
              <Brain className="w-3 h-3 text-blue-400" />
              AI PM Framework // Probabilistic Software
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white">
              Demystifying AI / GenAI for Product Managers
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              RAG pipelines, Evaluation benchmarks, Model Context Protocol (MCP), and token economics.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded p-2.5 border border-slate-700 text-xs max-w-xs shrink-0">
            <div className="font-bold text-emerald-400 flex items-center gap-1 text-[11px] mb-0.5">
              <Sparkles className="w-3 h-3" />
              Core Principle for AI PMs
            </div>
            <p className="text-slate-300 text-[10px] leading-relaxed">
              Build when probabilistic intelligence unlocks a 10x UX improvement at acceptable unit cost and latency.
            </p>
          </div>
        </div>

        {/* High Density Sub-tabs */}
        <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-slate-800 text-xs">
          {[
            { id: 'concepts', label: '10 Core AI Concepts' },
            { id: 'comparison', label: 'Traditional PM vs AI PM' },
            { id: 'deliverables', label: 'AI PRDs & Deliverables' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content 1: Concepts */}
      {activeTab === 'concepts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* List of 10 Concepts */}
          <div className="lg:col-span-5 space-y-1.5">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Essential Concepts ({AI_PM_CONCEPTS.length})
            </h2>
            {AI_PM_CONCEPTS.map((concept) => {
              const isSelected = selectedConcept.title === concept.title;
              return (
                <button
                  key={concept.title}
                  onClick={() => setSelectedConcept(concept)}
                  className={`w-full text-left p-2.5 rounded border text-xs transition flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 font-bold text-slate-900 shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Cpu className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="text-xs">{concept.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{concept.category}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Concept Detailed View */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 shadow-xs">
              <div className="border-b border-slate-100 pb-2.5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  {selectedConcept.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedConcept.title}
                </h3>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-slate-900 mb-0.5 uppercase tracking-wider">What It Means:</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedConcept.explanation}</p>
              </div>

              <div className="bg-blue-50/80 p-2.5 rounded border border-blue-200/80">
                <h4 className="text-[11px] font-bold text-blue-950 mb-0.5 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  Why It Matters for a PM:
                </h4>
                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  {selectedConcept.whyItMattersForPM}
                </p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <h4 className="text-[11px] font-bold text-slate-900 mb-0.5 uppercase tracking-wider">
                  Implementation Example:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedConcept.pmDeliverableOrMetric}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Comparison */}
      {activeTab === 'comparison' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-3.5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
              Traditional Software PM vs AI / GenAI Product Management
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Key mindset shifts when managing probabilistic AI models in production.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <th className="p-2.5 font-bold w-1/4 uppercase tracking-wider text-[10px]">Dimension</th>
                  <th className="p-2.5 font-bold w-3/8 text-slate-900 uppercase tracking-wider text-[10px]">Traditional Software PM</th>
                  <th className="p-2.5 font-bold w-3/8 text-blue-700 bg-blue-50/50 uppercase tracking-wider text-[10px]">
                    AI / GenAI PM
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-2.5 font-bold text-slate-900 align-top text-xs">{row.dimension}</td>
                    <td className="p-2.5 text-slate-600 align-top text-xs leading-relaxed">{row.traditional}</td>
                    <td className="p-2.5 text-blue-950 font-medium bg-blue-50/20 align-top text-xs leading-relaxed">
                      {row.aiPm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 3: Deliverables */}
      {activeTab === 'deliverables' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiDeliverables.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2 shadow-xs">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-xs">{item.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-800">
                <span className="font-bold text-slate-900 block mb-0.5">Sample Deliverable:</span>
                {item.exampleArtifact}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
