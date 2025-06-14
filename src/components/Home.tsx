//src/components/Home.tsx
import type React from "react";
import type { MovieTypes } from "../utils/interfaces";
import MovieCard from "./MovieCard";

// Home Component
const Home: React.FC<{
  searchQuery: string;
  favorites: number[];
  onMovieClick: (movie: MovieTypes) => void;
  onToggleFavorite: (id: number) => void;
  mockMovies: any;
}> = ({
  searchQuery,
  favorites,
  onMovieClick,
  onToggleFavorite,
  mockMovies,
}) => {
  const filteredMovies = mockMovies.filter((movie: MovieTypes) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Popular Movies</h2>
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
export default Home;
