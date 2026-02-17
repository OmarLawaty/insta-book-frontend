import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { ErrorResponse, Post, CreatePostParams, instabook } from '@/api';
import { useInvalidateMeQuery } from '../useMeQuery';

interface CreatePostVariables extends Omit<CreatePostParams, 'tags' | 'file'> {
  imageId: string;
  tags: string[];
}

export const useCreatePostMutation = (
  options?: UseMutationOptions<Post, AxiosError<ErrorResponse>, CreatePostParams>,
) => {
  const invalidateMeQuery = useInvalidateMeQuery();

  return useMutation<Post, AxiosError<ErrorResponse>, CreatePostParams>({
    ...options,
    mutationFn: (data: CreatePostParams) =>
      instabook.post<Post, AxiosResponse<Post>, CreatePostVariables>('/posts/create', data).then(res => res.data),
    onSuccess: (...props) => {
      invalidateMeQuery();

      options?.onSuccess?.(...props);
    },
  });
};
