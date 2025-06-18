// src/store/movieStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MovieTypes, Genre } from "../utils/interfaces";
import {
  getMovies,
  getGenres,
  searchMovies,
  getMoviesByGenre,
  getMovieDetails,
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
  genreMovies: { [key: string]: MovieTypes[] };
  genrePage: { [key: string]: number };
  genreTotalPages: { [key: string]: number };
  genreLoading: boolean;
  popularPage: number;
  popularTotalPages: number;
  searchPage: number;
  searchTotalPages: number;

  setMovies: (movies: MovieTypes[]) => void;
  setGenres: (genres: Genre[]) => void;
  setSearchResults: (results: MovieTypes[]) => void;
  setSelectedMovie: (movie: MovieTypes | null) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setSelectedGenre: (genre: string) => void;
  setGenreMovies: (genre: string, movies: MovieTypes[]) => void;
  setGenrePage: (genre: string, page: number) => void;
  setGenreTotalPages: (genre: string, totalPages: number) => void;
  setGenreLoading: (loading: boolean) => void;
  setPopularPage: (page: number) => void;
  setPopularTotalPages: (totalPages: number) => void;
  setSearchPage: (page: number) => void;
  setSearchTotalPages: (totalPages: number) => void;

  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  toggleFavorite: (id: number) => void;

  fetchInitialData: () => Promise<void>;
  searchMoviesAsync: (query: string, page?: number) => Promise<void>;
  fetchMoviesByGenre: (
    genreId: number,
    genreName: string,
    page?: number
  ) => Promise<void>;
  fetchPopularMovies: (page?: number) => Promise<void>;
  fetchMovieDetails: (movieId: number) => Promise<void>;

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
      genreMovies: {},
      genrePage: {},
      genreTotalPages: {},
      genreLoading: false,
      popularPage: 1,
      popularTotalPages: 1,
      searchPage: 1,
      searchTotalPages: 1,

      setMovies: (movies) => set({ movies }),
      setGenres: (genres) => set({ genres }),
      setSearchResults: (results) => set({ searchResults: results }),
      setSelectedMovie: (movie) => set({ selectedMovie: movie }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setLoading: (loading) => set({ loading }),
      setSelectedGenre: (genre) => set({ selectedGenre: genre }),
      setGenreMovies: (genre, movies) =>
        set((state) => ({
          genreMovies: { ...state.genreMovies, [genre]: movies },
        })),
      setGenrePage: (genre, page) =>
        set((state) => ({ genrePage: { ...state.genrePage, [genre]: page } })),
      setGenreTotalPages: (genre, totalPages) =>
        set((state) => ({
          genreTotalPages: { ...state.genreTotalPages, [genre]: totalPages },
        })),
      setGenreLoading: (loading) => set({ genreLoading: loading }),
      setPopularPage: (page) => set({ popularPage: page }),
      setPopularTotalPages: (totalPages) =>
        set({ popularTotalPages: totalPages }),
      setSearchPage: (page) => set({ searchPage: page }),
      setSearchTotalPages: (totalPages) =>
        set({ searchTotalPages: totalPages }),

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
          set({
            movies: moviesResponse.data.results,
            genres: genresResponse.data.genres,
            popularTotalPages: moviesResponse.data.total_pages,
          });
        } catch (error) {
          console.error("Error fetching initial data:", error);
        } finally {
          set({ loading: false });
        }
      },

      fetchPopularMovies: async (page = 1) => {
        try {
          set({ genreLoading: true });
          const response = await getMovies(page);
          set({
            movies:
              page === 1
                ? response.data.results
                : [...get().movies, ...response.data.results],
            popularPage: page,
            popularTotalPages: response.data.total_pages,
          });
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        } finally {
          set({ genreLoading: false });
        }
      },

      searchMoviesAsync: async (query: string, page = 1) => {
        if (!query.trim()) {
          set({ searchResults: [], searchPage: 1, searchTotalPages: 1 });
          return;
        }
        try {
          const response = await searchMovies(query, page);
          set({
            searchResults:
              page === 1
                ? response.data.results
                : [...get().searchResults, ...response.data.results],
            searchPage: page,
            searchTotalPages: response.data.total_pages,
          });
        } catch (error) {
          console.error("Error searching movies:", error);
          set({ searchResults: [], searchPage: 1, searchTotalPages: 1 });
        }
      },

      fetchMoviesByGenre: async (
        genreId: number,
        genreName: string,
        page = 1
      ) => {
        try {
          set({ genreLoading: true });
          const response = await getMoviesByGenre(genreId, page);
          set({
            genreMovies: {
              ...get().genreMovies,
              [genreName]:
                page === 1
                  ? response.data.results
                  : [
                      ...(get().genreMovies[genreName] || []),
                      ...response.data.results,
                    ],
            },
            genrePage: { ...get().genrePage, [genreName]: page },
            genreTotalPages: {
              ...get().genreTotalPages,
              [genreName]: response.data.total_pages,
            },
          });
        } catch (error) {
          console.error("Error fetching genre movies:", error);
          set({ genreMovies: { ...get().genreMovies, [genreName]: [] } });
        } finally {
          set({ genreLoading: false });
        }
      },

      fetchMovieDetails: async (movieId: number) => {
        try {
          const response = await getMovieDetails(movieId);
          if (response?.data) {
            set({ selectedMovie: response.data });
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
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
        const moviesWithGenres = getMoviesWithGenres();
        return moviesWithGenres.filter((movie) => favorites.includes(movie.id));
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
      partialize: (state) => ({
        favorites: state.favorites,
        selectedGenre: state.selectedGenre,
      }),
    }
  )
);

export const useMovies = () => useMovieStore((state) => state.movies);
export const useGenres = () => useMovieStore((state) => state.genres);
export const useSearchQuery = () => useMovieStore((state) => state.searchQuery);
export const useFavorites = () => useMovieStore((state) => state.favorites);
export const useLoading = () => useMovieStore((state) => state.loading);
export const useSelectedMovie = () =>
  useMovieStore((state) => state.selectedMovie);
export const useSearchResults = () =>
  useMovieStore((state) => state.searchResults);
export const useSelectedGenre = () =>
  useMovieStore((state) => state.selectedGenre);
export const useGenreMovies = () => useMovieStore((state) => state.genreMovies);
export const useGenreLoading = () =>
  useMovieStore((state) => state.genreLoading);
export const usePopularPage = () => useMovieStore((state) => state.popularPage);
export const usePopularTotalPages = () =>
  useMovieStore((state) => state.popularTotalPages);
export const useSearchPage = () => useMovieStore((state) => state.searchPage);
export const useSearchTotalPages = () =>
  useMovieStore((state) => state.searchTotalPages);
