import { useState, useEffect, useMemo } from 'react';
import { Course } from '../../data/courses';
import { 
  useAllCourses, 
  useHeroCourses, 
  useRecommendedCourses, 
  useEthicalAttorneyCourses,
  useContinueWatchingCourses
} from './useCourses';

export const useBookmarks = () => {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const { data: allCourses } = useAllCourses();
  const { data: heroCourses } = useHeroCourses();
  const { data: recommendedCourses } = useRecommendedCourses();
  const { data: ethicalCourses } = useEthicalAttorneyCourses();
  const { data: continueWatchingCourses } = useContinueWatchingCourses();

  // Load bookmarks from localStorage and listen for changes
  useEffect(() => {
    const loadBookmarks = () => {
      const bookmarks = JSON.parse(localStorage.getItem('aow-bookmarks') || '[]');
      setBookmarkedIds(bookmarks);
    };

    // Load initial bookmarks
    loadBookmarks();

    // Listen for storage changes (when other components update bookmarks)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'aow-bookmarks') {
        loadBookmarks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-window updates
    const handleBookmarkChange = () => {
      loadBookmarks();
    };
    
    window.addEventListener('aow-bookmark-changed', handleBookmarkChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aow-bookmark-changed', handleBookmarkChange);
    };
  }, []);

  // Get full course objects from all possible sources
  const bookmarkedCourses = useMemo(() => {
    // Include the custom Theater course from CLE tracker
    const theaterCourse = {
      id: 'jarrett-theater',
      instructor: 'Ernest Jarrett',
      title: 'The Theater of the Courtroom',
      description: 'Master storytelling, voice, movement, and presence to command the courtroom like a stage.',
      modules: 7,
      credits: 2.0,
      credit_type: 'General',
      selection: 'Recommended',
      featured: true,
      new_tag: false,
      image_link: '/src/assets/course_img.png'
    } as Course;
    
    // Combine all course sources
    const combinedCourses = [
      ...(allCourses || []),
      ...(heroCourses || []),
      ...(recommendedCourses || []),
      ...(ethicalCourses || []),
      ...(continueWatchingCourses || []),
      theaterCourse // Add the custom CLE tracker course
    ];
    
    // Remove duplicates based on ID
    const uniqueCourses = combinedCourses.filter((course, index, array) => 
      array.findIndex(c => c.id === course.id) === index
    );
    
    // Filter for bookmarked courses
    return uniqueCourses.filter(course => 
      bookmarkedIds.includes(course.id || '')
    );
  }, [allCourses, heroCourses, recommendedCourses, ethicalCourses, continueWatchingCourses, bookmarkedIds]);


  // Add bookmark
  const addBookmark = (courseId: string) => {
    const updatedBookmarks = [...bookmarkedIds, courseId];
    setBookmarkedIds(updatedBookmarks);
    localStorage.setItem('aow-bookmarks', JSON.stringify(updatedBookmarks));
  };

  // Remove bookmark
  const removeBookmark = (courseId: string) => {
    const updatedBookmarks = bookmarkedIds.filter(id => id !== courseId);
    setBookmarkedIds(updatedBookmarks);
    localStorage.setItem('aow-bookmarks', JSON.stringify(updatedBookmarks));
  };

  // Toggle bookmark
  const toggleBookmark = (courseId: string) => {
    if (bookmarkedIds.includes(courseId)) {
      removeBookmark(courseId);
    } else {
      addBookmark(courseId);
    }
  };

  // Check if course is bookmarked
  const isBookmarked = (courseId: string) => {
    return bookmarkedIds.includes(courseId);
  };

  return {
    bookmarkedCourses,
    bookmarkedIds,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked
  };
};