import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useQueryClient, UseQueryOptions, type QueryFunctionContext } from '@tanstack/react-query';
import { ErrorResponse, instabook, FullUser } from '@/api';

const queryKey = (userId: number) => ['user', String(userId)] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = ({ queryKey: [, userId] }: QueryFunctionContext<QueryKey>) =>
  instabook.get<FullUser, AxiosResponse<FullUser>>(`/users/${userId}`).then(res => res.data);

export const useUserQuery = (
  userId: number,
  options?: Omit<UseQueryOptions<FullUser, AxiosError<ErrorResponse>, FullUser, QueryKey>, 'queryKey' | 'queryFn'>,
) => useQuery({ ...options, queryKey: queryKey(userId), queryFn });

export const useInvalidateUserQuery = (userId: number) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: queryKey(userId) });
};

export const useSetUserQueryData = () => {
  const queryClient = useQueryClient();

  return (userId: number, user: FullUser) => queryClient.setQueryData(queryKey(userId), user);
};

useUserQuery.queryKey = queryKey;
useUserQuery.queryFn = queryFn;
