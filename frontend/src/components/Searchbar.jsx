import React, { useState, useCallback, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SongCard from "./SongCard";

const Searchbar = ({}) => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = React.createRef();
  const debounceTimeoutRef = useRef(null);

  const fetchData = useCallback(async (query) => {
    if (!query || query.trim() === "") {
      setSearchResults(null);
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/songs/search/${query}/`
    );
    const data = await response.json();
    return data;
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleSearchChange = useCallback(
    debounce(async (query) => {
      const data = await fetchData(query);
      if (data !== null) {
        setSearchResults(data);
      }
    }, 500),
    [fetchData]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  const handleInputChange = (event) => {
    const query = event.target.value.split(".").join(" ");
    setSearchQuery(query);
    handleSearchChange(query);
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} autoComplete="off">
      <div className="bg-white flex shadow-sm p-1 outline outline-1 outline-gray-200 w-full h-8">
        <SearchIcon className="text-gray-400 ml-2" />
        <input
          ref={inputRef}
          className="bg-transparent w-full ml-2 outline-none border-none text-md text-black"
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search for tracks, artists, albums..."
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      <div
        className={`mt-2 p-2 text-black full outline outline-1 outline-gray-200 transition-height duration-500 ease-in-out h-8 ${
          isSearchFocused ? "h-fit" : "h-0"
        }`}
      >
        {searchResults?.tracks.items.map((item, i) => (
          <SongCard key={i} song={item} i={i} small={true} />
        ))}
      </div>
    </form>
  );
};

export default Searchbar;
