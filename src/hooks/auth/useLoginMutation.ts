'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { User, ErrorResponse, LoginSchema } from '@/api';

import { useLogin } from '../useLogin';

export const useLoginMutation = (options?: UseMutationOptions<User, AxiosError<ErrorResponse>, LoginSchema>) => {
  const { login } = useLogin();

  return useMutation<User, AxiosError<ErrorResponse>, LoginSchema>({
    ...options,
    mutationFn: data =>
      instabook.post<User, AxiosResponse<User>, LoginSchema>('/auth/login', data).then(res => res.data),
    onSuccess: (...props) => {
      login();

      options?.onSuccess?.(...props);
    },
  });
};
