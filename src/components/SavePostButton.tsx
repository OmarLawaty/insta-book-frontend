'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useInvalidatePostQuery, useSavePostMutation } from '@/hooks';
import { Button } from './Button';

interface SavePostParams {
  postId: number;
  saved?: boolean;
}

export const SavePostButton = ({ postId, saved }: SavePostParams) => {
  const invalidatePostQuery = useInvalidatePostQuery(postId);

  const savePostMutation = useSavePostMutation({
    onSettled: () => {
      invalidatePostQuery();
    },
  });

  const [isSaved, setIsSaved] = useState(saved ?? false);

  const iconSrc = isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg';
  return (
    <Button
      onClick={() => {
        savePostMutation.mutate(postId);
        setIsSaved(prev => !prev);
      }}
      isLoading={savePostMutation.isPending}
      icon={<Image src={iconSrc} alt='save' width={20} height={20} />}
    />
  );
};
