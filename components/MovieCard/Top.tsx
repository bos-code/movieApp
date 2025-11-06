import { WHITE, blurhash } from "@/constants/colors";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Bookmark from "../common/Bookmark";
import RatingComponent from "../common/Rating";

export default function Top() {
  return (
    <>
      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <Image
            style={{ ...styles.image }}
            source="https://images.unsplash.com/photo-2529455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <Bookmark />
        </View>
        <View>
          <View>
            <Text style={styles.title}>Hitman’s Wife’s Bodyguard</Text>
          </View>
          <RatingComponent size={24} textSize={22} rating={3.5} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    marginTop: 20,
  },

  image: {
    width: 300,
    height: 200,
    borderRadius: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: WHITE,
  },

  rating: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
});
