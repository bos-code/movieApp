import { WHITE, blurhash } from "@/constants/colors";
import { useOpenDetails } from "@/hooks/use-open-details";
import { useTMDBList } from "@/hooks/use-tmdb";
import { imageUrl } from "@/lib/tmdb";
import { MediaSummary, mediaTitle } from "@/types/tmdb";
import { Image } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

export default function Top() {
  const { onOpenDetails } = useOpenDetails();
  const { results: movies, isLoading } = useTMDBList("trending/movie/week");

  if (isLoading) {
    return (
      <View style={{ ...styles.loadingWrap, ...styles.imageWrap }}>
        <ActivityIndicator />
      </View>
    );
  }

  const renderItem = ({ item: movie }: { item: MediaSummary }) => (
    <Pressable style={styles.card} onPress={() => onOpenDetails(movie.id)}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={imageUrl(movie.backdrop_path)}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.bookmarkContainer}>
          <Bookmark item={movie} />
        </View>
      </View>

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>
          {mediaTitle(movie)}
        </Text>
        <RatingComponent
          size={18}
          textSize={14}
          rating={(movie.vote_average ?? 0) / 2}
        />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={movies.slice(0, 10)}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ width: 22 }} />} // <--- more spacing
        initialNumToRender={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },

  listContent: {
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },

  card: {
    width: 300,
    // don't use flex: 1 here — horizontal card should have fixed width
  },

  imageWrap: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    overflow: "hidden", // important so borderRadius clips Image
    backgroundColor: "#111",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  bookmarkContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },

  meta: {
    marginTop: 10,
    paddingRight: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: WHITE,
  },

  loadingWrap: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
