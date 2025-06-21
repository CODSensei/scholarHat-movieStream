# Movie Streaming App Documentation

## Overview

This is a modern React-based movie streaming application that allows users to:

- Browse popular movies
- Search for specific movies
- Filter movies by genre
- View detailed movie information
- Mark movies as favorites
- Watch trailers and view IMDb pages

The app uses **The Movie Database (TMDB) API** to fetch movie data and provides a responsive, user-friendly interface.

## Project Structure

```
src/
├── api/
│   └── api.ts              # API calls to TMDB
├── components/
│   ├── Home.tsx            # Main homepage component
│   ├── MovieCard.tsx       # Individual movie card component
│   ├── MovieModal.tsx      # Movie details modal
│   ├── Navbar.tsx          # Navigation bar
│   ├── Favorites.tsx       # Favorites page
│   ├── GenrePage.tsx       # Genre-specific movie listing
│   └── MovieStreaming.tsx  # Main app wrapper
├── store/
│   └── movieStore.ts       # Zustand state management
└── utils/
    ├── interfaces.ts       # TypeScript type definitions
    └── utils.ts           # Utility functions
```

## Key Technologies

- **React 18** with TypeScript for type safety
- **Zustand** for state management (simpler alternative to Redux)
- **React Router** for navigation
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **The Movie Database (TMDB) API** for movie data

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API key (free registration at themoviedb.org)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with your TMDB API key:
   ```
   VITE_API_KEY=your_tmdb_api_key_here
   ```
4. Start development server: `npm run dev`

## Core Features

### 1. Movie Browsing

- **Popular Movies**: Displays trending movies on the homepage
- **Genre Sections**: Shows movies categorized by genre
- **Infinite Scrolling**: Horizontal scrollable movie lists

### 2. Search Functionality

- **Real-time Search**: Search movies as you type
- **Debounced Requests**: Optimized API calls with 500ms delay
- **Search Results**: Filtered results based on movie titles

### 3. Movie Details

- **Modal View**: Click any movie to see detailed information
- **Trailer Integration**: Direct links to YouTube trailers
- **IMDb Integration**: Quick access to IMDb pages
- **Movie Ratings**: Display TMDB ratings and vote counts

### 4. Favorites System

- **Local Storage**: Persist favorites across browser sessions
- **Toggle Favorites**: Easy add/remove with star icon
- **Favorites Page**: Dedicated page for saved movies

### 5. Genre Filtering

- **Genre Navigation**: Quick access buttons for popular genres
- **Genre Pages**: Dedicated pages for each genre
- **Dropdown Filter**: Complete genre selection dropdown

## Component Architecture

### Main Components

#### 1. MovieStreaming.tsx (Root Component)

```typescript
// Main app wrapper that handles:
- Initial data loading
- Route configuration
- Loading states
- Global layout
```

#### 2. Home.tsx (Homepage)

```typescript
// Features:
- Popular movies section
- Genre-specific sections
- Quick navigation buttons
- Genre filter dropdown
- Smooth scrolling between sections
```

#### 3. MovieCard.tsx (Movie Display)

```typescript
// Interactive movie cards with:
- Hover effects with movie details
- Favorite toggle functionality
- Trailer preview on hover
- Click to open detailed modal
```

#### 4. MovieModal.tsx (Movie Details)

```typescript
// Detailed movie information including:
- Full movie poster and details
- Plot overview
- Ratings and release information
- Trailer and IMDb links
```

#### 5. Navbar.tsx (Navigation)

```typescript
// Top navigation featuring:
- App branding
- Real-time search input
- Navigation links (Home, Favorites)
- Active route highlighting
```

## State Management

The app uses **Zustand** for state management, which provides a simpler alternative to Redux:

### Store Structure (`movieStore.ts`)

```typescript
interface MovieState {
  // Data
  movies: MovieTypes[]           // Popular movies
  movieDetails: TMDBMovieResponse | null  // Selected movie details
  genres: Genre[]                // Available genres
  searchResults: MovieTypes[]    // Search results
  genreMovies: MovieTypes[]      // Genre-filtered movies

  // UI State
  selectedMovie: MovieTypes | null  // Currently selected movie
  searchQuery: string            // Current search term
  favorites: number[]            // Favorite movie IDs
  selectedGenre: string          // Currently selected genre

  // Loading States
  loading: boolean               // Initial app loading
  genreLoading: boolean         // Genre movies loading
  detailsLoading: boolean       // Movie details loading

  // Actions (functions to modify state)
  setMovies, setGenres, fetchInitialData,
  searchMoviesAsync, toggleFavorite, etc.
}
```

### Key Store Features

1. **Persistence**: Favorites are saved to localStorage
2. **Async Actions**: Built-in API calling functions
3. **Computed Values**: Functions that derive data from state
4. **Type Safety**: Full TypeScript support

## API Integration

### API Configuration (`api.ts`)

```typescript
// Base configuration
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common.Authorization = `Bearer ${API_KEY}`;
```

### Available API Functions

1. **getMovies()** - Fetch popular movies
2. **getGenres()** - Fetch movie genres
3. **searchMovies(query)** - Search for movies
4. **getMoviesByGenre(genreId)** - Get movies by genre
5. **getMovieDetails(movieId)** - Get detailed movie info with trailers

### Data Formatting

All API responses are processed through `formatMovie()` utility to ensure consistent data structure:

```typescript
export const formatMovie = (movie: any): MovieTypes => ({
  id: movie?.id,
  title: movie?.title,
  poster: movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image",
  overview: movie?.overview,
  releaseDate: movie?.release_date,
  genre: movie?.genre_ids?.[0] || "Unknown",
  genre_ids: movie?.genre_ids || [],
});
```

## Code Walkthrough

### 1. App Initialization

When the app starts:

1. `MovieStreaming.tsx` calls `fetchInitialData()`
2. This simultaneously fetches popular movies and genres
3. Loading state is shown until data arrives
4. Main interface is rendered with navigation

### 2. Movie Display Flow

```typescript
// 1. Movies are fetched and stored in Zustand
const movies = await getMovies();
setMovies(formattedMovies);

// 2. Home component renders movie sections
{
  movies
    .slice(0, 10)
    .map((movie) => <MovieCard key={movie.id} movie={movie} />);
}

// 3. MovieCard handles interactions
const handleCardClick = () => {
  setSelectedMovie(movie);
  fetchMovieDetails(movie.id);
};
```

### 3. Search Implementation

```typescript
// Debounced search in Navbar
useEffect(() => {
  const debounceTimer = setTimeout(() => {
    searchMoviesAsync(searchQuery);
  }, 500);
  return () => clearTimeout(debounceTimer);
}, [searchQuery]);

// Search results are filtered in real-time
const getFilteredMovies = (movies: MovieTypes[]) => {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
```

### 4. Favorites System

```typescript
// Toggle favorite status
toggleFavorite: (id) =>
  set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((favId) => favId !== id)
      : [...state.favorites, id],
  }));

// Persist to localStorage via Zustand middleware
persist(
  (set, get) => ({
    /* store implementation */
  }),
  {
    name: "movie-store",
    partialize: (state) => ({ favorites: state.favorites }),
  }
);
```

## Best Practices Used

### 1. TypeScript Integration

- Comprehensive type definitions for all data structures
- Type-safe API responses and component props
- Interfaces for consistent data shapes

### 2. Performance Optimizations

- **Debounced Search**: Prevents excessive API calls
- **React.memo**: Prevents unnecessary re-renders
- **useMemo**: Expensive calculations cached
- **Lazy Loading**: Components loaded as needed

### 3. Error Handling

- Try-catch blocks around all API calls
- Graceful fallbacks for missing data
- Loading states for better UX

### 4. Code Organization

- Separation of concerns (API, components, state, utils)
- Reusable components and functions
- Consistent naming conventions

### 5. User Experience

- Responsive design for all screen sizes
- Smooth animations and transitions
- Intuitive navigation and interactions
- Loading states and error messages

### 6. State Management Best Practices

- Centralized state with clear data flow
- Immutable state updates
- Computed values for derived data
- Persistent storage for user preferences

This documentation should help beginners understand the codebase structure and how each piece works together to create a functional movie streaming application.
