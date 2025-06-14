// src/components/Genres.tsx

import React, { useState } from "react";
import type { MovieTypes } from "../utils/interfaces";
import MovieCard from "./MovieCard";

const Genres: React.FC<{
  searchQuery: string;
  favorites: number[];
  onMovieClick: (movie: MovieTypes) => void;
  onToggleFavorite: (id: number) => void;
  mockMovies: MovieTypes[];
}> = ({
  searchQuery,
  favorites,
  onMovieClick,
  onToggleFavorite,
  mockMovies,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const genres = [
    "All",
    ...new Set(mockMovies.map((movie: MovieTypes) => movie.genre)),
  ];

  const filteredMovies = mockMovies.filter((movie: MovieTypes) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <main className="p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Genres</h2>

      <select
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="mb-6 p-2 rounded-lg bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {genres.map((genre: string) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie: MovieTypes) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(movie.id)}
            />
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            No movies found.
          </p>
        )}
      </div>
    </main>
  );
};

export default Genres;
