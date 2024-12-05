import React from "react";

import { Close } from "@bigbinary/neeto-icons";
import { Spinner } from "@bigbinary/neetoui";
import useMovies from "src/hooks/useMovies";

const MovieModal = ({ Title, Poster, onClose }) => {
  const { data, isLoading, isError, error } = useMovies.useMovie(Title);
  if (isLoading) {
    return (
      <div
        className=" flex
items-center justify-center"
      >
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
    Country,
    Year,
    Runtime,
    Language,
    Rated,
    Plot,
    Genre,
  } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex  w-1/2 flex-col rounded-lg bg-white p-6">
        <div className="m-2 flex items-center justify-between">
          <h2 className="text-xl font-bold">{Title}</h2>
          <Close className="cursor-pointer" size={20} onClick={onClose} />
        </div>
        <div className=" my-2 text-left ">
          {Genre.split(",").map(genre => (
            <span
              className="m-2 rounded-full bg-gray-300 p-1.5 text-sm"
              key={genre}
            >
              {genre}
            </span>
          ))}
        </div>
        <div className=" mt-5 flex h-96 w-full flex-grow ">
          <img
            alt={Title}
            className="h-1/1 mr-4 w-1/2 rounded-lg"
            src={Poster}
          />
          <div className="h-full w-full overflow-auto px-3">
            <p className="text-left  italic">{Plot}</p>
            <div className=" w-1/1  my-4  flex flex-col space-y-4 text-left">
              <p>
                <strong>Director:</strong> {Director}
              </p>
              <p>
                <strong>Actors:</strong> {Actors}
              </p>
              <p>
                <strong>Box Office:</strong> ${BoxOffice}
              </p>
              <p>
                <strong>Year:</strong> {Year}
              </p>
              <p>
                <strong>Runtime:</strong> {Runtime} min
              </p>
              <p>
                <strong>Language:</strong> {Language}
              </p>
              <p>
                <strong>Rated:</strong>
                {Rated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
