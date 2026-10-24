import { AppBar, ScreenWrapper } from "@/components/common";
import MovieCard from "@/components/MovieCard/movieCard";
import SearchBar from "@/components/SearchBar";
import { TEXT_GRAY, WHITE } from "@/constants/colors";
import { useSearchMovies } from "@/hooks/use-tmdb";
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

function SearchScreen() {
  const [query, setQuery] = React.useState("");
  const { data, isLoading, error, debounced } = useSearchMovies(query);
  const results = data?.results ?? [];

  return (
    <ScreenWrapper>
      <AppBar title="Search" />
      <SearchBar value={query} onChangeText={setQuery} />

      {debounced ? (
        <Text style={styles.search}>Search results ({results.length})</Text>
      ) : null}

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.empty}>
            {error
              ? "Something went wrong. Try again."
              : !debounced
              ? "Type a movie title to search."
              : isLoading
              ? "Searching…"
              : "No results."}
          </Text>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  search: { fontSize: 18, marginVertical: 10, color: WHITE },
  empty: { color: TEXT_GRAY, marginTop: 40, textAlign: "center" },
});

export default SearchScreen;
