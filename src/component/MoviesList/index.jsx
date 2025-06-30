import React, { useState, useRef, useEffect } from "react";

import { Filter } from "@bigbinary/neeto-icons";
import { Pagination, Spinner, Input } from "@bigbinary/neetoui";
import { Search, Close } from "neetoicons";
import { Helmet } from "react-helmet";
import FilterMovies from "src/component/FilterMovies";
import useDebounce from "src/hooks/debounce";
import useMovies from "src/hooks/useMovies";
import useMovieStore from "stores/movieStore";

import MovieCard from "../movieCard";
import VisitedMoviesList from "../visitedMoviesList";

const MoviesList = () => {
  const searchTerm = useMovieStore(state => state.searchTerm);
  const setSearchTerm = useMovieStore(state => state.setSearchTerm);
  const inputRef = useRef(null);
  const debounceKey = useDebounce(searchTerm.trim());
  const visitedMovies = useMovieStore(state => state.visitedMovies);
  const visitedMoviesSize = visitedMovies.length;
  const [filterVisible, setFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFocused, setIsFocused] = useState(false);

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

  const [filterValues, setFilterValues] = useState({ year: "", type: "" });

  const onApply = values => {
    setFilterValues({
      ...values,
      type: values.type.length === 2 ? "" : values.type[0] || "",
    });
  };

  const handleClearSearchTerm = () => {
    console.log("clearing search term");
    setSearchTerm("");
    console.log(searchTerm, "searchTerm");
    // setIsFocused(false);
  };

  const { data, isLoading, isError, error } = useMovies.useAllMovies(
    debounceKey,
    currentPage,
    filterValues.year, // Use state value
    filterValues.type // Use state value
  );

  //for filtering the movie data
  const movies = data?.Search || [];

  const totalItems = parseInt(data?.totalResults || 0, 10);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="App relative mx-auto min-h-screen ">
      <Helmet>
        <title>Movies</title>
      </Helmet>
      <div className="mx-auto flex h-auto">
        {/* Movies Section (Adjustable width) */}
        <div
          className={`h-auto w-full ${visitedMoviesSize > 0 ? "lg:w-3/4" : ""}`}
        >
          <div className="relative w-full  lg:mx-auto lg:w-3/4">
            {/* Search Input and Filter Icon */}
            <div className=" flex items-center gap-3  px-3 py-2">
              {/* <Search className="text-gray-500" /> */}
              <Input
                className="focus:outline-none w-full"
                placeholder="Search"
                prefix={<Search />}
                ref={inputRef}
                value={searchTerm}
                suffix={
                  isFocused ? <Close onClick={handleClearSearchTerm} /> : null
                }
                onBlur={() => setIsFocused(false)}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)} // Set focus state to true
              />
              <Filter
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setFilterVisible(!filterVisible)}
              />
            </div>
            <FilterMovies
              className={`${filterVisible ? "block" : "hidden"}`}
              filterVisible={filterVisible}
              onApply={onApply}
              onClose={() => setFilterVisible(false)}
            />
          </div>
          <div className=" mt-8 flex flex-wrap justify-center gap-6 overflow-auto">
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
          <div className="fixed right-0 top-0 hidden w-1/4 border-gray-500 py-5 lg:block">
            <VisitedMoviesList />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
