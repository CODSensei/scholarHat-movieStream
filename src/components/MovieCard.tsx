import type React from "react";
import type { Movie } from "../utils/interfaces";

// MovieCard Component
const MovieCard: React.FC<{
  movie: Movie;
  onClick: (movie: Movie) => void;
}> = ({ movie, onClick }) => {
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
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
