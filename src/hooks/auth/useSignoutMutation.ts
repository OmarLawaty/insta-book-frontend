'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ErrorResponse } from '@/api';
import { useLogin } from '../useLogin';

export const useSignoutMutation = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>>) => {
  const { logout } = useLogin();

  return useMutation<null, AxiosError<ErrorResponse>>({
    ...options,
    mutationFn: data => instabook.post<null, AxiosResponse<null>>('/auth/signout', data).then(res => res.data),
    onSuccess: (...props) => {
      logout();

      options?.onSuccess?.(...props);
    },
  });
};
