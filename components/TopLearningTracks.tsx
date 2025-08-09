import { motion } from "framer-motion";
import { Course } from "../data/courses";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookmarkButton } from "./BookmarkButton";

const TopCourseCard = ({
    course,
    index,
}: {
    course: Course;
    index: number;
}) => {
    const instructorInitials = course.instructor
        .split(" ")
        .map((n: string) => n[0])
        .join("");

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
            className="flex-shrink-0 cursor-pointer group/card flex flex-col items-center"
            onClick={() => {}} // No overlay functionality
        >
            <div className="relative mb-4">
                {/* Number and Portrait Container */}
                <div className="relative flex items-end justify-center">
                    {/* Large Number */}
                    <div
                        className="text-[#1a1a1a] font-black text-[180px] leading-none relative z-0 select-none"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            WebkitTextStroke: "2px rgba(255,255,255,0.1)",
                            textShadow: "0 0 20px rgba(0,0,0,0.8)",
                        }}
                    >
                        {index + 1}
                    </div>

                    {/* Portrait Image */}
                    <div className="relative z-10 -ml-12 mb-4 transform group-hover/card:scale-105 transition-transform duration-300">
                        <div className="w-32 h-44 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                            {course.image_link ? (
                                <ImageWithFallback
                                    src={course.image_link}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
                                    <div className="relative z-10 text-center">
                                        <div className="w-20 h-20 bg-aow-black rounded-full flex items-center justify-center border-2 border-aow-gold mb-3">
                                            <span className="text-aow-gold text-2xl font-bold">
                                                {instructorInitials}
                                            </span>
                                        </div>
                                        <div className="text-aow-black/60 text-xs font-medium">
                                            {course.modules} modules
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/10 via-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                        {/* Bookmark Button */}
                        <BookmarkButton courseId={course.id} />
                    </div>
                </div>
            </div>

            {/* Course Title - Now centered relative to the entire visual element */}
            <div className="text-center">
                <h3 className="text-white font-medium text-sm mb-1 leading-tight font-['Luxora_Grotesk:Medium',_sans-serif] group-hover/card:text-aow-gold-light transition-colors duration-300 max-w-[140px]">
                    {course.title}
                </h3>
                <p className="text-white/60 text-xs font-['Luxora_Grotesk:Medium',_sans-serif] max-w-[140px] text-center">
                    {course.instructor}
                </p>
            </div>
        </motion.div>
    );
};

export const TopLearningTracks = () => {
    const [topCourses, setTopCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopCourses = async () => {
            try {
                setLoading(true);
                setError(null);

                // console.log('🔥 Fetching Top 10 courses from database selection "top"...');
                // For 'top' selection, we need to call it directly since it's not mapped in the category system
                const response = await fetch(
                    `https://${projectId}.supabase.co/functions/v1/make-server-9180a2e7/courses/selection/top`,
                    {
                        headers: {
                            Authorization: `Bearer ${publicAnonKey}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                if (data.success && data.courses) {
                    // Take first 10 courses
                    const top10 = data.courses.slice(0, 10);
                    setTopCourses(top10);
                    // console.log(`✅ Successfully loaded ${top10.length} top courses`);
                } else {
                    // console.error("Failed to fetch top courses:", data.error);
                    setError("Failed to load top courses");
                }
            } catch (error) {
                // console.error("Error fetching top courses:", error);
                setError("Failed to load top courses");
            } finally {
                setLoading(false);
            }
        };

        fetchTopCourses();
    }, []);

    if (loading) {
        return (
            <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-12 xl:px-16">
                    <h2 className="text-white/90 text-lg md:text-xl lg:text-2xl text-shadow tracking-tight">
                        Top 10 in Your Jurisdiction
                    </h2>
                </div>
                <div className="flex gap-8 md:gap-10 px-4 md:px-8 lg:px-12 xl:px-16">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className="flex-shrink-0 animate-pulse">
                            <div className="w-32 h-44 bg-white/10 rounded-lg mb-4"></div>
                            <div className="w-24 h-4 bg-white/10 rounded mb-2"></div>
                            <div className="w-20 h-3 bg-white/10 rounded"></div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-12 xl:px-16">
                    <h2 className="text-white/90 text-lg md:text-xl lg:text-2xl text-shadow tracking-tight">
                        Top 10 in Your Jurisdiction
                    </h2>
                </div>
                <div className="px-4 md:px-8 lg:px-12 xl:px-16">
                    <p className="text-white/60">
                        Unable to load top courses. Please try again later.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Row Title - Match CourseRow spacing */}
            <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-12 xl:px-16">
                <motion.h2
                    className="text-white/90 text-lg md:text-xl lg:text-2xl text-shadow tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Top 10 in Your Jurisdiction
                </motion.h2>
            </div>

            {/* Scrollable Learning Track Cards */}
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex gap-8 md:gap-10 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-12 xl:px-16 pb-4"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {topCourses.map((course, index) => (
                        <TopCourseCard
                            key={course.id}
                            course={course}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};
