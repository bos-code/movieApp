import { useAllGenres } from "@/hooks/use-tmdb";
import { useOpenDetails } from "@/hooks/use-open-details";
import { imageUrl } from "@/lib/tmdb";
import { MediaSummary, MediaType, mediaTitle } from "@/types/tmdb";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { blurhash, TEXT_GRAY, WHITE } from "../../constants/colors";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

interface Props {
  movie: MediaSummary;
  type?: MediaType;
}

export default function MovieCard({ movie, type = "movie" }: Props) {
  const { onOpenDetails } = useOpenDetails();
  const { data: genres } = useAllGenres();

  const genreText = (movie.genre_ids ?? [])
    .map((id) => genres?.[id])
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => onOpenDetails(movie.id, type)}
    >
      <View style={styles.cardImageWrapper}>
        <Image
          style={styles.image}
          source={imageUrl(movie.poster_path, "w342")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.bookmark}>
          <Bookmark item={movie} type={type} />
        </View>
      </View>

      <View style={styles.textbox}>
        <Text style={styles.title} numberOfLines={2}>
          {mediaTitle(movie)}
        </Text>
        <RatingComponent
          size={20}
          textSize={20}
          rating={(movie.vote_average ?? 0) / 2}
        />
        {genreText ? <Text style={styles.genre}>{genreText}</Text> : null}
        <Text style={styles.description} numberOfLines={5}>
          {movie.overview || "No description available."}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 30, flexDirection: "row", gap: 15 },
  cardImageWrapper: { position: "relative", flex: 2 },
  bookmark: { position: "absolute", top: 10, right: 10 },
  image: { width: "100%", minHeight: 300, borderRadius: 15 },
  textbox: { flex: 2, marginTop: 10, gap: 5 },
  title: { fontSize: 20, fontWeight: "bold", color: WHITE },
  genre: { color: WHITE, fontSize: 14 },
  description: { color: TEXT_GRAY, fontSize: 14, lineHeight: 20 },
});
