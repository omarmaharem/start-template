import { QueryClient } from "@tanstack/react-query";

// React Query Client
const queryClient = new QueryClient();

// Context
export type Context = {
  queryClient: QueryClient;
};

export const context: Context = { queryClient };