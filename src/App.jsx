import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useMovieStore from "stores/movieStore";

import "./App.css";
import FavouriteMovies from "./component/favouritesMovies";
import Header from "./component/header";
import MoviesList from "./component/MoviesList";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const searchTerm = useMovieStore(state => state.searchTerm);
  const setSearchTerm = useMovieStore(state => state.setSearchTerm);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Switch>
          <Route exact component={MoviesList} path="/" />
          <Route exact component={FavouriteMovies} path="/favourites" />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
