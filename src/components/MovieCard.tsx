import type React from "react";
import type { MovieTypes } from "../utils/interfaces";

// MovieCard Component
const MovieCard: React.FC<{
  movie: MovieTypes;
  onClick: (movie: MovieTypes) => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
}> = ({ movie, onClick, onToggleFavorite, isFavorite }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onClick(movie)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
          <p className="text-gray-400 text-sm">{movie.releaseDate}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          className={`text-2xl ${
            isFavorite ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
