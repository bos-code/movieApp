import { useTMDBList } from "@/hooks/use-tmdb";
import { useBookmarks } from "@/stores/bookmarks";
import { mediaTitle } from "@/types/tmdb";
import React from "react";
import PosterRow from "./PosterRow";

/** "Because you saved X" row, seeded from the most recently bookmarked movie. */
export function BecauseYouSaved() {
  const seed = useBookmarks((s) => {
    const movies = Object.values(s.items).filter((i) => i.media_type === "movie");
    return movies[movies.length - 1];
  });
  const { results, isLoading } = useTMDBList(
    `movie/${seed?.id}/recommendations`,
    undefined,
    { enabled: !!seed }
  );
  if (!seed) return null;
  return (
    <PosterRow
      title={`Because you saved ${mediaTitle(seed)}`}
      items={results}
      loading={isLoading}
    />
  );
}

export function TopRated() {
  const { results, isLoading } = useTMDBList("movie/top_rated");
  return <PosterRow title="Top rated" items={results} loading={isLoading} />;
}

export function HiddenGems() {
  const { results, isLoading } = useTMDBList("discover/movie", {
    sort_by: "vote_average.desc",
    "vote_average.gte": 7.5,
    "vote_count.gte": 300,
    "vote_count.lte": 3000,
  });
  return <PosterRow title="Hidden gems" items={results} loading={isLoading} />;
}
