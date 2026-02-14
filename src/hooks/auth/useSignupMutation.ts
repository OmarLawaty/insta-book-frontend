'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { User, ErrorResponse } from '@/api';
import { useLogin } from '../useLogin';

interface SignupParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
}

export const useSignupMutation = (options?: UseMutationOptions<User, AxiosError<ErrorResponse>, SignupParams>) => {
  const { login } = useLogin();

  return useMutation<User, AxiosError<ErrorResponse>, SignupParams>({
    ...options,
    mutationFn: data =>
      instabook.post<User, AxiosResponse<User>, SignupParams>('/auth/signup', data).then(res => res.data),

    onSuccess: (...props) => {
      login();

      options?.onSuccess?.(...props);
    },
  });
};
