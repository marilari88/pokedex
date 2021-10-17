import {
  queryByTestId,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Application initial rendering", () => {
  it("Show application title", () => {
    const { getByText } = render(<App />);
    expect(getByText(/pokedex/i)).toBeInTheDocument();
  });
});

describe("Select a pokemon from the list", () => {
  it("Select ivysaur from the list", async () => {
    const { findByText } = render(<App />);
    expect(await findByText(/ivysaur/i)).toBeInTheDocument();
    userEvent.click(await findByText(/ivysaur/i));
    expect(await findByText(/#002/)).toBeInTheDocument();
  });
});

describe("Click on 'Show Caught list'", () => {
  it("Show empty list message", async () => {
    const { findByRole, findByText } = render(<App />);
    userEvent.click(await findByRole("button", { name: /show caught/i }));
    expect(await findByText(/empty/i)).toBeInTheDocument();
  });
});

describe("Test 'Catch it' button", () => {
  it("Ivysaur should disappear from 'show free' list", async () => {
    const { findByRole, findByText, findByTestId, queryByTestId } = render(
      <App />
    );
    await act(async () => {
      userEvent.click(await findByRole("button", { name: /show free/i }));
      userEvent.click(await findByText(/ivysaur/i));
      userEvent.click(await findByTestId("ivysaur-details-button"));
      await waitForElementToBeRemoved(() => queryByTestId("li-ivysaur"));
    });
  });
});
