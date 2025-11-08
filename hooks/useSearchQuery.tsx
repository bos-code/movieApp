import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// debounce hook so we don't fire fetch every key press immediately
function useDebounce(value: string, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export function useSearchMovies(query: string) {
  const debouncedQuery = useDebounce(query);

  return useQuery({
    queryKey: ["search-movies", debouncedQuery],
    enabled: debouncedQuery.length > 0, // don't run when empty
    queryFn: async () => {
      const API_KEY = process.env.EXPO_PUBLIC_TMDB_KEY; // you already have this format
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}`
      );
      return res.json();
    },
  });
}
