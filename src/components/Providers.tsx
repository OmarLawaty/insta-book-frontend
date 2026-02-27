'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import { useIsLoggedInQuery } from '@/hooks/auth/useIsLoggedInQuery';

interface ProvidersProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export const Providers = ({ children, isLoggedIn = false }: ProvidersProps) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient();

    client.setQueryData(useIsLoggedInQuery.queryKey, isLoggedIn);

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
