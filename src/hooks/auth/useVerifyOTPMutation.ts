'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ErrorResponse, VerifyOTPSchema } from '@/api';

interface VerifyOTPParams extends VerifyOTPSchema {
  authId: string;
}

export const useVerifyOTPMutation = (options?: UseMutationOptions<void, AxiosError<ErrorResponse>, VerifyOTPParams>) =>
  useMutation<void, AxiosError<ErrorResponse>, VerifyOTPParams>({
    ...options,
    mutationFn: data =>
      instabook.post<void, AxiosResponse<void>, VerifyOTPParams>('/auth/verify-otp', data).then(res => res.data),
  });
