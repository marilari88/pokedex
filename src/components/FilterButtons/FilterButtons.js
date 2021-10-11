import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FilterButtons.css";

function FilterButtons({ setFilterName }) {
  const [selectedButton, setSelectedButton] = useState("Show all");
  const handleClick = ({ target }) => {
    setSelectedButton(target.innerText);
    setFilterName(target.innerText);
  };

  return (
    <div className="filter-buttons">
      <button
        className={selectedButton === "Show all" ? `selected-button` : ""}
        onClick={handleClick}
      >
        Show all
      </button>
      <button
        className={selectedButton === "Show Caught" ? `selected-button` : ""}
        onClick={handleClick}
      >
        Show Caught
      </button>
      <button
        className={selectedButton === "Show Free" ? `selected-button` : ""}
        onClick={handleClick}
      >
        Show Free
      </button>
    </div>
  );
}

export default FilterButtons;

FilterButtons.propTypes = {
  setFilterName: PropTypes.func,
};
