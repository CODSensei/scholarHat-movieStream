// src/components/Home.tsx
import React, { useEffect, useRef } from "react";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const {
    movies,
    genres,
    selectedGenre,
    genreMovies,
    setSelectedGenre,
    fetchMoviesByGenre,
    getFilteredMovies,
  } = useMovieStore();
  const navigate = useNavigate();

  // Create refs for each genre section
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const popularSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (selectedGenre === "All") {
        setSelectedGenre("All");
        return;
      }
      const selectedGenreObj = genres.find((g) => g.name === selectedGenre);
      if (selectedGenreObj) await fetchMoviesByGenre(selectedGenreObj.id);
    };
    fetchGenreMovies();
  }, [selectedGenre, movies, genres, fetchMoviesByGenre]);

  // Function to scroll to a specific section
  const scrollToSection = (genreId: number | string) => {
    if (genreId === "popular") {
      popularSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      sectionRefs.current[genreId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const filteredMovies = getFilteredMovies(
    genreMovies.length ? genreMovies : movies
  );
  const genreOptions = ["All", ...genres.map((genre) => genre.name)];

  return (
    <main className="p-6">
      {/* Genre Navigation Buttons */}
      <div className="mb-8 flex flex-row items-center justify-between">
        <div className="flex flex-wrap gap-3  items-center">
          {/* Popular Movies Button */}
          <button
            onClick={() => scrollToSection("popular")}
            className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
          >
            Popular Movies
          </button>

          {/* Genre Buttons */}
          {genres.slice(0, 4).map((genre) => (
            <button
              key={genre.id}
              onClick={() => scrollToSection(genre.id)}
              className="px-4 py-2 bg-gradient-to-r  text-white rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium border border-gray-600 hover:border-gray-500"
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Genre Filter Dropdown */}

        <select
          value={selectedGenre}
          onChange={(e) => {
            const newGenre = e.target.value;
            setSelectedGenre(newGenre);
            if (newGenre === "All") {
              navigate("/genre/all");
            } else {
              const selectedGenreObj = genres.find((g) => g.name === newGenre);
              if (selectedGenreObj) {
                navigate(`/genre/${selectedGenreObj.id}`);
              }
            }
          }}
          className="p-3 rounded-lg bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Popular Movies Section */}
      <section
        className="mb-8"
        ref={(el) => {
          popularSectionRef.current = el;
        }}
        id="popular-section"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-extrabold">Popular Movies</h2>
          <Link to="/genre/all" className="text-blue-400 hover:underline">
            See More
          </Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {filteredMovies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Genre Sections */}
      {genres.slice(0, 4).map((genre) => {
        // Get movies for this specific genre
        const genreSpecificMovies = movies.filter(
          (movie) => movie.genre_ids && movie.genre_ids.includes(genre.id)
        );

        // Apply any additional filtering (like search)
        const filteredGenreMovies = getFilteredMovies(genreSpecificMovies);

        return (
          <section
            key={genre.id}
            className="mb-8"
            ref={(el) => {
              sectionRefs.current[genre.id] = el;
            }}
            id={`genre-section-${genre.id}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-extrabold">{genre.name}</h2>
              <Link
                to={`/genre/${genre.id}`}
                className="text-blue-400 hover:underline"
              >
                See More
              </Link>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
              {filteredGenreMovies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {filteredGenreMovies.length === 0 && (
              <div className="text-gray-400 text-center py-4">
                No movies found for {genre.name}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
};

export default Home;
