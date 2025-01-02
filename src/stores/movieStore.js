import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieStore = create(
  persist(
    set => ({
      movies: [],
      searchTerm: "",
      setSearchTerm: searchTerm => set({ searchTerm }),
      visitedMovies: [],

      addVisitedMovies: movie =>
        set(state => ({
          visitedMovies: state.visitedMovies.includes(movie)
            ? state.visitedMovies
            : [...state.visitedMovies, movie],
        })),
      addMovies: movies =>
        set(state => ({
          movies: [...state.movies, ...movies],
        })),
      movieModalName: "spi",
      setMovieModalName: movieModalName => set({ movieModalName }),
    }),
    {
      name: "movie-store",
      getStorage: () => localStorage,
    }
  )
);

export default useMovieStore;
