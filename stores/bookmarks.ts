import { MediaSummary, MediaType } from "@/types/tmdb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type BookmarkedItem = MediaSummary & { media_type: MediaType };

const keyOf = (type: MediaType, id: number) => `${type}:${id}`;

interface BookmarkState {
  items: Record<string, BookmarkedItem>;
  toggle: (item: MediaSummary, type: MediaType) => void;
}

export const useBookmarks = create<BookmarkState>()(
  persist(
    (set) => ({
      items: {},
      toggle: (item, type) =>
        set((state) => {
          const key = keyOf(type, item.id);
          const next = { ...state.items };
          if (next[key]) delete next[key];
          else next[key] = { ...item, media_type: type };
          return { items: next };
        }),
    }),
    { name: "bookmarks", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const useIsBookmarked = (type: MediaType, id: number) =>
  useBookmarks((s) => keyOf(type, id) in s.items);
