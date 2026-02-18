'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useSavePostMutation, useSetPostQueryData } from '@/hooks';
import { Button } from './Button';
import { Post } from '@/api';

interface SavePostParams {
  postId: number;
  saved?: boolean;
}

export const SavePostButton = ({ postId, saved }: SavePostParams) => {
  const [post, setPost] = useState<Post | undefined>(undefined);

  const setPostQueryData = useSetPostQueryData();
  const savePostMutation = useSavePostMutation({
    onSuccess: updatedPost => {
      setPost(updatedPost);
      setPostQueryData(postId, updatedPost);
    },
  });

  const isSaved = post ? post.isSaved : saved;
  const iconSrc = isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg';
  return (
    <Button
      onClick={() => {
        savePostMutation.mutate(postId);
      }}
      isLoading={savePostMutation.isPending}
      icon={<Image src={iconSrc} alt='save' width={20} height={20} />}
    />
  );
};
