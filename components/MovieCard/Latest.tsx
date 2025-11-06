import { APP_TINT, blurhash, TEXT_GRAY, WHITE } from "@/constants/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppBar } from "../common";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

const Latest = () => {
  const router = useRouter();
  const onSeeMorePress = () => router.push("/discover");

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

          <RatingComponent size={20} textSize={20} rating={4} />

          <Text style={styles.genre}>Action, Comedy, Crime</Text>
          <Text style={styles.description}>
            The world&apos;s most lethal odd couple - bodyguard Michael Bryce
            and hitman Darius Kincaid - are back on anoth......
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeMoreText: {
    color: APP_TINT,
    fontSize: 16,
  },
  cardImageWrapper: {
    position: "relative",
    flex: 2,
  },

  latestWrapper: {
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: "100%",
    minHeight: 200,
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

export default Latest;
