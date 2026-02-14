'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ForgotPasswordResponse, ErrorResponse, ForgotPasswordSchema } from '@/api';

export const useForgotPasswordMutation = (
  options?: UseMutationOptions<ForgotPasswordResponse, AxiosError<ErrorResponse>, ForgotPasswordSchema>,
) => {
  return useMutation<ForgotPasswordResponse, AxiosError<ErrorResponse>, ForgotPasswordSchema>({
    ...options,
    mutationFn: data =>
      instabook
        .post<
          ForgotPasswordResponse,
          AxiosResponse<ForgotPasswordResponse>,
          ForgotPasswordSchema
        >('/auth/forgot-password', data)
        .then(res => res.data),
    onSuccess: (...props) => {
      options?.onSuccess?.(...props);
    },
  });
};
