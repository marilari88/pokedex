import { MyPokemonProvider } from "../context/MyPokemonContext";
import { QueriesProvider } from "../providers/QueriesProvider";

import { render, RenderOptions } from "@testing-library/react";

const wrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <QueriesProvider>
      <MyPokemonProvider>{children}</MyPokemonProvider>
    </QueriesProvider>
  );
};

export function renderWithProviders(
  ui: React.ReactElement<any>,
  options?: RenderOptions
) {
  return render(ui, { ...options, wrapper: wrapper });
}
