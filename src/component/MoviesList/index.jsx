import React, { useState, useRef, useEffect } from "react";

import { Pagination, Spinner, Input } from "@bigbinary/neetoui";
import { Search } from "neetoicons";
import { Helmet } from "react-helmet";
import useDebounce from "src/hooks/debounce";
import useMovies from "src/hooks/useMovies";
import useMovieStore from "stores/movieStore";

import MovieCard from "../movieCard";
import VisitedMoviesList from "../visitedMoviesList";

const MoviesList = () => {
  const searchTerm = useMovieStore(state => state.searchTerm);
  const setSearchTerm = useMovieStore(state => state.setSearchTerm);
  const inputRef = useRef(null);
  const debounceKey = useDebounce(searchTerm);
  const visitedMovies = useMovieStore(state => state.visitedMovies);
  const visitedMoviesSize = visitedMovies.length;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        event.preventDefault(); // Prevent default browser behavior for "/"
        inputRef.current?.focus(); // Focus the input field
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      <div className="flex h-auto">
        {/* Movies Section (Adjustable width) */}
        <div className={visitedMoviesSize > 0 ? "h-auto w-3/4 " : "w-full "}>
          <div className="border-black-300 mx-auto w-3/4 rounded border">
            <Input
              placeholder="search"
              prefix={<Search />}
              ref={inputRef}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 overflow-auto">
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} {...movie} />
            ))}
          </div>
          <div className="m-4 flex w-auto justify-end ">
            <Pagination
              count={totalItems}
              navigate={page => setCurrentPage(page)}
              pageNo={currentPage}
              pageSize={10}
            />
          </div>
        </div>
        {/* Visited Movies Section (Hidden if no visited movies) */}
        {visitedMoviesSize > 0 && (
          <div className="fixed right-0 top-0 w-1/4  border-gray-500 py-5">
            <VisitedMoviesList />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
