import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterButtons from "./FilterButtons";

describe("Testing initial rendering", () => {
  it("'Show all' button selected by default", () => {
    const { getByText } = render(<FilterButtons />);
    expect(getByText(/show all/i)).toHaveClass("selected-button");
  });

  it("Other buttons are not selected", () => {
    const { getByText } = render(<FilterButtons />);
    expect(getByText(/show caught/i)).not.toHaveClass("selected-button");
    expect(getByText(/show free/i)).not.toHaveClass("selected-button");
  });
});

describe("Testing button beahvior", () => {
  beforeEach(() => {
    const setFilterNameMock = jest.fn();
    render(<FilterButtons setFilterName={setFilterNameMock} />);
  });

  it("Test click on 'Show caught' button", () => {
    userEvent.click(screen.getByText(/show caught/i));
    expect(screen.getByRole("button", { name: /show caught/i })).toHaveClass(
      "selected-button"
    );
    expect(screen.getByRole("button", { name: /show all/i })).not.toHaveClass(
      "selected-button"
    );
    expect(screen.getByRole("button", { name: /show free/i })).not.toHaveClass(
      "selected-button"
    );
  });

  it("Test click on 'Show free' button", () => {
    userEvent.click(screen.getByText(/show free/i));
    expect(screen.getByRole("button", { name: /show free/i })).toHaveClass(
      "selected-button"
    );
    expect(screen.getByRole("button", { name: /show all/i })).not.toHaveClass(
      "selected-button"
    );
    expect(
      screen.getByRole("button", { name: /show caught/i })
    ).not.toHaveClass("selected-button");
  });
});
