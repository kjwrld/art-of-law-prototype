import { CourseRow } from "./CourseRow";
import { Course } from "../data/courses";
import { motion } from "framer-motion";
import { TopLearningTracks } from "./TopLearningTracks";
import { TopLegalOneShots } from "./TopLegalOneShots";
import { useState, useEffect } from "react";
import React from "react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function CourseLibrary() {
  const [courses, setCourses] = useState<{ [key: string]: Course[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch courses using direct selection-based system with all categories in specified order
        const selections = [
          { title: 'Recommended For You', selection: 'Recommended' },
          { title: 'Continue Watching', selection: 'Continue' },
          { title: 'My List', selection: 'my_list' },
          { title: 'Learning Tracks', selection: 'learning_tracks' },
          { title: 'The Next Frontier: AI & Web3', selection: 'ai_web3' },
          { title: 'Be A Boss (Professional Development & Leadership)', selection: 'be_a_boss' },
          { title: 'True Crime: Criminal Law Docuseries', selection: 'true_crime' },
          { title: 'The Ethical Attorney', selection: 'ethical_attorney' },
          { title: 'Prioritize Your Wellness (CLE-compliant wellness entertainment)', selection: 'wellness' }
        ];
        const courseData: { [key: string]: Course[] } = {};

        await Promise.all(
          selections.map(async (section) => {
            try {
              const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-9180a2e7/courses/selection/${section.selection}`, {
                headers: {
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'Content-Type': 'application/json',
                }
              });
              const data = await response.json();
              
              if (data.success && data.courses) {
                courseData[section.title] = data.courses;
              } else {
                courseData[section.title] = [];
              }
            } catch (error) {
              courseData[section.title] = [];
            }
          })
        );

        setCourses(courseData);
      } catch (error) {
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Course sections with dynamic data - all sections from database in specified order
  const courseSections = [
    {
      title: "Recommended For You",
      courses: courses["Recommended For You"] || [],
      size: 'medium' as const
    },
    {
      title: "Continue Watching",
      courses: courses["Continue Watching"] || [],
      size: 'medium' as const,
      showProgress: true
    },
    {
      title: "My List",
      courses: courses["My List"] || [],
      size: 'medium' as const
    },
    {
      title: "Learning Tracks",
      courses: courses["Learning Tracks"] || [],
      size: 'medium' as const
    },
    {
      title: "The Next Frontier: AI & Web3",
      courses: courses["The Next Frontier: AI & Web3"] || [],
      size: 'medium' as const
    },
    {
      title: "Be A Boss (Professional Development & Leadership)",
      courses: courses["Be A Boss (Professional Development & Leadership)"] || [],
      size: 'medium' as const
    },
    {
      title: "True Crime: Criminal Law Docuseries",
      courses: courses["True Crime: Criminal Law Docuseries"] || [],
      size: 'medium' as const
    },
    {
      title: "The Ethical Attorney",
      courses: courses["The Ethical Attorney"] || [],
      size: 'medium' as const
    },
    {
      title: "Prioritize Your Wellness (CLE-compliant wellness entertainment)",
      courses: courses["Prioritize Your Wellness (CLE-compliant wellness entertainment)"] || [],
      size: 'medium' as const
    }
  ];

  if (loading) {
    return (
      <motion.div 
        className="bg-[var(--aow-black)] min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--aow-gold)]/20 border-t-[var(--aow-gold)] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-lg">Loading your legal education library...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="bg-[var(--aow-black)] min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠️</span>
          </div>
          <h3 className="text-white text-xl mb-2">Unable to Load Courses</h3>
          <p className="text-white/60 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[var(--aow-gold)] text-[var(--aow-black)] rounded-lg hover:bg-[var(--aow-gold)]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-[var(--aow-black)] min-h-screen"
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