import React from "react";
import { useMovieStore } from "../store/movieStore";

const MovieModal: React.FC = () => {
  const { selectedMovie, setSelectedMovie } = useMovieStore();

  if (!selectedMovie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-white text-3xl hover:text-gray-300"
          onClick={() => setSelectedMovie(null)}
        >
          ×
        </button>
        <img
          src={selectedMovie.poster || "https://via.placeholder.com/500x750"}
          alt={selectedMovie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
        <p className="text-gray-300 mb-2">
          Release Date: {selectedMovie.releaseDate}
        </p>
        <p className="text-gray-300 mb-2">Genre: {selectedMovie.genre}</p>
        <p className="text-gray-300 mb-4">{selectedMovie.overview}</p>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            selectedMovie.title
          )}+trailer`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Watch Trailer
        </a>
      </div>
    </div>
  );
};

export default MovieModal;
