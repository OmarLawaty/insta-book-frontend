import { AxiosResponse } from 'axios';
import { InfiniteData, QueryFunctionContext, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { InfiniteQueryResponse, instabook, Post } from '@/api';

const queryKey = ['saved-posts'] as const;

type QueryData = InfiniteData<InfiniteQueryResponse<Post>>;

const queryFn = ({ pageParam: cursor }: QueryFunctionContext<typeof queryKey, string | null>) =>
  instabook
    .get<
      InfiniteQueryResponse<Post>,
      AxiosResponse<InfiniteQueryResponse<Post>>
    >('/posts/saved', { params: { cursor, limit: 9 } })
    .then(res => res.data);

const initialPageParam = null;

export const useSavedPostsInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam,
  });

export const useUpdatePostData = () => {
  const queryClient = useQueryClient();

  return (post: Post) =>
    queryClient.setQueryData<QueryData>(queryKey, data => {
      if (!data) return data;

      return {
        ...data,
        pages: data.pages.map(page => ({
          ...page,
          data: page.data.filter(item => item.id !== post.id),
        })),
      };
    });
};

useSavedPostsInfiniteQuery.queryKey = queryKey;
useSavedPostsInfiniteQuery.queryFn = queryFn;
useSavedPostsInfiniteQuery.initialPageParam = initialPageParam;
