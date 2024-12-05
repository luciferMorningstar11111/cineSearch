import { useQuery } from "react-query";
import fetchMovies from "src/apis/movies";

const useAllMovies = (searchTerm, page = 1) =>
  useQuery({
    queryKey: ["movies", { searchTerm, page }],
    queryFn: ({ queryKey }) => {
      const { searchTerm, page } = queryKey[1];

      return fetchMovies.fetchAllMovies(searchTerm, page);
    },
    enabled: !!searchTerm,
    keepPreviousData: true,
  });

const useMovie = title =>
  useQuery({
    queryKey: ["movie", { title }],
    queryFn: ({ queryKey }) => {
      const { title } = queryKey[1];

      return fetchMovies.fetchMovieByTitle(title);
    },
    enabled: !!title,
  });

const useMovies = { useAllMovies, useMovie };

export default useMovies;
