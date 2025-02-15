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
      showModal: false,
      setShowModal: value => set({ showModal: value }),
      favouriteMovies: [],
      addFavouriteMovies: movie =>
        set(state => ({
          favouriteMovies: state.favouriteMovies.some(
            m => m.Title === movie.Title
          )
            ? state.favouriteMovies
            : [...state.favouriteMovies, movie],
        })),
      removeFavouriteMovies: title =>
        set(state => ({
          favouriteMovies: state.favouriteMovies.filter(
            favMovie => favMovie.Title !== title
          ),
        })),

      addMovies: movies =>
        set(state => ({
          movies: [...state.movies, ...movies],
        })),
      movieModalName: "",
      setMovieModalName: movieModalName => set({ movieModalName }),
    }),
    {
      name: "movie-store",
      getStorage: () => localStorage,
    }
  )
);

export default useMovieStore;
