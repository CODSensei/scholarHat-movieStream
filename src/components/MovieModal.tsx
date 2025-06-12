import type React from "react";
import type { MovieTypes } from "../utils/interfaces";

// MovieModal Component
const MovieModal: React.FC<{
  movie: MovieTypes | null;
  onClose: () => void;
}> = ({ movie, onClose }) => {
  if (!movie) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-white text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-300 mb-2">Release Date: {movie.releaseDate}</p>
        <p className="text-gray-300 mb-2">Genre: {movie.genre}</p>
        <p className="text-gray-300">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
