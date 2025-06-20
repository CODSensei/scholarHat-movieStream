import React from "react";
import { useMovieStore } from "../store/movieStore";

const MovieModal: React.FC = () => {
  const {
    selectedMovie,
    setSelectedMovie,
    movieDetails,
    detailsLoading,
    fetchMovieDetails,
  } = useMovieStore();

  React.useEffect(() => {
    // Fetch details if not already loaded when modal opens
    if (
      selectedMovie &&
      (!movieDetails || movieDetails.id !== selectedMovie.id)
    ) {
      fetchMovieDetails(selectedMovie.id);
    }
  }, [selectedMovie, movieDetails, fetchMovieDetails]);

  if (!selectedMovie) return null;

  const getTrailerUrl = () => {
    if (movieDetails && movieDetails.videos && movieDetails.videos.length > 0) {
      const trailer = movieDetails.videos[0];
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    }
    // Fallback to search if no trailer found
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(
      selectedMovie.title
    )}+trailer`;
  };

  const formatRating = (rating: number) => {
    return rating ? rating.toFixed(1) : "N/A";
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-opacity-75 flex items-center justify-center p-4 z-99">
      <div className="bg-gray-800 border border-gray-950 rounded-lg max-w-5xl w-full max-h-[99vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-0.5 right-3 text-white text-3xl hover:text-gray-300 z-10"
          onClick={() => setSelectedMovie(null)}
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="w-full md:w-80 h-auto max-h-96 object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {selectedMovie.title}
            </h2>

            <div className="space-y-3 mb-6">
              <p className="text-gray-300">
                <span className="font-semibold">Release Date:</span>{" "}
                {selectedMovie.releaseDate}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Genre:</span>{" "}
                {selectedMovie.genre}
              </p>

              {movieDetails && (
                <>
                  {movieDetails.vote_average && (
                    <p className="text-gray-300">
                      <span className="font-semibold">Rating:</span>{" "}
                      {formatRating(movieDetails.vote_average)}/10
                      {movieDetails.vote_count && (
                        <span className="text-sm text-gray-400">
                          {" "}
                          ({movieDetails.vote_count} votes)
                        </span>
                      )}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Overview
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {selectedMovie.overview || "No overview available."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {detailsLoading ? (
                <div className="bg-gray-600 text-white px-6 py-3 rounded-lg text-center">
                  Loading trailer...
                </div>
              ) : (
                <a
                  href={getTrailerUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-center font-semibold transition-colors duration-200"
                >
                  {movieDetails &&
                  movieDetails.videos &&
                  movieDetails.videos.length > 0
                    ? "🎬 Watch Official Trailer"
                    : "🔍 Search Trailers"}
                </a>
              )}

              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(
                  selectedMovie.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 text-center font-semibold transition-colors duration-200"
              >
                📽️ View on IMDb
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
