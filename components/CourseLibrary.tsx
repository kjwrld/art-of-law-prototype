import { CourseRow } from "./CourseRow";
import { Course } from "../data/courses";
import { motion } from "framer-motion";
import { TopLearningTracks } from "./TopLearningTracks";
import { TopLegalOneShots } from "./TopLegalOneShots";
import React from "react";
import {
  useRecommendedCourses,
  useContinueWatchingCourses,
  useMyListCourses,
  useLearningTracksCourses,
  useAIWeb3Courses,
  useBeABossCourses,
  useTrueCrimeCourses,
  useEthicalAttorneyCourses,
  useWellnessCourses,
} from "../src/hooks/useCourses";

export function CourseLibrary() {
  // Use cached queries for all course categories
  const { data: recommendedCourses, isLoading: isLoadingRecommended } = useRecommendedCourses();
  const { data: continueWatchingCourses, isLoading: isLoadingContinue } = useContinueWatchingCourses();
  const { data: myListCourses, isLoading: isLoadingMyList } = useMyListCourses();
  const { data: learningTracksCourses, isLoading: isLoadingLearningTracks } = useLearningTracksCourses();
  const { data: aiWeb3Courses, isLoading: isLoadingAIWeb3 } = useAIWeb3Courses();
  const { data: beABossCourses, isLoading: isLoadingBeABoss } = useBeABossCourses();
  const { data: trueCrimeCourses, isLoading: isLoadingTrueCrime } = useTrueCrimeCourses();
  const { data: ethicalAttorneyCourses, isLoading: isLoadingEthical } = useEthicalAttorneyCourses();
  const { data: wellnessCourses, isLoading: isLoadingWellness } = useWellnessCourses();

  // Check if any queries are still loading
  const isLoading = isLoadingRecommended || isLoadingContinue || isLoadingMyList || 
                   isLoadingLearningTracks || isLoadingAIWeb3 || isLoadingBeABoss || 
                   isLoadingTrueCrime || isLoadingEthical || isLoadingWellness;

  // Course sections with cached data - all sections from database in specified order
  const courseSections = [
    {
      title: "Recommended For You",
      courses: recommendedCourses || [],
      size: 'medium' as const
    },
    {
      title: "Continue Watching",
      courses: continueWatchingCourses || [],
      size: 'medium' as const,
      showProgress: true
    },
    {
      title: "My List",
      courses: myListCourses || [],
      size: 'medium' as const
    },
    {
      title: "Learning Tracks",
      courses: learningTracksCourses || [],
      size: 'medium' as const
    },
    {
      title: "The Next Frontier: AI & Web3",
      courses: aiWeb3Courses || [],
      size: 'medium' as const
    },
    {
      title: "Be A Boss (Professional Development & Leadership)",
      courses: beABossCourses || [],
      size: 'medium' as const
    },
    {
      title: "True Crime: Criminal Law Docuseries",
      courses: trueCrimeCourses || [],
      size: 'medium' as const
    },
    {
      title: "The Ethical Attorney",
      courses: ethicalAttorneyCourses || [],
      size: 'medium' as const
    },
    {
      title: "Prioritize Your Wellness (CLE-compliant wellness entertainment)",
      courses: wellnessCourses || [],
      size: 'medium' as const
    }
  ];

  if (isLoading) {
    return (
      <motion.div 
        className="bg-aow-black min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-aow-gold/20 border-t-aow-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-lg">Loading your legal education library...</p>
        </div>
      </motion.div>
    );
  }


  return (
    <motion.div 
      className="bg-aow-black min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Course Sections */}
      <div className="py-4 space-y-8">
        {courseSections.map((section, index) => (
          <React.Fragment key={section.title}>
            {section.courses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index === 0 ? 0 : index * 0.1 }} // First section loads immediately
              >
                <CourseRow
                  title={section.title}
                  courses={section.courses}
                  size={section.size}
                  showProgress={section.showProgress}
                  loadImmediately={index === 0} // First section loads immediately
                />
              </motion.div>
            )}

            {/* Insert Top 10 after Continue Watching */}
            {section.title === "Continue Watching" && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TopLearningTracks />
              </motion.div>
            )}

            {/* Insert Legal One-Shots Top 10 after My List row (removing after Legal One-Shots to avoid duplicate) */}
            {section.title === "My List" && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <TopLegalOneShots />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}