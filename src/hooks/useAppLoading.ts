import { useMemo } from 'react';
import {
  useHeroCourses,
  useRecommendedCourses,
  useContinueWatchingCourses,
  useMyListCourses,
  useLearningTracksCourses,
  useAIWeb3Courses,
  useBeABossCourses,
  useTrueCrimeCourses,
  useEthicalAttorneyCourses,
  useWellnessCourses,
} from './useCourses';

export const useAppLoading = () => {
  // Track all the main queries that need to load for the homepage
  const heroCourses = useHeroCourses();
  const recommendedCourses = useRecommendedCourses();
  const continueWatchingCourses = useContinueWatchingCourses();
  const myListCourses = useMyListCourses();
  const learningTracksCourses = useLearningTracksCourses();
  const aiWeb3Courses = useAIWeb3Courses();
  const beABossCourses = useBeABossCourses();
  const trueCrimeCourses = useTrueCrimeCourses();
  const ethicalAttorneyCourses = useEthicalAttorneyCourses();
  const wellnessCourses = useWellnessCourses();

  const queries = [
    heroCourses,
    recommendedCourses,
    continueWatchingCourses,
    myListCourses,
    learningTracksCourses,
    aiWeb3Courses,
    beABossCourses,
    trueCrimeCourses,
    ethicalAttorneyCourses,
    wellnessCourses,
  ];

  return useMemo(() => {
    const totalQueries = queries.length;
    const loadedQueries = queries.filter(query => !query.isLoading && (query.data || query.error)).length;
    const failedQueries = queries.filter(query => query.error).length;
    
    // More sophisticated progress calculation
    const baseProgress = (loadedQueries / totalQueries) * 85; // Data loading gets us to 85%
    const finalProgress = Math.min(baseProgress + 15, 100); // Reserve 15% for final setup
    
    const isLoading = queries.some(query => query.isLoading);
    const hasErrors = failedQueries > 0;
    
    // App is ready when ALL critical queries are done (not just 80%)
    const criticalQueries = [heroCourses, recommendedCourses]; // Most important for initial load
    const criticalLoaded = criticalQueries.every(query => !query.isLoading && (query.data || query.error));
    const allQueriesSettled = !isLoading; // All queries finished (success or error)
    
    const isReady = criticalLoaded && allQueriesSettled;

    return {
      isLoading,
      isReady,
      progress: isReady ? 100 : finalProgress,
      hasErrors,
      failedQueries,
      loadedQueries,
      totalQueries,
    };
  }, [queries, heroCourses, recommendedCourses]);
};