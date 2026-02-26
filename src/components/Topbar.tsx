'use client';

import Image from 'next/image';
import { Link } from './Link';
import { Button } from './Button';
import { useLogin, useMeQuery } from '@/hooks';
import { useRouter } from 'nextjs-toploader/app';

export const Topbar = () => {
  const router = useRouter();

  const meQuery = useMeQuery();
  const { logout, isLoggedIn } = useLogin();

  // If there's an error fetching the current user, we can assume the user is not authenticated.
  if ((meQuery.isPending || meQuery.isError) && isLoggedIn) return null;

  const user = meQuery.data;
  return (
    <header className='topbar'>
      <div className='flex-between py-4 px-5 '>
        <Link href='/' className='flex gap-3 items-center'>
          <Image src='/assets/images/logo.svg' alt='logo' width={130} height={325} />
        </Link>

        <div className='flex gap-4'>
          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={isLoggedIn ? logout : () => router.push('/login')}
          >
            <Image
              src='/assets/icons/logout.svg'
              alt={isLoggedIn ? 'logout' : 'login'}
              style={{ rotate: isLoggedIn ? '0deg' : '180deg' }}
              width={20}
              height={20}
            />
          </Button>

          <Link href='/profile' className='flex-center gap-3'>
            <Image
              src={
                isLoggedIn
                  ? user!.image?.url || '/assets/icons/profile-placeholder.svg'
                  : '/assets/icons/profile-placeholder.svg'
              }
              alt='profile'
              className='h-8 w-8 rounded-full object-cover'
              width={32}
              height={32}
              preload
              loading='eager'
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
