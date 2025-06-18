import React, { useEffect } from "react";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const {
    movies,
    genres,
    selectedGenre,
    genreMovies,
    genreLoading,
    popularPage,
    popularTotalPages,
    fetchPopularMovies,
    fetchMoviesByGenre,
    setSelectedGenre,
    getFilteredMovies,
    toggleFavorite,
  } = useMovieStore();

  useEffect(() => {
    fetchPopularMovies();
    genres.slice(0, 5).forEach((genre) => {
      fetchMoviesByGenre(genre.id, genre.name);
    });
  }, [fetchPopularMovies, fetchMoviesByGenre, genres]);

  const handleSeeMorePopular = () => {
    if (popularPage < popularTotalPages) {
      fetchPopularMovies(popularPage + 1);
    }
  };

  const handleSeeMoreGenre = (genreName: string) => {
    const genre = genres.find((g) => g.name === genreName);
    if (genre) {
      setSelectedGenre(genreName);
      fetchMoviesByGenre(
        genre.id,
        genreName,
        (genreMovies[genreName]?.length || 0) / 20 + 1
      );
    }
  };

  return (
    <main className="bg-gray-900 text-white p-6">
      <div className="max-w-11/12 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">MovieStream</h1>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
          >
            <option value="All">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        {/* Popular Movies Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Popular Movies</h2>
            {popularPage < popularTotalPages && (
              <button
                onClick={handleSeeMorePopular}
                className="text-blue-400 hover:underline"
              >
                See More
              </button>
            )}
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700">
            {getFilteredMovies(movies).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={(id) => useMovieStore.getState().fetchMovieDetails(id)}
                onToggleFavorite={toggleFavorite}
                isFavorite={useMovieStore
                  .getState()
                  .favorites.includes(movie.id)}
              />
            ))}
          </div>
        </section>
        {genres.slice(0, 5).map((genre) => (
          <section key={genre.id} className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{genre.name}</h2>
              <Link
                to={`/genre/${genre.name}`}
                onClick={() => handleSeeMoreGenre(genre.name)}
                className="text-blue-400 hover:underline"
              >
                See More
              </Link>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700">
              {getFilteredMovies(genreMovies[genre.name] || []).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={(id) =>
                    useMovieStore.getState().fetchMovieDetails(id)
                  }
                  onToggleFavorite={toggleFavorite}
                  isFavorite={useMovieStore
                    .getState()
                    .favorites.includes(movie.id)}
                />
              ))}
            </div>
          </section>
        ))}
        {genreLoading && (
          <div className="text-center py-8">
            <div className="text-white text-lg">Loading more movies...</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
