import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BookmarkButton } from "../BookmarkButton";
import { formatCLECredits } from '../../utils/creditFormatter';

interface PracticeCourseCardProps {
  course: any;
}

export const PracticeCourseCard = ({ course }: PracticeCourseCardProps) => {
  // Generate placeholder with instructor initials 
  const instructorInitials = course.instructor.split(' ').map((n: string) => n[0]).join('');

  return (
    <motion.div
      className="w-full group select-none"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="space-y-3">
        {/* Course Image Card */}
        <div className="relative bg-white rounded-xl overflow-hidden h-52 shadow-lg">
          {/* Use actual course image or fallback */}
          {course.image_link || course.thumbnail ? (
            <ImageWithFallback
              src={course.image_link || course.thumbnail}
              alt={`${course.instructor || course.subheading || 'Instructor'} - ${course.title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-aow-black rounded-full flex items-center justify-center border border-aow-gold mb-2">
                  <span className="text-aow-gold text-xl font-bold">{instructorInitials}</span>
                </div>
                <div className="text-aow-black/60 text-xs font-medium">
                  {course.modules} modules
                </div>
              </div>
            </div>
          )}

          {/* Modern Bookmark Button - Only show for non-learning_tracks courses */}
          {course.selection !== 'learning_tracks' && (
            <BookmarkButton courseId={course.id.toString()} />
          )}
          
          {/* CLE Credits Badge - Bottom Right with Modern Styling */}
          <div className="absolute bottom-3 right-3 w-16 h-7">
            <div className="relative w-full h-full bg-gradient-to-r from-[#722F37] via-[#8B0000] to-[#722F37] rounded-full shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  {/* Coin Icon for Credits */}
                  <Coins className="w-3.5 h-3.5 text-aow-gold" />
                  <span className="text-white text-sm font-medium">
                    {formatCLECredits(course.credits)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Information - Modern Style matching homepage */}
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

          {/* Instructor Name */}
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
};