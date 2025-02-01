import React, { useState } from "react";

import { Pagination, Spinner } from "@bigbinary/neetoui";
import { Helmet } from "react-helmet";
import useDebounce from "src/hooks/debounce";
import useMovies from "src/hooks/useMovies";
import useMovieStore from "stores/movieStore";

import Header from "../header";
import MovieCard from "../movieCard";
import VisitedMoviesList from "../visitedMoviesList";

const MoviesList = () => {
  const searchTerm = useMovieStore(state => state.searchTerm);
  const setSearchTerm = useMovieStore(state => state.setSearchTerm);

  const visitedMovies = useMovieStore(state => state.visitedMovies);
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
    <div className="App relative min-h-screen">
      <Helmet>
        <title>Movies</title>
      </Helmet>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex h-screen">
        {/* Movies Section (3 parts) */}
        <div className="w-3/4">
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} {...movie} />
            ))}
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
        {/* Visited Movies Section (1 part) */}
        <div className=" fixed   right-0 top-0  w-1/4  border-l-2  border-gray-500 py-5 ">
          {/* <h3 className=" text-center   font-bold text-gray-800  sticky top-0 z-05  bg-white ">View History</h3> */}

          {visitedMoviesSize && <VisitedMoviesList />}
        </div>
      </div>
      {/* Pagination */}
      {/* <div className="m-4 flex w-auto justify-end">
        <Pagination count={totalItems}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage}
          pageSize={10}
        />
      </div> */}
    </div>
  );
};

export default MoviesList;
