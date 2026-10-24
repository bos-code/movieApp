import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { imageUrl } from "@/lib/tmdb";
import { MediaSummary, mediaTitle } from "@/types/tmdb";
import { blurhash, WHITE } from "../../constants/colors";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

interface Props {
  movie: MediaSummary;
  onPress: () => void;
}

export default function ImageCard({ movie, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.cardImageWrapper}>
      <Image
        style={styles.image}
        source={imageUrl(movie.poster_path, "w342")}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.bookmark}>
        <Bookmark item={movie} />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.title} numberOfLines={2}>
          {mediaTitle(movie)}
        </Text>
        <RatingComponent count={1} rating={(movie.vote_average ?? 0) / 2} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bookmark: { position: "absolute", top: 10, right: 10 },
  image: {
    minHeight: 300,
    borderRadius: 15,
    width: "100%",
  },
  cardImageWrapper: {
    position: "relative",
    flex: 0.5,
    maxWidth: "48%",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: WHITE,
    flexWrap: "wrap",
    marginBottom: -7,
  },
});
