import { Metadata } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { SavedPosts } from '@/components';
import { useSavedPostsInfiniteQuery } from '@/hooks';

export const metadata: Metadata = {
  title: 'Instabook | Saved Posts',
  description: 'View your saved posts on Instabook',
};

export default async function Page() {
  const queryClient = new QueryClient();

  await Promise.all([queryClient.prefetchInfiniteQuery(useSavedPostsInfiniteQuery)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='explore-container flex flex-col gap-10'>
        <h2 className='h3-bold md:h2-bold max-w-5xl w-full'>Saved Posts</h2>

        <SavedPosts />
      </div>
    </HydrationBoundary>
  );
}
