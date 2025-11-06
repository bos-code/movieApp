import {
  APP_TINT,
  CLIP_GRAY,
  LIGHT_GRAY,
  TAB_BAR_COLOR,
} from "@/constants/colors";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  count?: number;
  active?: boolean;
  onPress?: () => void;
};

export function CategoryPill({ label, count, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, active && styles.activeBg]}
    >
      <Text style={[styles.text, active && styles.activeText]}>
        {label}
        {count !== undefined ? ` (${count})` : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: CLIP_GRAY,
    marginRight: 8,
  },
  activeBg: {
    backgroundColor: APP_TINT,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: LIGHT_GRAY,
  },
  activeText: {
    color: TAB_BAR_COLOR,
  },
});
