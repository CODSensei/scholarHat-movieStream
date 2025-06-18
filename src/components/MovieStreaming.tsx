import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useMovieStore } from "../store/movieStore";
import Navbar from "./Navbar";
import MovieModal from "./MovieModal";
import Home from "./Home";
import Favorites from "./Favorites";
import ErrorBoundary from "./ErrorBoundary";

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
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* <Route path="/genre/:genreName" element={<Home />} /> */}
        </Routes>
        <MovieModal />
      </div>
    </ErrorBoundary>
  );
};

export default MovieStreaming;
