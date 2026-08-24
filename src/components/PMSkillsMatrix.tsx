import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  TrendingUp,
  Users,
  Compass,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { PMSkillCategory, UserProfile } from '../types';

interface PMSkillsMatrixProps {
  skillCategories: PMSkillCategory[];
  profile: UserProfile;
}

export const PMSkillsMatrix: React.FC<PMSkillsMatrixProps> = ({
  skillCategories,
  profile
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Execution');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [userProficiency, setUserProficiency] = useState<Record<string, string>>({});

  const categoryIcons: Record<string, any> = {
    Execution: Target,
    Data: TrendingUp,
    Customer: Users,
    Strategy: Compass,
    Leadership: Award
  };

  const handleSetProficiency = (skillName: string, level: string) => {
    setUserProficiency((prev) => ({
      ...prev,
      [skillName]: level
    }));
  };

  const currentCategoryObj =
    skillCategories.find((c) => c.category === activeCategory) || skillCategories[0];

  return (
    <div className="space-y-3.5">
      {/* High Density Banner & 5 Pillars Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              PM Competency Matrix // 5 Core Pillars
            </h2>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Evaluation Grid for {profile.targetDomain} Product Managers
            </h3>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Benchmark against Swiggy, Razorpay, Zepto standards</span>
          </div>
        </div>

        {/* 5 High Density Pillar Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-3 text-xs">
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.category] || Target;
            const isSelected = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`p-2 rounded border flex items-center justify-center gap-1.5 transition text-xs font-bold ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills for Selected Category */}
      {currentCategoryObj && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {currentCategoryObj.category} Competencies ({currentCategoryObj.skills.length})
            </h2>
            <span className="text-[11px] text-slate-400">Click row for actual interview questions</span>
          </div>

          <div className="space-y-2">
            {currentCategoryObj.skills.map((skill) => {
              const isExpanded = expandedSkill === skill.name;
              const currentLevel = userProficiency[skill.name] || 'Not Assessed';

              return (
                <div
                  key={skill.name}
                  className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs hover:border-slate-300 transition-all duration-150"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div
                      className="cursor-pointer flex-1"
                      onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-xs">{skill.name}</h3>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Target: {skill.targetProficiency}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{skill.description}</p>
                    </div>

                    {/* Self-Rating High Density Controls */}
                    <div className="flex items-center gap-1 shrink-0 text-xs">
                      <span className="text-[10px] text-slate-400 mr-1 hidden lg:inline uppercase font-bold">Your Level:</span>
                      {['Basic', 'Proficient', 'Advanced', 'Expert'].map((lvl) => {
                        const isChosen = currentLevel === lvl;
                        return (
                          <button
                            key={lvl}
                            onClick={() => handleSetProficiency(skill.name, lvl)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                              isChosen
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                        className="p-1 text-slate-400 hover:text-slate-700 ml-0.5"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Interview Question & Deliverable Box */}
                  {isExpanded && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                        <div className="font-bold text-blue-800 mb-1 flex items-center gap-1 text-[11px]">
                          <HelpCircle className="w-3 h-3 text-blue-600" />
                          Live Indian PM Interview Question
                        </div>
                        <p className="text-slate-700 italic text-[11px]">"{skill.interviewQuestion}"</p>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                        <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Recommended Proof Deliverable
                        </div>
                        <p className="text-slate-700 text-[11px]">{skill.sampleDeliverable}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
