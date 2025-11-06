import { MediaType } from "@/TS";
import { useRouter } from "expo-router";

export function useOpenDetails() {
  const router = useRouter();

  function onOpenDetails(id: number, type: MediaType = "movie") {
    router.push("/details");
    return { id, type };
  }

  return { onOpenDetails };
}
