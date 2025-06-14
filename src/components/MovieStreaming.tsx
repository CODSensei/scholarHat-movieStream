//src/components/MovieStreaming.tsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import type { MovieTypes } from "../utils/interfaces";
import Navbar from "./Navbar";
import MovieModal from "./MovieModal";
import Home from "./Home";
import Genres from "./Genres";
import Favorites from "./Favorites";
import { getGenres, getMovies, searchMovies } from "../api/api";

const MovieStreaming: React.FC = () => {
  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieTypes | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<MovieTypes[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

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

  // Fetch popular movies and genres on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [moviesResponse, genresResponse] = await Promise.all([
          getMovies(),
          getGenres(),
        ]);

        if (moviesResponse.data && moviesResponse.data.results) {
          const formattedMovies = moviesResponse.data.results.map(
            (movie: any) => ({
              id: movie.id,
              title: movie.title,
              poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image",
              overview: movie.overview,
              releaseDate: movie.release_date,
              genre: movie.genre_ids?.[0] || "Unknown", // We'll map this properly later
              genre_ids: movie.genre_ids || [],
            })
          );
          setMovies(formattedMovies);
        }

        if (genresResponse.data && genresResponse.data.genres) {
          setGenres(genresResponse.data.genres);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await searchMovies(searchQuery);
          if (response.data && response.data.results) {
            const formattedResults = response.data.results.map(
              (movie: any) => ({
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image",
                overview: movie.overview,
                releaseDate: movie.release_date,
                genre: movie.genre_ids?.[0] || "Unknown",
                genre_ids: movie.genre_ids || [],
              })
            );
            setSearchResults(formattedResults);
          }
        } catch (error) {
          console.error("Error searching movies:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(handleSearch, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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

  // Get genre name by ID
  const getGenreName = (genreIds: number[]) => {
    if (!genreIds || genreIds.length === 0) return "Unknown";
    const genre = genres.find((g) => g.id === genreIds[0]);
    return genre ? genre.name : "Unknown";
  };

  // Add genre names to movies
  const moviesWithGenres = movies.map((movie) => ({
    ...movie,
    genre: getGenreName(movie.genre_ids || []),
  }));

  const searchResultsWithGenres = searchResults.map((movie) => ({
    ...movie,
    genre: getGenreName(movie.genre_ids || []),
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

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
              movies={searchQuery ? searchResultsWithGenres : moviesWithGenres}
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
              movies={moviesWithGenres}
              genres={genres}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              movies={moviesWithGenres}
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
