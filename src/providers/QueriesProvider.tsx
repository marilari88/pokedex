import { QueryClient, QueryClientProvider } from "react-query";

export function QueriesProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

export function TestQueriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
}
