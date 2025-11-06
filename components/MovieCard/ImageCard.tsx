import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { blurhash, WHITE } from "../../constants/colors";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

export default function ImageCard({ poster, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.cardImageWrapper}>
      <Image
        style={styles.image}
        source={poster}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Bookmark />
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.title}>Hitman’s Wife’s Bodyguard</Text>
        <RatingComponent count={1} rating={1} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
