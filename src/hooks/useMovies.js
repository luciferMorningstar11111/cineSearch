import { useQuery } from "react-query";
import fetchMovies from "src/apis/movies";

const useAllMovies = (searchTerm, page = 1, year = "", type = "") =>
  useQuery({
    queryKey: ["movies", { searchTerm, page, year, type }],
    queryFn: ({ queryKey }) => {
      const { searchTerm, page, year, type } = queryKey[1]; // Extract all parameters

      return fetchMovies.fetchAllMovies(searchTerm, page, year, type); // Pass all params
    },
    enabled: !!searchTerm, // Prevents query if searchTerm is empty
    keepPreviousData: true, // Keeps previous data while fetching new results
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
