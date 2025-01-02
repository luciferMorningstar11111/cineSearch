import React, { useRef, useEffect } from "react";

import { Input } from "@bigbinary/neetoui";
import { Search } from "neetoicons";

const Header = ({ searchTerm, setSearchTerm }) => {
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
    <nav className="w-3/4 ">
      <div className="container flex  items-center justify-between px-12 py-4">
        <div className="hidden space-x-8 lg:flex">
          <a className="text-lg font-semibold" href="#">
            cineSearch
          </a>
          <a className="font-medium text-gray-700 hover:text-gray-900" href="#">
            Home
          </a>
          <a className="font-medium text-gray-700 hover:text-gray-900" href="#">
            Features
          </a>
        </div>
      </div>
      <div className="border-black-300 mx-auto w-3/4 rounded border">
        <Input
          placeholder="search"
          prefix={<Search />}
          ref={inputRef}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Header;
