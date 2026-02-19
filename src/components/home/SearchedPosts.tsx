'use client';

import Image from 'next/image';

import { useInfiniteScroll, usePostsInfiniteQuery, useSearchParams } from '@/hooks';
import { getCombinedUserName } from '@/helpers';
import { Post } from '@/api';

import { Spinner } from '../ui';
import { Link } from '../Link';
import { LikePostButton } from '../LikePostButton';
import { SavePostButton } from '../SavePostButton';

export const SearchedPosts = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') ?? undefined;

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isPending, isError } =
    usePostsInfiniteQuery(searchValue);
  useInfiniteScroll({
    action: fetchNextPage,
    condition: !isFetchingNextPage && !!hasNextPage,
    threshold: 0.6,
  });

  if (isPending) return <Spinner className='flex-1 w-full h-full size-20' />;
  if (isError) return <p className='text-light-4 mt-10 text-center w-full'>Failed to load posts</p>;

  const posts = data.pages?.flatMap(({ data }) => data) ?? [];
  return (
    <div className='flex flex-wrap gap-9 w-full max-w-5xl flex-1'>
      {posts.length === 0 ? (
        <p className='text-light-4 m-auto text-center w-full'>No results found</p>
      ) : (
        <ul className='grid-container'>
          {posts.map(post => (
            <GridPost key={post.id} post={post} />
          ))}
        </ul>
      )}

      {hasNextPage && isFetchingNextPage && <Spinner className='self-center size-8 mt-10' />}

      {!hasNextPage && !searchValue && <p className='text-light-4 mt-10 text-center w-full'>End of posts</p>}
    </div>
  );
};

type GridPostListProps = {
  post: Post;
  showUser?: boolean;
  showStats?: boolean;
};

const GridPost = ({ post, showUser = true, showStats = true }: GridPostListProps) => (
  <li key={post.id} className='relative min-w-80 h-80'>
    <Link href={`/posts/${post.id}`} className='grid-post_link'>
      <Image src={post.image.url} alt='post' className='h-full w-full object-cover' width={500} height={500} />
    </Link>

    <div className='grid-post_user'>
      {showUser && (
        <div className='flex items-center justify-start gap-2 flex-1'>
          <Image
            src={post.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='creator'
            className='w-8 h-8 rounded-full'
            width={32}
            height={32}
          />

          <p className='line-clamp-1'>{getCombinedUserName(post.creator.firstName, post.creator.lastName)}</p>
        </div>
      )}

      {showStats && (
        <div className='flex justify-between items-center gap-2 z-20'>
          <LikePostButton {...post} />

          <SavePostButton postId={post.id} saved={post.isSaved} />
        </div>
      )}
    </div>
  </li>
);
