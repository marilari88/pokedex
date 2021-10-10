import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatchButton from "./CatchButton";

describe("Testing button behavior", () => {
  it("Show button text if the pokemon is not catched", () => {
    render(<CatchButton pokemonName="bulbasaur" />);
    expect(screen.getByRole("button")).toHaveTextContent(/Catch it/i);
  });

  it("Change button text on click", async () => {
    render(<CatchButton pokemonName="bulbasaur" />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/free it/i)).toBeInTheDocument();
  });
});
