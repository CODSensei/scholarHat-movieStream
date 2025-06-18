//src/components/Home.tsx
import React, { useEffect } from "react";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";

const Home: React.FC = () => {
  const {
    searchQuery,
    favorites,
    selectedGenre,
    genreMovies,
    genreLoading,
    genres,
    movies,
    setSelectedMovie,
    toggleFavorite,
    setSelectedGenre,
    fetchMoviesByGenre,
    setGenreMovies,
    getFilteredMovies,
    getMoviesWithGenres,
  } = useMovieStore();

  // Fetch movies when genre changes
  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (selectedGenre === "All") {
        const moviesWithGenres = getMoviesWithGenres();
        setGenreMovies(moviesWithGenres);
        return;
      }

      const selectedGenreObj = genres.find((g) => g.name === selectedGenre);
      if (selectedGenreObj) {
        await fetchMoviesByGenre(selectedGenreObj.id);
      }
    };

    fetchGenreMovies();
  }, [
    selectedGenre,
    movies,
    genres,
    fetchMoviesByGenre,
    setGenreMovies,
    getMoviesWithGenres,
  ]);

  const filteredMovies = getFilteredMovies(genreMovies);
  const genreOptions = ["All", ...genres.map((genre) => genre.name)];

  return (
    <main className="p-4">
      <div
        className={
          selectedGenre === `All`
            ? `flex flex-row items-center justify-between mb-4`
            : `flex flex-row items-center justify-between`
        }
      >
        <h2 className="text-white text-3xl font-extrabold ">Popular Movies</h2>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {selectedGenre !== "All" && (
        <p className="text-gray-300 mb-4 font-medium">
          Showing {selectedGenre} movies
        </p>
      )}

      {genreLoading ? (
        <div className="text-center py-8">
          <div className="text-white text-lg">
            Loading {selectedGenre} movies...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(movie.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-white text-lg">
                {searchQuery
                  ? `No ${
                      selectedGenre !== "All" ? selectedGenre : ""
                    } movies found for "${searchQuery}"`
                  : `No ${
                      selectedGenre !== "All" ? selectedGenre : ""
                    } movies available`}
              </p>
              {searchQuery && (
                <p className="text-gray-400 mt-2">
                  Try searching for something else or select a different genre.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
