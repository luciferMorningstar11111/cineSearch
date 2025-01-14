import React from "react";

import { Close } from "@bigbinary/neeto-icons";
import { Spinner } from "@bigbinary/neetoui";
import useMovies from "src/hooks/useMovies";

const MovieModal = ({ Title, Poster, onClose }) => {
  const { data, isLoading, isError, error } = useMovies.useMovie(Title);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) return <div>Error: {error.message}</div>;
  document.body.style.overflow = "hidden";

  const {
    Director,
    Actors,
    BoxOffice,
    Year,
    Runtime,
    Language,
    Rated,
    Plot,
    Genre,
  } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        {/* Modal Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{Title}</h2>
          <Close
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            size={24}
            onClick={onClose}
          />
        </div>
        {/* Genre Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {Genre.split(",").map(genre => (
            <span
              className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
              key={genre}
            >
              {genre}
            </span>
          ))}
        </div>
        {/* Content */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Poster */}
          <img
            alt={Title}
            className="w-full rounded-md md:w-1/3"
            src={Poster || "https://via.placeholder.com/300"}
          />
          {/* Details */}
          <div className="flex-1 overflow-auto">
            <p className="mb-4 italic text-gray-600">{Plot}</p>
            {/* Additional Details */}
            <div className="space-y-2 text-left text-gray-700">
              <p>
                <strong>Director:</strong> {Director || "N/A"}
              </p>
              <p>
                <strong>Actors:</strong> {Actors || "N/A"}
              </p>
              <p>
                <strong>Box Office:</strong>{" "}
                {BoxOffice ? `$${BoxOffice}` : "N/A"}
              </p>
              <p>
                <strong>Year:</strong> {Year || "N/A"}
              </p>
              <p>
                <strong>Runtime:</strong> {Runtime ? `${Runtime} min` : "N/A"}
              </p>
              <p>
                <strong>Language:</strong> {Language || "N/A"}
              </p>
              <p>
                <strong>Rated:</strong> {Rated || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
