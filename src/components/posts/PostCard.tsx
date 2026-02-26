'use client';

import Image from 'next/image';

import { Post } from '@/api';
import { Link } from '../Link';
import { SavePostButton } from '../SavePostButton';
import { getCombinedUserName, getProfileUrl } from '@/helpers';
import { LikePostButton } from '../LikePostButton';
import { formatDistance } from 'date-fns';
import { cn } from '@/lib/utils';

export const PostCard = (props: Post) => (
  <div className='post-card'>
    <div className='flex-between'>
      <div className='flex items-center gap-3'>
        <Link href={getProfileUrl(props.creator.id, props.creator.isMe)}>
          <Image
            src={props.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='creator'
            className='w-12 h-12 rounded-full object-cover'
            width={48}
            height={48}
            preload
            loading='eager'
          />
        </Link>

        <div className='flex flex-col'>
          <p className='base-medium lg:body-bold text-light-1'>
            {getCombinedUserName(props.creator.firstName, props.creator.lastName)}
          </p>
          <div className='flex-center gap-2 text-light-3'>
            <p className='subtle-semibold lg:small-regular '>
              {formatDistance(new Date(props.createdAt), new Date(), { addSuffix: true })}
            </p>
            •<p className='subtle-semibold lg:small-regular'>{props.location}</p>
          </div>
        </div>
      </div>

      <Link href={`/posts/${props.id}/edit`} className={cn(!props.creator.isMe && 'hidden')}>
        <Image src={'/assets/icons/edit.svg'} alt='edit' width={20} height={20} />
      </Link>
    </div>

    <Link href={`/posts/${props.id}`}>
      <div className='small-medium lg:base-medium py-5'>
        <p>{props.caption}</p>
        <ul className='flex gap-1 mt-2'>
          {props.tags.map((tag: string, i: number) => (
            <li key={`${tag}${i}`} className='text-light-3 small-regular'>
              #{tag}
            </li>
          ))}
        </ul>
      </div>

      <Image
        src={props.image.url || '/assets/icons/-placeholder.svg'}
        alt='post image'
        className='post-card_img'
        width={500}
        height={500}
        preload
        loading='eager'
      />
    </Link>

    <div className='flex justify-between items-center gap-5 z-20'>
      <LikePostButton {...props} />

      <SavePostButton postId={props.id} saved={props.isSaved} />
    </div>
  </div>
);
