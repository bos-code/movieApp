import { APP_TINT, blurhash, TEXT_GRAY, WHITE } from "@/constants/colors";
import { useTMDB } from "@/hooks/useFetchMovieDate";
import { useAllGenres } from "@/hooks/useGenre"; // <-- ensure path matches where you saved the hook
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppBar } from "../common";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = Math.round(SCREEN_WIDTH * 0.92);
const CARD_SPACING = 20;
const IMAGE_RATIO = 0.48;
const IMAGE_WIDTH = Math.round(CARD_WIDTH * IMAGE_RATIO);
const IMAGE_HEIGHT = 260;

export default function Latest() {
  const router = useRouter();
  const { data, isLoading } = useTMDB("movie/upcoming");
  const { data: GENRES, isLoading: genresLoading } = useAllGenres();

  const movies = data?.results ?? [];
  const onSeeMorePress = () => router.push("/discover");

  // Combined loading: show loader while either movies or genres are loading
  if (isLoading || genresLoading) {
    return (
      <View style={[styles.container, styles.loadingWrap]}>
        <ActivityIndicator color={APP_TINT} />
      </View>
    );
  }

  const renderItem = ({ item: movie }) => {
    const imageUrl = movie?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : "./../../assets/images/react-logo@2x.png"; // local asset fallback (require)

    const title = movie?.title ?? movie?.name ?? "Untitled";
    const rating = movie?.vote_average ? movie.vote_average / 2 : 0;
    const description = movie?.overview ?? "No description available.";

    // safe mapping — if GENRES not ready, show empty string
    const genreText = GENRES
      ? (movie?.genre_ids ?? [])
          .map((id) => GENRES[id])
          .filter(Boolean)
          .slice(0, 3)
          .join(", ")
      : "";

    return (
      <View style={styles.card}>
        <View style={styles.cardImageWrapper}>
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

        <View style={styles.textbox}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <RatingComponent size={20} textSize={20} rating={rating} />

          <Text style={styles.genre}>{genreText}</Text>

          <Text style={styles.description} numberOfLines={5}>
            {description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <AppBar title="Latest" />

        <Pressable
          onPress={onSeeMorePress}
          style={({ pressed }) => [
            {
              borderBottomWidth: 2,
              borderColor: pressed ? APP_TINT : "transparent",
            },
          ]}
        >
          <Text style={styles.seeMoreText}>see more</Text>
        </Pressable>
      </View>

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Math.round((SCREEN_WIDTH - CARD_WIDTH) / 2),
          paddingVertical: 8,
        }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  seeMoreText: {
    color: APP_TINT,
    fontSize: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    flexShrink: 0,
  },
  cardImageWrapper: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#111",
  },
  bookmarkContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textbox: {
    flex: 1,
    justifyContent: "flex-start",
    paddingRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: WHITE,
  },
  genre: {
    color: WHITE,
    fontSize: 14,
    marginTop: 6,
  },
  description: {
    color: TEXT_GRAY,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  loadingWrap: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: IMAGE_HEIGHT,
  },
});
