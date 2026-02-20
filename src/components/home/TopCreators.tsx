'use client';

import { useTopUsersQuery } from '@/hooks';
import { Spinner } from '../ui';
import { UserCard } from '../users';

export const TopCreators = () => {
  const topUsersQuery = useTopUsersQuery();

  return (
    <div className='home-creators'>
      <h3 className='h3-bold text-light-1'>Top Creators</h3>
      {topUsersQuery.isLoading && !topUsersQuery.data ? (
        <Spinner className='flex-1 w-full h-full' />
      ) : (
        <ul className='grid 2xl:grid-cols-2 gap-6'>
          {topUsersQuery.data?.map(creator => (
            <li key={creator.id}>
              <UserCard {...creator} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
