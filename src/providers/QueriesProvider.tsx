import { QueryClient, QueryClientProvider } from "react-query";

export function QueriesProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
