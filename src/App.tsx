import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Sidebar } from "../components/Sidebar";
import { HeroSection } from "../components/HeroSection";
import { CourseLibrary } from "../components/CourseLibrary";
import { CLETracker } from "../components/CLETracker";
import { PracticeArena } from "../components/PracticeArena";
import { MyCourses } from "../components/MyCourses";
import { LearningTracks } from "../components/LearningTracks";
import { CourseOverlay } from "../components/CourseOverlay";
import { Course } from "../data/courses";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [currentCategory, setCurrentCategory] = useState("new-for-you");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Global Course Overlay State
    const [showCourseOverlay, setShowCourseOverlay] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [allCourses, setAllCourses] = useState<Course[]>([]);

    // Fetch all courses for overlay functionality
    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await fetch(
                    `https://${projectId}.supabase.co/functions/v1/make-server-9180a2e7/courses/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${publicAnonKey}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();

                if (data.success && data.courses) {
                    setAllCourses(data.courses);
                }
            } catch (error) {
                console.error("Error fetching all courses:", error);
            }
        };

        fetchAllCourses();
    }, []);

    // Course overlay handler - Only for HeroSection slideshow
    const handleCourseClick = (courseId: string) => {
        const course = allCourses.find((c) => c.id === courseId);
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
            case "practice-arena":
                return <PracticeArena />;
            default:
                return (
                    <>
                        <HeroSection onCourseClick={handleCourseClick} />
                        <CourseLibrary />
                    </>
                );
        }
    };

    // Calculate main content margin - sidebar now permanent on all pages
    const getMainContentMargin = () => {
        return "lg:ml-60 md:ml-16"; // Desktop: 240px (60 = 15rem), Tablet: 64px (16 = 4rem), Mobile: 0
    };

    return (
        <div className="min-h-screen bg-aow-black text-white">
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
