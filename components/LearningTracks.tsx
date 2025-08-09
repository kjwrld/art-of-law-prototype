import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Sprout, Building, Megaphone } from "lucide-react";
import { trackData } from "../data/trackData";
import { CourseProgressItem } from "./CourseProgressItem";
import { Course } from "../data/courses";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookmarkButton } from "./BookmarkButton";

export function LearningTracks() {
    const [activeTab, setActiveTab] = useState("master");
    const [learningTracksCourses, setLearningTracksCourses] = useState<
        Course[]
    >([]);
    const [loading, setLoading] = useState(true);

    const currentTrack = trackData[activeTab];

    // Fetch Learning Tracks courses from Supabase
    useEffect(() => {
        const fetchLearningTracks = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://${projectId}.supabase.co/functions/v1/make-server-9180a2e7/courses/selection/learning_tracks`,
                    {
                        headers: {
                            Authorization: `Bearer ${publicAnonKey}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();

                if (data.success && data.courses) {
                    setLearningTracksCourses(data.courses);
                }
            } catch (error) {
                console.error("Failed to fetch learning tracks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLearningTracks();
    }, []);

    // Get the appropriate icon for each track
    const getTrackIcon = (trackKey: string) => {
        switch (trackKey) {
            case "master":
                return Sprout;
            case "leap":
                return Building;
            case "leader":
                return Megaphone;
            default:
                return Sprout;
        }
    };

    // Handler for learning track course clicks
    const handleTrackCourseClick = (courseName: string) => {
        // console.log("Learning track course clicked:", courseName);
        // Course clicks no longer open overlay - just for interaction logging
    };

    const handleCourseClick = (courseId: string) => {
        // console.log("Learning tracks course clicked:", courseId);
        // Course clicks no longer open overlay - just for interaction logging
    };

    return (
        <div className="min-h-screen bg-aow-black text-white pt-20">
            {/* Page Header */}
            <div className="px-6 md:px-8 lg:px-12 xl:px-16 pt-8 pb-6">
                <h1 className="font-industrial-gothic title-page mobile-title text-white mb-2">
                    learning tracks
                </h1>
                <p className="text-white/70 text-lg font-['Luxora_Grotesk',_sans-serif]">
                    Structured pathways to legal mastery, curated by industry
                    leaders
                </p>
            </div>

            {/* Content */}
            <div className="pb-12">
                {/* Learning Tracks Row - Top 10 Style without Numbers */}
                {!loading && learningTracksCourses.length > 0 && (
                    <motion.div
                        className="relative mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {/* Scrollable Learning Track Cards */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: "easeOut",
                                }}
                                className="flex gap-8 md:gap-10 overflow-x-auto scrollbar-hide px-6 md:px-8 lg:px-12 xl:px-16 pb-4"
                                style={{ scrollSnapType: "x mandatory" }}
                            >
                                {learningTracksCourses.map((course, index) => {
                                    const instructorInitials = course.instructor
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("");

                                    return (
                                        <motion.div
                                            key={course.id}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.1 * index,
                                                ease: "easeOut",
                                            }}
                                            className="flex-shrink-0 cursor-pointer flex flex-col items-center group/track-card"
                                            onClick={() =>
                                                handleCourseClick(course.id)
                                            }
                                        >
                                            <div className="relative mb-4">
                                                {/* Portrait Image - Individual hover effect */}
                                                <div className="relative">
                                                    <div className="w-32 h-44 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                                                        {course.image_link ||
                                                        course.thumbnail ? (
                                                            <ImageWithFallback
                                                                src={
                                                                    course.image_link ||
                                                                    course.thumbnail
                                                                }
                                                                alt={
                                                                    course.title
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
                                                                <div className="relative z-10 text-center">
                                                                    <div className="w-20 h-20 bg-aow-black rounded-full flex items-center justify-center border-2 border-aow-gold mb-3">
                                                                        <span className="text-aow-gold text-2xl font-bold">
                                                                            {
                                                                                instructorInitials
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-aow-black/60 text-xs font-medium">
                                                                        {
                                                                            course.modules
                                                                        }{" "}
                                                                        modules
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/10 via-white/5 to-transparent opacity-0 group-hover/track-card:opacity-100 transition-opacity duration-300"></div>

                                                    {/* Bookmark Button */}
                                                    <BookmarkButton
                                                        courseId={course.id}
                                                    />
                                                </div>
                                            </div>

                                            {/* Course Title */}
                                            <div className="text-center">
                                                <h3 className="text-white font-medium text-sm mb-1 leading-tight font-['Luxora_Grotesk:Medium',_sans-serif] group-hover/track-card:text-aow-gold-light transition-colors duration-300 max-w-[140px]">
                                                    {course.title}
                                                </h3>
                                                <p className="text-white/60 text-xs font-['Luxora_Grotesk:Medium',_sans-serif] max-w-[140px] text-center">
                                                    {course.instructor}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {/* More Learning Tracks Soon Placeholder */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay:
                                            0.1 * learningTracksCourses.length,
                                        ease: "easeOut",
                                    }}
                                    className="flex-shrink-0 flex flex-col items-center group/placeholder cursor-default"
                                >
                                    <div className="relative mb-4">
                                        <div className="relative">
                                            <div className="w-32 h-44 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center group-hover/placeholder:border-aow-gold/50 transition-colors duration-300">
                                                <div className="text-center space-y-4">
                                                    <div
                                                        className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/20 mb-3 group-hover/placeholder:border-aow-gold/40 transition-colors duration-300"
                                                        style={{
                                                            margin: "auto",
                                                        }}
                                                    >
                                                        <Sprout className="w-8 h-8 text-white/40 group-hover/placeholder:text-aow-gold/60 transition-colors duration-300" />
                                                    </div>
                                                    <div className="text-white/40 text-xs font-medium group-hover/placeholder:text-white/60 transition-colors duration-300">
                                                        Coming Soon
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Placeholder Title */}
                                    <div className="text-center">
                                        <h3 className="text-white/60 font-medium text-sm mb-1 leading-tight font-['Luxora_Grotesk:Medium',_sans-serif] group-hover/placeholder:text-aow-gold-light transition-colors duration-300 max-w-[140px]">
                                            More Learning Tracks
                                        </h3>
                                        <p className="text-white/40 text-xs font-['Luxora_Grotesk:Medium',_sans-serif] max-w-[140px] text-center">
                                            Stay tuned
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Featured Learning Track */}
                <section className="px-6 md:px-8 lg:px-12 xl:px-16">
                    {/* My Learning Tracks Title */}
                    <h2 className="text-3xl font-['Luxora_Grotesk',_sans-serif] font-medium text-white mb-12">
                        My Learning Tracks
                    </h2>

                    {/* File Folder Tabs - Positioned above container */}
                    <div className="relative h-10 mb-0 lg:h-10">
                        <div className="absolute right-8 bottom-0 z-20 flex px-6 lg:px-0">
                            {/* Master the Courtroom - Tab */}
                            <div
                                className={`folder-tab ${
                                    activeTab === "master"
                                        ? "active"
                                        : "inactive"
                                }`}
                                onClick={() => setActiveTab("master")}
                            >
                                <span className="folder-tab-text whitespace-nowrap">
                                    {/* Mobile: Show icon only, Desktop: Show full text */}
                                    <span className="hidden lg:inline">
                                        Master the Courtroom
                                    </span>
                                    <span className="lg:hidden flex items-center justify-center">
                                        <Sprout className="w-4 h-4" />
                                    </span>
                                </span>
                            </div>

                            {/* Make the Leap - Tab */}
                            <div
                                className={`folder-tab ${
                                    activeTab === "leap" ? "active" : "inactive"
                                }`}
                                onClick={() => setActiveTab("leap")}
                            >
                                <span className="folder-tab-text whitespace-nowrap">
                                    {/* Mobile: Show icon only, Desktop: Show full text */}
                                    <span className="hidden lg:inline">
                                        Make the Leap: Leaving the Firm to Start
                                        Your Own
                                    </span>
                                    <span className="lg:hidden flex items-center justify-center">
                                        <Building className="w-4 h-4" />
                                    </span>
                                </span>
                            </div>

                            {/* Become a Thought Leader - Tab */}
                            <div
                                className={`folder-tab ${
                                    activeTab === "leader"
                                        ? "active"
                                        : "inactive"
                                }`}
                                onClick={() => setActiveTab("leader")}
                            >
                                <span className="folder-tab-text whitespace-nowrap">
                                    {/* Mobile: Show icon only, Desktop: Show full text */}
                                    <span className="hidden lg:inline">
                                        Become a Thought Leader
                                    </span>
                                    <span className="lg:hidden flex items-center justify-center">
                                        <Megaphone className="w-4 h-4" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-aow-gold p-6 md:p-8">
                        {/* Recommended Track Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-aow-gold rounded-lg flex items-center justify-center">
                                <currentTrack.icon className="w-6 h-6 text-aow-black" />
                            </div>
                            <h2 className="text-2xl font-['ewLuxora_Grotesk',_sans-serif] text-white">
                                Recommended: <br />
                                {currentTrack.title}
                            </h2>
                        </div>

                        {/* Personalized Text */}
                        <div className="flex items-center gap-2 text-gray-400 relative mb-6">
                            <Sparkles className="w-5 h-5" />
                            <motion.span
                                className="font-medium relative font-['Luxora_Grotesk',_sans-serif] text-lg"
                                initial={{ backgroundPosition: "-200% 0" }}
                                animate={{ backgroundPosition: "200% 0" }}
                                transition={{
                                    duration: 2,
                                    delay: 0.5,
                                    ease: "easeInOut",
                                    repeat: 0,
                                }}
                                style={{
                                    background:
                                        "linear-gradient(90deg, #9ca3af 0%, #d1d5db 25%, #f3f4f6 50%, #d1d5db 75%, #9ca3af 100%)",
                                    backgroundSize: "200% 100%",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    color: "transparent",
                                }}
                            >
                                {currentTrack.personalization}
                            </motion.span>
                        </div>

                        <p className="text-white/70 font-['Luxora_Grotesk',_sans-serif] mb-8 leading-relaxed">
                            {currentTrack.description}
                        </p>

                        {/* Track Progress Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/70 font-['Luxora_Grotesk',_sans-serif]">
                                    Track Progress
                                </span>
                                <span className="text-aow-gold font-['Luxora_Grotesk',_sans-serif] font-medium">
                                    {currentTrack.progress.completed} of{" "}
                                    {currentTrack.progress.total} completed
                                </span>
                            </div>

                            {/* Enhanced Vertical Course Progress */}
                            <div className="relative">
                                {/* Extended Progress Line - From bottom of first circle to end of module */}
                                <div
                                    className="absolute left-8 w-0.5 bg-white/20 z-0"
                                    style={{
                                        top: "64px", // Start at bottom of first circle (32px center + 32px radius)
                                        bottom: "16px", // End with some padding from the bottom
                                    }}
                                ></div>

                                {/* Progress Line - Based on completion status */}
                                {activeTab === "master" && (
                                    <div
                                        className="absolute left-8 w-0.5 bg-aow-gold z-0 transition-all duration-500"
                                        style={{
                                            top: "64px", // Start at bottom of first circle
                                            height: "200px", // Increased height to accommodate taller course items
                                        }}
                                    ></div>
                                )}

                                {/* Course Cards with Rich Content */}
                                <div className="space-y-8 pb-4">
                                    {currentTrack.courses.map(
                                        (course, index) => (
                                            <CourseProgressItem
                                                key={index}
                                                course={course}
                                                index={index}
                                                onCourseClick={
                                                    handleTrackCourseClick
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Learning Tracks - Coming Soon */}
                <section className="mt-12 px-6 md:px-8 lg:px-12 xl:px-16">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sprout className="w-8 h-8 text-aow-gold" />
                        </div>
                        <h3 className="text-xl font-['Luxora_Grotesk',_sans-serif] text-white mb-2">
                            More Learning Tracks Coming Soon
                        </h3>
                        <p className="text-white/60 font-['Luxora_Grotesk',_sans-serif] max-w-md mx-auto">
                            We're crafting additional learning pathways across
                            specialized practice areas. Each track is designed
                            to elevate your expertise systematically.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
