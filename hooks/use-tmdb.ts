import { tmdbFetch, TMDBParams } from "@/lib/tmdb";
import { Genre, MediaDetails, MediaSummary, MediaType, Paginated } from "@/types/tmdb";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useTMDB<TData = unknown>(
  endpoint: string,
  params?: TMDBParams,
  options?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">
) {
  return useQuery<TData, Error>({
    queryKey: ["tmdb", endpoint, params ?? {}],
    queryFn: () => tmdbFetch<TData>(endpoint, params),
    staleTime: 1000 * 60 * 2,
    ...options,
  });
}

/** Results array of a paginated list endpoint ([] while loading/errored). */
export function useTMDBList(
  endpoint: string,
  params?: TMDBParams,
  options?: { enabled?: boolean }
) {
  const query = useTMDB<Paginated<MediaSummary>>(endpoint, params, options);
  return { ...query, results: query.data?.results ?? [] };
}

export function useDetails(type: MediaType, id: number) {
  return useTMDB<MediaDetails>(
    `${type}/${id}`,
    { append_to_response: "videos,credits,watch/providers,recommendations" },
    { enabled: Number.isFinite(id) }
  );
}

/** id -> name map across movie + tv genres. */
export function useAllGenres() {
  return useQuery({
    queryKey: ["all-genres"],
    queryFn: async () => {
      const [movie, tv] = await Promise.all(
        (["movie", "tv"] as const).map((t) =>
          tmdbFetch<{ genres: Genre[] }>(`genre/${t}/list`, { language: "en-US" })
        )
      );
      const map: Record<number, string> = {};
      for (const g of [...movie.genres, ...tv.genres]) map[g.id] = g.name;
      return map;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export function useSearchMovies(query: string) {
  const debounced = useDebounce(query.trim());
  const search = useTMDB<Paginated<MediaSummary>>(
    "search/movie",
    { query: debounced },
    { enabled: debounced.length > 0 }
  );
  return { ...search, debounced };
}
