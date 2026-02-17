import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { RecentPosts, TopCreators } from '@/components';
import { useRecentPostsQuery, useTopUsersQuery } from '@/hooks';

export const metadata: Metadata = {
  title: 'Instabook | Home',
  description: 'Discover and share posts on Instabook',
};

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([queryClient.prefetchQuery(useRecentPostsQuery), queryClient.prefetchQuery(useTopUsersQuery)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex flex-1'>
        <div className='home-container'>
          <RecentPosts />
        </div>

        <TopCreators />
      </div>
    </HydrationBoundary>
  );
}
