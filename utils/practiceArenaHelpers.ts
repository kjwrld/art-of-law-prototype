import { Course } from "../data/courses";
import { FOCUS_MAP } from "../constants/practiceArena";
import { projectId, publicAnonKey } from './supabase/info';

export const fetchCoursesByFocus = async (): Promise<Course[]> => {
  const allCourses: Course[] = [];
  
  // Fetch courses for each focus category
  for (const [category, focusValue] of Object.entries(FOCUS_MAP)) {
    try {
      console.log(`🎯 Fetching courses for focus: ${focusValue} (${category})`);
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-9180a2e7/courses?focus=${focusValue}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      
      console.log(`📊 Response for ${category}:`, { success: data.success, courseCount: data.courses?.length || 0 });
      
      if (data.success && data.courses) {
        // Add category and focus info to each course
        const coursesWithMeta = data.courses.map((course: Course) => ({
          ...course,
          category: category,
          focusArea: focusValue
        }));
        allCourses.push(...coursesWithMeta);
        console.log(`✅ Added ${coursesWithMeta.length} courses for ${category}`);
      } else {
        console.warn(`⚠️ No courses found for ${category} (focus: ${focusValue})`);
      }
    } catch (error) {
      console.error(`❌ Error fetching ${category} courses:`, error);
    }
  }

  console.log(`🎯 Practice Arena: Total courses loaded: ${allCourses.length}`);
  console.log('📋 Focus distribution:', allCourses.reduce((acc: any, course: any) => {
    acc[course.focusArea] = (acc[course.focusArea] || 0) + 1;
    return acc;
  }, {}));
  
  return allCourses;
};

export const formatCourseForUI = (course: Course) => ({
  id: course.id,
  title: course.title,
  instructor: course.instructor,
  description: course.description || "Comprehensive legal training course",
  category: (course as any).category || "General Practice",
  focusArea: (course as any).focusArea || "general",
  credits: course.credits?.toString() || "1.0",
  duration: "3h 30m", // Default duration
  modules: course.modules?.toString() || "6",
  skillLevel: "Intermediate", // Default skill level
  image_link: course.image_link,
  thumbnail: course.thumbnail
});

export const filterCoursesByFocus = (courses: any[], activeTabs: string[]) => {
  const selectedFocusAreas = activeTabs.map(tab => FOCUS_MAP[tab as keyof typeof FOCUS_MAP]).filter(Boolean);
  
  // Only get courses that have valid focus areas and match the selected ones
  const filteredCourses = courses.filter(course => {
    // Only include courses that have a valid focusArea and it's in our selected areas
    return course.focusArea && 
           course.focusArea.trim() !== '' && 
           selectedFocusAreas.includes(course.focusArea);
  });

  console.log('🎯 Practice Arena Filter Debug:', {
    activeTabs,
    selectedFocusAreas,
    totalCoursesFromDB: courses.length,
    coursesWithValidFocus: courses.filter(c => c.focusArea && c.focusArea.trim() !== '').length,
    filteredCourses: filteredCourses.length,
    focusDistribution: courses.reduce((acc: any, course: any) => {
      const focus = course.focusArea || 'null/empty';
      acc[focus] = (acc[focus] || 0) + 1;
      return acc;
    }, {})
  });

  return { filteredCourses, selectedFocusAreas };
};