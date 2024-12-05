import React, { useState } from "react";

import { Pagination } from "@bigbinary/neetoui";
import { Spinner } from "@bigbinary/neetoui";
import useDebounce from "src/hooks/debounce";
import useMovies from "src/hooks/useMovies";
import useMovieStore from "stores/movieStore";

import Header from "../header";
import MovieCard from "../movieCard";
import VisitedMoviesList from "../visitedMoviesList";

const MoviesList = () => {
  const { searchTerm, setSearchTerm } = useMovieStore();
  const { visitedMovies, addVisitedMovies } = useMovieStore();
  const visitedMoviesSize = visitedMovies.length;
  const [currentPage, setCurrentPage] = useState(1);
  const debounceKey = useDebounce(searchTerm);

  const { data, isLoading, isError, error } = useMovies.useAllMovies(
    debounceKey,
    currentPage
  );

  const movies = data?.Search || [];
  const totalItems = parseInt(data?.totalResults || 0, 10);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="App min-h-screen bg-gray-100">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="col-auto m-8 flex flex-wrap justify-center gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
        <div className="m-8 flex flex-wrap justify-center gap-6">
          {visitedMoviesSize && <VisitedMoviesList />}
        </div>
      </div>
      <div className="m-4 flex w-auto justify-end">
        <Pagination
          count={totalItems}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default MoviesList;
