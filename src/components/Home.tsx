//src/components/Home.tsx
import type React from "react";
import type { MovieTypes } from "../utils/interfaces";
import MovieCard from "./MovieCard";

const Home: React.FC<{
  searchQuery: string;
  favorites: number[];
  onMovieClick: (movie: MovieTypes) => void;
  onToggleFavorite: (id: number) => void;
  movies: MovieTypes[];
}> = ({ searchQuery, favorites, onMovieClick, onToggleFavorite, movies }) => {
  const filteredMovies = movies.filter((movie: MovieTypes) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-4">
      <h2 className="text-white text-2xl font-bold mb-4">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
      </h2>
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
                ? "No movies found for your search."
                : "No movies available."}
            </p>
            {searchQuery && (
              <p className="text-gray-400 mt-2">
                Try searching for something else.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
export default Home;
