import { AppBar, ScreenWrapper } from "@/components/common";
import CategoryBar from "@/components/common/CategoryBar";
import MovieCard from "@/components/MovieCard/movieCard";
import SearchBar from "@/components/SearchBar";
import { WHITE } from "@/constants/colors";
import { useSearchMovies } from "@/hooks/useSearchQuery";
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

function SearchScreen() {
  const [query, setQuery] = React.useState("");

  const { data, isLoading } = useSearchMovies(query);

  return (
    <ScreenWrapper>
      <AppBar title="Search" />
      <SearchBar value={query} onChangeText={setQuery} />
      <CategoryBar />

      <Text style={styles.search}>
        Search results ({data?.results?.length ?? 0})
      </Text>

      <FlatList
        data={data?.results ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  search: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    color: WHITE,
  },
});

export default SearchScreen;
