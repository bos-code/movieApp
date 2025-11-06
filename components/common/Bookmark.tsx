import { WHITE } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { View } from "react-native";

function Bookmark() {
  return (
    <View style={{ position: "absolute", top: "10%", right: "15%" }}>
      <Octicons name="bookmark" size={30} color={WHITE} />
    </View>
  );
}

export default Bookmark;
