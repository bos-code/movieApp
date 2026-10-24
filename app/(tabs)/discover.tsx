import { AppBar } from "@/components/common";
import CategoryBar from "@/components/common/CategoryBar";
import { ScreenWrapper3 } from "@/components/common/ScreenWrapper";
import ImageCard from "@/components/MovieCard/ImageCard";
import { TEXT_GRAY } from "@/constants/colors";
import { useOpenDetails } from "@/hooks/use-open-details";
import { tmdbFetch } from "@/lib/tmdb";
import { MediaSummary, Paginated } from "@/types/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function DiscoverScreen() {
  const [genre, setGenre] = React.useState<number | undefined>();
  const { onOpenDetails } = useOpenDetails();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["discover", genre],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        tmdbFetch<Paginated<MediaSummary>>("discover/movie", {
          page: pageParam,
          with_genres: genre,
          sort_by: "popularity.desc",
        }),
      getNextPageParam: (last) =>
        last.page < last.total_pages ? last.page + 1 : undefined,
    });

  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <ScreenWrapper3>
      <FlatList
        data={movies}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <ImageCard
            movie={item}
            onPress={() => onOpenDetails(item.id)}
          />
        )}
        ListHeaderComponent={
          <>
            <AppBar title="Discover" />
            <CategoryBar active={genre} onChange={setGenre} />
            <View style={{ height: 30 }} />
          </>
        }
        ListEmptyComponent={
          error ? (
            <Text style={{ color: TEXT_GRAY, textAlign: "center" }}>
              Couldn&apos;t load movies.
            </Text>
          ) : null
        }
      />
    </ScreenWrapper3>
  );
}
