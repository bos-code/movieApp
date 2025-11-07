import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { tmdbFetch } from "@/lib/TMBD";

type TMDBParams = Record<string, string | number | boolean | undefined>;

export function useTMDB<TData = any>(
  endpoint: string,
  params?: TMDBParams,
  options?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">
) {
  return useQuery<TData, Error>({
    queryKey: params
      ? ["tmdb", endpoint, ...Object.entries(params)]
      : ["tmdb", endpoint],
    queryFn: () => tmdbFetch(endpoint, params),
    staleTime: 1000 * 60 * 2, // 2 mins default cache = good for TMDB so u don't spam API
    ...options,
  });
}
