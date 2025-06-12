import type React from "react";

// Header Component
const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">MovieStream</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Genres
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Favorites
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
