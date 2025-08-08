import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import heroImage from "/src/assets/hero_img.png";
import FarLeftFadeBottom from "../imports/FarLeftFadeBottom";
import BottomFade from "../imports/BottomFade";
import FarRightFade from "../imports/FarRightFade";
import GoldenWreath from "../imports/GoldenWreath-81-486";
import svgPaths from "../imports/svg-cpvysnooko";
import { Course } from "../data/courses";
import { useHeroCourses } from "../src/hooks/useCourses";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CourseOverlay } from "./CourseOverlay";

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    showBadge: boolean;
    course?: Course; // Add course data
}

interface HeroSectionProps {
    onCourseClick: (courseId: string) => void;
}

export function HeroSection({ onCourseClick }: HeroSectionProps) {
    const heroRef = useRef<HTMLElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [slideProgress, setSlideProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    
    // Use cached celebrity courses
    const { data: celebrityCourses, isLoading } = useHeroCourses();

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Create subtle parallax effect - move background image slower than scroll
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Create slides when celebrity courses data is available
    useEffect(() => {
        if (celebrityCourses && celebrityCourses.length > 0) {
            console.log(
                `✅ Loaded ${celebrityCourses.length} celebrity courses for hero slideshow (from cache)`
            );

            // Create slides array with default slide first, then celebrity courses
            const defaultSlide: HeroSlide = {
                id: "default",
                title: "WELCOME TO\nTHE ART OF LAW",
                subtitle: "Prepare to step into the arena",
                image: heroImage,
                showBadge: true,
            };

            const celebritySlides: HeroSlide[] = celebrityCourses.map(
                (course: Course) => ({
                    id: course.id,
                    title: course.title,
                    subtitle: course.instructor,
                    image: course.image_link || heroImage, // Fallback to default hero image
                    showBadge: false,
                    course: course, // Store full course data
                })
            );

            setSlides([defaultSlide, ...celebritySlides]);
        } else if (!isLoading) {
            // Set default slide only if no courses and not loading
            setSlides([
                {
                    id: "default",
                    title: "WELCOME TO\nTHE ART OF LAW",
                    subtitle: "Prepare to step into the arena",
                    image: heroImage,
                    showBadge: true,
                },
            ]);
        }
    }, [celebrityCourses, isLoading]);

    // Auto-advance slideshow with variable timing and progress indicator
    useEffect(() => {
        if (slides.length <= 1 || isPaused) return;

        const getSlideTimeout = () => {
            // First slide stays longer (10 seconds), others are 6 seconds
            return currentSlide === 0 ? 10000 : 6000;
        };

        const slideDuration = getSlideTimeout();
        setSlideProgress(0);

        // Progress indicator animation
        const progressInterval = setInterval(() => {
            setSlideProgress((prev) => {
                const increment = 100 / (slideDuration / 100);
                return Math.min(prev + increment, 100);
            });
        }, 100);

        // Slide change timeout
        const timeout = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, slideDuration);

        return () => {
            clearTimeout(timeout);
            clearInterval(progressInterval);
        };
    }, [slides.length, currentSlide, isPaused]);

    // Handle play button click
    const handlePlayClick = () => {
        const currentSlideData = slides[currentSlide];
        if (currentSlideData.course) {
            // If it's a celebrity course slide, open the course overlay
            onCourseClick(currentSlideData.course.id);
        } else {
            // If it's the default slide, open with default content (could be a special course or default behavior)
            // For now, we'll use a default course ID or handle the default case
            console.log("Opening default hero course overlay");
        }
    };

    if (isLoading || slides.length === 0) {
        return (
            <section className="relative h-[67vh] md:h-[67vh] w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Distinguished lawyer in library"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="absolute inset-0 bg-black/50 z-5"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-aow-gold/20 border-t-aow-gold rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    const currentSlideData = slides[currentSlide];

    return (
        <section
            ref={heroRef}
            className="relative h-[67vh] md:h-[67vh] w-full overflow-hidden"
        >
            {/* Background Image Slideshow with Parallax - z-0 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0 z-0"
                    style={{ y, scale }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <ImageWithFallback
                        src={currentSlideData.image}
                        alt={currentSlideData.title}
                        className="w-full h-full object-cover object-center"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Bottom Gradient Overlay Only - z-5 (between photo z-0 and content z-10) */}
            <div className="absolute inset-0 z-5 pointer-events-none">
                {/* Desktop: Bottom fade only for seamless mesh with #0b0b0b background */}
                <div
                    className="hidden md:block absolute inset-x-0 bottom-0 h-96"
                    style={{
                        background: `linear-gradient(
              0deg, 
              var(--aow-black) 0%,
              var(--aow-black) 5%,
              rgba(11, 11, 11, 0.95) 15%,
              rgba(11, 11, 11, 0.85) 25%,
              rgba(11, 11, 11, 0.7) 40%,
              rgba(11, 11, 11, 0.5) 55%,
              rgba(11, 11, 11, 0.3) 70%,
              rgba(11, 11, 11, 0.15) 85%,
              transparent 100%
            )`,
                    }}
                />

                {/* Mobile: Bottom fade only */}
                <div
                    className="md:hidden absolute inset-x-0 bottom-0 h-72"
                    style={{
                        background: `linear-gradient(
              0deg, 
              var(--aow-black) 0%,
              var(--aow-black) 8%,
              rgba(11, 11, 11, 0.9) 20%,
              rgba(11, 11, 11, 0.75) 35%,
              rgba(11, 11, 11, 0.55) 50%,
              rgba(11, 11, 11, 0.35) 65%,
              rgba(11, 11, 11, 0.2) 80%,
              transparent 100%
            )`,
                    }}
                />
            </div>

            {/* Navigation Arrows - Hidden as requested */}

            {/* Progress Bar Only - z-15 */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-15">
                    {/* Progress Bar for Current Slide */}
                    <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-aow-gold rounded-full"
                            style={{ width: `${slideProgress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                        />
                    </div>
                </div>
            )}

            {/* Content - z-10 */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Title and Subtitle Content */}
                <div className="flex-1 flex items-end pb-20 md:pb-16">
                    <div className="w-full">
                        <div className="max-w-5xl mx-auto md:mx-0 md:max-w-4xl text-center md:text-left md:pl-8 lg:pl-12 xl:pl-16">
                            {/* Golden Wreath Rating Badge - Only show on default slide WITHOUT animation for first slide */}
                            {currentSlideData.showBadge &&
                                currentSlide !== 0 && (
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`badge-${currentSlide}`}
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                scale: 0.9,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -20,
                                                scale: 0.9,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                                ease: "easeOut",
                                            }}
                                            className="flex items-center justify-center md:justify-start mb-6 md:mb-8"
                                        >
                                            <div className="h-[41px] w-auto">
                                                <GoldenWreath />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                )}

                            {/* First slide badge WITHOUT animation */}
                            {currentSlideData.showBadge &&
                                currentSlide === 0 && (
                                    <div className="flex items-center justify-center md:justify-start mb-6 md:mb-8">
                                        <div className="h-[41px] w-auto">
                                            <GoldenWreath />
                                        </div>
                                    </div>
                                )}

                            {/* Main Heading */}
                            {currentSlide === 0 ? (
                                <div className="mb-4 md:mb-6">
                                    <h1
                                        className="text-white mb-4 font-['Alacrity_Sans_Regular',_sans-serif] leading-[122.8%]"
                                        style={{
                                            textShadow:
                                                "0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.4)",
                                        }}
                                    >
                                        {currentSlideData.title
                                            .split("\n")
                                            .map((line, index) => (
                                                <span
                                                    key={index}
                                                    className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight lg:whitespace-nowrap"
                                                >
                                                    {line}
                                                </span>
                                            ))}
                                    </h1>
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSlide}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.4,
                                        }}
                                        className="mb-4 md:mb-6"
                                    >
                                        <h1
                                            className="text-white mb-4 font-['Alacrity_Sans',_sans-serif] leading-[122.8%]"
                                            style={{
                                                textShadow:
                                                    "0 1px 3px rgba(0, 0, 0, 0.6)",
                                            }}
                                        >
                                            {currentSlideData.title
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span
                                                        key={index}
                                                        className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight"
                                                    >
                                                        {line}
                                                    </span>
                                                ))}
                                        </h1>
                                    </motion.div>
                                </AnimatePresence>
                            )}

                            {/* Subtitle */}
                            {currentSlide === 0 ? (
                                <p className="text-white/75 text-lg md:text-xl lg:text-2xl text-shadow max-w-md mx-auto md:mx-0">
                                    {currentSlideData.subtitle}
                                </p>
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={`${currentSlide}-subtitle`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.6,
                                        }}
                                        className="text-white/75 text-lg md:text-xl lg:text-2xl text-shadow max-w-md mx-auto md:mx-0"
                                    >
                                        {currentSlideData.subtitle}
                                    </motion.p>
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </div>

                {/* Play Button - Fixed Position Bottom Right */}
                <div className="pb-12 md:pb-0">
                    {/* Mobile: Centered */}
                    <div className="md:hidden flex justify-center">
                        <motion.div
                            onClick={handlePlayClick}
                            className="bg-white box-border content-stretch flex flex-row gap-2 items-center justify-center overflow-clip px-8 py-2.5 relative rounded-3xl shrink-0 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="h-[13px] relative shrink-0 w-[11px]">
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
                            <div className="font-['Manrope',_sans-serif] font-bold leading-[0] relative shrink-0 text-aow-black text-[13px] text-left text-nowrap">
                                <p className="block leading-none whitespace-pre">
                                    Play Now
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Desktop: Fixed Bottom Right */}
                    <div className="hidden md:block absolute bottom-8 right-8 lg:bottom-12 lg:right-12">
                        <motion.div
                            onClick={handlePlayClick}
                            className="bg-white box-border content-stretch flex flex-row gap-2 items-center justify-center overflow-clip px-[47px] py-3 relative rounded-3xl shrink-0 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="h-[15px] relative shrink-0 w-[13px]">
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
                            <div className="font-['Manrope',_sans-serif] font-bold leading-[0] relative shrink-0 text-aow-black text-[14px] text-left text-nowrap">
                                <p className="block leading-none whitespace-pre">
                                    Play Now
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
