import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { instabook, AuthUserResponse } from '@/api';

type Response = AuthUserResponse | null;

const queryKey = ['is-logged-in'] as const;

const queryFn = () =>
  instabook
    .get<Response, AxiosResponse<Response>>('/auth')
    .then(res => res.data)
    .catch(() => false);

export const useIsLoggedInQuery = () => useQuery({ queryKey, queryFn });

export const useInvalidateIsLoggedInQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey });
};

useIsLoggedInQuery.queryKey = queryKey;
useIsLoggedInQuery.queryFn = queryFn;
