'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useLogin, useSavePostMutation, useSetPostQueryData } from '@/hooks';
import { Button } from './Button';
import { Post } from '@/api';

interface SavePostParams {
  postId: number;
  saved?: boolean;
  onSaveStatusChange?: () => void;
}

export const SavePostButton = ({ postId, saved, onSaveStatusChange }: SavePostParams) => {
  const [post, setPost] = useState<Post | undefined>(undefined);

  const { isLoggedIn } = useLogin();
  const setPostQueryData = useSetPostQueryData();
  const savePostMutation = useSavePostMutation({
    onSuccess: updatedPost => {
      setPost(updatedPost);
      setPostQueryData(postId, updatedPost);
      onSaveStatusChange?.();
    },
  });

  const isSaved = post ? post.isSaved : saved;
  const iconSrc = isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg';
  return (
    <Button
      onClick={() => {
        savePostMutation.mutate(postId);
      }}
      isDisabled={!isLoggedIn}
      isLoading={savePostMutation.isPending}
      icon={<Image src={iconSrc} alt='save' width={20} height={20} />}
    />
  );
};
