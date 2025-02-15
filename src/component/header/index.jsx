import React, { useRef, useEffect } from "react";

import { NavLink } from "react-router-dom";

const Header = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        event.preventDefault(); // Prevent default browser behavior for "/"
        inputRef.current?.focus(); // Focus the input field
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="w-3/4">
      <div className="container flex items-center justify-between px-12 py-4">
        <div className="hidden space-x-8 lg:flex">
          {/* Logo */}
          <span className="text-lg font-semibold">
            <span className="text-blue-500">Cine</span>
            <span className="text-black">Searcher</span>
          </span>
          {/* Navigation Links with Active Styling */}
          <NavLink
            exact
            activeClassName="text-blue-500 font-bold"
            className="font-medium text-gray-700 hover:text-gray-900"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            activeClassName="text-blue-500 font-bold"
            className="focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 font-medium text-gray-700 hover:text-gray-900"
            to="/favourites"
          >
            Favourites
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
