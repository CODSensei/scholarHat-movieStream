import React from "react";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";

const Favorites: React.FC = () => {
  const { favorites, getFavoriteMovies, getFilteredMovies } = useMovieStore();
  const favoriteMovies = getFavoriteMovies();
  const filteredMovies = getFilteredMovies(favoriteMovies);

  return (
    <main className="text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex flex-row items-center">
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
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-white text-lg mb-2">
                {favorites.length === 0
                  ? "No favorite movies yet"
                  : `No favorite movies found for "${
                      useMovieStore.getState().searchQuery
                    }"`}
              </p>
              <p className="text-gray-400">
                {favorites.length === 0
                  ? "Click the star icon on any movie to add it to your favorites!"
                  : "Try searching for something else."}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Favorites;
