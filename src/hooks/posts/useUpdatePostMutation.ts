import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { ErrorResponse, instabook, Post, CreatePostParams } from '@/api';

interface UpdatePostData extends Partial<CreatePostParams> {
  id: number;
}

export const useUpdatePostMutation = (
  options?: UseMutationOptions<Post, AxiosError<ErrorResponse>, UpdatePostData>,
) => {
  return useMutation<Post, AxiosError<ErrorResponse>, UpdatePostData>({
    ...options,
    mutationFn: data =>
      instabook.put<Post, AxiosResponse<Post>, UpdatePostData>(`/posts/${data.id}`, data).then(res => res.data),
  });
};
