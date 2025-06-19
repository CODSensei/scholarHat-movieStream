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
    setSelectedGenre,
    fetchMoviesByGenre,
    getMoviesWithGenres,
    getFilteredMovies,
  } = useMovieStore();

  useEffect(() => {
    if (selectedGenre && selectedGenre !== "All") {
      const genre = genres.find((g) => g.name === selectedGenre);
      if (genre) fetchMoviesByGenre(genre.id);
    }
  }, [selectedGenre, genres, fetchMoviesByGenre]);

  const popularMovies = getMoviesWithGenres().slice(0, 10);
  const filteredMovies = getFilteredMovies(
    selectedGenre === "All" ? popularMovies : genreMovies
  );

  return (
    <main className="p-6">
      <div className="flex justify-end mb-4">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {["All", ...genres.map((g) => g.name)].map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-3xl font-bold mb-4">Popular Movies</h2>
      <div className="flex overflow-x-auto space-x-4 mb-6 pb-4 scrollbar-hide">
        {popularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Link to="/genre/All" className="text-blue-400 hover:underline">
        See More
      </Link>
      <h2 className="text-3xl font-bold mt-8 mb-4">Genres</h2>
      <div className="flex overflow-x-auto space-x-4 mb-6 pb-4 scrollbar-hide">
        {genres.slice(0, 5).map((genre) => (
          <Link
            key={genre.id}
            to={`/genre/${genre.name}`}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
          >
            {genre.name}
          </Link>
        ))}
      </div>
      {genreLoading ? (
        <div className="text-center">Loading...</div>
      ) : filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center">No movies available</div>
      )}
    </main>
  );
};

export default Home;
