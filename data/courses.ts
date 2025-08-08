export interface Course {
  id: string;
  instructor: string;
  title: string;
  description: string;
  modules: number;
  cleCredits: number;
  creditType: 'General' | 'Ethics' | 'Technology' | 'Competency';
  category: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isCompleted?: boolean;
  progress?: number;
  thumbnail?: string;
  imageUrl?: string;
  image_link?: string; // Legacy property for compatibility
  credits?: number; // Legacy property for compatibility  
  credit_type?: string; // Legacy property for compatibility
  module_number?: number; // Legacy property for compatibility
}

export const courses: Course[] = [
  // Hero Banner: Celebrity Instructors (Updated with your 3 specified)
  {
    id: 'breyer-first-amendment',
    instructor: 'Stephen Breyer',
    title: 'First Amendment Jurisprudence',
    description: 'A masterclass in the boundaries, protections, and evolution of the First Amendment.',
    modules: 8,
    cleCredits: 2.0,
    creditType: 'General',
    category: 'Hero Banner',
    isFeatured: true,
    imageUrl: '../src/assets/placeholder.svg'
  },
  {
    id: 'obama-leadership',
    instructor: 'Michelle Obama',
    title: 'Leadership Through Service',
    description: 'Build inclusive teams, lead with empathy, and create lasting impact in your practice and community.',
    modules: 6,
    cleCredits: 1.5,
    creditType: 'General',
    category: 'Hero Banner',
    isFeatured: true,
    imageUrl: '../src/assets/placeholder.svg'
  },
  {
    id: 'jarrett-theater',
    instructor: 'Ernest Jarrett',
    title: 'The Theater of the Courtroom',
    description: 'Master storytelling, voice, movement, and presence to command the courtroom like a stage.',
    modules: 7,
    cleCredits: 2.0,
    creditType: 'General',
    category: 'Hero Banner',
    isFeatured: true,
    imageUrl: '/src/assets/course_img.png' // This is the hero image for Ernest
  },
  
  // Recommended For You (4+ courses)
  {
    id: 'lee-litigation',
    instructor: 'Tamika Lee',
    title: 'Litigation Strategy for Rising Associates',
    description: 'Build strategic thinking with real-world litigation scenarios.',
    modules: 6,
    cleCredits: 1.5,
    creditType: 'General',
    category: 'Recommended For You',
    isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'monroe-evidence',
    instructor: 'Zachary Monroe',
    title: 'Evidentiary Pitfalls and Power Moves',
    description: 'Strengthen your courtroom toolbox with evidence tactics.',
    modules: 5,
    cleCredits: 1.5,
    creditType: 'General',
    category: 'Recommended For You',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'jarrett-courtroom-theater',
    instructor: 'Ernest Jarrett',
    title: 'The Theater of the Courtroom',
    description: 'Command the courtroom like a stage.',
    modules: 6,
    cleCredits: 3.0,
    creditType: 'General',
    category: 'Recommended For You',
    isFeatured: true,
    imageUrl: '../src/assets/placeholder.svg'
  },
  {
    id: 'rodriguez-bankruptcy',
    instructor: 'Carlos Rodriguez',
    title: 'Modern Bankruptcy Practice',
    description: 'Navigate complex bankruptcy proceedings with confidence.',
    modules: 8,
    cleCredits: 2.0,
    creditType: 'General',
    category: 'Recommended For You',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'williams-ip',
    instructor: 'Sarah Williams',
    title: 'Intellectual Property Essentials',
    description: 'Protect and monetize creative assets in the digital age.',
    modules: 6,
    cleCredits: 1.5,
    creditType: 'Technology',
    category: 'Recommended For You',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center'
  },
  
  // Continue Watching (4+ courses with progress)
  {
    id: 'blume-business',
    instructor: 'Ariella Blume',
    title: 'LLC vs S-Corp: What You Should Know',
    description: 'Compare structures, tax implications, and liability concerns.',
    modules: 4,
    cleCredits: 1.0,
    creditType: 'General',
    category: 'Continue Watching',
    progress: 65,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'martinez-employment',
    instructor: 'Diego Martinez',
    title: 'Employment Law Updates 2025',
    description: 'Recent changes in workplace regulations and compliance.',
    modules: 5,
    cleCredits: 1.5,
    creditType: 'General',
    category: 'Continue Watching',
    progress: 42,
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'thompson-contracts',
    instructor: 'Jessica Thompson',
    title: 'Contract Drafting Masterclass',
    description: 'Advanced techniques for bulletproof agreements.',
    modules: 7,
    cleCredits: 2.0,
    creditType: 'General',
    category: 'Continue Watching',
    progress: 78,
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'patel-ethics',
    instructor: 'Raj Patel',
    title: 'Ethics in Digital Practice',
    description: 'Professional responsibility in the age of technology.',
    modules: 4,
    cleCredits: 1.0,
    creditType: 'Ethics',
    category: 'Continue Watching',
    progress: 23,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'kim-discovery',
    instructor: 'Linda Kim',
    title: 'E-Discovery Best Practices',
    description: 'Navigate electronic discovery with efficiency and compliance.',
    modules: 6,
    cleCredits: 1.5,
    creditType: 'Technology',
    category: 'Continue Watching',
    progress: 89,
    imageUrl: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=400&h=300&fit=crop&crop=center'
  },

  // The Next Frontier: AI & Crypto
  {
    id: 'chen-ai-legal-ethics',
    instructor: 'Dr. Angela Chen',
    title: 'AI Ethics in Legal Practice',
    description: 'Navigate the ethical implications of AI tools in modern legal practice and client representation.',
    modules: 6,
    cleCredits: 2.0,
    creditType: 'Ethics',
    category: 'The Next Frontier: AI & Crypto',
    isNew: true,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'nakamoto-crypto-regulation',
    instructor: 'Professor James Nakamoto',
    title: 'Cryptocurrency Regulation & Compliance',
    description: 'Master the evolving regulatory landscape of digital assets and blockchain technology.',
    modules: 8,
    cleCredits: 2.5,
    creditType: 'General',
    category: 'The Next Frontier: AI & Crypto',
    isNew: true,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'johnson-ai-contracts',
    instructor: 'Marcus Johnson, Esq.',
    title: 'Smart Contracts & Legal Implications',
    description: 'Understand the legal framework surrounding smart contracts and automated legal agreements.',
    modules: 5,
    cleCredits: 1.5,
    creditType: 'Technology',
    category: 'The Next Frontier: AI & Crypto',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'taylor-nft-law',
    instructor: 'Rebecca Taylor',
    title: 'NFTs, Digital Assets & IP Rights',
    description: 'Navigate the complex intersection of intellectual property, digital ownership, and NFTs.',
    modules: 6,
    cleCredits: 2.0,
    creditType: 'General',
    category: 'The Next Frontier: AI & Crypto',
    imageUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'rodriguez-defi-securities',
    instructor: 'Sofia Rodriguez, J.D.',
    title: 'DeFi Protocols & Securities Law',
    description: 'Analyze decentralized finance protocols through the lens of securities regulation and compliance.',
    modules: 7,
    cleCredits: 2.0,
    creditType: 'General',
    category: 'The Next Frontier: AI & Crypto',
    imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'williams-data-privacy-ai',
    instructor: 'Dr. Michael Williams',
    title: 'AI, Data Privacy & GDPR Compliance',
    description: 'Protect client data and ensure compliance in an AI-driven legal environment.',
    modules: 5,
    cleCredits: 1.5,
    creditType: 'Ethics',
    category: 'The Next Frontier: AI & Crypto',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center'
  }
];

export const getCoursesbyCategory = (category: string): Course[] => {
  return courses.filter(course => course.category === category);
};

export const getFeaturedCourses = (): Course[] => {
  return courses.filter(course => course.isFeatured);
};