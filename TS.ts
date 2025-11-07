import { useTMDB } from "./hooks/useFetchMovieDate";
export default function useExtraData() {
  const { data } = useTMDB("movie/now_playing");
  const result = data?.results ?? [];
  return result;
}
