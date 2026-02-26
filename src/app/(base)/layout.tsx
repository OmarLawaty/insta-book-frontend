import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Bottombar, Sidebar, Topbar } from '@/components';
import { useMeQuery } from '@/hooks';
import { getIsLoggedIn } from '@/api/backend/helpers';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  if (await getIsLoggedIn()) {
    await queryClient.prefetchQuery({
      queryKey: useMeQuery.queryKey(),
      queryFn: useMeQuery.queryFn,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='flex w-full flex-col bg-black h-dvh md:flex-row'>
        <Topbar />
        <Sidebar />

        <section className='flex flex-1'>{children}</section>

        <Bottombar />
      </main>
    </HydrationBoundary>
  );
}
