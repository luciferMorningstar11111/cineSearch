import React from "react";

import useMovieStore from "stores/movieStore";

const FavouriteMovies = () => {
  console.log("Rendering FavouriteMovies component");
  const favouriteMovies = useMovieStore(state => state.favouriteMovies);

  return (
    <div className="max-h-s\ mx-auto mt-4 max-w-2xl rounded-lg bg-white p-4 shadow-lg">
      <h2 className="mb-3 text-xl font-bold">Favourites</h2>
      <div className="hide-scrollbar h-screen space-y-3 overflow-y-auto">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie, index) => (
            <div
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm"
              key={index}
            >
              <span className="text-left font-bold">{movie.Title}</span>
              <span className="text-sm text-gray-600">
                <span className="text-xs">Rating:</span>{" "}
                <span className="text-lg font-semibold">
                  {movie.imdbRating}/10
                </span>
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No favourite movies added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavouriteMovies;
