'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { AuthUserResponse, ErrorResponse, SignupSchema } from '@/api';

import { useLogin } from '../useLogin';

export const useSignupMutation = (
  options?: UseMutationOptions<AuthUserResponse, AxiosError<ErrorResponse>, SignupSchema>,
) => {
  const { login } = useLogin();

  return useMutation<AuthUserResponse, AxiosError<ErrorResponse>, SignupSchema>({
    ...options,
    mutationFn: data =>
      instabook
        .post<AuthUserResponse, AxiosResponse<AuthUserResponse>, SignupSchema>('/auth/signup', data)
        .then(res => res.data),

    onSuccess: (...props) => {
      login(props[0].accessToken);

      options?.onSuccess?.(...props);
    },
  });
};
