import {
  APP_TINT,
  BACKGROUND_COLOR,
  LIGHT_GRAY,
  WHITE,
} from "@/constants/colors";
import React from "react";
import { Text, View } from "react-native";
import { Rating } from "react-native-ratings";

export default function RatingComponent({
  size = 20,
  textSize = 12,
  rating = 0,
  count = 5,
}) {
  const safeRating = Number(rating) ? rating : 0;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginBottom: -5,
      }}
    >
      <Text style={{ color: WHITE, fontSize: textSize }}> {safeRating}</Text>
      <Rating
        type="custom"
        fractions={1}
        ratingCount={count}
        startingValue={safeRating}
        imageSize={size}
        readonly
        ratingColor={APP_TINT}
        ratingBackgroundColor={LIGHT_GRAY}
        style={{ paddingVertical: 10 }}
        tintColor={BACKGROUND_COLOR}
      />
    </View>
  );
}
