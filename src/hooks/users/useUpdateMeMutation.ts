import type { AxiosError, AxiosResponse } from 'axios';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { ErrorResponse, FullUser, instabook, UpdateMeParams } from '@/api';

export const useUpdateMeMutation = (
  options?: UseMutationOptions<FullUser, AxiosError<ErrorResponse>, Partial<UpdateMeParams>>,
) => {
  return useMutation<FullUser, AxiosError<ErrorResponse>, Partial<UpdateMeParams>>({
    ...options,
    mutationFn: data =>
      instabook
        .put<FullUser, AxiosResponse<FullUser>, Partial<UpdateMeParams>>('users/me/', data)
        .then(res => res.data),
  });
};
