'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useLikePostMutation, usePostQuery } from '@/hooks';
import { Button } from './Button';
import { Post } from '@/api';

export const LikePostButton = (props: Post) => {
  const postQuery = usePostQuery(props.id, {
    placeholderData: props,
  });

  const likePostMutation = useLikePostMutation({
    onSuccess: () => {
      postQuery.refetch();
    },
  });

  const [isLiked, setIsLiked] = useState(postQuery.data?.isLiked ?? false);

  const iconSrc = isLiked ? '/assets/icons/liked.svg' : '/assets/icons/like.svg';
  return (
    <Button
      onClick={() => {
        likePostMutation.mutate(props.id);
        setIsLiked(prev => !prev);
      }}
      isLoading={likePostMutation.isPending}
      icon={<Image src={iconSrc} alt='like' width={20} height={20} />}
      className='flex gap-2 mr-5'
    >
      <p className='small-medium lg:base-medium'>{postQuery.data?.likes ?? props.likes}</p>
    </Button>
  );
};
