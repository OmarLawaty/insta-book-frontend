'use client';

import { useInfiniteScroll, useSavedPostsInfiniteQuery, useUpdatePostData } from '@/hooks';

import { Spinner } from '../ui';
import { GridPost } from './GridPost';

export const SavedPosts = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isPending, isError } = useSavedPostsInfiniteQuery();
  const updatePostData = useUpdatePostData();
  useInfiniteScroll({
    action: fetchNextPage,
    condition: !isFetchingNextPage && !!hasNextPage,
    threshold: 0.6,
  });

  if (isPending) return <Spinner className='flex-1 w-full h-full size-20' />;
  if (isError) return <p className='text-light-4 mt-10 text-center w-full'>Failed to load saved posts</p>;

  const posts = data.pages?.flatMap(({ data }) => data) ?? [];
  return (
    <div className='flex flex-col gap-12 w-full max-w-5xl flex-1'>
      <ul className='grid-container h-min'>
        {posts.map(post => (
          <GridPost
            key={post.id}
            post={post}
            showUser={false}
            showLike={false}
            showSave={true}
            onStatusChange={updatePostData}
          />
        ))}
      </ul>

      {hasNextPage && isFetchingNextPage && <Spinner className='self-center size-8 mt-10' />}

      {posts.length === 0 && <p className='text-light-4 text-center w-full m-auto'>No saved posts to show</p>}

      {!hasNextPage && posts.length > 0 && (
        <p className='text-light-4 text-center w-full m-auto'>No more posts to show</p>
      )}
    </div>
  );
};
