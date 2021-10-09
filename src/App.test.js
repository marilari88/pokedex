import { render, screen } from "@testing-library/react";
import App from "./App";

it("Show application title", () => {
  render(<App />);
  expect(screen.getByText(/pokedex/i)).toBeInTheDocument();
});
