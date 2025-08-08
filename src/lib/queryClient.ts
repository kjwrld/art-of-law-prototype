import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 10 minutes
      staleTime: 1000 * 60 * 10,
      // Keep in cache for 30 minutes
      gcTime: 1000 * 60 * 30,
      // Retry failed requests
      retry: 2,
      // Don't refetch on window focus for better UX
      refetchOnWindowFocus: false,
    },
  },
});