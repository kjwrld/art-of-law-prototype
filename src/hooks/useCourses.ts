import { useQuery } from '@tanstack/react-query';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Course } from '../../data/courses';

// Base fetch function for courses
const fetchCourses = async (selection: string): Promise<Course[]> => {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-9180a2e7/courses/selection/${selection}`,
    {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      }
    }
  );
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch courses');
  }
  
  return data.courses || [];
};

// Hook for fetching courses by category
export const useCourses = (selection: string) => {
  return useQuery({
    queryKey: ['courses', selection],
    queryFn: () => fetchCourses(selection),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Specific hooks for different course categories
export const useHeroCourses = () => useCourses('Celebrity');
export const useRecommendedCourses = () => useCourses('Recommended');
export const useContinueWatchingCourses = () => useCourses('Continue');
export const useMyListCourses = () => useCourses('my_list');
export const useLearningTracksCourses = () => useCourses('learning_tracks');
export const useAIWeb3Courses = () => useCourses('ai_web3');
export const useBeABossCourses = () => useCourses('be_a_boss');
export const useTrueCrimeCourses = () => useCourses('true_crime');
export const useEthicalAttorneyCourses = () => useCourses('ethical_attorney');
export const useWellnessCourses = () => useCourses('wellness');
export const useGeneralCourses = () => useCourses('general');

// Hook for fetching all courses at once (for App.tsx)
export const useAllCourses = () => useCourses('all');