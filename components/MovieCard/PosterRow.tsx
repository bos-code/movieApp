import { APP_TINT, blurhash, TEXT_GRAY, WHITE } from "@/constants/colors";
import { useOpenDetails } from "@/hooks/use-open-details";
import { imageUrl } from "@/lib/tmdb";
import { MediaSummary, MediaType, mediaTitle } from "@/types/tmdb";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Bookmark from "../common/Bookmark";

interface Props {
  title: string;
  items: MediaSummary[];
  type?: MediaType;
  loading?: boolean;
}

/** Titled horizontal list of posters. Renders nothing when empty. */
export default function PosterRow({ title, items, type = "movie", loading }: Props) {
  const { onOpenDetails } = useOpenDetails();
  if (!loading && items.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <FlatList
        data={loading ? [] : items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(m) => String(m.id)}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => onOpenDetails(item.id, type)}>
            <Image
              style={styles.poster}
              source={imageUrl(item.poster_path, "w342")}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.bookmark}>
              <Bookmark item={item} type={type} size={22} />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {mediaTitle(item)}
            </Text>
            <Text style={styles.meta}>
              <Text style={{ color: APP_TINT }}>★</Text>{" "}
              {(item.vote_average ?? 0).toFixed(1)}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  heading: {
    color: WHITE,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  card: { width: 130 },
  poster: { width: 130, height: 195, borderRadius: 12 },
  bookmark: { position: "absolute", top: 8, right: 8 },
  title: { color: WHITE, fontSize: 14, fontWeight: "600", marginTop: 8 },
  meta: { color: TEXT_GRAY, fontSize: 13, marginTop: 2 },
});
