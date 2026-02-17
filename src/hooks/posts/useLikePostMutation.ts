'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ErrorResponse } from '@/api';

export const useLikePostMutation = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>, number>) =>
  useMutation<null, AxiosError<ErrorResponse>, number>({
    ...options,
    mutationFn: postId =>
      instabook.post<null, AxiosResponse<null>, number>(`/posts/like/${postId}`).then(res => res.data),
  });
