import { AppBar, ScreenWrapper } from "@/components/common";
import MovieCard from "@/components/MovieCard/movieCard";
import { TEXT_GRAY } from "@/constants/colors";
import { useBookmarks } from "@/stores/bookmarks";
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

function Bookmarks() {
  const items = useBookmarks((s) => s.items);
  const list = Object.values(items).reverse();

  return (
    <ScreenWrapper>
      <AppBar title="Bookmarks" />
      <FlatList
        data={list}
        keyExtractor={(item) => `${item.media_type}:${item.id}`}
        renderItem={({ item }) => (
          <MovieCard movie={item} type={item.media_type} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nothing saved yet. Tap the bookmark on any title to add it here.
          </Text>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  empty: { color: TEXT_GRAY, marginTop: 40, textAlign: "center" },
});

export default Bookmarks;
