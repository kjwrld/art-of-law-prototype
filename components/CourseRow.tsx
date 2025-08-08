import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { Course } from "../data/courses";
import { Button } from "./ui/button";

interface CourseRowProps {
  title: string;
  courses: Course[];
  size?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
  useWhiteBackground?: boolean;
  onCourseClick?: (courseId: string) => void;
  loadImmediately?: boolean;
}

export function CourseRow({ title, courses, size = 'medium', showProgress = false, useWhiteBackground = false, onCourseClick, loadImmediately = false }: CourseRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = 320; // Approximate width of one card plus gap
    const newScrollLeft = direction === 'left' 
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;

    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <motion.div 
      className="relative group mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={loadImmediately ? { opacity: 1, y: 0 } : undefined}
      whileInView={!loadImmediately ? { opacity: 1, y: 0 } : undefined}
      viewport={!loadImmediately ? { once: true, margin: "-100px" } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Row Title */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-12 xl:px-16">
        <motion.h2 
          className="text-white/90 text-lg md:text-xl lg:text-2xl text-shadow tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={loadImmediately ? { opacity: 1, x: 0 } : undefined}
          whileInView={!loadImmediately ? { opacity: 1, x: 0 } : undefined}
          viewport={!loadImmediately ? { once: true } : undefined}
          transition={{ duration: 0.6, delay: loadImmediately ? 0 : 0.1 }}
        >
          {title}
        </motion.h2>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 rounded-full bg-aow-black/80 border border-aow-gold/20 hover:bg-aow-gold/10 transition-all duration-300 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 rounded-full bg-aow-black/80 border border-aow-gold/20 hover:bg-aow-gold/10 transition-all duration-300 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Scrollable Course Cards with Enhanced Drag */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-12 xl:px-16 pb-4"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {courses.map((course, index) => (
            <motion.div 
              key={course.id} 
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={loadImmediately ? { opacity: 1, scale: 1 } : undefined}
              whileInView={!loadImmediately ? { opacity: 1, scale: 1 } : undefined}
              viewport={!loadImmediately ? { once: true } : undefined}
              transition={{ 
                duration: 0.4, 
                delay: loadImmediately ? index * 0.05 : index * 0.1,
                ease: "easeOut"
              }}
            >
              <CourseCard 
                course={course} 
                size={size} 
                showProgress={showProgress}
                useWhiteBackground={useWhiteBackground}
                onClick={() => {}} // No overlay functionality
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Exponential Scroll Indicators */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollLeft ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(to right, 
              var(--aow-black) 0%, 
              var(--aow-black) 15%,
              rgba(11, 11, 11, 0.95) 25%,
              rgba(11, 11, 11, 0.85) 35%,
              rgba(11, 11, 11, 0.65) 45%,
              rgba(11, 11, 11, 0.4) 60%,
              rgba(11, 11, 11, 0.15) 75%,
              rgba(11, 11, 11, 0.05) 85%,
              transparent 100%)`
          }}
        />

        <motion.div
          className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollRight ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(to left, 
              var(--aow-black) 0%, 
              var(--aow-black) 15%,
              rgba(11, 11, 11, 0.95) 25%,
              rgba(11, 11, 11, 0.85) 35%,
              rgba(11, 11, 11, 0.65) 45%,
              rgba(11, 11, 11, 0.4) 60%,
              rgba(11, 11, 11, 0.15) 75%,
              rgba(11, 11, 11, 0.05) 85%,
              transparent 100%)`
          }}
        />
      </div>
    </motion.div>
  );
}