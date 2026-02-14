import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { instabook, User } from '@/api';

type Response = User | null;

const queryKey = ['me'] as const;

const queryFn = (cookie?: string) =>
  instabook
    .get<Response, AxiosResponse<Response>>('/auth/me', {
      headers: cookie ? { Cookie: cookie } : undefined,
    })
    .then(res => res.data);

export const useMeQuery = () => useQuery({ queryKey, queryFn: () => queryFn });

export const useInvalidateMeQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey });
};

useMeQuery.queryKey = queryKey;
useMeQuery.queryFn = queryFn;
