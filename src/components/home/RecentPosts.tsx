'use client';

import { useRecentPostsQuery } from '@/hooks';
import { Spinner } from '../ui';
import { PostCard } from '../posts';

export const RecentPosts = () => {
  const recentPostsQuery = useRecentPostsQuery();

  return (
    <div className='home-posts'>
      <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
      {recentPostsQuery.isLoading && !recentPostsQuery.data ? (
        <Spinner />
      ) : (
        <ul className='flex flex-col flex-1 gap-9 w-full '>
          {recentPostsQuery.data?.map(post => (
            <li key={post.id} className='flex justify-center w-full'>
              <PostCard {...post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
