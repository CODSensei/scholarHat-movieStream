import React from "react";
import { useMovieStore } from "../store/movieStore";
import type { MovieTypes } from "../utils/interfaces";

const MovieCard: React.FC<{ movie: MovieTypes }> = ({ movie }) => {
  const { toggleFavorite, favorites, setSelectedMovie } = useMovieStore();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative w-48 h-72 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedMovie(movie)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-2">
          <div>
            <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
            <p className="text-gray-300 text-sm">{movie.releaseDate}</p>
            <p className="text-gray-400 text-xs line-clamp-3">
              {movie.overview}
            </p>
          </div>
          <a
            href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
          >
            Play Trailer
          </a>
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie.id);
        }}
        className={`absolute top-2 right-2 text-2xl ${
          favorites.includes(movie.id) ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        {favorites.includes(movie.id) ? "★" : "☆"}
      </button>
    </div>
  );
};

export default MovieCard;
