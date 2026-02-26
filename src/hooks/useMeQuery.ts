import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { FullUser, instabook, PartialUser } from '@/api';
import { useLogin } from './useLogin';

type MeQueryResult<T extends boolean> = T extends true ? FullUser : PartialUser;

const queryKey = <T extends boolean>(isFull?: T) => ['me', !!isFull] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = <T extends boolean = false>({ queryKey: [, isFull] }: QueryFunctionContext<QueryKey>) =>
  instabook
    .get<MeQueryResult<T>, AxiosResponse<MeQueryResult<T>>>(`/users/me/${isFull ? 'full' : ''}`)
    .then(res => res.data);

export const useMeQuery = <T extends boolean = false>(isFull?: T): UseQueryResult<MeQueryResult<T>, Error> => {
  const { isLoggedIn } = useLogin();

  return useQuery({ queryKey: queryKey(isFull), queryFn: queryFn<T>, enabled: isLoggedIn });
};

export const useInvalidateMeQuery = () => {
  const queryClient = useQueryClient();

  return (isFull: boolean = false) => queryClient.invalidateQueries({ queryKey: queryKey(isFull) });
};

useMeQuery.queryKey = queryKey;
useMeQuery.queryFn = queryFn;
