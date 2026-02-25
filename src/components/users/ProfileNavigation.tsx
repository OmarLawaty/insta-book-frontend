'use client';

import Image from 'next/image';

import { Link } from '../Link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getProfileUrl } from '@/helpers';

interface ProfileNavigationProps {
  id: number;
  isMe?: boolean;
}

export const ProfileNavigation = ({ id, isMe = false }: ProfileNavigationProps) => {
  const pathname = usePathname();

  const profileUrl = getProfileUrl(id, isMe);

  const isPostsActive = pathname === profileUrl;
  const isLikedPostsActive = pathname === `${profileUrl}/liked-posts`;

  return (
    <div className='flex max-w-5xl w-full'>
      <Link
        href={profileUrl}
        className={cn('profile-tab rounded-l-lg', isPostsActive && 'bg-dark-3!')}
        prefetch={isLikedPostsActive}
      >
        <Image src={'/assets/icons/posts.svg'} alt='posts' width={20} height={20} />
        Posts
      </Link>

      <Link
        href={`${profileUrl}/liked-posts`}
        className={cn('profile-tab rounded-r-lg', isLikedPostsActive && 'bg-dark-3!')}
        prefetch={isPostsActive}
      >
        <Image src={'/assets/icons/like.svg'} alt='like' width={20} height={20} />
        Liked Posts
      </Link>
    </div>
  );
};
