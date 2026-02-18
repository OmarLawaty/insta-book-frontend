import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { instabook } from '@/api';

const queryKey = ['is-logged-in'] as const;

const queryFn = () =>
  instabook
    .get<boolean, AxiosResponse<boolean>>('/auth')
    .then(res => res.data)
    .catch(() => false);

export const useIsLoggedInQuery = () => useQuery({ queryKey, queryFn });

export const useInvalidateIsLoggedInQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey });
};

useIsLoggedInQuery.queryKey = queryKey;
useIsLoggedInQuery.queryFn = queryFn;
