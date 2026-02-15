import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { instabook, AuthUserResponse } from '@/api';

type Response = AuthUserResponse | null;

const queryKey = ['current-user'] as const;

const queryFn = () =>
  instabook
    .get<Response, AxiosResponse<Response>>('/auth/current-user')
    .then(res => res.data);

export const useCurrentUserQuery = () => useQuery({ queryKey, queryFn });

export const useInvalidateCurrentUserQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey });
};

useCurrentUserQuery.queryKey = queryKey;
useCurrentUserQuery.queryFn = queryFn;
