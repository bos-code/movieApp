import { WHITE, blurhash } from "@/constants/colors";
import useExtraData from "@/hooks/TS";
import { useTMDB } from "@/hooks/useFetchMovieDate";
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
  const result = useExtraData("movie/now_playing");

  // const { data, isLoading } = useTMDB("movie/now_playing");
  const { data, isLoading } = useTMDB("tv/airing_today");

  if (isLoading) {
    return (
      <View style={{ ...styles.loadingWrap, ...styles.imageWrap }}>
        <ActivityIndicator />
      </View>
    );
  }
  const res = data?.results ?? [];

  const movies = [...res, ...result];

  const renderItem = ({ item: movie }) => {
    const imageUrl = movie?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : "https://via.placeholder.com/500x281?text=No+Image";

    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          console.log("movie pressed => ", movie.id, movie.title);
        }}
      >
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={imageUrl}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <View style={styles.bookmarkContainer}>
            <Bookmark />
          </View>
        </View>

        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={2}>
            {movie?.title ?? movie?.name ?? "Untitled"}
          </Text>

          <RatingComponent
            size={18}
            textSize={14}
            rating={(movie?.vote_average ?? 0) / 2}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={movies}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     gap: 15,
//     marginTop: 20,
//   },

//   image: {
//     width: 300,
//     height: 200,
//     borderRadius: 15,
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: WHITE,
//   },

//   rating: {
//     flex: 1,
//     alignItems: "flex-start",
//     flexDirection: "row",
//     gap: 10,
//   },
// });
