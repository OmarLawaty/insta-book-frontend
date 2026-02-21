import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { ErrorResponse, Image, instabook } from '@/api';

export const useUploadImageMutation = (options?: UseMutationOptions<Image, AxiosError<ErrorResponse>, File>) =>
  useMutation<Image, AxiosError<ErrorResponse>, File>({
    ...options,
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      return await instabook
        .post<Image, AxiosResponse<Image>, FormData>('/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => res.data);
    },
  });
