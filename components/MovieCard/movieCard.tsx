import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { blurhash, TEXT_GRAY, WHITE } from "../../constants/colors";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

export default function MovieCard() {
  return (
    <View style={styles.latestWrapper}>
      <View style={styles.cardImageWrapper}>
        <Image
          style={styles.image}
          source={"./../../assets/images/react-logo@2x.png"}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Bookmark />
      </View>

      <View style={styles.textbox}>
        <Text style={styles.title}>Hitman’s Wife’s Bodyguard</Text>

        <RatingComponent size={20} textSize={20} rating={3.5} />

        <Text style={styles.genre}>Action, Comedy, Crime</Text>
        <Text style={styles.description}>
          The world&apos;s most lethal odd couple - bodyguard Michael Bryce and
          hitman Darius Kincaid - are back on anoth......
        </Text>
      </View>
    </View>
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

  latestWrapper: {
    marginTop: 30,
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: "100%",
    minHeight: 300,
    borderRadius: 15,
  },

  description: {
    color: TEXT_GRAY,
    fontSize: 14,
    lineHeight: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: WHITE,
  },
  textbox: {
    flexGrow: 0,
    maxWidth: "50%",
    marginTop: 10,
    gap: 5,
  },
  genre: { color: WHITE, fontSize: 14 },
});
