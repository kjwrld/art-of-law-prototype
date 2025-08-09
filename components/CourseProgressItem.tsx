import { Pen, Award, Play } from "lucide-react";
import { SmoothRippleAnimation } from "./SmoothRippleAnimation";
import { Course } from "../data/trackData";
import MaskGroup from "../imports/MaskGroup-145-257";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import courseImage from "/src/assets/course_img.png";

interface CourseProgressItemProps {
    course: Course;
    index: number;
    onCourseClick?: (courseName: string) => void;
}

export const CourseProgressItem = ({
    course,
    index,
    onCourseClick,
}: CourseProgressItemProps) => {
    return (
        <div className="flex items-start gap-6 relative">
            {/* Enhanced Course Circle with Special Icons */}
            <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 flex-shrink-0 relative ${
                    course.completed
                        ? "bg-white/10 border-aow-gold text-aow-gold"
                        : course.current
                        ? "bg-white/10 border-aow-gold text-aow-gold"
                        : "bg-aow-black border-white/20 text-white/50"
                }`}
            >
                {/* Smooth Ripple Animation for Current Course */}
                {course.current && <SmoothRippleAnimation />}

                {/* Icon Content */}
                {course.completed ? (
                    <svg
                        className="w-6 h-6 z-10"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : course.current ? (
                    <div className="w-4 h-4 bg-aow-gold rounded-full z-10"></div>
                ) : course.type === "flagship" ? (
                    <div className="w-5 h-5 z-10">
                        <MaskGroup />
                    </div>
                ) : course.type === "quiz" ? (
                    <Pen className="w-5 h-5" />
                ) : course.type === "completion" ? (
                    <Award className="w-5 h-5" />
                ) : (
                    <span className="font-bold text-lg z-10">{index + 1}</span>
                )}
            </div>

            {/* Enhanced Course Card Content */}
            <div
                className={`flex-1 p-6 rounded-xl border transition-all duration-300 ${
                    course.completed
                        ? "bg-white/5 border-green-500/30"
                        : course.current
                        ? "bg-white/5 border-aow-gold/30"
                        : "bg-white/2 border-white/10 hover:bg-white/5"
                }`}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <h4
                                className={`font-['Luxora_Grotesk',_sans-serif] font-medium text-xl transition-colors ${
                                    course.completed
                                        ? "text-white"
                                        : course.current
                                        ? "text-white"
                                        : "text-white/70"
                                }`}
                            >
                                {course.name}
                            </h4>

                            {/* Special Badges */}
                            {course.type === "flagship" && (
                                <span className="bg-gradient-to-r from-aow-gold/20 to-aow-gold/10 text-aow-gold px-3 py-1 rounded-full text-xs font-medium border border-aow-gold/30">
                                    Flagship Course
                                </span>
                            )}
                        </div>

                        <p
                            className={`font-['Luxora_Grotesk',_sans-serif] text-sm mb-4 leading-relaxed ${
                                course.completed
                                    ? "text-white/80"
                                    : course.current
                                    ? "text-white/80"
                                    : "text-white/60"
                            }`}
                        >
                            {course.description}
                        </p>

                        {/* Mini Course Image - Only show for current course */}
                        {course.current && (
                            <div className="mb-4">
                                <div
                                    className="relative w-full md:w-64 lg:w-80 xl:w-96 h-36 md:h-40 lg:h-48 xl:h-56 rounded-lg overflow-hidden border border-white/10 shadow-sm group cursor-pointer transition-all duration-300 hover:border-aow-gold/30"
                                    onClick={() => onCourseClick?.(course.name)}
                                >
                                    <ImageWithFallback
                                        src={
                                            course.realCourse?.imageUrl ||
                                            course.image ||
                                            courseImage
                                        }
                                        alt={`${course.instructor || 'Course Instructor'} - ${course.name}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Netflix-Style Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:border-aow-gold/50 group-hover:scale-110">
                                            <Play
                                                className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-aow-gold transition-colors duration-300 ml-1"
                                                fill="currentColor"
                                            />
                                        </div>
                                    </div>

                                    {/* Progress Bar - Shows user just started watching */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                                        <div
                                            className="h-full bg-aow-gold rounded-r-full transition-all duration-300"
                                            style={{ width: "12%" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <span
                                className={`text-xs font-medium ${
                                    course.completed
                                        ? "text-white/60"
                                        : course.current
                                        ? "text-white/60"
                                        : "text-white/40"
                                }`}
                            >
                                {course.duration}
                            </span>

                            {/* Show instructor if it's a real course */}
                            {course.instructor && (
                                <span
                                    className={`text-xs font-medium ${
                                        course.completed
                                            ? "text-white/50"
                                            : course.current
                                            ? "text-white/50"
                                            : "text-white/30"
                                    }`}
                                >
                                    by {course.instructor}
                                </span>
                            )}

                            {/* Show module count if available */}
                            {course.modules && (
                                <span
                                    className={`text-xs font-medium ${
                                        course.completed
                                            ? "text-white/50"
                                            : course.current
                                            ? "text-white/50"
                                            : "text-white/30"
                                    }`}
                                >
                                    {course.modules} modules
                                </span>
                            )}

                            {course.current && (
                                <span className="bg-aow-gold/20 text-aow-gold px-3 py-1 rounded-full text-xs font-medium">
                                    Up Next
                                </span>
                            )}

                            {course.completed && (
                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                    Completed
                                </span>
                            )}

                            {course.type === "quiz" && !course.completed && (
                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                                    Assessment
                                </span>
                            )}

                            {course.type === "completion" && (
                                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                                    Final Achievement
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
