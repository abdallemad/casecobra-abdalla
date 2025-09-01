"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
const queryClient = new QueryClient();

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
