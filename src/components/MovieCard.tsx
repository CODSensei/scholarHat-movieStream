// src/components/MovieCard.tsx
import React from "react";
import { useMovieStore } from "../store/movieStore";
import type { MovieTypes } from "../utils/interfaces";

const MovieCard: React.FC<{ movie: MovieTypes }> = ({ movie }) => {
  const {
    toggleFavorite,
    favorites,
    setSelectedMovie,
    fetchMovieDetails,
    movieDetails,
    detailsLoading,
  } = useMovieStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleCardClick = async () => {
    setSelectedMovie(movie);
    // Fetch movie details when card is clicked
    await fetchMovieDetails(movie.id);
  };

  const handleMouseEnter = async () => {
    setIsHovered(true);
    // Optionally fetch details on hover for better UX
    if (!movieDetails || movieDetails.id !== movie.id) {
      await fetchMovieDetails(movie.id);
    }
  };

  const getTrailerUrl = () => {
    if (movieDetails && movieDetails.videos && movieDetails.videos.length > 0) {
      const trailer = movieDetails.videos[0];
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    }
    // Fallback to search if no trailer found
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(
      movie.title
    )}+trailer`;
  };

  return (
    <div
      className="relative w-48 h-72 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 backdrop-blur-md  bg-opacity-70 flex flex-col justify-between p-2">
          <div>
            <h3 className="text-white text-lg mt-10 mb-2 text-center font-bold">
              {movie.title}
            </h3>
            <p className="text-gray-200 text-sm font-medium text-center line-clamp-3">
              {movie.overview}
            </p>
          </div>

          {detailsLoading && movieDetails?.id === movie.id ? (
            <div className="bg-gray-600 text-white py-2 text-sm font-semibold rounded-lg text-center">
              Loading trailer...
            </div>
          ) : (
            <a
              href={getTrailerUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-blue-600 text-white py-2 text-sm font-semibold rounded-lg hover:bg-blue-800 text-center transition-colors duration-200"
            >
              {movieDetails &&
              movieDetails.videos &&
              movieDetails.videos.length > 0
                ? "Play Trailer"
                : "Search Trailers"}
            </a>
          )}
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie.id);
        }}
        className={`absolute top-2 right-2 text-3xl font-bold transition-colors duration-200 ${
          favorites.includes(movie.id)
            ? "text-yellow-400"
            : "text-gray-400 hover:text-yellow-200"
        }`}
      >
        {favorites.includes(movie.id) ? "★" : "☆"}
      </button>
    </div>
  );
};

export default MovieCard;
