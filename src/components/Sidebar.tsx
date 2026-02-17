'use client';

import Image from 'next/image';
import { Link } from './Link';
import { Spinner } from './ui';
import { Button } from './Button';
import { useMeQuery, useSignoutMutation } from '@/hooks';
import { getCombinedUserName } from '@/helpers';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  const meQuery = useMeQuery();
  const signoutMutation = useSignoutMutation();

  // If there's an error fetching the current user, we can assume the user is not authenticated.
  if (meQuery.isError) return null;

  const isPending = meQuery.isPending;

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image src='/assets/images/logo.svg' alt='logo' width={170} height={36} />
        </Link>

        {isPending ? (
          <div className='h-14'>
            <Spinner />
          </div>
        ) : (
          <Link href={`/profile`} className='flex gap-3 items-center'>
            <Image
              src={meQuery.data.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile'
              width={56}
              height={56}
              className='h-14 w-14 rounded-full'
            />
            <div className='flex flex-col'>
              <p className='body-bold'>{getCombinedUserName(meQuery.data.firstName, meQuery.data.lastName)}</p>
              <p className='text-xs font-normal text-light-3'>{meQuery.data.email}</p>
            </div>
          </Link>
        )}

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map(({ imgURL, route, label }: NavLink) => {
            const isActive = pathname === route;

            return (
              <li key={label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                <Link href={route} className='flex gap-4 items-center p-4'>
                  <Image
                    src={imgURL}
                    alt={label}
                    width={24}
                    height={24}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Button variant='ghost' className='shad-button_ghost' onClick={() => signoutMutation.mutate()}>
        <Image src='/assets/icons/logout.svg' alt='logout' width={24} height={24} />

        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  );
};

interface NavLink {
  imgURL: string;
  route: string;
  label: string;
}

const sidebarLinks: NavLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: '/assets/icons/people.svg',
    route: '/all-users',
    label: 'People',
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create Post',
  },
];
