//src/api/api.ts
import axios from "axios";
import { formatMovie } from "../utils/utils";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_API_KEY
}`;

// Get popular movies
export const getMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(`/movie/popular?page=${page}`);
    return {
      ...response,
      data: {
        ...response.data,
        results: response.data.results.map(formatMovie),
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { data: { results: [], total_pages: 1 } };
  }
};

// Get genres
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
export const searchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    );
    return {
      ...response,
      data: {
        ...response.data,
        results: response.data.results.map(formatMovie),
      },
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    return { data: { results: [], total_pages: 1 } };
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: number, page: number = 1) => {
  try {
    const response = await axios.get(
      `/discover/movie?with_genres=${genreId}&page=${page}`
    );
    return {
      ...response,
      data: {
        ...response.data,
        results: response.data.results.map(formatMovie),
      },
    };
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return { data: { results: [], total_pages: 1 } };
  }
};

// Get movie details
export const getMovieDetails = async (movieId: number | unknown) => {
  try {
    const response = await axios.get(
      `/movie/${movieId}?append_to_response=videos`
    );
    return {
      ...response,
      data: {
        ...formatMovie(response.data),
        videos: response.data.videos.results.filter(
          (video: any) => video.site === "YouTube" && video.type === "Trailer"
        ),
      },
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
