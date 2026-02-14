'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ErrorResponse, User, VerifyOTPSchema } from '@/api';

interface VerifyOTPParams extends VerifyOTPSchema {
  authId: string;
}

export const useVerifyOTPMutation = (options?: UseMutationOptions<User, AxiosError<ErrorResponse>, VerifyOTPParams>) =>
  useMutation<User, AxiosError<ErrorResponse>, VerifyOTPParams>({
    ...options,
    mutationFn: data =>
      instabook.post<User, AxiosResponse<User>, VerifyOTPParams>('/auth/verify-otp', data).then(res => res.data),
  });
