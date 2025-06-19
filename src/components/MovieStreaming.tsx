import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Favorites from "./Favorites";
import { useMovieStore } from "../store/movieStore";
import GenrePage from "./GenrePage";

const MovieStreaming: React.FC = () => {
  const { loading, fetchInitialData } = useMovieStore();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
      </Routes>
    </div>
  );
};

export default MovieStreaming;
