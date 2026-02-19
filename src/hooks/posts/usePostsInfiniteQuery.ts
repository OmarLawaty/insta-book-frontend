import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteQueryResponse, instabook, Post } from '@/api';

const queryKey = (search?: string) => ['posts', search] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = ({ queryKey: [, search], pageParam: cursor }: QueryFunctionContext<QueryKey>) =>
  instabook
    .get<InfiniteQueryResponse<Post>, AxiosResponse<InfiniteQueryResponse<Post>>>('/posts', {
      params: { search, cursor, limit: 9 },
    })
    .then(res => res.data);

const initialPageParam = null;

export const usePostsInfiniteQuery = (search?: string) =>
  useInfiniteQuery({
    queryKey: queryKey(search),
    queryFn,
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam,
  });

usePostsInfiniteQuery.queryKey = queryKey;
usePostsInfiniteQuery.queryFn = queryFn;
usePostsInfiniteQuery.initialPageParam = initialPageParam;
