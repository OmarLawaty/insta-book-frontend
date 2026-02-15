import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Sidebar } from '@/components';
import { useMeQuery } from '@/hooks';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(useMeQuery);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='w-full flex bg-black'>
        <Sidebar />

        {children}
      </main>
    </HydrationBoundary>
  );
}
