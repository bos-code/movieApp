const TMDB_TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN;

export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type TMDBParams = Record<string, string | number | boolean | undefined>;

export const imageUrl = (
  path: string | null | undefined,
  size: "w185" | "w342" | "w500" | "w780" | "original" = "w500"
) => (path ? `${IMAGE_BASE}/${size}${path}` : undefined);

export const tmdbFetch = async <T = unknown>(
  endpoint: string,
  params: TMDBParams = {}
): Promise<T> => {
  if (!TMDB_TOKEN) {
    throw new Error("Missing EXPO_PUBLIC_TMDB_TOKEN (see .env.example)");
  }

  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!res.ok) throw new Error(`TMDB ${res.status}: ${endpoint}`);
  return res.json() as Promise<T>;
};
