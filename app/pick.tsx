import { AppBar, ScreenWrapper } from "@/components/common";
import { CategoryPill } from "@/components/MovieCard/CategoryPill";
import MovieCard from "@/components/MovieCard/movieCard";
import { APP_TINT, BACKGROUND_COLOR, TEXT_GRAY, WHITE } from "@/constants/colors";
import { tmdbFetch } from "@/lib/tmdb";
import { MediaSummary, Paginated } from "@/types/tmdb";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// TMDB genre ids; "|" means OR in with_genres.
const MOODS: Record<string, string> = {
  "Feel-good": "35|10751",
  Thrilling: "53|28",
  "Mind-bending": "878|9648",
  Romantic: "10749",
  Scary: "27",
  Epic: "12|14",
};

const TIMES: Record<string, number | undefined> = {
  "Under 100 min": 100,
  "Under 2h 10m": 130,
  "Any length": undefined,
};

export default function PickScreen() {
  const [mood, setMood] = React.useState("Feel-good");
  const [time, setTime] = React.useState("Any length");
  const [pick, setPick] = React.useState<MediaSummary | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const seen = React.useRef(new Set<number>());

  const roll = async () => {
    setLoading(true);
    setError(null);
    try {
      const page = 1 + Math.floor(Math.random() * 5);
      const res = await tmdbFetch<Paginated<MediaSummary>>("discover/movie", {
        with_genres: MOODS[mood],
        "with_runtime.lte": TIMES[time],
        "vote_average.gte": 6.5,
        "vote_count.gte": 300,
        sort_by: "popularity.desc",
        page,
      });
      const fresh = res.results.filter((m) => !seen.current.has(m.id));
      const pool = fresh.length ? fresh : res.results;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      if (!chosen) setError("Nothing matched — try other options.");
      else {
        seen.current.add(chosen.id);
        setPick(chosen);
      }
    } catch {
      setError("Couldn't fetch a pick. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <AppBar title="Tonight" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>What&apos;s the mood?</Text>
        <View style={styles.pills}>
          {Object.keys(MOODS).map((m) => (
            <CategoryPill key={m} label={m} active={mood === m} onPress={() => setMood(m)} />
          ))}
        </View>

        <Text style={styles.label}>How much time?</Text>
        <View style={styles.pills}>
          {Object.keys(TIMES).map((t) => (
            <CategoryPill key={t} label={t} active={time === t} onPress={() => setTime(t)} />
          ))}
        </View>

        <Pressable style={styles.button} onPress={roll} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={BACKGROUND_COLOR} />
          ) : (
            <Text style={styles.buttonText}>{pick ? "Pick another" : "Pick for me"}</Text>
          )}
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {pick ? <MovieCard movie={pick} /> : null}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  label: { color: WHITE, fontSize: 18, fontWeight: "600", marginTop: 20 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 10 },
  button: {
    backgroundColor: APP_TINT,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: { color: BACKGROUND_COLOR, fontWeight: "700", fontSize: 16 },
  error: { color: TEXT_GRAY, marginTop: 16, textAlign: "center" },
});
