const TMDB_V4_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjVjOGEwM2E0OTY2NWExNjc4YjQ3YzRlNGE2NTNhZiIsIm5iZiI6MTczNTc1MDQ0MC4wMSwic3ViIjoiNjc3NTczMjgxOTRiNTgxNmQ3NjEzYjAzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rrD9n7tnIMUfuxs3Wh1wWMqzB3dSr4Ds4uiqCeapjTE";

export const tmdbFetch = async (endpoint: string, params = {}) => {
  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, String(value))
  );

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_V4_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("TMDB fetch failed");
  return res.json();
};
