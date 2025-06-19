import React, { useEffect } from "react";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const {
    movies,
    genres,
    selectedGenre,
    genreMovies,
    genreLoading,
    setSelectedGenre,
    fetchMoviesByGenre,
    getFilteredMovies,
    getMoviesWithGenres,
  } = useMovieStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (selectedGenre === "All") {
        const moviesWithGenres = getMoviesWithGenres();
        setSelectedGenre("All");
        return;
      }
      const selectedGenreObj = genres.find((g) => g.name === selectedGenre);
      if (selectedGenreObj) await fetchMoviesByGenre(selectedGenreObj.id);
    };
    fetchGenreMovies();
  }, [selectedGenre, movies, genres, fetchMoviesByGenre]);

  const filteredMovies = getFilteredMovies(
    genreMovies.length ? genreMovies : movies
  );
  const genreOptions = ["All", ...genres.map((genre) => genre.name)];

  return (
    <main className="p-6">
      <div className="flex justify-end mb-6">
        <select
          value={selectedGenre}
          onChange={(e) => {
            const newGenre = e.target.value;
            setSelectedGenre(newGenre);
            if (newGenre === "All") {
              navigate("/genre/all");
            } else {
              const selectedGenreObj = genres.find((g) => g.name === newGenre);
              if (selectedGenreObj) {
                navigate(`/genre/${selectedGenreObj.id}`);
              }
            }
          }}
          className="p-3 rounded-lg bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-extrabold">Popular Movies</h2>
          <Link to="/genre/all" className="text-blue-400 hover:underline">
            See More
          </Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {filteredMovies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {genres.slice(0, 3).map((genre) => (
        <section key={genre.id} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-extrabold">{genre.name}</h2>
            <Link
              to={`/genre/${genre.id}`}
              className="text-blue-400 hover:underline"
            >
              See More
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {getFilteredMovies(
              movies.filter((m) => m.genre_ids?.includes(genre.id))
            )
              .slice(0, 10)
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Home;
