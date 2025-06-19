import React, { useState } from "react";
import type { MovieTypes } from "../utils/interfaces";
import { useMovieStore } from "../store/movieStore";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: MovieTypes;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { toggleFavorite, favorites } = useMovieStore();
  const [showDetails, setShowDetails] = useState(false);

  const isFavorite = favorites.includes(movie.id);

  return (
    <div
      className="relative w-48 h-72 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <img
        src={movie.poster || "https://via.placeholder.com/300x450"}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      {showDetails && (
        <div className="absolute inset-0 bg-black bg-opacity-70 p-2 flex flex-col justify-between">
          <div>
            <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
            <p className="text-gray-300 text-sm">
              {movie.overview.slice(0, 100)}...
            </p>
          </div>
          <Link
            to={`/trailer/${movie.id}`}
            className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
          >
            Play Trailer
          </Link>
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie.id);
        }}
        className={`absolute top-2 right-2 text-2xl ${
          isFavorite ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
};

export default MovieCard;
