//src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Header Component
const Navbar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <Link to="/" className="hover:text-gray-300">
        <h1 className="text-2xl font-bold">MovieStream</h1>
      </Link>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          className="p-2 rounded-lg bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/genres" className="hover:text-gray-300">
                Genres
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-gray-300">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
