import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieStore = create(
  persist(set => ({
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
  }))
);

export default useMovieStore;
