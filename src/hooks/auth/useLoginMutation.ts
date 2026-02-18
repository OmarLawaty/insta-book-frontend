'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { AuthUserResponse, ErrorResponse, LoginSchema } from '@/api';

import { useLogin } from '../useLogin';

export const useLoginMutation = (
  options?: UseMutationOptions<AuthUserResponse, AxiosError<ErrorResponse>, LoginSchema>,
) => {
  const { login } = useLogin();

  return useMutation<AuthUserResponse, AxiosError<ErrorResponse>, LoginSchema>({
    ...options,
    mutationFn: data =>
      instabook
        .post<AuthUserResponse, AxiosResponse<AuthUserResponse>, LoginSchema>('/auth/login', data)
        .then(res => res.data),
    onSuccess: (...props) => {
      login(props[0].accessToken);

      options?.onSuccess?.(...props);
    },
  });
};
