export type MediaType = "movie" | "tv";

/** Shape shared by movie/tv list results (title/name differ by media type). */
export interface MediaSummary {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
  media_type?: MediaType;
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  official?: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
}

export interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface MediaDetails extends MediaSummary {
  tagline?: string;
  runtime?: number;
  episode_run_time?: number[];
  genres: Genre[];
  videos?: { results: Video[] };
  credits?: { cast: CastMember[] };
  similar?: Paginated<MediaSummary>;
  recommendations?: Paginated<MediaSummary>;
  "watch/providers"?: {
    results: Record<string, { link?: string; flatrate?: Provider[] }>;
  };
}

export const mediaTitle = (m: MediaSummary) => m.title ?? m.name ?? "Untitled";
