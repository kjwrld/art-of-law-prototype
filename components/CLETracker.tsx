import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CalendarIcon, DownloadIcon, AlertTriangleIcon, TrendingUpIcon, BookOpenIcon, CheckCircleIcon, AlertCircleIcon, Bookmark, Coins } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CoursePortrait } from './CoursePortrait';
import { Course } from "../data/courses";
import { CourseOverlay } from "./CourseOverlay";
import { formatCredits } from "../utils/formatCredits";
import { useState } from "react";
import { formatCLECredits } from '../utils/creditFormatter';

interface CLECredit {
  category: string;
  required: number;
  completed: number;
  color: string;
}

interface MiniCourseCardProps {
  course: Course;
}

export function CLETracker() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const cleData: CLECredit[] = [
    { category: "Legal Ethics", required: 4, completed: 4, color: "var(--aow-gold)" },
    { category: "Bias Elimination", required: 1, completed: 1, color: "var(--aow-gold-medium)" },
    { category: "General Legal Education", required: 20, completed: 18, color: "var(--aow-gold)" }
  ];

  const totalRequired = cleData.reduce((sum, credit) => sum + credit.required, 0);
  const totalCompleted = cleData.reduce((sum, credit) => sum + credit.completed, 0);
  const completionPercentage = Math.round((totalCompleted / totalRequired) * 100);

  // IP-focused recommended courses for Eric Jarrett - using consistent white fallback
  const recommendedCourses: Course[] = [
    {
      id: 'williams-ip',
      instructor: 'Sarah Williams',
      title: 'Intellectual Property Essentials',
      description: 'Protect and monetize creative assets in the digital age.',
      modules: 6,
      cleCredits: 1.5,
      creditType: 'Technology',
      category: 'Recommended For You'
      // imageUrl will fallback to white image
    },
    {
      id: 'jarrett-courtroom-theater',
      instructor: 'Ernest Jarrett',
      title: 'The Theater of the Courtroom',
      description: 'Command the courtroom like a stage.',
      modules: 6,
      cleCredits: 0.5,
      creditType: 'General',
      category: 'Recommended For You',
      isFeatured: true
      // imageUrl will fallback to white image
    },
    {
      id: 'monroe-evidence',
      instructor: 'Zachary Monroe',
      title: 'Evidentiary Pitfalls and Power Moves',
      description: 'Strengthen your courtroom toolbox with evidence tactics.',
      modules: 5,
      cleCredits: 1.0,
      creditType: 'General',
      category: 'Recommended For You'
      // imageUrl will fallback to white image
    }
  ];

  // Calculate days until deadline (March 31, 2026 for California)
  const deadline = new Date('2026-03-31');
  const today = new Date();
  const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 3600 * 24));

  const MiniCourseCard = ({ course }: MiniCourseCardProps) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    const handleClick = () => {
      if (course.title === "The Theater of the Courtroom") {
        setOverlayOpen(true);
      }
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsBookmarked(!isBookmarked);
    };
    return (
      <motion.div
        className="group cursor-pointer"
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleClick}
      >
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg h-32 shadow-lg">
            {course.imageUrl ? (
              <div className="bg-white rounded-lg overflow-hidden h-full">
                <ImageWithFallback
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <CoursePortrait 
                title={course.title}
                moduleNumber={course.modules}
                className="rounded-lg"
              />
            )}

            {/* Bookmark - Top Right */}
            <motion.button
              onClick={handleBookmarkClick}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-200 group z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark 
                className={`h-3 w-3 transition-all duration-200 ${
                  isBookmarked 
                    ? 'text-[var(--aow-gold)] fill-[var(--aow-gold)]' 
                    : 'text-white'
                }`} 
              />
            </motion.button>
            
            {/* CLE Credits Badge - smaller version */}
            <div className="absolute bottom-1.5 right-1.5 w-12 h-5">
              <div className="relative w-full h-full bg-gradient-to-r from-[#722F37] via-[#8B0000] to-[#722F37] rounded-full shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-2.5 h-2.5 text-[var(--aow-gold)]" />
                    <span className="text-white text-xs font-medium">
                      {formatCLECredits(course.cleCredits)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-white font-medium text-sm leading-tight line-clamp-2 font-['Luxora_Grotesk:Book',_sans-serif]">
              {course.title}
            </h4>
            <p className="text-[var(--aow-gold)] text-xs font-medium font-['Luxora_Grotesk:Book',_sans-serif]">
              {course.instructor}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const circumference = 2 * Math.PI * 90; // radius of 90
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-48 h-48">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            stroke="var(--aow-gold)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: "drop-shadow(0 0 8px rgba(215, 185, 140, 0.6))"
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-4xl font-bold text-white"
            >
              {percentage}%
            </motion.div>
            <div className="text-sm text-white/70 mt-1 font-['Luxora_Grotesk:Book',_sans-serif]">Complete</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--aow-black)] text-white pt-20">
      {/* Page Header */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Alacrity_Sans',_sans-serif] text-white mb-2">CLE Tracker</h1>
              <p className="text-white/70 text-lg font-['Luxora_Grotesk',_sans-serif]">Eric Jarrett • California • Intellectual Property Law</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                In Compliance
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pb-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Circular Progress and Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/5 border-white/10 p-8">
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
                  <div className="flex-shrink-0">
                    <CircularProgress percentage={completionPercentage} />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl font-semibold mb-4 font-['Alacrity_Sans:Regular',_sans-serif]">Current Period Progress</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-3xl font-bold text-[var(--aow-gold)]">{totalCompleted}</div>
                        <div className="text-sm text-white/70 font-['Luxora_Grotesk:Book',_sans-serif]">Credits Earned</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">{totalRequired}</div>
                        <div className="text-sm text-white/70 font-['Luxora_Grotesk:Book',_sans-serif]">Credits Required</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-[var(--aow-gold)]">
                      <TrendingUpIcon className="w-5 h-5" />
                      <span className="font-medium font-['Luxora_Grotesk:Book',_sans-serif]">On track for compliance</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Credit Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-6 font-['Alacrity_Sans:Regular',_sans-serif]">Credit Breakdown</h3>
                <div className="space-y-4">
                  {cleData.map((credit, index) => (
                    <motion.div
                      key={credit.category}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium font-['Luxora_Grotesk:Book',_sans-serif]">{credit.category}</span>
                          {credit.category === "General Legal Education" && (
                            <AlertCircleIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm text-white/70 font-['Luxora_Grotesk:Book',_sans-serif]">
                          {credit.completed}/{credit.required} credits
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: credit.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(credit.completed / credit.required) * 100}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-6 font-['Alacrity_Sans:Regular',_sans-serif]">Recommended to Complete Goals</h3>
                
                {/* General Legal Education Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white mb-4 font-['Luxora_Grotesk:Book',_sans-serif]">General Legal Education</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {recommendedCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      >
                        <MiniCourseCard course={course} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Deadlines and Actions */}
          <div className="space-y-6">
            {/* Deadline Info - Neutral styling */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/5 border-white/10 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-white font-['Alacrity_Sans:Regular',_sans-serif]">Upcoming Deadline</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{daysUntilDeadline}</div>
                  <div className="text-sm text-white/70 mb-2 font-['Luxora_Grotesk:Book',_sans-serif]">days remaining</div>
                  <div className="text-sm text-white/80 font-medium font-['Luxora_Grotesk:Book',_sans-serif]">
                    California Deadline: March 31, 2026
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Compliance Status - moved up */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-green-500/10 border-green-500/30 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-green-400 font-['Alacrity_Sans:Regular',_sans-serif]">Compliance Status</h3>
                </div>
                <div className="text-sm text-white/80 space-y-2 font-['Luxora_Grotesk:Book',_sans-serif]">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    <span>Ethics requirements met</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    <span>Bias elimination completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircleIcon className="w-4 h-4 text-yellow-400" />
                    <span>Need 2 more general credits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    <span>Well ahead of deadline</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* California Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 font-['Alacrity_Sans:Regular',_sans-serif]">California Requirements</h3>
                <div className="space-y-3 text-sm font-['Luxora_Grotesk:Book',_sans-serif]">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Credits:</span>
                    <span className="font-medium">25 every 3 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Legal Ethics:</span>
                    <span className="font-medium">4 credits minimum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Bias Elimination:</span>
                    <span className="font-medium">1 credit minimum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Current Period:</span>
                    <span className="font-medium">2023-2026</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Actions - moved to bottom */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 font-['Alacrity_Sans:Regular',_sans-serif]">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-white text-[var(--aow-black)] hover:bg-white/90 font-semibold">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    View CLE Calendar
                  </Button>
                  <Button variant="outline" className="w-full bg-[var(--aow-black)] border-white/20 text-white hover:bg-white/10">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download Certificates
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Overlay */}
      <CourseOverlay 
        isOpen={overlayOpen} 
        onClose={() => setOverlayOpen(false)}
        formatCredits={formatCredits}
      />
    </div>
  );
}