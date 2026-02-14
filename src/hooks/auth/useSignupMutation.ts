'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { User, ErrorResponse, SignupSchema } from '@/api';

import { useLogin } from '../useLogin';

export const useSignupMutation = (options?: UseMutationOptions<User, AxiosError<ErrorResponse>, SignupSchema>) => {
  const { login } = useLogin();

  return useMutation<User, AxiosError<ErrorResponse>, SignupSchema>({
    ...options,
    mutationFn: data =>
      instabook.post<User, AxiosResponse<User>, SignupSchema>('/auth/signup', data).then(res => res.data),

    onSuccess: (...props) => {
      login();

      options?.onSuccess?.(...props);
    },
  });
};
