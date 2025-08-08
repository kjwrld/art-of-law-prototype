import { motion } from "framer-motion";
import { X } from "lucide-react";
import svgPaths from "../imports/svg-cpvysnooko";
import imgPicture from "../src/assets/placeholder.svg";
import { Course } from "../data/courses";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course;
  isDefault?: boolean;
  formatCredits: (credits: string | number) => string;
}

function PlayButton() {
  return (
    <motion.div
      className="bg-white box-border content-stretch flex flex-row gap-2 items-center justify-center overflow-clip px-8 md:px-[47px] py-2.5 md:py-3 relative rounded-3xl shrink-0 cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
    >
      <div className="h-[13px] md:h-[15px] relative shrink-0 w-[11px] md:w-[13px]">
        <div className="absolute bottom-[9.27%] left-0 right-[15.41%] top-[10.2%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 11 13"
          >
            <path
              d={svgPaths.pb7a6f00}
              fill="var(--aow-black)"
            />
          </svg>
        </div>
      </div>
      <div className="font-['Manrope',_sans-serif] font-bold leading-[0] relative shrink-0 text-[var(--aow-black)] text-[13px] md:text-[14px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Play Now</p>
      </div>
    </motion.div>
  );
}

interface CourseInfoProps {
  course?: Course;
  isDefault?: boolean;
}

function CourseInfo({ course, isDefault }: CourseInfoProps) {
  const title = isDefault ? "the theater of the courtroom" : (course?.title?.toLowerCase() || "");
  const description = isDefault 
    ? "Master storytelling, voice, movement, and presence to command the courtroom like a stage."
    : (course?.description || "");

  // Calculate if title is long (more than 30 characters or contains multiple words)
  const isLongTitle = title.length > 30 || title.split(' ').length > 4;
  
  // Dynamic spacing based on title length
  const titleBottomMargin = isLongTitle ? "mb-8 md:mb-10" : "mb-4 md:mb-6";
  const containerTopPosition = isLongTitle ? "top-[50%] md:top-[160px]" : "top-[60%] md:top-[199px]";

  return (
    <motion.div 
      className={`absolute box-border content-stretch flex flex-col gap-4 md:gap-2.5 h-auto items-start justify-center left-6 md:left-[75px] p-0 ${containerTopPosition} right-6 md:right-auto md:w-[385px] -translate-y-1/2 md:translate-y-0`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`text-shadow h-auto leading-[0] not-italic relative shrink-0 text-white text-[28px] md:text-[48px] text-left w-full md:w-[385px] ${titleBottomMargin}`}>
        <p className="block leading-[1.1] md:leading-[1.1]">{title}</p>
      </div>
      <div className="text-shadow font-['Luxora_Grotesk:Book',_sans-serif] h-auto leading-[0] not-italic relative shrink-0 text-white text-[16px] md:text-[20px] text-left w-full mb-6 md:mb-8">
        <p className="block leading-[1.4] md:leading-[1.4]">
          {description}
        </p>
      </div>
      <PlayButton />
    </motion.div>
  );
}

interface CourseDetailsProps {
  course?: Course;
  isDefault?: boolean;
  formatCredits: (credits: string | number) => string;
}

function CourseDetails({ course, isDefault, formatCredits }: CourseDetailsProps) {
  const trackName = isDefault 
    ? "Litigation & Advocacy Track"
    : course?.credit_type 
      ? `${course.credit_type} Learning Track`
      : "General Learning Track";
      
  const credits = isDefault 
    ? "2.0 CLE Credits"
    : course?.credits 
      ? `${formatCredits(course.credits)} CLE Credits`
      : "1.0 CLE Credits";

  return (
    <motion.div 
      className="absolute h-40 left-[283px] top-[501px] w-[742px] hidden lg:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      <div className="box-border content-stretch flex flex-row gap-2.5 h-40 items-center justify-center overflow-clip p-[8px] relative w-[742px]">
        <div className="text-shadow basis-0 font-['Luxora_Grotesk',_sans-serif] grow h-full leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-white text-[20px] text-right pr-6">
          <p className="block mb-0">{trackName}</p>
          <p className="block mb-0">{credits}</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-white border-[1px_0px_0px] border-solid inset-0 pointer-events-none"
      />
    </motion.div>
  );
}





export function CourseOverlay({ isOpen, onClose, course, isDefault, formatCredits }: CourseOverlayProps) {
  if (!isOpen) return null;

  // Use course image if available and not default, otherwise use default image
  const backgroundImage = (!isDefault && course?.image_link) ? course.image_link : imgPicture;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      
      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      {/* Main Overlay Content */}
      <motion.div
        className="relative bg-[rgba(196,189,178,0.05)] overflow-clip rounded-3xl w-[1046px] h-[650px] max-w-[95vw] max-h-[90vh]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Modern Sleek Border */}
        <motion.div 
          className="absolute inset-4 rounded-[20px] border border-white/25 pointer-events-none z-10" 
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        />
        
        {/* Background Image */}
        <div className="absolute h-[650px] left-1/2 rounded-3xl top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1046px] bg-center bg-cover">
          <ImageWithFallback
            src={backgroundImage}
            alt={course?.title || "Course"}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        
        {/* Course Information */}
        <CourseInfo course={course} isDefault={isDefault} />
        
        {/* Course Details */}
        <CourseDetails course={course} isDefault={isDefault} formatCredits={formatCredits} />
      </motion.div>
    </motion.div>
  );
}