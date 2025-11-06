import { AppBar, ScreenWrapper } from "@/components/common";
import CategoryBar from "@/components/common/CategoryBar";
import MovieCard from "@/components/MovieCard/movieCard";
import SearchBar from "@/components/SearchBar";
import { WHITE } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text } from "react-native";

function SearchScreen() {
  const [query, setQuery] = React.useState("");
  return (
    <ScreenWrapper>
      <AppBar title="Search" />
      <SearchBar value={query} onChangeText={setQuery} />
      <CategoryBar />
      <Text style={styles.search}>Search results {"(3)"}</Text>
      <MovieCard />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  cardImageWrapper: {
    position: "relative",
    flex: 2,
  },
  search: {
    fontSize: 18,
    marginTop: 10,
    color: WHITE,
  },
});

export default SearchScreen;
