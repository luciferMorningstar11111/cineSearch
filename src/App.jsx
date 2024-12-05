import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import MoviesList from "./component/MoviesList";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Switch>
        <Route exact component={MoviesList} path="/" />
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
