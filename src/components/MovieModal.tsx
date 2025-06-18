//src/components/MovieModal.tsx
import React from "react";
import { useMovieStore } from "../store/movieStore";

const MovieModal: React.FC = () => {
  const { selectedMovie, setSelectedMovie } = useMovieStore();

  if (!selectedMovie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-0 right-1 text-white text-3xl hover:cursor-pointer"
          onClick={() => setSelectedMovie(null)}
        >
          ×
        </button>
        <img
          src={selectedMovie.poster}
          alt={selectedMovie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-white text-2xl font-bold mb-2">
          {selectedMovie.title}
        </h2>
        <p className="text-gray-300 mb-2">
          Release Date: {selectedMovie.releaseDate}
        </p>
        <p className="text-gray-300 mb-2">Genre: {selectedMovie.genre}</p>
        <p className="text-gray-300">{selectedMovie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
