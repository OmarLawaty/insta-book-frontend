'use client';

import { useInfiniteScroll, useRecentPostsInfiniteQuery } from '@/hooks';
import { Spinner } from '../ui';
import { PostCard } from '../posts';

export const RecentPosts = () => {
  const { fetchNextPage, isFetchingNextPage, hasNextPage, data } = useRecentPostsInfiniteQuery();

  useInfiniteScroll({
    action: fetchNextPage,
    condition: !isFetchingNextPage && !!hasNextPage,
    threshold: 0.6,
  });

  const posts = data?.pages?.flatMap(({ data }) => data);

  return (
    <div className='home-posts'>
      <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
      {isFetchingNextPage && !hasNextPage ? (
        <Spinner className='self-center size-8' />
      ) : (
        <ul className='flex flex-col flex-1 gap-9 w-full '>
          {posts?.map(post => (
            <li key={post.id} className='flex justify-center w-full'>
              <PostCard {...post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
