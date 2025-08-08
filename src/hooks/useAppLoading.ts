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
    const progress = (loadedQueries / totalQueries) * 100;
    
    const isLoading = queries.some(query => query.isLoading);
    const hasErrors = failedQueries > 0;
    
    // Consider app "ready" when at least 80% of queries are done (some might fail)
    const isReady = progress >= 80 && !isLoading;

    return {
      isLoading,
      isReady,
      progress,
      hasErrors,
      failedQueries,
      loadedQueries,
      totalQueries,
    };
  }, [queries]);
};