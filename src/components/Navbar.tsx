//src/components/Navbar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();
  // console.log("Location :", location);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          <h1 className="text-2xl font-bold text-blue-400">🎬 MovieStream</h1>
        </Link>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies..."
              className="p-2 pl-4 pr-10 rounded-lg bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className={`hover:text-blue-400 transition-colors ${
                    isActive("/") ? "text-blue-400 font-semibold" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/genres"
                  className={`hover:text-blue-400 transition-colors ${
                    isActive("/genres") ? "text-blue-400 font-semibold" : ""
                  }`}
                >
                  Genres
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className={`hover:text-blue-400 transition-colors ${
                    isActive("/favorites") ? "text-blue-400 font-semibold" : ""
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
