'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ErrorResponse, Post } from '@/api';

export const useLikePostMutation = (options?: UseMutationOptions<Post, AxiosError<ErrorResponse>, number>) =>
  useMutation<Post, AxiosError<ErrorResponse>, number>({
    ...options,
    mutationFn: postId =>
      instabook.post<Post, AxiosResponse<Post>, number>(`/posts/like/${postId}`).then(res => res.data),
  });
