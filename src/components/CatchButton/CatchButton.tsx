import React from "react";

type CatchButtonProps = {
  isCaught: boolean;
  catchToggle: Function;
  dataTestId?: string;
};

function CatchButton({
  isCaught,
  catchToggle,
  dataTestId,
}: CatchButtonProps): JSX.Element {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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
