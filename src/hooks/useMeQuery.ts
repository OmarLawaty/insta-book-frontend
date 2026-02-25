import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useQuery, useQueryClient } from '@tanstack/react-query';

import { FullUser, instabook, PartialUser } from '@/api';

interface MeQueryProps {
  isFull?: boolean;
}

type MeQueryResult<T extends boolean> = T extends true ? FullUser : PartialUser;

const queryKey = (isFull?: boolean) => ['me', !!isFull] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = <T extends boolean = false>({ queryKey: [, isFull] }: QueryFunctionContext<QueryKey>) =>
  instabook
    .get<MeQueryResult<T>, AxiosResponse<MeQueryResult<T>>>(`/users/me/${isFull ? 'full' : ''}`)
    .then(res => res.data);

export const useMeQuery = ({ isFull = false }: MeQueryProps = {}) => useQuery({ queryKey: queryKey(isFull), queryFn });
export const useInvalidateMeQuery = () => {
  const queryClient = useQueryClient();

  return (isFull: boolean = false) => queryClient.invalidateQueries({ queryKey: queryKey(isFull) });
};

useMeQuery.queryKey = queryKey;
useMeQuery.queryFn = queryFn;
