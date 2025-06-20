// src/components/GenrePage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";

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

  useEffect(() => {
    if (genreId && genreId !== "all") {
      const selectedGenre = genres.find((g) => g.id === Number(genreId));
      if (selectedGenre) {
        fetchMoviesByGenre(selectedGenre.id);
      }
    }
  }, [genreId, genres, fetchMoviesByGenre]);

  // Memoize expensive calculations
  const { filteredMovies, paginatedMovies, genreName } = useMemo(() => {
    const displayMovies = genreId === "all" ? movies : genreMovies;
    const filteredMovies = getFilteredMovies(displayMovies);
    const paginatedMovies = filteredMovies.slice(0, 20);
    const genreName =
      genreId === "all"
        ? "All Movies"
        : genres.find((g) => g.id === Number(genreId))?.name || "Unknown Genre";

    return { displayMovies, filteredMovies, paginatedMovies, genreName };
  }, [genreId, movies, genreMovies, getFilteredMovies, genres]);

  if (genreLoading) {
    return (
      <main className="p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg">Loading movies...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl ml-20 font-extrabold mb-2">{genreName}</h1>
        <p className="text-gray-400 ml-20">
          Showing {filteredMovies.length} movies
          {filteredMovies.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-xl font-semibold mb-2">No movies found</h2>
          <p className="text-gray-400">
            {genreId === "all"
              ? "No movies available at the moment."
              : `No movies found in the ${genreName} genre.`}
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap  gap-4 sm:gap-6 mx-auto ml-20 ">
            {paginatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default GenrePage;
