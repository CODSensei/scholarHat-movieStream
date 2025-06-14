//src/api/api.ts
import axios from "axios";

// import dotenv from "dotenv/config";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_API_KEY
}`;

// Get popular movies
export const getMovies = async () => {
  try {
    const response = await axios.get("/movie/popular");
    return response;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { data: { results: [] } };
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get("/genre/movie/list");
    return response;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { data: { genres: [] } };
  }
};

// Search movies
export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      `/search/movie?query=${encodeURIComponent(query)}`
    );
    return response;
  } catch (error) {
    console.error("Error searching movies:", error);
    return { data: { results: [] } };
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: number) => {
  try {
    const response = await axios.get(`/discover/movie?with_genres=${genreId}`);
    return response;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return { data: { results: [] } };
  }
};

// Get movie details
export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`/movie/${movieId}`);
    return response;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
