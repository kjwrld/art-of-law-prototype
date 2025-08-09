import { motion } from "framer-motion";
import { useState } from "react";
import { Coins } from "lucide-react";
import { Course } from "../data/courses";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CoursePortrait } from './CoursePortrait';
import { NewTag } from './NewTag';
import { FeaturedTag } from './FeaturedTag';
import { BookmarkButton } from './BookmarkButton';
import { formatCLECredits } from '../utils/creditFormatter';

interface CourseCardProps {
  course: Course;
  size?: 'small' | 'medium' | 'large' | 'mini';
  showProgress?: boolean;
  useWhiteBackground?: boolean;
  onClick?: () => void;
}

export function CourseCard({ course, size = 'medium', showProgress = false, useWhiteBackground = false, onClick }: CourseCardProps) {
  // Check if course can be bookmarked (exclude learning_tracks)
  const canBookmark = course.selection !== 'learning_tracks';
  
  // Generate random progress for demo (30-85%)
  const progressValue = showProgress ? Math.floor(Math.random() * 55) + 30 : 0;
  
  const sizeClasses = {
    mini: 'w-full', // For CLE tracker 3-column grid
    small: 'w-60',
    medium: 'w-80',
    large: 'w-96'
  };

  // Generate placeholder image with course-specific styling
  const getPlaceholderImage = () => {
    const instructorInitials = course.instructor.split(' ').map(n => n[0]).join('');
    
    // Use white background if requested (for Top 10 sections)
    if (useWhiteBackground) {
      return (
        <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
          {/* Instructor initials */}
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-aow-black rounded-full flex items-center justify-center border border-aow-gold mb-2">
              <span className="text-aow-gold text-xl font-bold">{instructorInitials}</span>
            </div>
            <div className="text-aow-black/60 text-xs font-medium">
              {course.modules} modules
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full h-full bg-gradient-to-br from-aow-gold/20 via-aow-black to-aow-black flex items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-aow-gold rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-aow-gold/50 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
        </div>
        
        {/* Instructor initials */}
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-aow-gold/20 rounded-full flex items-center justify-center border border-aow-gold/30 mb-2">
            <span className="text-aow-gold text-xl font-bold">{instructorInitials}</span>
          </div>
          <div className="text-aow-gold/60 text-xs font-medium">
            {course.modules} modules
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} group/course cursor-pointer select-none`}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Course: ${course.title} by ${course.instructor}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="space-y-3">
        {/* Course Image Card */}
        <div className={`relative bg-white rounded-xl overflow-hidden shadow-lg ${size === 'mini' ? 'h-32' : 'h-52'}`}>
          {/* Use provided image or fallback to placeholder */}
          {course.image_link || course.imageUrl ? (
            <ImageWithFallback
              src={course.image_link || course.imageUrl}
              alt={`${course.instructor || course.subheading || 'Instructor'} - ${course.title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <CoursePortrait 
              title={course.title}
              moduleNumber={course.module_number}
              className="rounded-lg"
            />
          )}

          {/* Tag Logic: Featured takes precedence over New */}
          {course.isFeatured ? (
            <div className="absolute top-3 left-3 w-6 h-6">
              <FeaturedTag />
            </div>
          ) : course.isNew ? (
            <div className="absolute top-3 left-3 w-14 h-6">
              <NewTag />
            </div>
          ) : null}

          {/* Bookmark - Top Right - Only show for non-learning_tracks courses */}
          {canBookmark && (
            <BookmarkButton courseId={course.id || ''} />
          )}
          
          {/* CLE Credits Badge - Bottom Right with Prestigious Burgundy */}
          <div className="absolute bottom-3 right-3 w-16 h-7">
            <div className="relative w-full h-full bg-gradient-to-r from-[#722F37] via-[#8B0000] to-[#722F37] rounded-full shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  {/* Coin Icon for Credits */}
                  <Coins className="w-3.5 h-3.5 text-aow-gold" />
                  <span className="text-white text-sm font-medium">
                    {formatCLECredits(course.cleCredits)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar for Continue Watching */}
          {showProgress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
              <motion.div 
                className="h-full bg-aow-gold rounded-r-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressValue}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          )}
        </div>

        {/* Course Information - AI Interface Style */}
        <motion.div 
          className="space-y-2 px-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Course Title */}
          <h3 className="text-white font-medium text-lg leading-tight tracking-tight">
            {course.title}
          </h3>

          {/* Instructor Name - No dot, no progress */}
          <div className="flex items-center space-x-2">
            <span className="text-aow-gold text-sm font-medium tracking-wide">
              {course.instructor}
            </span>
          </div>

          {/* Course Description */}
          <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}