export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  signedInAt?: string;
}

export type PMExperienceLevel =
  | 'Aspiring / No PM Exp'
  | 'Associate PM (0-2 yrs)'
  | 'Product Manager (2-5 yrs)'
  | 'Senior PM (5-8 yrs)'
  | 'Principal / Lead PM (8-12 yrs)'
  | 'Group PM / Director (12+ yrs)';

export type WorkMode = 'Hybrid' | 'Remote' | 'On-site' | 'Any';

export type CompanyStage = 'all' | 'early' | 'growth' | 'large';

export interface UserProfile {
  fullName: string;
  currentRole: string;
  yearsExperience: number;
  technicalSkills: string[];
  pmExperienceLevel: PMExperienceLevel;
  currentIndustry: string;
  targetDomain: string;
  targetRoles: string[];
  preferredLocations: string[];
  workMode: WorkMode;
  salaryExpectationINR: string;
  careerGoal: string;
  companyStagePreference: CompanyStage;
  portfolioProjects: string;
  resumeText: string;
  clarifyingAnswers: Record<string, string>;
}

export interface AdjacentDomain {
  id: string;
  name: string;
  icon: string;
  description: string;
  crossoverScore: number; // 0 - 100
  transferableHooks: string[];
  sharedMechanics: string[];
  keyDifferentiators: string[];
  indiaMarketContext: string;
}

export interface CompanyTarget {
  id: string;
  name: string;
  domain: string;
  stage: 'early' | 'growth' | 'large';
  stageLabel: string;
  indiaPresence: string;
  whyItFits: string;
  potentialRoles: string[];
  fitLevel: 'High' | 'Medium' | 'BORDERLINE';
  borderlineReason?: string;
  techStackDomain: string[];
  hiringHubs: string[];
  pmTeamCulture: string;
  careersUrl: string;
  tier: 'A' | 'B' | 'C';
}

export interface JobMatch {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  domain: string;
  experienceRequired: string;
  applicationUrl: string;
  matchScore: number; // 0 - 100
  matchTier: 'Excellent match' | 'Strong match' | 'Good match' | 'Stretch' | 'Skip';
  whyItMatches: string;
  directExperience: string[];
  transferableExperience: string[];
  skillGaps: string[];
  recommendation: string;
  salaryRange?: string;
  postedDate?: string;
  postedWithinDays?: number;
  companyPortalUrl?: string;
  verified: boolean;
}

export interface PMToolItem {
  id: string;
  name: string;
  category: 'core' | 'domain' | 'analytics';
  categoryName: string;
  pmUsageSentence: string;
  iconName: string;
  sampleArtifact: string;
  domainTag?: string;
}

export interface SkillItem {
  name: string;
  description: string;
  importanceScore: number; // 1 - 5
  targetProficiency: 'Basic' | 'Proficient' | 'Advanced' | 'Expert';
  sampleDeliverable: string;
  interviewQuestion: string;
}

export interface PMSkillCategory {
  category: 'Execution' | 'Data' | 'Customer' | 'Strategy' | 'Leadership';
  skills: SkillItem[];
}

export interface DomainConcept {
  id: string;
  title: string;
  conceptType: 'Workflow' | 'Metric / KPI' | 'Customer Problem' | 'Regulatory / Architecture' | 'Trade-off';
  description: string;
  realWorldIndianExample: string;
  pmActionableTakeaway: string;
}

export interface AIConceptPM {
  id: string;
  topic: string;
  pmDefinition: string;
  whyPMMustKnow: string;
  pmTradeoffOrMetric: string;
  indiaUseCases: string;
  category: 'Fundamentals' | 'Architecture & RAG' | 'Evaluation & Quality' | 'Economics & Ops';
}

export interface OutreachTemplate {
  id: string;
  type: 'recruiter' | 'networking' | 'cold_pitch';
  title: string;
  recipientRole: string;
  subjectLine: string;
  body: string;
  customizationTips: string[];
}

export interface ClarifyingQuestion {
  id: string;
  question: string;
  options: string[];
  context: string;
}

export interface CareerMappingResult {
  domainUnderstood: {
    primaryDomain: string;
    subDomainFocus: string;
    marketMaturityInIndia: string;
    hiringDemandTier: 'High' | 'Very High' | 'Moderate';
    averageCompensationRangeINR: string;
  };
  adjacentDomainsMap: AdjacentDomain[];
  indiaCompanyTargetList: CompanyTarget[];
  pmTools: {
    coreToolkit: PMToolItem[];
    domainSpecificToolkit: PMToolItem[];
    analyticsToolkit: PMToolItem[];
  };
  pmSkillsToSucceed: PMSkillCategory[];
  domainKnowledgeChecklist: DomainConcept[];
  aiPMConcepts?: AIConceptPM[];
  recommendedCareerDirection: {
    headline: string;
    primaryPath: string;
    alternatePaths: string[];
    immediateNextSteps: string[];
    timelineMonths: string;
    keyRiskAndMitigation: string;
  };
  outreachTemplates: OutreachTemplate[];
  stageRecommendationPrompt: string;
  top10StageCompanies?: {
    earlyStage: CompanyTarget[];
    growthStage: CompanyTarget[];
    largeStage: CompanyTarget[];
  };
  clarifyingQuestions?: ClarifyingQuestion[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  structuredData?: any;
}
