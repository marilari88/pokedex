import PropTypes from "prop-types";
import { FormEvent } from "react";
import "./SearchInput.css";

type SearchInputProps = {
  searchText: string;
  setSearchText: (value: string) => void;
};

function SearchInput({ searchText, setSearchText }: SearchInputProps) {
  const handleChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setSearchText(currentTarget.value);
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
