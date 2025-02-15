import React, { useRef, useEffect, useCallback } from "react";

import useMovieStore from "stores/movieStore";

const VisitedMoviesList = () => {
  const visitedMovies = useMovieStore(state => state.visitedMovies);
  const movieModalName = useMovieStore(state => state.movieModalName);

  // Ref for the scrollable container
  const listRef = useRef(null);

  // Function to scroll to the selected movie
  const handleScrollToMovie = useCallback(() => {
    if (!listRef.current) return;

    // Find the movie element inside the container
    const movieElement = Array.from(listRef.current.children).find(
      child => child.textContent === movieModalName
    );

    if (movieElement) {
      movieElement.scrollIntoView({
        behavior: "smooth", // Use smooth scrolling
        block: "center",
        inline: "nearest",
      });
    }
  }, [movieModalName]);

  // Scroll to the movie when movieModalName changes
  useEffect(() => {
    handleScrollToMovie();
  }, [movieModalName, handleScrollToMovie]);

  return (
    <div className="relative ml-4 h-[300px] w-full rounded-md border border-gray-300 shadow-lg">
      {/* Header */}
      <h3 className="sticky top-0 z-10 border-b bg-white py-3 text-center font-bold text-gray-900">
        View History
      </h3>
      {/* Scrollable content */}
      <div
        className="flex flex-col space-y-3 overflow-y-auto p-2"
        ref={listRef}
        style={{ height: "calc(100vh - 50px)" }}
      >
        {visitedMovies.map(movie => (
          <p
            className="flex h-16 items-center justify-center rounded-lg px-4 text-center font-medium shadow-md transition-colors"
            key={movie}
            style={{
              backgroundColor: movie === movieModalName ? "#2f62ff" : "#E4E4F8",
              color: movie === movieModalName ? "#ffffff" : "#1f2937", // Gray-900
            }}
          >
            {movie}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VisitedMoviesList;
