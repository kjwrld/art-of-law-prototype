import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus } from "lucide-react";
import { Course } from "../data/courses";
import { PERSONALIZED_TABS, FILTER_OPTIONS, AI_NOTIFICATION_DELAY } from "../constants/practiceArena";
import { fetchCoursesByFocus, formatCourseForUI, filterCoursesByFocus } from "../utils/practiceArenaHelpers";
import { FilterDropdown } from "./PracticeArena/FilterDropdown";
import { AIRecommendationNotification } from "./PracticeArena/AIRecommendationNotification";
import { PracticeCourseCard } from "./PracticeArena/PracticeCourseCard";

export function PracticeArena() {
  const [showAINotification, setShowAINotification] = useState(false);
  const [activeTabs, setActiveTabs] = useState<string[]>(["Business"]);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    state: "ca",
    role: "gc", 
    creditType: "technology",
    skillLevel: "advanced"
  });

  // Fetch courses from database by focus
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const courses = await fetchCoursesByFocus();
        setDbCourses(courses);
      } catch (error) {
        console.error('Error fetching practice arena courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Show AI notification after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAINotification(true);
    }, AI_NOTIFICATION_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const toggleTab = (tab: string) => {
    setActiveTabs(prev => {
      if (prev.includes(tab)) {
        // Don't allow removing the last tab
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== tab);
      } else {
        return [...prev, tab];
      }
    });
  };

  // Get all database courses formatted for the UI
  const getAllCourses = () => {
    return dbCourses.map(formatCourseForUI);
  };

  const handleFilterSelect = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleFilter = (filterType: string) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  const handleAddAITabs = () => {
    setShowAINotification(false);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {/* Loading skeletons */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-3">
              <div className="bg-white/10 rounded-xl h-52 animate-pulse"></div>
              <div className="space-y-2">
                <div className="bg-white/10 rounded h-6 animate-pulse"></div>
                <div className="bg-white/10 rounded h-4 w-3/4 animate-pulse"></div>
                <div className="bg-white/10 rounded h-4 w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    const { filteredCourses, selectedFocusAreas } = filterCoursesByFocus(getAllCourses(), activeTabs);

    if (filteredCourses.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-white/40 mb-4">
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl text-white/80 mb-2 font-['Luxora_Grotesk',_sans-serif]">
            No Practice Courses Available
          </h3>
          <p className="text-white/60 max-w-md font-['Luxora_Grotesk',_sans-serif]">
            No courses found for the selected focus areas ({selectedFocusAreas.join(', ')}). The courses may not have proper focus values assigned or try selecting different practice areas.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-h-[800px] overflow-y-auto scrollbar-hide pr-2">
          {filteredCourses.map((course, index) => (
            <motion.div 
              key={course.id} 
              className="w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              <PracticeCourseCard course={course} />
            </motion.div>
          ))}
        </div>
        
        {/* Bottom fade indicator for more content - only show if courses overflow */}
        {filteredCourses.length > 8 && (
          <div className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-[var(--aow-black)] to-transparent pointer-events-none"></div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--aow-black)] text-white pt-20">
      {/* Page Header */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pt-8 pb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl md:text-4xl lg:text-5xl font-['Alacrity_Sans',_sans-serif] text-white mb-2"
        >
          Practice Arena
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-white/70 text-lg font-['Luxora_Grotesk',_sans-serif]"
        >
          Sharpen your legal skills with interactive exercises, simulations, and practice scenarios.
        </motion.p>
      </div>

      {/* Content Sections */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 space-y-12 pb-12">
        
        {/* Personalization Indicator with Shimmer Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2 text-gray-400 relative">
            <Sparkles className="w-5 h-5" />
            <motion.span 
              className="font-medium relative font-['Luxora_Grotesk',_sans-serif] text-xl"
              initial={{ backgroundPosition: "-200% 0" }}
              animate={{ backgroundPosition: "200% 0" }}
              transition={{ 
                duration: 2, 
                delay: 0.5, 
                ease: "easeInOut",
                repeat: 0
              }}
              style={{
                background: "linear-gradient(90deg, #9ca3af 0%, #d1d5db 25%, #f3f4f6 50%, #d1d5db 75%, #9ca3af 100%)",
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent"
              }}
            >
              Personalized for Eric Jarrett
            </motion.span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/60 text-sm ml-7 font-['Luxora_Grotesk',_sans-serif] leading-relaxed max-w-md"
          >
            AI-curated exercises tailored to your practice area and career stage, designed to sharpen skills for real-world challenges ahead.
          </motion.p>
        </motion.div>

        {/* Focus Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold text-white mb-4 font-['Luxora_Grotesk',_sans-serif]">Focus</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {PERSONALIZED_TABS.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => toggleTab(tab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`px-8 py-3 rounded-2xl transition-all duration-300 font-medium text-sm relative overflow-hidden font-['Luxora_Grotesk',_sans-serif] text-center ${
                  activeTabs.includes(tab)
                    ? 'text-[var(--aow-gold-medium)]'
                    : 'text-white hover:text-[#9A7D50]'
                }`}
              >
                {/* Four subtly rounded corner brackets */}
                <div className={`absolute top-1 left-1 w-3 h-3 border-l border-t rounded-tl-sm transition-all duration-300 ${
                  activeTabs.includes(tab) 
                    ? 'border-[var(--aow-gold-medium)]/40' 
                    : 'border-white/20 group-hover:border-[#9A7D50]/30'
                }`}></div>
                <div className={`absolute top-1 right-1 w-3 h-3 border-r border-t rounded-tr-sm transition-all duration-300 ${
                  activeTabs.includes(tab) 
                    ? 'border-[var(--aow-gold-medium)]/40' 
                    : 'border-white/20 group-hover:border-[#9A7D50]/30'
                }`}></div>
                <div className={`absolute bottom-1 left-1 w-3 h-3 border-l border-b rounded-bl-sm transition-all duration-300 ${
                  activeTabs.includes(tab) 
                    ? 'border-[var(--aow-gold-medium)]/40' 
                    : 'border-white/20 group-hover:border-[#9A7D50]/30'
                }`}></div>
                <div className={`absolute bottom-1 right-1 w-3 h-3 border-r border-b rounded-br-sm transition-all duration-300 ${
                  activeTabs.includes(tab) 
                    ? 'border-[var(--aow-gold-medium)]/40' 
                    : 'border-white/20 group-hover:border-[#9A7D50]/30'
                }`}></div>
                
                <span className="relative z-10">
                  {tab}
                </span>
              </motion.button>
            ))}
            <button
              className="p-3 rounded-2xl border-2 border-dashed border-white/30 text-white/60 hover:border-white/50 hover:text-white/80 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold text-white mb-4 font-['Luxora_Grotesk',_sans-serif]">Filters</h2>
          <div className="flex flex-wrap gap-4">
            <FilterDropdown
              label="State"
              options={FILTER_OPTIONS.state}
              selectedValue={filters.state}
              onSelect={(value) => handleFilterSelect('state', value)}
              isOpen={openFilter === 'state'}
              onToggle={() => toggleFilter('state')}
              presetValue="California"
            />
            <FilterDropdown
              label="Role"
              options={FILTER_OPTIONS.role}
              selectedValue={filters.role}
              onSelect={(value) => handleFilterSelect('role', value)}
              isOpen={openFilter === 'role'}
              onToggle={() => toggleFilter('role')}
              presetValue="General Counsel"
            />
            <FilterDropdown
              label="Credit"
              options={FILTER_OPTIONS.creditType}
              selectedValue={filters.creditType}
              onSelect={(value) => handleFilterSelect('creditType', value)}
              isOpen={openFilter === 'creditType'}
              onToggle={() => toggleFilter('creditType')}
              presetValue="Technology"
            />
            <FilterDropdown
              label="Skill"
              options={FILTER_OPTIONS.skillLevel}
              selectedValue={filters.skillLevel}
              onSelect={(value) => handleFilterSelect('skillLevel', value)}
              isOpen={openFilter === 'skillLevel'}
              onToggle={() => toggleFilter('skillLevel')}
              presetValue="Advanced"
            />
          </div>
        </motion.div>

        {/* Practice Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold text-white mb-6 font-['Luxora_Grotesk',_sans-serif]">Practice</h2>
        </motion.div>

        {/* Practice Courses - Modern Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {renderContent()}
        </motion.div>

      </div>

      {/* Modern Glassy AI Recommendation Notification */}
      <AnimatePresence>
        {showAINotification && (
          <AIRecommendationNotification
            onClose={() => setShowAINotification(false)}
            onAccept={handleAddAITabs}
          />
        )}
      </AnimatePresence>

      {/* Backdrop for closing filters */}
      <AnimatePresence>
        {openFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setOpenFilter(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}