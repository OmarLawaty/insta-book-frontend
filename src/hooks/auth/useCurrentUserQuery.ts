import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { instabook, User } from '@/api';

type Response = User | null;

const queryKey = ['current-user'] as const;

const queryFn = (cookie?: string) =>
  instabook
    .get<Response, AxiosResponse<Response>>('/auth/current-user', {
      headers: cookie ? { Cookie: cookie } : undefined,
    })
    .then(res => res.data);

export const useCurrentUserQuery = () => useQuery({ queryKey, queryFn: () => queryFn });

export const useInvalidateCurrentUserQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey });
};

useCurrentUserQuery.queryKey = queryKey;
useCurrentUserQuery.queryFn = queryFn;
