'use client';

import Image from 'next/image';
import { Link } from './Link';
import { Button } from './Button';
import { useMeQuery, useSignoutMutation } from '@/hooks';

export const Topbar = () => {
  const meQuery = useMeQuery();
  const signoutMutation = useSignoutMutation();

  // If there's an error fetching the current user, we can assume the user is not authenticated.
  if (meQuery.isPending || meQuery.isError) return null;

  const user = meQuery.data;
  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image src='/assets/images/logo.svg' alt='logo' width={130} height={325} />
        </Link>

        <div className='flex gap-4'>
          <Button variant='ghost' className='shad-button_ghost' onClick={() => signoutMutation.mutate()}>
            <Image src='/assets/icons/logout.svg' alt='logout' width={20} height={20} />
          </Button>

          <Link href={`/profile/${user.id}`} className='flex-center gap-3'>
            <Image
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile'
              className='h-8 w-8 rounded-full'
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
