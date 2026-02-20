import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteQueryResponse, instabook, TopUser } from '@/api';

const queryKey = (search?: string) => ['users', search] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = ({ queryKey: [, search], pageParam: cursor }: QueryFunctionContext<QueryKey>) =>
  instabook
    .get<InfiniteQueryResponse<TopUser>, AxiosResponse<InfiniteQueryResponse<TopUser>>>('/users', {
      params: { search, cursor, limit: 9 },
    })
    .then(res => res.data);

const initialPageParam = null;

export const useUsersInfiniteQuery = (search?: string) =>
  useInfiniteQuery({
    queryKey: queryKey(search),
    queryFn,
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam,
  });

useUsersInfiniteQuery.queryKey = queryKey;
useUsersInfiniteQuery.queryFn = queryFn;
useUsersInfiniteQuery.initialPageParam = initialPageParam;
