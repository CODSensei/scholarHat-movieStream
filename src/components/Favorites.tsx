//src/components/Favorites.tsx
import React from "react";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";

const Favorites: React.FC = () => {
  const {
    searchQuery,
    favorites,
    setSelectedMovie,
    toggleFavorite,
    getFavoriteMovies,
    getFilteredMovies,
  } = useMovieStore();

  const favoriteMovies = getFavoriteMovies();
  const filteredMovies = getFilteredMovies(favoriteMovies);

  return (
    <main className="p-4">
      <h2 className="text-white text-2xl font-bold mb-4">
        Favorite Movies
        {favorites.length > 0 && (
          <span className="text-gray-400 text-lg ml-2">
            ({favorites.length} {favorites.length === 1 ? "movie" : "movies"})
          </span>
        )}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={setSelectedMovie}
              onToggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            {favorites.length === 0 ? (
              <div>
                <p className="text-white text-lg mb-2">
                  No favorite movies yet
                </p>
                <p className="text-gray-400">
                  Click the star icon on any movie to add it to your favorites!
                </p>
              </div>
            ) : searchQuery ? (
              <div>
                <p className="text-white text-lg mb-2">
                  No favorite movies found for "{searchQuery}"
                </p>
                <p className="text-gray-400">
                  Try searching for something else.
                </p>
              </div>
            ) : (
              <p className="text-white text-lg">
                No favorite movies to display
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
