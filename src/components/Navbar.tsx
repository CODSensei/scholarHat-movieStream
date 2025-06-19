import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMovieStore } from "../store/movieStore";

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, searchMoviesAsync } = useMovieStore();
  const location = useLocation();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMoviesAsync(searchQuery);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchMoviesAsync]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg fixed w-full z-50 transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-400 hover:text-blue-300"
        >
          🎬 MovieStream
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies..."
              className="p-2 pl-4 pr-10 rounded-lg bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className={`hover:text-blue-400 ${
                    location.pathname === "/"
                      ? "text-blue-400 font-semibold"
                      : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className={`hover:text-blue-400 ${
                    location.pathname === "/favorites"
                      ? "text-blue-400 font-semibold"
                      : ""
                  }`}
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
