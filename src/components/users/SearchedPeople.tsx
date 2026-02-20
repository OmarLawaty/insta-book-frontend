'use client';

import { useInfiniteScroll, useSearchParams, useUsersInfiniteQuery } from '@/hooks';

import { Spinner } from '../ui';
import { UserCard } from './UserCard';

export const SearchedPeople = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') ?? undefined;

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isPending, isError } =
    useUsersInfiniteQuery(searchValue);
  useInfiniteScroll({
    action: fetchNextPage,
    condition: !isFetchingNextPage && !!hasNextPage,
    threshold: 0.6,
  });

  if (isPending) return <Spinner className='flex-1 w-full h-full size-20' />;
  if (isError) return <p className='text-light-4 mt-10 text-center w-full'>Failed to load people</p>;

  const users = data.pages?.flatMap(({ data }) => data) ?? [];
  return (
    <div className='flex flex-col gap-12 w-full max-w-5xl flex-1'>
      {users.length === 0 ? (
        <p className='text-light-4 m-auto text-center w-full'>No results found</p>
      ) : (
        <ul className='grid-container h-min'>
          {users.map(user => (
            <UserCard key={user.id} {...user} />
          ))}
        </ul>
      )}

      {hasNextPage && isFetchingNextPage && <Spinner className='self-center size-8 mt-10' />}

      {!hasNextPage && !searchValue && <p className='text-light-4 text-center w-full '>No more people to show</p>}
    </div>
  );
};
