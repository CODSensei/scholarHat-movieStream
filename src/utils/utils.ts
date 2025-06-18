// src/utils/utils.ts
import type { MovieTypes } from "./interfaces";

export const formatMovie = (movie: any): MovieTypes => ({
  id: movie?.id,
  title: movie?.title,
  poster: movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image",
  overview: movie?.overview,
  releaseDate: movie?.release_date,
  genre: movie?.genre_ids?.[0] || "Unknown",
  genre_ids: movie?.genre_ids || [],
  vote_average: movie?.vote_average,
  vote_count: movie?.vote_count,
});
