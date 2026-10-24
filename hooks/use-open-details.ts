import { MediaType } from "@/types/tmdb";
import { useRouter } from "expo-router";

export function useOpenDetails() {
  const router = useRouter();

  function onOpenDetails(id: number, type: MediaType = "movie") {
    router.push({ pathname: "/movie/[id]", params: { id: String(id), type } });
  }

  return { onOpenDetails };
}
