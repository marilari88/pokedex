import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatchButton from "./CatchButton";

describe("Testing initial rendering", () => {
  it("Show 'Free it' if pokemon is caught", () => {
    const { getByRole } = render(<CatchButton isCaught={true} />);
    expect(getByRole("button")).toHaveTextContent(/free it/i);
  });

  it("Show 'Caught it' if pokemon is free", () => {
    const { getByRole } = render(<CatchButton isCaught={false} />);
    expect(getByRole("button")).toHaveTextContent(/catch it/i);
  });
});

describe("Testing button behavior", () => {
  it("Toggle Catch to be called", () => {
    const toggleCatchMock = jest.fn();
    render(<CatchButton isCaught={true} catchToggle={toggleCatchMock} />);
    userEvent.click(screen.getByRole("button"));
    expect(toggleCatchMock).toHaveBeenCalled();
  });
});
