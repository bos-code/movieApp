import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WHITE, LIGHT_GRAY } from "@/constants/colors";

type Props = {
  value: string;
  onChangeText: (val: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={LIGHT_GRAY}
        style={{ marginRight: 8 }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={LIGHT_GRAY}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: WHITE,
    fontSize: 16,
  },
});
