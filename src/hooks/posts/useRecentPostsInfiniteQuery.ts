import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { InfiniteQueryResponse, instabook, Post } from '@/api';

const queryKey = ['recent-posts'] as const;

const queryFn = ({ pageParam: cursor }: QueryFunctionContext<typeof queryKey, string | null>) =>
  instabook
    .get<
      InfiniteQueryResponse<Post>,
      AxiosResponse<InfiniteQueryResponse<Post>>
    >('/posts/recent', { params: { cursor, limit: 2 } })
    .then(res => res.data);

const initialPageParam = null;

export const useRecentPostsInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam,
  });

useRecentPostsInfiniteQuery.queryKey = queryKey;
useRecentPostsInfiniteQuery.queryFn = queryFn;
useRecentPostsInfiniteQuery.initialPageParam = initialPageParam;
