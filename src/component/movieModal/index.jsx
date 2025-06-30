import React, { useState, useEffect } from "react";

import { Close } from "@bigbinary/neeto-icons";
import { Spinner, Tooltip } from "@bigbinary/neetoui";
// eslint-disable-next-line import/extensions
import favorite from "assets/icons/favorite.svg";
// eslint-disable-next-line import/extensions
import favorited from "assets/icons/favorited.svg";
// eslint-disable-next-line import/extensions
import fallbackImage from "src/assets/images/fallbackImage.png";
import useMovies from "src/hooks/useMovies";
import useMovieStore from "stores/movieStore";

const MovieModal = ({ onClose }) => {
  const favouriteMovies = useMovieStore(state => state.favouriteMovies);
  const addFavouriteMovies = useMovieStore(state => state.addFavouriteMovies);
  const removeFavouriteMovies = useMovieStore(
    state => state.removeFavouriteMovies
  );
  const [isFavourite, setIsFavourite] = useState(false);
  const movieModalName = useMovieStore(state => state.movieModalName);
  // const history = useHistory();
  // Set initial favorite state based on store
  if (!movieModalName) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const isAlreadyFavourite = favouriteMovies.some(
      favMovie => favMovie.Title === movieModalName
    );
    setIsFavourite(isAlreadyFavourite);
  }, []);

  const { data, isLoading, isError, error } =
    useMovies.useMovie(movieModalName);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0">
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500">
        Error: {error?.message || "Movie data not available"}
      </div>
    );
  }
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
    Title,
    Poster,
  } = data;

  const addToFavourite = () => {
    addFavouriteMovies({ Title, imdbRating: data.imdbRating });
    setIsFavourite(true);
  };

  const removeFromFavouriteMovies = () => {
    removeFavouriteMovies(Title);
    console.log("favMovies", favouriteMovies);
    setIsFavourite(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative my-4 max-h-screen w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        {/* Modal Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
          {/* Left section: Title + Favourite */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <h2 className="max-w-[150px] truncate text-xl font-bold sm:max-w-none">
              {Title}
            </h2>
            {isFavourite ? (
              <Tooltip
                content="Remove from Favourites"
                followCursor="horizontal"
                position="right-end"
              >
                <img
                  alt="favourite icon"
                  height={40}
                  src={favorited}
                  width={24}
                  onClick={removeFromFavouriteMovies}
                />
              </Tooltip>
            ) : (
              <Tooltip
                content="Add to Favourites"
                followCursor="horizontal"
                position="right-end"
              >
                <img
                  alt="My Icon"
                  height={40}
                  src={favorite}
                  width={24}
                  onClick={addToFavourite}
                />
              </Tooltip>
            )}
          </div>
          {/* Right section: Close Button */}
          <Close
            className="shrink-0 cursor-pointer rounded border border-transparent text-gray-500 hover:border-2 hover:border-gray-700 hover:text-gray-700"
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
            className="mx-auto w-2/3 rounded-md sm:w-full md:w-1/3"
            src={Poster || fallbackImage}
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
