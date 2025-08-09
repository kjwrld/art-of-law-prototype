import { useState } from "react";
import { motion } from "framer-motion";
import { CourseRow } from "./CourseRow";
import { Course } from "../data/courses";
import { useContinueWatchingCourses } from "../src/hooks/useCourses";
import { useBookmarks } from "../src/hooks/useBookmarks";

interface MyCoursesProps {
    onNavigate?: (page: string) => void;
}

export function MyCourses({ onNavigate }: MyCoursesProps) {
    // Use bookmarks hook to get saved courses
    const { bookmarkedCourses } = useBookmarks();

    // Use cached continue watching courses - instant loading!
    const { data: continueWatchingCourses, isLoading } =
        useContinueWatchingCourses();

    // Debug logging for My Courses
    // console.log('📚 My Courses debug:', {
    //     bookmarkedCoursesLength: bookmarkedCourses?.length,
    //     bookmarkedCourses: bookmarkedCourses,
    //     hasBookmarkedCourses: bookmarkedCourses && bookmarkedCourses.length > 0
    // });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-aow-gold border-t-aow-gold rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-aow-black text-white pt-20">
            {/* Page Header */}
            <div className="px-6 md:px-8 lg:px-12 xl:px-16 pt-8 pb-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-industrial-gothic title-page text-white mb-2"
                >
                    my courses
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="text-white/70 text-lg font-['Luxora_Grotesk',_sans-serif]"
                >
                    Your personalized learning dashboard
                </motion.p>
            </div>

            {/* Content Sections */}
            <div className="px-6 md:px-8 lg:px-12 xl:px-16 space-y-12 pb-12">
                {/* Bookmarked Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-['Luxora_Grotesk',_sans-serif] text-white">
                            Saved Courses
                        </h2>
                    </div>

                    {bookmarkedCourses && bookmarkedCourses.length > 0 ? (
                        <CourseRow
                            title=""
                            courses={bookmarkedCourses}
                            size="medium"
                        />
                    ) : (
                        <div className="bg-[#1a1a1a] rounded-2xl border border-aow-gold p-8 text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-['Luxora_Grotesk',_sans-serif] text-white mb-2">
                                No Bookmarked Courses Yet
                            </h3>
                            <p className="text-white/60 font-['Luxora_Grotesk',_sans-serif] max-w-md mx-auto">
                                Start building your personal library by
                                bookmarking courses you want to watch later.
                                Look for the bookmark icon on any course.
                            </p>
                        </div>
                    )}
                </section>

                {/* Continue Watching Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-['Luxora_Grotesk',_sans-serif] text-white">
                            Continue Watching
                        </h2>
                    </div>

                    {continueWatchingCourses &&
                    continueWatchingCourses.length > 0 ? (
                        <CourseRow
                            title=""
                            courses={continueWatchingCourses || []}
                            showProgress={true}
                        />
                    ) : (
                        <div className="bg-[#1a1a1a] rounded-2xl border border-aow-gold/10 p-8 text-center">
                            <div className="w-16 h-16 bg-aow-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-aow-gold"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-['Luxora_Grotesk',_sans-serif] text-white mb-2">
                                No Courses in Progress
                            </h3>
                            <p className="text-white/60 font-['Luxora_Grotesk',_sans-serif] max-w-md mx-auto">
                                Start watching a course to see your progress
                                here. Your learning journey awaits!
                            </p>
                        </div>
                    )}
                </section>

                {/* Quick Access to Learning Tracks */}
                <section>
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-aow-gold p-8 text-center">
                        <div className="w-16 h-16 bg-aow-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-aow-gold"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-['Luxora_Grotesk',_sans-serif] text-white mb-2">
                            Explore Learning Tracks
                        </h3>
                        <p className="text-white/60 font-['Luxora_Grotesk',_sans-serif] mb-4 max-w-md mx-auto">
                            Follow structured pathways designed to elevate your
                            legal expertise systematically.
                        </p>
                        <button
                            onClick={() => onNavigate?.("learning-tracks")}
                            className="bg-aow-gold text-aow-black px-6 py-3 rounded-lg font-medium hover:bg-aow-gold/90 transition-colors"
                        >
                            View Learning Tracks
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
