// src/components/Genres.tsx

import React, { useEffect, useState } from "react";
import type { Genre, MovieTypes } from "../utils/interfaces";
import MovieCard from "./MovieCard";
import { getMoviesByGenre } from "../api/api";

const Genres: React.FC<{
  searchQuery: string;
  favorites: number[];
  onMovieClick: (movie: MovieTypes) => void;
  onToggleFavorite: (id: number) => void;
  movies: MovieTypes[];
  genres: Genre[];
}> = ({
  searchQuery,
  favorites,
  onMovieClick,
  onToggleFavorite,
  movies,
  genres,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [genreMovies, setGenreMovies] = useState<MovieTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch movies when genre changes
  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (selectedGenre === "All") {
        setGenreMovies(movies);
        return;
      }

      const selectedGenreObj = genres.find((g) => g.name === selectedGenre);
      if (!selectedGenreObj) return;

      try {
        setLoading(true);
        const response = await getMoviesByGenre(selectedGenreObj.id);

        if (response.data && response.data.results) {
          const formattedMovies = response.data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image",
            overview: movie.overview,
            releaseDate: movie.release_date,
            genre: selectedGenre,
            genre_ids: movie.genre_ids || [],
          }));
          setGenreMovies(formattedMovies);
        }
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [selectedGenre, movies, genres]);

  const filteredMovies = genreMovies.filter((movie: MovieTypes) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const genreOptions = ["All", ...genres.map((genre) => genre.name)];

  return (
    <main className="p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Movies by Genre</h2>

      <div className="mb-6">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
        >
          {genreOptions.map((genre: string) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {selectedGenre !== "All" && (
          <p className="text-gray-400 mt-2">Showing {selectedGenre} movies</p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-white text-lg">
            Loading {selectedGenre} movies...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

export default Genres;
