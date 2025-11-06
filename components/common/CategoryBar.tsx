import React from "react";
import { ScrollView, View } from "react-native";
import { CategoryPill } from "../MovieCard/CategoryPill";

export default function CategoryBar() {
  const [active, setActive] = React.useState("Action");

  const categories = [
    { label: "All" },
    { label: "Animation", count: 0 },
    { label: "Action", count: 3 },
    { label: "Comedy" },
    { label: "Comed" },
    { label: "Comdy" },
  ];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 15 }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          {categories.map((cat) => (
            <CategoryPill
              key={cat.label}
              label={cat.label}
              count={cat.count}
              active={active === cat.label}
              onPress={() => setActive(cat.label)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
