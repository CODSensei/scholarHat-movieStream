import React from "react";
import { useMovieStore } from "../store/movieStore";

const MovieModal: React.FC = () => {
  const { selectedMovie, setSelectedMovie } = useMovieStore();

  if (!selectedMovie) return null;

  const trailer = selectedMovie.videos?.[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-6 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300"
          onClick={() => setSelectedMovie(null)}
        >
          ×
        </button>
        {trailer && (
          <iframe
            className="w-full h-64 mb-4 rounded-lg"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={selectedMovie.title}
            allow="autoplay"
          />
        )}
        <h2 className="text-white text-2xl font-bold mb-2">
          {selectedMovie.title}
        </h2>
        <p className="text-gray-300 mb-2">
          Release Date: {selectedMovie.releaseDate}
        </p>
        <p className="text-gray-300 mb-2">Genre: {selectedMovie.genre}</p>
        <p className="text-gray-300 mb-2">
          Rating: {selectedMovie.vote_average?.toFixed(1)}
        </p>
        <p className="text-gray-300">{selectedMovie.overview}</p>
        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Watch Trailer
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
