import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const GenrePage: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const navigate = useNavigate();
  const {
    genres,
    genreMovies,
    fetchMoviesByGenre,
    getFilteredMovies,
    setPage,
    page,
    totalPages,
  } = useMovieStore();

  useEffect(() => {
    if (genreId) {
      const genre = genres.find((g) => g.id === Number(genreId));
      if (genre) fetchMoviesByGenre(genre.id);
    }
  }, [genreId, genres, fetchMoviesByGenre]);

  const filteredMovies = getFilteredMovies(genreMovies);

  return (
    <main className="p-6">
      <h2 className="text-3xl font-bold mb-4">
        {genres.find((g) => g.id === Number(genreId))?.name || "Genre"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination />
    </main>
  );
};

export default GenrePage;
