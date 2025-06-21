// src/components/MovieStreaming.tsx
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useMovieStore } from "../store/movieStore";
import Navbar from "./Navbar";
import MovieModal from "./MovieModal";
import Home from "./Home";
import Favorites from "./Favorites";
import GenrePage from "./GenrePage";

const MovieStreaming: React.FC = () => {
  const { loading, fetchInitialData } = useMovieStore();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center text-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg">Loading movies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
      </Routes>
      <MovieModal />
    </div>
  );
};

export default MovieStreaming;
