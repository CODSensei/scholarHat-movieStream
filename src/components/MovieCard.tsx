import React, { useState, useEffect, useRef, memo } from "react";
import { useMovieStore } from "../store/movieStore";
import type { MovieTypes } from "../utils/interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MovieCard = memo(
  ({
    movie,
    onClick,
    onToggleFavorite,
    isFavorite,
  }: {
    movie: MovieTypes;
    onClick: (movieId: number) => void;
    onToggleFavorite: (id: number) => void;
    isFavorite: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { fetchMovieDetails, selectedMovie } = useMovieStore();
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (isHovered) {
        fetchMovieDetails(movie.id);
      }
    }, [isHovered, movie.id, fetchMovieDetails]);

    useEffect(() => {
      // Cleanup timeout on component unmount
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }, []);

    const handleMouseEnter = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(true);
      }, 5000); // 5-second delay
    };

    const handleMouseLeave = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setIsHovered(false);
    };

    const trailer = selectedMovie?.id === movie.id && selectedMovie.videos?.[0];

    return (
      <div
        className="relative flex-shrink-0 w-64 h-96 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <LazyLoadImage
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
          effect="blur"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          {isHovered && trailer ? (
            <iframe
              className="w-full h-48"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
              title={movie.title}
              allow="autoplay"
            />
          ) : (
            <div className="h-48"></div>
          )}
          <div>
            <h3 className="text-white text-lg font-semibold truncate">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-sm">{movie.releaseDate}</p>
            <p className="text-gray-300 text-sm truncate">{movie.genre}</p>
            <p className="text-gray-300 text-sm">
              Rating: {movie.vote_average?.toFixed(1)}
            </p>
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  if (trailer) {
                    window.open(
                      `https://www.youtube.com/watch?v=${trailer.key}`,
                      "_blank"
                    );
                  }
                }}
              >
                Play Trailer
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(movie.id);
                  onToggleFavorite(movie.id);
                }}
                className={`text-xl ${
                  isFavorite ? "text-yellow-400" : "text-gray-200"
                }`}
              >
                {isFavorite ? "★" : "☆"}
              </button>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => onClick(movie.id)}
        ></div>
      </div>
    );
  }
);

export default MovieCard;
