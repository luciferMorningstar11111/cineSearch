import React, { useState, useRef, useEffect, useCallback } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Alert, Typography } from "@bigbinary/neetoui";
import useMovieStore from "stores/movieStore";

const VisitedMoviesList = () => {
  const visitedMovies = useMovieStore(state => state.visitedMovies);
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const [shouldShowAllDeleteAlert, setShouldShowAllDeleteAlert] =
    useState(false);

  const removeVisitedMovies = useMovieStore(state => state.removeVisitedMovies);
  const removeAllVisitedMovies = useMovieStore(
    state => state.removeAllVisitedMovies
  );
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
    <div className="  h-[300px] w-full rounded-md border border-gray-300 shadow-lg">
      {/* Header */}
      <div className="sticky top-0 flex justify-between  px-2 py-3">
        <h3 className="px-3 font-bold text-gray-900">View History</h3>
        <h3
          className="cursor-pointer font-bold text-red-500"
          onClick={() => setShouldShowAllDeleteAlert(true)}
        >
          Clear all
        </h3>
        <Alert
          isOpen={shouldShowAllDeleteAlert}
          submitButtonLabel="Yes, remove"
          title="Remove item?"
          message={
            <Typography>
              You are removing all movies from history. Do you want to continue?
            </Typography>
          }
          onClose={() => setShouldShowAllDeleteAlert(false)}
          onSubmit={() => {
            removeAllVisitedMovies();
            setShouldShowAllDeleteAlert(false);
          }}
        />
      </div>
      {/* Scrollable content */}
      <div
        className="flex flex-col space-y-3 overflow-y-auto p-2"
        ref={listRef}
        style={{ height: "calc(100vh - 50px)" }}
      >
        {visitedMovies.map(movie => (
          <div
            className="flex justify-between rounded-lg px-4 py-1 text-center"
            key={movie}
            style={{
              backgroundColor: movie === movieModalName ? "#2f62ff" : "#E4E4F8",
              color: movie === movieModalName ? "#ffffff" : "#1f2937", // Gray-900
            }}
          >
            <p key={movie}>{movie}</p>
            <Delete
              className="cursor-pointer"
              color="red"
              key={`${movie} icon`}
              onClick={() => {
                setShouldShowDeleteAlert(true);
              }}
            />
            <Alert
              isOpen={shouldShowDeleteAlert}
              submitButtonLabel="Yes, remove"
              title="Remove item?"
              message={
                <Typography>
                  You are removing <strong>{movie}</strong> from history. Do you
                  want to continue?
                </Typography>
              }
              onClose={() => setShouldShowDeleteAlert(false)}
              onSubmit={() => {
                removeVisitedMovies(movie);
                setShouldShowDeleteAlert(false);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitedMoviesList;
