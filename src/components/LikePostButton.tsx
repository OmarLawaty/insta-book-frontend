'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useLikePostMutation, useSetPostQueryData } from '@/hooks';
import { Button } from './Button';
import { Post } from '@/api';

interface LikePostButtonProps extends Post {
  onLikeStatusChange?: () => void;
}

export const LikePostButton = ({ onLikeStatusChange, ...props }: LikePostButtonProps) => {
  const [post, setPost] = useState<Post>(props);

  const setPostQueryData = useSetPostQueryData();
  const likePostMutation = useLikePostMutation({
    onSuccess: updatedPost => {
      setPost(updatedPost);
      setPostQueryData(props.id, updatedPost);
      onLikeStatusChange?.();
    },
  });

  const iconSrc = post.isLiked ? '/assets/icons/liked.svg' : '/assets/icons/like.svg';
  return (
    <Button
      onClick={() => {
        likePostMutation.mutate(props.id);
      }}
      isLoading={likePostMutation.isPending}
      icon={<Image src={iconSrc} alt='like' width={20} height={20} />}
      className='flex gap-2'
    >
      <p className='small-medium lg:base-medium'>{post.likes}</p>
    </Button>
  );
};
