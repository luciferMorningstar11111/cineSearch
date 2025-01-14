import React, { useRef } from "react";

import useMovieStore from "stores/movieStore";

const VisitedMoviesList = () => {
  const visitedMovies = useMovieStore(state => state.visitedMovies);
  const movieModalName = useMovieStore(state => state.movieModalName);

  // Ref for the container div
  const listRef = useRef(null);

  const handleScrollToMovie = () => {
    // Find the element matching movieModalName
    const movieElement = Array.from(listRef.current.children).find(
      child => child.textContent === movieModalName
    );

    if (movieElement) {
      movieElement.scrollIntoView({
        behavior: "instant",
        block: "start", // Align it nearest within the container
        inline: "nearest",
      });
    }
  };

  // Automatically scroll to the movie when the component renders or movieModalName changes
  React.useEffect(() => {
    if (movieModalName) {
      handleScrollToMovie();
    }
  }, [movieModalName]);

  return (
    <div className="h-300px relative ml-4 w-full">
      {" "}
      {/* Fixed height for parent */}
      {/* Header inside the scrollable area */}
      <h3 className="sticky top-0 z-10 bg-white text-center font-bold text-gray-800">
        View History
      </h3>
      {/* Scrollable content */}
      <div
        className="flex flex-col  overflow-y-auto "
        ref={listRef}
        style={{ height: "calc(100vh - 50px)" }}
      >
        {visitedMovies.map(movie => (
          <p
          key={movie}
          className={`mb-4 flex h-20 w-full items-center justify-center rounded-md ${
            movie === movieModalName
            ? "bg-blue-600 text-white" // Selected item color
            : "bg-gray-200 text-gray-800" // Default item color
          }`}
        >
          {movie}
        </p>

        ))}
      </div>
    </div>
  );
};

export default VisitedMoviesList;
