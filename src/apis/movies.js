import { Toastr } from "@bigbinary/neetoui";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchAllMovies = async (searchTerm, page = 1) => {
  if (!searchTerm) {
    return [];
  }
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: searchTerm,
        page,
        apikey: API_KEY,
      },
    });
    if (response.data.Response === "False") {
      Toastr.error(response.data.Error, { autoClose: 2000 }); // Show the error using Toastr
    }

    return response.data;
  } catch (error) {
    Toastr.error(error.message || "An error occurred while fetching movies."); // Re-throw error for handling in calling code
  }

  return null;
};

const fetchMovieByTitle = async title => {
  if (!title) return null; // Return null if no title is provided

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        t: title, // 't' parameter is used for searching by title
        apikey: API_KEY, // API key for authorization
      },
    });

    if (response.data.Response === "True") {
      return response.data; // Return the movie details if successful
    }
    console.error("Movie not found:", response.data.Error);

    return null; // Return null if movie is not found
  } catch (error) {
    console.error("Error fetching movie:", error);

    return null; // Return null in case of an error
  }
};
const fetchMovies = { fetchAllMovies, fetchMovieByTitle };
export default fetchMovies;
