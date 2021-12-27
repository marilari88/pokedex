import { render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";
import userEvent from "@testing-library/user-event";

describe("Test initial Rendering", () => {
  const setSearchTextMock = jest.fn();
  it("render with an empty text", () => {
    render(<SearchInput searchText="" setSearchText={setSearchTextMock} />);
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue("");
  });

  it("Render with text", () => {
    render(
      <SearchInput searchText="bulbasaur" setSearchText={setSearchTextMock} />
    );
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue("bulbasaur");
  });
});

describe("Test button behavior", () => {
  it("Click on reset button", () => {
    const setSearchTextMock = jest.fn();
    render(
      <SearchInput searchText="bulbasaur" setSearchText={setSearchTextMock} />
    );
    userEvent.click(screen.getByTestId("reset-search"));
    expect(setSearchTextMock).toHaveBeenCalled();
  });
});
