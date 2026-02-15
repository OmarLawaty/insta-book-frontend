'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ErrorResponse, AuthUserResponse, VerifyOTPSchema } from '@/api';

interface VerifyOTPParams extends VerifyOTPSchema {
  authId: string;
}

export const useVerifyOTPMutation = (
  options?: UseMutationOptions<AuthUserResponse, AxiosError<ErrorResponse>, VerifyOTPParams>,
) =>
  useMutation<AuthUserResponse, AxiosError<ErrorResponse>, VerifyOTPParams>({
    ...options,
    mutationFn: data =>
      instabook
        .post<AuthUserResponse, AxiosResponse<AuthUserResponse>, VerifyOTPParams>('/auth/verify-otp', data)
        .then(res => res.data),
  });
