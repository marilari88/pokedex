import React, { useState } from "react";
import PropTypes from "prop-types";

function FilterButtons({ setFilterName }) {
  const [selectedButton, setSelectedButton] = useState("Show all");
  const handleClick = ({ target }) => {
    setSelectedButton(target.innerText);
    setFilterName(target.innerText);
  };

  return (
    <div>
      <button onClick={handleClick}>Show all</button>
      <button onClick={handleClick}>Show Caught</button>
      <button onClick={handleClick}>Show Free </button>
    </div>
  );
}

export default FilterButtons;

FilterButtons.propTypes = {
  setFilterfunc: PropTypes.func,
};
