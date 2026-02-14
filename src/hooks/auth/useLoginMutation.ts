'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { User, ErrorResponse } from '@/api';

interface LoginParams {
  email: string;
  password: string;
}

export const useLoginMutation = (options?: UseMutationOptions<User, AxiosError<ErrorResponse>, LoginParams>) => {
  return useMutation<User, AxiosError<ErrorResponse>, LoginParams>({
    ...options,
    mutationFn: data =>
      instabook.post<User, AxiosResponse<User>, LoginParams>('/auth/login', data).then(res => res.data),
  });
};
