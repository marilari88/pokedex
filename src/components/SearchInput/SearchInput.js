import React from "react";
import PropTypes from "prop-types";
import "./SearchInput.css";

function SearchInput({ searchText, setSearchText }) {
  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search pokemon by name"
        onChange={handleChange}
        value={searchText}
      />
      <button onClick={() => setSearchText("")} data-testid="reset-search">
        X
      </button>
    </div>
  );
}

export default SearchInput;

SearchInput.prototype = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};
