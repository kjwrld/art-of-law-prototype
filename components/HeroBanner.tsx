import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Clock, Trophy, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Course } from "../data/courses";
import { useState, useEffect } from "react";

interface HeroBannerProps {
  courses: Course[];
}

export function HeroBanner({ courses }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentCourse = courses[currentIndex];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % courses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [courses.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % courses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getCreditTypeBadgeColor = (type: Course['creditType']) => {
    switch (type) {
      case 'Ethics':
        return 'bg-blue-600/20 text-blue-400 border-blue-400/30';
      case 'Technology':
        return 'bg-purple-600/20 text-purple-400 border-purple-400/30';
      case 'Competency':
        return 'bg-green-600/20 text-green-400 border-green-400/30';
      default:
        return 'bg-[var(--aow-gold)]/20 text-[var(--aow-gold)] border-[var(--aow-gold)]/30';
    }
  };

  return (
    <div className="relative h-[60vh] w-full overflow-hidden bg-[var(--aow-black)] border-b border-[var(--aow-gold)]/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-gradient-to-r from-[var(--aow-gold)]/10 via-[var(--aow-black)]/90 to-[var(--aow-black)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--aow-gold)]/20 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--aow-gold)]/10 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <motion.div
                  className="space-y-6"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Featured Badge */}
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-[var(--aow-gold)]/20 text-[var(--aow-gold)] border-[var(--aow-gold)]/30 px-3 py-1">
                      Featured Course
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`${getCreditTypeBadgeColor(currentCourse.creditType)}`}
                    >
                      {currentCourse.creditType}
                    </Badge>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[var(--aow-gold)]/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-[var(--aow-gold)]" />
                    </div>
                    <span className="text-[var(--aow-gold)] text-lg font-medium">
                      {currentCourse.instructor}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {currentCourse.title}
                  </h1>

                  {/* Description */}
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
                    {currentCourse.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center space-x-6 text-white/60">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{currentCourse.modules} modules</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5" />
                      <span>{currentCourse.cleCredits} CLE credits</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center space-x-4 pt-4">
                    <Button
                      size="lg"
                      className="gradient-gold-radial text-[var(--aow-black)] hover:scale-105 transition-all duration-300 px-8 py-3 font-semibold"
                    >
                      <Play className="w-5 h-5 mr-2" fill="currentColor" />
                      Start Course
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
                    >
                      More Info
                    </Button>
                  </div>
                </motion.div>

                {/* Right Content - Course Visual */}
                <motion.div
                  className="relative hidden lg:block"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="relative w-full max-w-md mx-auto">
                    {/* Course "Monitor" */}
                    <div className="bg-gradient-to-br from-[var(--aow-gold)]/20 to-[var(--aow-black)] rounded-lg p-8 border border-[var(--aow-gold)]/20 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-2 bg-[var(--aow-gold)]/30 rounded-full w-full"></div>
                          <div className="h-2 bg-[var(--aow-gold)]/20 rounded-full w-4/5"></div>
                          <div className="h-2 bg-[var(--aow-gold)]/10 rounded-full w-3/5"></div>
                        </div>
                        <div className="text-center pt-4">
                          <div className="w-16 h-16 bg-[var(--aow-gold)]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Play className="w-8 h-8 text-[var(--aow-gold)] ml-1" fill="currentColor" />
                          </div>
                          <p className="text-white/60 text-sm">Ready to Begin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-2">
          {courses.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[var(--aow-gold)] w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[var(--aow-black)]/50 border border-[var(--aow-gold)]/20 rounded-full flex items-center justify-center hover:bg-[var(--aow-black)]/70 transition-all duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[var(--aow-black)]/50 border border-[var(--aow-gold)]/20 rounded-full flex items-center justify-center hover:bg-[var(--aow-black)]/70 transition-all duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}