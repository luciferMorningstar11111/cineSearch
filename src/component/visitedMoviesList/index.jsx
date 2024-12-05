import React from "react";

import useMovieStore from "stores/movieStore";

const VisitedMoviesList = () => {
  const { visitedMovies } = useMovieStore();

  return (
    <div className="col-auto flex">
      <h3 className="m-4 text-left text-2xl font-bold text-gray-800">
        Visited Movies
      </h3>
      <div className="m-8 flex flex-wrap justify-center gap-6">
        {visitedMovies.map(movie => (
          <h1>{movie}</h1>
        ))}
      </div>
    </div>
  );
};
export default VisitedMoviesList;
