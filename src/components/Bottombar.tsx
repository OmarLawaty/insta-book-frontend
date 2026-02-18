'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Link } from './Link';

export const Bottombar = () => {
  const pathname = usePathname();

  return (
    <footer className='bottom-bar'>
      {bottombarLinks.map(link => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            href={link.route}
            className={`${isActive && 'rounded-[10px] bg-primary-500 '} flex-center flex-col gap-1 p-2 transition`}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && 'invert-white'}`}
            />

            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        );
      })}
    </footer>
  );
};

export const bottombarLinks = [
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
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create',
  },
];
