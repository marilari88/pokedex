import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function QueriesProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
