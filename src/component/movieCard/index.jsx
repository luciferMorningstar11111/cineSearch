import React, { useState } from "react";

import { Button } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";
import useMovieStore from "stores/movieStore";

import MovieModal from "../movieModel";

const MovieCard = ({ Title, Poster, Type, Year, imdbID }) => {
  const handleVisitedMovies = useMovieStore(state => state.addVisitedMovies);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    setShowModal(true);
    handleVisitedMovies(Title);
    history.push(`/${encodeURIComponent(Type)}/${encodeURIComponent(Title)}`);
  };

  const movieDetails = {
    Title,
    Poster,
    Type,
    Year,
    imdbID,
  };

  const fallbackImage =
    "https://via.placeholder.com/300x450.png?text=No+Image+Available";
  Poster = Poster === "N/A" ? fallbackImage : Poster;

  return (
    <div className="items-centre m-5 flex h-96 w-72 flex-col overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="h-2/3 w-full">
        <img
          alt={`Poster of ${Title}`}
          className="h-full w-full object-contain"
          src={Poster}
        />
      </div>
      <div className=" flex h-1/3 w-full flex-col px-4 py-2  text-left">
        <div className="h-2/3">
          <h3
            className=" text-base font-bold text-gray-800 line-clamp-2 "
            title={Title}
          >
            {Title}
          </h3>
          <h2 className="text-left text-sm text-gray-600">
            {Type}
            <strong>&#12539;</strong>
            {Year}
          </h2>
        </div>
        <div className="h-1/3">
          <Button
            className="my-2 text-left font-bold text-blue-500"
            label="view more"
            size="small"
            style="secondary"
            onClick={() => {
              handleClick();
              handleVisitedMovies(Title);
            }}
          />
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <MovieModal
            {...movieDetails}
            onClose={() => {
              document.body.style.overflow = "auto";
              setShowModal(false);
              history.goBack();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MovieCard;
