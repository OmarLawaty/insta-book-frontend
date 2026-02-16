import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { ErrorResponse, UploadFileResponse, instabook } from '@/api';

export const useUploadImageMutation = (
  options?: UseMutationOptions<UploadFileResponse, AxiosError<ErrorResponse>, File>,
) =>
  useMutation<UploadFileResponse, AxiosError<ErrorResponse>, File>({
    ...options,
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      return await instabook
        .post<UploadFileResponse, AxiosResponse<UploadFileResponse>, FormData>('/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => res.data);
    },
  });
