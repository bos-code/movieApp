import { useAllGenres } from "@/hooks/useGenre";
import React from "react";
import { ScrollView, View } from "react-native";
import { CategoryPill } from "../MovieCard/CategoryPill";

export default function CategoryBar() {
  const [active, setActive] = React.useState("Action");

  const { data } = useAllGenres();

  const genres = Object.entries(data).map(([id:Number, name:string]) => ({
    id: id,
    name,
  }));
  const categories = 

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 15 }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          {genres.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.name}
              active={active === cat.name}
              onPress={() => setActive(cat.name)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
