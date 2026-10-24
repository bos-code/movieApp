import { useAllGenres } from "@/hooks/use-tmdb";
import React from "react";
import { ScrollView, View } from "react-native";
import { CategoryPill } from "../MovieCard/CategoryPill";

interface Props {
  /** Selected genre id, or undefined for "All". */
  active?: number;
  onChange: (genreId: number | undefined) => void;
}

export default function CategoryBar({ active, onChange }: Props) {
  const { data } = useAllGenres();
  const genres = Object.entries(data ?? {}).map(([id, name]) => ({
    id: Number(id),
    name,
  }));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 15 }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <CategoryPill
          label="All"
          active={active === undefined}
          onPress={() => onChange(undefined)}
        />
        {genres.map((g) => (
          <CategoryPill
            key={g.id}
            label={g.name}
            active={active === g.id}
            onPress={() => onChange(g.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
