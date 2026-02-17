import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Bottombar, Sidebar, Topbar } from '@/components';
import { useMeQuery } from '@/hooks';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(useMeQuery);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='w-full md:flex bg-black'>
        <Topbar />
        <Sidebar />

        <section className='flex flex-1 h-dvh'>{children}</section>

        <Bottombar />
      </main>
    </HydrationBoundary>
  );
}
