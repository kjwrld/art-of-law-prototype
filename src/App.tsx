import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { Sidebar } from "../components/Sidebar";
import { HeroSection } from "../components/HeroSection";
import { CourseLibrary } from "../components/CourseLibrary";
import { CLETracker } from "../components/CLETracker";
import { PracticeArea } from "../components/PracticeArea";
import { MyCourses } from "../components/MyCourses";
import { LearningTracks } from "../components/LearningTracks";
import { CourseOverlay } from "../components/CourseOverlay";
import { LoadingScreen } from "../components/LoadingScreen";
import { NotFoundPage } from "../components/NotFoundPage";
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
    
    // Show loading screen only on first app load
    const showLoadingScreen = !hasShownInitialLoading && (isLoading || !isReady);
    
    // Mark initial loading as complete when ready
    useEffect(() => {
        if (isReady && !hasShownInitialLoading) {
            const timer = setTimeout(() => {
                setHasShownInitialLoading(true);
            }, 1000); // Small delay to show 100% completion
            return () => clearTimeout(timer);
        }
    }, [isReady, hasShownInitialLoading]);

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
                        <HeroSection onCourseClick={handleCourseClick} />
                        <CourseLibrary />
                    </>
                );
            case "my-courses":
                return <MyCourses onNavigate={setCurrentPage} />;
            case "learning-tracks":
                return <LearningTracks />;
            case "cle-tracker":
                return <CLETracker />;
            case "practice-area":
                return <PracticeArea />;
            default:
                // Show 404 for any invalid routes
                return <NotFoundPage onNavigateHome={() => setCurrentPage("home")} />;
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
