import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { instabook, User } from '@/api';

const queryKey = ['me'] as const;

const queryFn = () => instabook.get<User, AxiosResponse<User>>('/users/me').then(res => res.data);

export const useMeQuery = () => useQuery({ queryKey, queryFn });

export const useInvalidateMeQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey });
};

useMeQuery.queryKey = queryKey;
useMeQuery.queryFn = queryFn;
