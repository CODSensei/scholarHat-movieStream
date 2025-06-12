import React from "react";
import Navbar from "./components/Navbar";
import type { Movie } from "./utils/interfaces";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";

// Mock movie data
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Cosmic Adventure",
    poster: "https://via.placeholder.com/200x300",
    overview: "A sci-fi epic about explorers in a distant galaxy.",
    releaseDate: "2023-05-12",
  },
  {
    id: 2,
    title: "Mystery Manor",
    poster: "https://via.placeholder.com/200x300",
    overview: "A thrilling mystery set in a haunted mansion.",
    releaseDate: "2022-10-31",
  },
  {
    id: 3,
    title: "Love in Time",
    poster: "https://via.placeholder.com/200x300",
    overview: "A romantic tale of time-traveling lovers.",
    releaseDate: "2024-02-14",
  },
];

// App Component
const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="p-4">
        <h2 className="text-white text-2xl font-bold mb-4">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))}
        </div>
      </main>
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};
export default App;
