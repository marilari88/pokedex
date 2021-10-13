import React from "react";
import PropTypes from "prop-types";

function CatchButton({ isCaught, catchToggle }) {
  const handleClick = (e) => {
    e.stopPropagation();
    catchToggle();
  };

  return (
    <>
      {isCaught !== null && (
        <button onClick={handleClick}>
          {!isCaught ? `Catch It` : `Free it`}
        </button>
      )}
    </>
  );
}

export default CatchButton;

CatchButton.propTypes = {
  isCaught: PropTypes.bool,
  catchToggle: PropTypes.func,
};
