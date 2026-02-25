import { TopUser } from '@/api';
import { Link } from '../Link';
import Image from 'next/image';
import { getCombinedUserName, getProfileUrl } from '@/helpers';
import { Button } from '../Button';

export const UserCard = ({ id, image, firstName, lastName, likesCount, isMe }: TopUser) => (
  <Link href={getProfileUrl(id, isMe)} className='user-card'>
    <Image
      src={image?.url || '/assets/icons/profile-placeholder.svg'}
      alt='creator'
      className='rounded-full w-14 h-14 object-cover'
      width={56}
      height={56}
      preload
      loading='eager'
    />

    <div className='flex-center flex-col gap-1'>
      <p className='base-medium text-light-1 text-center line-clamp-1'>{getCombinedUserName(firstName, lastName)}</p>
      <p className='small-regular text-light-3 text-center line-clamp-1'>Likes: {likesCount}</p>
    </div>

    <Button disabled={isMe} type='button' size='sm' className='shad-button_primary px-5'>
      Follow
    </Button>
  </Link>
);
