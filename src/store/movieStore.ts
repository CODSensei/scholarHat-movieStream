import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MovieTypes, Genre } from "../utils/interfaces";
import {
  getMovies,
  getGenres,
  searchMovies,
  getMoviesByGenre,
} from "../api/api";

interface MovieState {
  movies: MovieTypes[];
  genres: Genre[];
  searchResults: MovieTypes[];
  selectedMovie: MovieTypes | null;
  searchQuery: string;
  favorites: number[];
  loading: boolean;
  selectedGenre: string;
  genreMovies: MovieTypes[];
  genreLoading: boolean;

  setMovies: (movies: MovieTypes[]) => void;
  setGenres: (genres: Genre[]) => void;
  setSearchResults: (results: MovieTypes[]) => void;
  setSelectedMovie: (movie: MovieTypes | null) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setSelectedGenre: (genre: string) => void;
  setGenreMovies: (movies: MovieTypes[]) => void;
  setGenreLoading: (loading: boolean) => void;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  toggleFavorite: (id: number) => void;
  fetchInitialData: () => Promise<void>;
  searchMoviesAsync: (query: string) => Promise<void>;
  fetchMoviesByGenre: (genreId: number) => Promise<void>;
  getMoviesWithGenres: () => MovieTypes[];
  getSearchResultsWithGenres: () => MovieTypes[];
  getFavoriteMovies: () => MovieTypes[];
  getFilteredMovies: (movies: MovieTypes[]) => MovieTypes[];
  getGenreName: (genreIds: number[]) => string;
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      movies: [],
      genres: [],
      searchResults: [],
      selectedMovie: null,
      searchQuery: "",
      favorites: [],
      loading: false,
      selectedGenre: "All",
      genreMovies: [],
      genreLoading: false,

      setMovies: (movies) => set({ movies }),
      setGenres: (genres) => set({ genres }),
      setSearchResults: (results) => set({ searchResults: results }),
      setSelectedMovie: (movie) => set({ selectedMovie: movie }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setLoading: (loading) => set({ loading }),
      setSelectedGenre: (genre) => set({ selectedGenre: genre }),
      setGenreMovies: (movies) => set({ genreMovies: movies }),
      setGenreLoading: (loading) => set({ genreLoading: loading }),

      addToFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        })),

      removeFromFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      fetchInitialData: async () => {
        try {
          set({ loading: true });
          const [moviesResponse, genresResponse] = await Promise.all([
            getMovies(),
            getGenres(),
          ]);
          if (moviesResponse.data?.results) {
            const formattedMovies = moviesResponse.data.results.map(
              (movie: any) => ({
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image",
                overview: movie.overview,
                releaseDate: movie.release_date,
                genre: movie.genre_ids?.[0] || "Unknown",
                genre_ids: movie.genre_ids || [],
              })
            );
            set({ movies: formattedMovies });
          }
          if (genresResponse.data?.genres)
            set({ genres: genresResponse.data.genres });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          set({ loading: false });
        }
      },

      searchMoviesAsync: async (query: string) => {
        if (!query.trim()) {
          set({ searchResults: [] });
          return;
        }
        try {
          const response = await searchMovies(query);
          if (response.data?.results) {
            const formattedResults = response.data.results.map(
              (movie: any) => ({
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image",
                overview: movie.overview,
                releaseDate: movie.release_date,
                genre: movie.genre_ids?.[0] || "Unknown",
                genre_ids: movie.genre_ids || [],
              })
            );
            set({ searchResults: formattedResults });
          }
        } catch (error) {
          console.error("Error searching movies:", error);
          set({ searchResults: [] });
        }
      },

      fetchMoviesByGenre: async (genreId: number) => {
        try {
          set({ genreLoading: true });
          const response = await getMoviesByGenre(genreId);
          if (response.data?.results) {
            const formattedMovies = response.data.results.map((movie: any) => ({
              id: movie.id,
              title: movie.title,
              poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image",
              overview: movie.overview,
              releaseDate: movie.release_date,
              genre: get().getGenreName(movie.genre_ids || []),
              genre_ids: movie.genre_ids || [],
            }));
            set({ genreMovies: formattedMovies });
          }
        } catch (error) {
          console.error("Error fetching genre movies:", error);
          set({ genreMovies: [] });
        } finally {
          set({ genreLoading: false });
        }
      },

      getGenreName: (genreIds: number[]) => {
        const { genres } = get();
        if (!genreIds || genreIds.length === 0) return "Unknown";
        const genre = genres.find((g) => g.id === genreIds[0]);
        return genre ? genre.name : "Unknown";
      },

      getMoviesWithGenres: () => {
        const { movies, getGenreName } = get();
        return movies.map((movie) => ({
          ...movie,
          genre: getGenreName(movie.genre_ids || []),
        }));
      },

      getSearchResultsWithGenres: () => {
        const { searchResults, getGenreName } = get();
        return searchResults.map((movie) => ({
          ...movie,
          genre: getGenreName(movie.genre_ids || []),
        }));
      },

      getFavoriteMovies: () => {
        const { getMoviesWithGenres, favorites } = get();
        return getMoviesWithGenres().filter((movie) =>
          favorites.includes(movie.id)
        );
      },

      getFilteredMovies: (movies: MovieTypes[]) => {
        const { searchQuery } = get();
        return movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },
    }),
    {
      name: "movie-store",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
