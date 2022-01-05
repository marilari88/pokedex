import { MyPokemonProvider } from "../context/MyPokemonContext";
import { TestQueriesProvider } from "../providers/QueriesProvider";

import { render, RenderOptions } from "@testing-library/react";

const wrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <TestQueriesProvider>
      <MyPokemonProvider>{children}</MyPokemonProvider>
    </TestQueriesProvider>
  );
};

export function renderWithProviders(
  ui: React.ReactElement<any>,
  options?: RenderOptions
) {
  return render(ui, { ...options, wrapper: wrapper });
}
