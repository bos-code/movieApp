import { useTMDB } from "./useFetchMovieDate";
export default function useExtraData(endpoint: string) {
  const { data } = useTMDB(endpoint);
  const result = data?.results ?? [];
  return result;
}
