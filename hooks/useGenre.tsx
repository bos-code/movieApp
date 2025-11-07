// useAllGenres.ts
import { useQuery } from "@tanstack/react-query";

const TMDB_API_KEY = "465c8a03a49665a1678b47c4e4a653af"; // your v3 key (keep this secret in env in prod)

async function fetchGenresFromTMDB(type: "movie" | "tv") {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/${type}/list?api_key=${TMDB_API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch genres");
  const json = await res.json();
  return json.genres; // array of { id, name }
}

export function useAllGenres() {
  return useQuery({
    queryKey: ["all-genres"],
    queryFn: async () => {
      // fetch both movie and tv genre lists in parallel
      const [movieGenres, tvGenres] = await Promise.all([
        fetchGenresFromTMDB("movie"),
        fetchGenresFromTMDB("tv"),
      ]);

      const merged = [...movieGenres, ...tvGenres];

      const map: Record<number, string> = {};
      for (const g of merged) {
        // prefer movie name mapping if duplicate ids exist — but both should be same id->name
        map[g.id] = g.name;
      }
      return map;
    },
    staleTime: Infinity, // cache forever for app session
    cacheTime: Infinity,
  });
}
