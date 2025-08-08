import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  courseId: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function BookmarkButton({ courseId, className = "", onClick }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Load bookmark state from localStorage on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('aow-bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(courseId));
  }, [courseId]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click handlers
    
    const bookmarks = JSON.parse(localStorage.getItem('aow-bookmarks') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      // Remove bookmark
      updatedBookmarks = bookmarks.filter((id: string) => id !== courseId);
      setIsBookmarked(false);
    } else {
      // Add bookmark
      updatedBookmarks = [...bookmarks, courseId];
      setIsBookmarked(true);
    }
    
    localStorage.setItem('aow-bookmarks', JSON.stringify(updatedBookmarks));
    
    // Call optional onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      className={`absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 ${className}`}
      onClick={handleBookmarkClick}
      initial={{ scale: 0.8 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark 
        className={`h-4 w-4 transition-colors duration-200 ${
          isBookmarked 
            ? 'text-[var(--aow-gold)] fill-[var(--aow-gold)]' 
            : 'text-white/80'
        }`}
      />
    </motion.button>
  );
}