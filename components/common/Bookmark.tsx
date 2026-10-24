import { APP_TINT, WHITE } from "@/constants/colors";
import { useBookmarks, useIsBookmarked } from "@/stores/bookmarks";
import { MediaSummary, MediaType } from "@/types/tmdb";
import Octicons from "@expo/vector-icons/Octicons";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable } from "react-native";

interface BookmarkProps {
  item: MediaSummary;
  type?: MediaType;
  size?: number;
}

function Bookmark({ item, type = "movie", size = 30 }: BookmarkProps) {
  const saved = useIsBookmarked(type, item.id);
  const toggle = useBookmarks((s) => s.toggle);

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={saved ? "Remove bookmark" : "Add bookmark"}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        toggle(item, type);
      }}
    >
      <Octicons
        name={saved ? "bookmark-filled" : "bookmark"}
        size={size}
        color={saved ? APP_TINT : WHITE}
      />
    </Pressable>
  );
}

export default Bookmark;
