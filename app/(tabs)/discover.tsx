import ImageCard from "@/components/MovieCard/ImageCard";
import { AppBar } from "@/components/common";
import CategoryBar from "@/components/common/CategoryBar";
import { ScreenWrapper3 } from "@/components/common/ScreenWrapper";
import React from "react";
import { FlatList, View } from "react-native";

export default function DiscoverScreen() {
  const dummyMovies = [
    {
      id: 1,
      poster: "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    },
    {
      id: 2,
      poster: "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    },
    {
      id: 3,
      poster: "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    },
    {
      id: 4,
      poster: "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    },
    {
      id: 5,
      poster: "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    },
  ];

  return (
    <ScreenWrapper3>
      <FlatList
        data={dummyMovies}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <ImageCard poster={item.poster} onPress={() => {}} />
        )}
        ListHeaderComponent={
          <>
            <AppBar title="Discover" />
            <CategoryBar />
            <View style={{ height: 30 }} />
          </>
        }
      />
    </ScreenWrapper3>
  );
}
