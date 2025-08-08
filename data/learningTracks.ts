export interface LearningTrack {
  id: number;
  title: string;
  rank: number;
  instructor: string;
  description: string;
  duration: string;
  image?: string;
}

export const learningTracksData: LearningTrack[] = [
  {
    id: 1,
    title: "Master the Courtroom",
    rank: 1,
    instructor: "Judge Patricia Williams",
    description: "Complete trial advocacy from opening statements to closing arguments",
    duration: "12 hours",
  },
  {
    id: 2,
    title: "Corporate Law Excellence",
    rank: 2,
    instructor: "Sarah Mitchell, Esq.",
    description: "Navigate complex corporate transactions and M&A deals",
    duration: "10 hours",
  },
  {
    id: 3,
    title: "IP Strategy Mastery",
    rank: 3,
    instructor: "Dr. Michael Chen",
    description: "Build and protect intellectual property portfolios",
    duration: "8 hours",
  },
  {
    id: 4,
    title: "Contract Negotiation Pro",
    rank: 4,
    instructor: "Maria Rodriguez, J.D.",
    description: "Master advanced negotiation tactics and strategies",
    duration: "9 hours",
  },
  {
    id: 5,
    title: "Ethics & Compliance",
    rank: 5,
    instructor: "Robert Thompson, Esq.",
    description: "Navigate ethical dilemmas and regulatory compliance",
    duration: "7 hours",
  },
];