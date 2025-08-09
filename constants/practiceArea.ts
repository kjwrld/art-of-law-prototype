export const FOCUS_MAP = {
  "Business": "business",
  "Technology & Internet": "tech", 
  "Intellectual Property": "intellectual_prop",
  "General Practice": "general"
} as const;

export const PERSONALIZED_TABS = [
  "Business", 
  "Technology & Internet", 
  "Intellectual Property", 
  "General Practice"
];

export const FILTER_OPTIONS = {
  state: [
    { value: "ca", label: "California" },
    { value: "ny", label: "New York" },
    { value: "tx", label: "Texas" },
    { value: "il", label: "Illinois" },
    { value: "dc", label: "Washington DC" }
  ],
  role: [
    { value: "associate", label: "Associate" },
    { value: "gc", label: "General Counsel" },
    { value: "trial", label: "Trial Attorney" },
    { value: "partner", label: "Partner" },
    { value: "solo", label: "Solo Practitioner" }
  ],
  creditType: [
    { value: "ethics", label: "Ethics" },
    { value: "general", label: "General" },
    { value: "competence", label: "Competence" },
    { value: "technology", label: "Technology" },
    { value: "diversity", label: "Diversity" }
  ],
  skillLevel: [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ]
};

export const AI_NOTIFICATION_DELAY = 8000; // 8 seconds