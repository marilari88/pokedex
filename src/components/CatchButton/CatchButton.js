import React from "react";
import PropTypes from "prop-types";

function CatchButton({ isCaught, catchToggle, dataTestId }) {
  const handleClick = (e) => {
    e.stopPropagation();
    catchToggle();
  };

  return (
    <>
      {isCaught !== null && (
        <button onClick={handleClick} data-testid={dataTestId}>
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
  dataTestId: PropTypes.string,
};
