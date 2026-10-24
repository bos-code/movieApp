import Bookmark from "@/components/common/Bookmark";
import RatingComponent from "@/components/common/Rating";
import {
  APP_TINT,
  BACKGROUND_COLOR,
  blurhash,
  CLIP_GRAY,
  TEXT_GRAY,
  WHITE,
} from "@/constants/colors";
import { useDetails } from "@/hooks/use-tmdb";
import { useOpenDetails } from "@/hooks/use-open-details";
import { imageUrl } from "@/lib/tmdb";
import { MediaType, mediaTitle } from "@/types/tmdb";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DetailsScreen() {
  const router = useRouter();
  const { onOpenDetails } = useOpenDetails();
  const { id, type: typeParam } = useLocalSearchParams<{
    id: string;
    type?: string;
  }>();
  const type: MediaType = typeParam === "tv" ? "tv" : "movie";
  const { data, isLoading, error, refetch } = useDetails(type, Number(id));

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={APP_TINT} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Couldn&apos;t load this title.</Text>
        <Pressable onPress={() => refetch()}>
          <Text style={styles.link}>Retry</Text>
        </Pressable>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const trailer = data.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const runtime = data.runtime ?? data.episode_run_time?.[0];
  const year = (data.release_date ?? data.first_air_date)?.slice(0, 4);
  const providers = data["watch/providers"]?.results?.US?.flatrate ?? [];
  const cast = (data.credits?.cast ?? []).slice(0, 12);
  const recs = data.recommendations?.results ?? [];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 60 }}>
      <View>
        <Image
          style={styles.backdrop}
          source={imageUrl(data.backdrop_path ?? data.poster_path, "w780")}
          placeholder={{ blurhash }}
          contentFit="cover"
        />
        <Pressable
          style={[styles.floating, { left: 16 }]}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Octicons name="chevron-left" size={32} color={APP_TINT} />
        </Pressable>
        <View style={[styles.floating, { right: 16 }]}>
          <Bookmark item={data} type={type} />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{mediaTitle(data)}</Text>
        {data.tagline ? <Text style={styles.tagline}>{data.tagline}</Text> : null}
        <Text style={styles.muted}>
          {[year, runtime ? `${runtime} min` : null].filter(Boolean).join(" · ")}
        </Text>
        <RatingComponent
          size={20}
          textSize={18}
          rating={(data.vote_average ?? 0) / 2}
        />

        <View style={styles.chips}>
          {data.genres.map((g) => (
            <View key={g.id} style={styles.chip}>
              <Text style={styles.chipText}>{g.name}</Text>
            </View>
          ))}
        </View>

        {trailer ? (
          <Pressable
            style={styles.trailer}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                `https://www.youtube.com/watch?v=${trailer.key}`
              )
            }
          >
            <Octicons name="play" size={18} color={BACKGROUND_COLOR} />
            <Text style={styles.trailerText}>Watch trailer</Text>
          </Pressable>
        ) : null}

        <Text style={styles.heading}>Overview</Text>
        <Text style={styles.overview}>
          {data.overview || "No description available."}
        </Text>

        {providers.length > 0 ? (
          <>
            <Text style={styles.heading}>Streaming on</Text>
            <View style={styles.row}>
              {providers.map((p) => (
                <Image
                  key={p.provider_id}
                  style={styles.provider}
                  source={imageUrl(p.logo_path, "w185")}
                  accessibilityLabel={p.provider_name}
                />
              ))}
            </View>
          </>
        ) : null}

        {cast.length > 0 ? (
          <>
            <Text style={styles.heading}>Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {cast.map((c) => (
                <View key={c.id} style={styles.cast}>
                  <Image
                    style={styles.avatar}
                    source={imageUrl(c.profile_path, "w185")}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                  />
                  <Text style={styles.castName} numberOfLines={1}>
                    {c.name}
                  </Text>
                  <Text style={styles.castRole} numberOfLines={1}>
                    {c.character}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </>
        ) : null}

        {recs.length > 0 ? (
          <>
            <Text style={styles.heading}>More like this</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recs.slice(0, 12).map((r) => (
                <Pressable
                  key={r.id}
                  style={styles.rec}
                  onPress={() => onOpenDetails(r.id, type)}
                >
                  <Image
                    style={styles.recPoster}
                    source={imageUrl(r.poster_path, "w342")}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                  />
                  <Text style={styles.castName} numberOfLines={2}>
                    {mediaTitle(r)}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BACKGROUND_COLOR },
  center: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  backdrop: { width: "100%", height: 260 },
  floating: {
    position: "absolute",
    top: 48,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  body: { padding: 16, gap: 8 },
  title: { color: WHITE, fontSize: 28, fontWeight: "700" },
  tagline: { color: TEXT_GRAY, fontStyle: "italic" },
  muted: { color: TEXT_GRAY, fontSize: 14 },
  link: { color: APP_TINT, fontSize: 16 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  chip: {
    backgroundColor: CLIP_GRAY,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: { color: WHITE, fontSize: 13 },
  trailer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: APP_TINT,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
  trailerText: { color: BACKGROUND_COLOR, fontWeight: "700", fontSize: 16 },
  heading: { color: WHITE, fontSize: 20, fontWeight: "700", marginTop: 16 },
  overview: { color: "#ccc", fontSize: 15, lineHeight: 22 },
  row: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  provider: { width: 48, height: 48, borderRadius: 10 },
  cast: { width: 90, marginRight: 12 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: CLIP_GRAY },
  castName: { color: WHITE, fontSize: 13, marginTop: 6 },
  castRole: { color: TEXT_GRAY, fontSize: 12 },
  rec: { width: 120, marginRight: 12 },
  recPoster: { width: 120, height: 180, borderRadius: 10 },
});
