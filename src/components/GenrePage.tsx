import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const GenrePage: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const {
    movies,
    genres,
    genreMovies,
    genreLoading,
    fetchMoviesByGenre,
    getFilteredMovies,
  } = useMovieStore();
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (genreId && genreId !== "all") {
      const selectedGenre = genres.find((g) => g.id === Number(genreId));
      if (selectedGenre) fetchMoviesByGenre(selectedGenre.id);
    }
  }, [genreId, genres, fetchMoviesByGenre]);

  const displayMovies = genreId === "all" ? movies : genreMovies;
  const filteredMovies = getFilteredMovies(displayMovies);
  console.log("Length of filtered movies is ", filteredMovies.length);
  const paginatedMovies = filteredMovies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <main className="p-6">
      <h2 className="text-3xl font-extrabold mb-6">
        {genreId === "all"
          ? "All Movies"
          : genres.find((g) => g.id === Number(genreId))?.name}
      </h2>
      {genreLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <h2 className="text-3xl font-extrabold mb-6">
            Pagination Starts from here
          </h2>
          <Pagination
            currentPage={page}
            totalItems={filteredMovies.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        </>
      )}
    </main>
  );
};

export default GenrePage;
