//src/utils/interfaces.ts
export interface MovieTypes {
  id: number;
  title: string;
  poster: string;
  overview: string;
  releaseDate: string;
  genre: string;
  genre_ids?: number[];
  vote_average?: number;
  vote_count?: number;
  videos?: { key: string; site: string; type: string }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBMovieResponse {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
}
