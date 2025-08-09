import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { Sidebar } from "../components/Sidebar";
import { HeroSection } from "../components/HeroSection";
import { CourseLibrary } from "../components/CourseLibrary";
import { CourseOverlay } from "../components/CourseOverlay";
import { LoadingScreen } from "../components/LoadingScreen";

// Lazy load heavy components
const CLETracker = lazy(() => import("../components/CLETracker").then(module => ({ default: module.CLETracker })));
const PracticeArea = lazy(() => import("../components/PracticeArea").then(module => ({ default: module.PracticeArea })));
const MyCourses = lazy(() => import("../components/MyCourses").then(module => ({ default: module.MyCourses })));
const LearningTracks = lazy(() => import("../components/LearningTracks").then(module => ({ default: module.LearningTracks })));
const NotFoundPage = lazy(() => import("../components/NotFoundPage").then(module => ({ default: module.NotFoundPage })));
import { Course } from "../data/courses";
import { useAllCourses } from "./hooks/useCourses";
import { useAppLoading } from "./hooks/useAppLoading";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [currentCategory, setCurrentCategory] = useState("new-for-you");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [hasShownInitialLoading, setHasShownInitialLoading] = useState(false);

    // Global Course Overlay State
    const [showCourseOverlay, setShowCourseOverlay] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    
    // Use cached all courses for overlay functionality
    const { data: allCourses } = useAllCourses();
    
    // Track overall app loading state
    const { isLoading, isReady, progress } = useAppLoading();
    
    // Show loading screen on first app load - default to true until explicitly ready
    const showLoadingScreen = !hasShownInitialLoading;
    
    // Mark initial loading as complete when ready
    useEffect(() => {
        if (isReady && !hasShownInitialLoading) {
            const timer = setTimeout(() => {
                setHasShownInitialLoading(true);
            }, 1000); // Small delay to show 100% completion
            return () => clearTimeout(timer);
        }
    }, [isReady, hasShownInitialLoading]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    // Course overlay handler - Only for HeroSection slideshow
    const handleCourseClick = (courseId: string) => {
        const course = allCourses?.find((c) => c.id === courseId);
        if (course) {
            setSelectedCourse(course);
            setShowCourseOverlay(true);
        }
    };

    // Close overlay handler
    const handleCloseOverlay = () => {
        setShowCourseOverlay(false);
        setSelectedCourse(null);
    };

    // Format credits with decimal
    const formatCredits = (credits: string | number) => {
        const num = parseFloat(credits.toString());
        return num % 1 === 0 ? `${num}.0` : num.toString();
    };

    const renderPage = () => {
        const validPages = ["home", "my-courses", "learning-tracks", "cle-tracker", "practice-area"];
        
        switch (currentPage) {
            case "home":
                return (
                    <>
                        <HeroSection onCourseClick={handleCourseClick} isAppLoading={!isReady} />
                        <CourseLibrary />
                    </>
                );
            case "my-courses":
                return (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-2 border-aow-gold/20 border-t-aow-gold rounded-full animate-spin"></div></div>}>
                        <MyCourses onNavigate={setCurrentPage} />
                    </Suspense>
                );
            case "learning-tracks":
                return (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-2 border-aow-gold/20 border-t-aow-gold rounded-full animate-spin"></div></div>}>
                        <LearningTracks />
                    </Suspense>
                );
            case "cle-tracker":
                return (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-2 border-aow-gold/20 border-t-aow-gold rounded-full animate-spin"></div></div>}>
                        <CLETracker />
                    </Suspense>
                );
            case "practice-area":
                return (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-2 border-aow-gold/20 border-t-aow-gold rounded-full animate-spin"></div></div>}>
                        <PracticeArea />
                    </Suspense>
                );
            default:
                // Show 404 for any invalid routes
                return (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-2 border-aow-gold/20 border-t-aow-gold rounded-full animate-spin"></div></div>}>
                        <NotFoundPage onNavigateHome={() => setCurrentPage("home")} />
                    </Suspense>
                );
        }
    };

    // Calculate main content margin - sidebar now permanent on all pages
    const getMainContentMargin = () => {
        return "lg:ml-60 md:ml-16"; // Desktop: 240px (60 = 15rem), Tablet: 64px (16 = 4rem), Mobile: 0
    };

    return (
        <div className="min-h-screen bg-aow-black text-white">
            {/* Show loading screen on first visit */}
            <AnimatePresence>
                {showLoadingScreen && (
                    <LoadingScreen progress={progress} />
                )}
            </AnimatePresence>

            <Navigation
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onMenuToggle={() => setIsMobileSidebarOpen(true)}
            />

            {/* Sidebar - Now permanent on all pages */}
            <Sidebar
                currentCategory={currentCategory}
                onCategoryChange={setCurrentCategory}
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
                onNavigate={setCurrentPage}
                currentPage={currentPage}
            />

            {/* Main Content - Always with sidebar margin, updated for taller nav */}
            <main className={`${getMainContentMargin()} pt-20`}>
                {renderPage()}
            </main>

            {/* Global Course Overlay */}
            <CourseOverlay
                isOpen={showCourseOverlay}
                onClose={handleCloseOverlay}
                course={selectedCourse || undefined}
                isDefault={false}
                formatCredits={formatCredits}
            />
        </div>
    );
}
