'use client';

import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { instabook } from '@/api';
import type { ErrorResponse } from '@/api';

interface ResendOTPParams {
  authId: string;
}

export const useResendOTPMutation = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>, ResendOTPParams>) =>
  useMutation<null, AxiosError<ErrorResponse>, ResendOTPParams>({
    ...options,
    mutationFn: data =>
      instabook.post<null, AxiosResponse<null>, ResendOTPParams>('/auth/resend-otp', data).then(res => res.data),
  });
