import React, { useState } from "react";
import "./FilterButtons.css";

type FilterButtonsProps = { setFilterName: (value: string) => void };

function FilterButtons({ setFilterName }: FilterButtonsProps) {
  const [selectedButton, setSelectedButton] = useState<string>("Show all");

  const handleClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    if (currentTarget.textContent) {
      setSelectedButton(currentTarget.textContent);
      setFilterName(currentTarget.textContent);
    }
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
