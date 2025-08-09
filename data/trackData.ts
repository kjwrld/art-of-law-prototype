import { Sprout, Building, Megaphone } from "lucide-react";
import { Course as DatabaseCourse } from "./courses";

export interface Course {
    name: string;
    description: string;
    completed: boolean;
    current?: boolean;
    duration: string;
    type: "standard" | "flagship" | "quiz" | "completion";
    // Add fields from database course for real courses
    realCourse?: DatabaseCourse;
    instructor?: string;
    modules?: number;
    cleCredits?: number;
    image?: string;
}

export interface Track {
    title: string;
    icon: any;
    personalization: string;
    description: string;
    progress: { completed: number; total: number };
    courses: Course[];
}

export const trackData: Record<string, Track> = {
    master: {
        title: "Master the Courtroom",
        icon: Sprout,
        personalization:
            "Personalized for a lawyer studying Intellectual Property & Business",
        description:
            "Build commanding courtroom skills while mastering Intellectual Property and business law. Designed for lawyers aiming to excel in high-stakes trials, negotiations, and complex patent litigation.",
        progress: { completed: 1, total: 7 },
        courses: [
            {
                name: "What is Litigation?",
                description:
                    "Litigation isn't just conflict—it's controlled warfare governed by procedure, strategy, and timing. Mastering it means knowing when to escalate and when to maneuver.",
                completed: true,
                duration: "45 min",
                type: "standard",
            },
            {
                name: "The Art of the Deposition",
                description:
                    "A great deposition isn't about aggression—it's about control. Ask the right questions, stay patient, and set traps with silence.",
                completed: false,
                current: true,
                duration: "52 min",
                type: "standard",
            },
            {
                name: "The Theater of the Courtroom",
                description:
                    "Courtroom advocacy is part logic, part performance. The way you carry yourself, modulate your voice, and command the room matters just as much as your case theory.",
                completed: false,
                duration: "67 min",
                type: "flagship",
            },
            {
                name: "The Road to Trial",
                description:
                    "Trial is the final battlefield, but every move leading up to it sets the stage. Build your case like you're preparing for war—strategically, deliberately, relentlessly.",
                completed: false,
                duration: "38 min",
                type: "standard",
            },
            {
                name: "Mastery Assessment",
                description:
                    "Test your knowledge and demonstrate mastery of courtroom tactics, litigation strategy, and professional advocacy skills.",
                completed: false,
                duration: "30 min",
                type: "quiz",
            },
            {
                name: "Cross & Direct Examination",
                description:
                    "Witness examination mastery through strategic questioning techniques and courtroom psychology.",
                completed: false,
                duration: "55 min",
                type: "standard",
            },
            {
                name: "Track Completion",
                description:
                    "Congratulations! You've mastered the complete courtroom advocacy curriculum and earned your certification.",
                completed: false,
                duration: "Certificate",
                type: "completion",
            },
        ],
    },
    leap: {
        title: "Make the Leap: Leaving the Firm to Start Your Own",
        icon: Building,
        personalization:
            "Personalized for a seasoned attorney ready to break free and build something extraordinary",
        description:
            "Transform from employee to entrepreneur with our comprehensive solo practice curriculum. From business formation to client acquisition, master every aspect of running your own legal empire.",
        progress: { completed: 0, total: 6 },
        courses: [
            {
                name: "LLC vs S-Corp: What You Should Know",
                description:
                    "Compare structures, tax implications, and liability concerns. Master the legal frameworks that will protect and empower your solo practice venture.",
                completed: false,
                current: true,
                duration: "60 min",
                type: "standard",
                instructor: "Ariella Blume",
                modules: 4,
                cleCredits: 1.0,
                realCourse: {
                    id: "blume-business",
                    instructor: "Ariella Blume",
                    title: "LLC vs S-Corp: What You Should Know",
                    description:
                        "Compare structures, tax implications, and liability concerns.",
                    modules: 4,
                    cleCredits: 1.0,
                    creditType: "General",
                    category: "Continue Watching",
                    imageUrl:
                        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
                } as DatabaseCourse,
            },
            {
                name: "Rainmaking & Business Dev",
                description:
                    "Generate a steady stream of high-quality clients through proven business development strategies and relationship-building techniques.",
                completed: false,
                duration: "62 min",
                type: "standard",
            },
            {
                name: "Billing & Law Firm Ops",
                description:
                    "Master the operational backbone of your practice: billing systems, time tracking, client management, and workflow optimization.",
                completed: false,
                duration: "45 min",
                type: "standard",
            },
            {
                name: "Getting Clients as a Solo",
                description:
                    "Build a robust client acquisition system that doesn't depend on referrals. Master digital marketing, networking, and value proposition development.",
                completed: false,
                duration: "71 min",
                type: "standard",
            },
            {
                name: "Legal Tech Stack for Startups",
                description:
                    "Leverage technology to compete with bigger firms. Build a lean, efficient practice using the latest legal tech tools and automation.",
                completed: false,
                duration: "53 min",
                type: "flagship",
            },
            {
                name: "Track Completion",
                description:
                    "Congratulations! You're now equipped to launch and scale your own successful legal practice with confidence.",
                completed: false,
                duration: "Certificate",
                type: "completion",
            },
        ],
    },
    leader: {
        title: "Become a Thought Leader",
        icon: Megaphone,
        personalization:
            "Personalized for a visionary attorney ready to shape the future of law",
        description:
            "Elevate your profile and influence within the legal community. Learn to build your personal brand, share your expertise, and become the go-to authority in your practice area.",
        progress: { completed: 0, total: 6 },
        courses: [
            {
                name: "Leadership Through Service",
                description:
                    "Build inclusive teams, lead with empathy, and create lasting impact in your practice and community. Transform your approach to thought leadership through authentic service.",
                completed: false,
                current: true,
                duration: "90 min",
                type: "standard",
                instructor: "Michelle Obama",
                modules: 6,
                cleCredits: 1.5,
                realCourse: {
                    id: "obama-leadership",
                    instructor: "Michelle Obama",
                    title: "Leadership Through Service",
                    description:
                        "Build inclusive teams, lead with empathy, and create lasting impact in your practice and community.",
                    modules: 6,
                    cleCredits: 1.5,
                    creditType: "General",
                    category: "Hero Banner",
                    isFeatured: true,
                    imageUrl:
                        "https://fortune.com/img-assets/wp-content/uploads/2023/05/GettyImages-1245641002-e1683154229762.jpg?w=1440&q=75",
                } as DatabaseCourse,
            },
            {
                name: "Legal Podcasting 101",
                description:
                    "Launch and grow a successful legal podcast that builds your audience and positions you as an industry expert. From content planning to distribution strategies.",
                completed: false,
                duration: "67 min",
                type: "standard",
            },
            {
                name: "Public Speaking for Lawyers",
                description:
                    "Command the stage with confidence. Master the art of legal presentations, conference speaking, and panel discussions that captivate and convince.",
                completed: false,
                duration: "55 min",
                type: "flagship",
            },
            {
                name: "Social Media & Compliance",
                description:
                    "Navigate the complex world of legal marketing on social media while maintaining ethical compliance and building an authentic professional presence.",
                completed: false,
                duration: "43 min",
                type: "standard",
            },
            {
                name: "Building Your Legal Brand",
                description:
                    "Develop a distinctive professional brand that sets you apart in the legal marketplace and attracts your ideal clients and opportunities.",
                completed: false,
                duration: "61 min",
                type: "standard",
            },
            {
                name: "Track Completion",
                description:
                    "Congratulations! You're now positioned as a thought leader with the tools and strategies to influence your legal community.",
                completed: false,
                duration: "Certificate",
                type: "completion",
            },
        ],
    },
};
