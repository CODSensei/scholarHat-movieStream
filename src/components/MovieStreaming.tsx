//src/components/MovieStreaming.tsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import type { MovieTypes } from "../utils/interfaces";
import Navbar from "./Navbar";
import MovieModal from "./MovieModal";
import Home from "./Home";
// import Genres from "./Genres";
import Favorites from "./Favorites";
import { getMovies } from "../api/api";
import Genres from "./Genres";

const MovieStreaming: React.FC = () => {
  const [movies, setMovies] = useState<MovieTypes[] | null | unknown[]>([]);

  // Mock movie data with genres
  const mockMovies: MovieTypes[] = [
    {
      id: 1,
      title: "The Cosmic Adventure",
      poster: "https://via.placeholder.com/200x300",
      overview: "A sci-fi epic about explorers in a distant galaxy.",
      releaseDate: "2023-05-12",
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "Mystery Manor",
      poster: "https://via.placeholder.com/200x300",
      overview: "A thrilling mystery set in a haunted mansion.",
      releaseDate: "2022-10-31",
      genre: "Mystery",
    },
    {
      id: 3,
      title: "Love in Time",
      poster: "https://via.placeholder.com/200x300",
      overview: "A romantic tale of time-traveling lovers.",
      releaseDate: "2024-02-14",
      genre: "Romance",
    },
    {
      id: 4,
      title: "The Cosmic Adventure",
      poster: "https://via.placeholder.com/200x300",
      overview: "A sci-fi epic about explorers in a distant galaxy.",
      releaseDate: "2023-05-12",
      genre: "Sci-Fi",
    },
    {
      id: 5,
      title: "The Cosmic Adventure",
      poster: "https://via.placeholder.com/200x300",
      overview: "A sci-fi epic about explorers in a distant galaxy.",
      releaseDate: "2023-05-12",
      genre: "Sci-Fi",
    },
    {
      id: 6,
      title: "The Cosmic Adventure",
      poster: "https://via.placeholder.com/200x300",
      overview: "A sci-fi epic about explorers in a distant galaxy.",
      releaseDate: "2023-05-12",
      genre: "Sci-Fi",
    },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const value: any = await getMovies();
        console.log(value.data);
        setMovies(value.data.results);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovies();
  }, []);

  const [selectedMovie, setSelectedMovie] = useState<MovieTypes | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleMovieClick = (movie: MovieTypes) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchQuery={searchQuery}
              favorites={favorites}
              onMovieClick={handleMovieClick}
              onToggleFavorite={toggleFavorite}
              mockMovies={mockMovies}
            />
          }
        />
        <Route
          path="/genres"
          element={
            <Genres
              searchQuery={searchQuery}
              favorites={favorites}
              onMovieClick={handleMovieClick}
              onToggleFavorite={toggleFavorite}
              mockMovies={mockMovies}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              mockMovies={mockMovies}
              searchQuery={searchQuery}
              favorites={favorites}
              onMovieClick={handleMovieClick}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};
export default MovieStreaming;
