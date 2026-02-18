'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '../Button';
import { Link } from '../Link';
import { LikePostButton } from '../LikePostButton';
import { SavePostButton } from '../SavePostButton';
import { useDeletePostMutation, useMeQuery, usePostQuery } from '@/hooks';
import { Spinner } from '../ui';
import { getCombinedUserName } from '@/helpers';
import { formatDistance } from 'date-fns';
import { cn } from '@/lib/utils';

interface PostDetailsProps {
  id: number;
}

export const PostDetails = ({ id }: PostDetailsProps) => {
  const router = useRouter();

  const meQuery = useMeQuery();
  const postQuery = usePostQuery(id);
  const deletePostMutation = useDeletePostMutation();

  const isPending = postQuery.isPending || meQuery.isPending;
  if (isPending) return <Spinner />;

  const isError = postQuery.isError || meQuery.isError;
  if (isError) return <p className='text-center'>Failed to load post details. Please try again.</p>;

  const user = meQuery.data;
  const post = postQuery.data;

  const onDelete = () => {
    deletePostMutation.mutate(post.id, {
      onSuccess: () => router.push('/'),
    });
  };

  return (
    <div className='post_details-container'>
      <div className='hidden md:flex max-w-5xl w-full'>
        <Button
          onClick={router.back}
          variant='ghost'
          className='shad-button_ghost'
          icon={<Image src={'/assets/icons/back.svg'} alt='back' width={24} height={24} />}
        >
          <p className='small-medium lg:base-medium'>Back</p>
        </Button>
      </div>
      <div className='post_details-card'>
        <Image
          loading='eager'
          preload
          src={post.image.url}
          alt='creator'
          className='post_details-img'
          width={500}
          height={500}
        />

        <div className='post_details-info'>
          <div className='flex-col xs:flex-row gap-5 flex-between w-full'>
            <Link href={`/profile/${post.creator.id}`} className='flex items-center gap-3'>
              <Image
                src={post.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
                alt='creator'
                className='w-8 h-8 lg:w-12 lg:h-12 rounded-full'
                width={48}
                height={48}
              />
              <div className='flex gap-1 flex-col'>
                <p className='base-medium lg:body-bold text-light-1'>
                  {getCombinedUserName(post.creator.firstName, post.creator.lastName)}
                </p>
                <div className='flex-center gap-2 text-light-3'>
                  <p className='subtle-semibold lg:small-regular '>
                    {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
                  </p>
                  •<p className='subtle-semibold lg:small-regular'>{post.location}</p>
                </div>
              </div>
            </Link>

            <div className='flex xs:flex-center gap-4 justify-between xs:justify-center xs:w-auto w-full p-4 xs:p-0 items-center'>
              <Link href={`/posts/${post.id}/edit`} className={cn(user.id !== post.creator.id && 'hidden')}>
                <Image src={'/assets/icons/edit.svg'} alt='edit' width={24} height={24} />
              </Link>

              <Button
                onClick={onDelete}
                variant='ghost'
                className={cn('ost_details-delete_btn', user.id !== post.creator.id && 'hidden')}
                icon={<Image src='/assets/icons/delete.svg' alt='delete' width={24} height={24} />}
              />
            </div>
          </div>
          <hr className='border w-full' style={{ borderColor: 'color-mix(in oklab, #1f1f22 80%, transparent)' }} />
          <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
            <p>{post.caption}</p>
            <ul className='flex gap-1 mt-2'>
              {post.tags.map((tag: string, i: number) => (
                <li key={`${tag}${i}`} className='text-light-3 small-regular'>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-between items-center z-20 w-full'>
            <LikePostButton {...post} />

            <SavePostButton postId={post.id} saved={post.isSaved} />
          </div>
        </div>
      </div>
    </div>
  );
};
