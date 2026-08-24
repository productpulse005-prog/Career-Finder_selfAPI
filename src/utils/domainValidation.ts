export interface DomainMismatchResult {
  hasMismatch: boolean;
  selectedDomains: string[];
  conflictingDomains: string[];
  message: string;
  suggestedPrompt?: string;
}

interface DomainKeywordConfig {
  id: string;
  label: string;
  keywords: string[];
  samplePromptSnippet: string;
}

export const DOMAIN_KEYWORDS: DomainKeywordConfig[] = [
  {
    id: 'Automotive',
    label: 'Automotive & EVs',
    keywords: ['automotive', 'autosar', 'ecu', 'vehicle', 'ev ', 'evs', 'powertrain', 'oem', 'adas', 'connected car', 'telematics'],
    samplePromptSnippet: 'automotive software, connected vehicle platforms, and embedded systems'
  },
  {
    id: 'FinTech',
    label: 'FinTech',
    keywords: ['fintech', 'banking', 'payments', 'payment', 'lending', 'upi', 'wallet', 'credit card', 'financial services', 'neobank', 'wealthtech'],
    samplePromptSnippet: 'FinTech platforms, digital payments, UPI, and financial software systems'
  },
  {
    id: 'AI / GenAI',
    label: 'AI / GenAI',
    keywords: ['genai', 'generative ai', 'artificial intelligence', 'machine learning', 'llm', 'llms', 'deep learning', 'nlp', 'computer vision'],
    samplePromptSnippet: 'AI/GenAI applications, LLM product workflows, and intelligent software systems'
  },
  {
    id: 'SaaS',
    label: 'SaaS & Cloud',
    keywords: ['saas', 'cloud platform', 'b2b saas', 'enterprise cloud', 'multitenant', 'microservices'],
    samplePromptSnippet: 'B2B SaaS architectures, cloud platforms, and scalable enterprise software'
  },
  {
    id: 'Healthcare',
    label: 'Healthcare',
    keywords: ['healthcare', 'healthtech', 'pharma', 'hospital', 'clinical', 'medical device', 'ehr', 'emr', 'telehealth'],
    samplePromptSnippet: 'HealthTech systems, digital therapeutics, and healthcare workflow platforms'
  },
  {
    id: 'Ecommerce',
    label: 'E-Commerce',
    keywords: ['ecommerce', 'e-commerce', 'marketplace', 'retail', 'quick commerce', 'checkout', 'd2c', 'cart'],
    samplePromptSnippet: 'E-commerce marketplaces, consumer catalog systems, and omnichannel retail'
  },
  {
    id: 'Industrial Technology',
    label: 'Industrial Tech',
    keywords: ['industrial', 'scada', 'iot', 'manufacturing', 'factory automation', 'plc', 'industry 4.0'],
    samplePromptSnippet: 'Industrial IoT, factory automation systems, and smart manufacturing tech'
  },
  {
    id: 'Data & Analytics',
    label: 'Data & Analytics',
    keywords: ['data engineering', 'data warehouse', 'bi tools', 'analytics platform', 'etl', 'big data', 'lakehouse'],
    samplePromptSnippet: 'Data & Analytics infrastructure, business intelligence, and real-time streaming pipelines'
  }
];

/**
 * Checks if the user's selected domain preferences conflict with the domains explicitly mentioned in the text prompt / experience summary.
 */
export function checkDomainMismatch(
  selectedDomains: string[],
  promptText: string
): DomainMismatchResult {
  if (!promptText || promptText.trim().length === 0 || selectedDomains.length === 0) {
    return {
      hasMismatch: false,
      selectedDomains,
      conflictingDomains: [],
      message: ''
    };
  }

  const promptLower = promptText.toLowerCase();

  // Normalize selected domain list
  const normalizedSelected = selectedDomains.map(d => d.trim().toLowerCase());
  const isAllDomains = normalizedSelected.includes('all domains') || normalizedSelected.includes('all');

  if (isAllDomains) {
    return {
      hasMismatch: false,
      selectedDomains,
      conflictingDomains: [],
      message: ''
    };
  }

  // Find all domain concepts present in the prompt text
  const detectedDomainsInPrompt: string[] = [];

  for (const config of DOMAIN_KEYWORDS) {
    const isDomainSelected = normalizedSelected.some(
      sd => sd.includes(config.id.toLowerCase()) || config.id.toLowerCase().includes(sd)
    );

    const matchesInPrompt = config.keywords.some(kw => promptLower.includes(kw));

    if (matchesInPrompt && !isDomainSelected) {
      detectedDomainsInPrompt.push(config.id);
    }
  }

  if (detectedDomainsInPrompt.length > 0) {
    const conflictingStr = detectedDomainsInPrompt.join(', ');
    const selectedStr = selectedDomains.join(', ');

    // Generate a smart suggested replacement snippet
    const primarySelected = selectedDomains[0];
    const matchingConfig = DOMAIN_KEYWORDS.find(
      c => primarySelected.toLowerCase().includes(c.id.toLowerCase()) || c.id.toLowerCase().includes(primarySelected.toLowerCase())
    );

    const replacementDomainText = matchingConfig ? matchingConfig.samplePromptSnippet : `${selectedStr} software systems`;
    
    // Suggest replacement prompt if it has automotive/other keywords
    let suggestedPrompt = promptText;
    for (const confDomain of detectedDomainsInPrompt) {
      const confConfig = DOMAIN_KEYWORDS.find(c => c.id === confDomain);
      if (confConfig) {
        for (const kw of confConfig.keywords) {
          const regex = new RegExp(`\\b${kw}\\b`, 'gi');
          if (regex.test(suggestedPrompt)) {
            suggestedPrompt = suggestedPrompt.replace(regex, selectedStr);
          }
        }
      }
    }

    if (suggestedPrompt === promptText) {
      suggestedPrompt = `${selectedStr} focus: ${promptText}`;
    }

    return {
      hasMismatch: true,
      selectedDomains,
      conflictingDomains: detectedDomainsInPrompt,
      message: `Incorrect: Your preference (${selectedStr}) and prompt/summary (${conflictingStr}) do not match.`,
      suggestedPrompt
    };
  }

  return {
    hasMismatch: false,
    selectedDomains,
    conflictingDomains: [],
    message: ''
  };
}
