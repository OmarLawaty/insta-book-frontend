import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { ErrorResponse, Post, PostSchema, instabook } from '@/api';
import { useInvalidateMeQuery } from '../useMeQuery';

interface CreatePostVariables extends Omit<PostSchema, 'tags'> {
  tags: string[];
}

export const useCreatePostMutation = (options?: UseMutationOptions<Post, AxiosError<ErrorResponse>, PostSchema>) => {
  const invalidateMeQuery = useInvalidateMeQuery();

  return useMutation<Post, AxiosError<ErrorResponse>, PostSchema>({
    ...options,
    mutationFn: (postSchema: PostSchema) =>
      instabook
        .post<Post, AxiosResponse<Post>, CreatePostVariables>('/posts/create', {
          ...postSchema,
          tags: postSchema.tags.split(',').map(tag => tag.trim()),
        })
        .then(res => res.data),
    onSuccess: (...props) => {
      invalidateMeQuery();

      options?.onSuccess?.(...props);
    },
  });
};
