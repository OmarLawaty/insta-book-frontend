import Image from 'next/image';

import { FullUser } from '@/api';
import { getCombinedUserName } from '@/helpers';
import { cn } from '@/lib/utils';
import { Link } from '../Link';
import { Button } from '../Button';

export const ProfileHeader = (props: FullUser) => (
  <div className='profile-inner_container'>
    <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
      <Image
        src={props.image?.url || '/assets/icons/profile-placeholder.svg'}
        alt='profile'
        className='w-28 h-28 lg:h-36 lg:w-36 rounded-full'
        width={144}
        height={144}
      />
      <div className='flex flex-col flex-1 justify-between md:mt-2'>
        <div className='flex flex-col w-full'>
          <h1 className='text-center xl:text-left h3-bold md:h1-semibold w-full'>
            {getCombinedUserName(props.firstName, props.lastName)}
          </h1>
          <p className='small-regular md:body-medium text-light-3 text-center xl:text-left'>{props.email}</p>
        </div>

        <div className='flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20'>
          <StatBlock value={props.posts.length} label='Posts' />
          <StatBlock value={20} label='Followers' />
          <StatBlock value={20} label='Following' />
        </div>

        <p className='small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm'>{props.bio}</p>
      </div>

      <div className='flex justify-center gap-4'>
        <div className={cn(!props.isMe && 'hidden')}>
          <Link href={`/profile/edit`} className='h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg'>
            <Image src={'/assets/icons/edit.svg'} alt='edit' width={20} height={20} />
            <p className='flex whitespace-nowrap small-medium'>Edit Profile</p>
          </Link>
        </div>
        <div className={cn(props.isMe && 'hidden')}>
          <Button type='button' className='shad-button_primary px-8 h-12'>
            Follow
          </Button>
        </div>
      </div>
    </div>
  </div>
);

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className='flex-center gap-2'>
    <p className='small-semibold lg:body-bold text-primary-500'>{value}</p>
    <p className='small-medium lg:base-medium text-light-2'>{label}</p>
  </div>
);
