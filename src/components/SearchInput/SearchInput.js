import React from "react";
import PropTypes from "prop-types";

function SearchInput({ searchText, setSearchText }) {
  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search pokemon by name"
        onChange={handleChange}
        value={searchText}
      />
      <button onClick={() => setSearchText("")}>X</button>
    </div>
  );
}

export default SearchInput;

SearchInput.prototype = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};
