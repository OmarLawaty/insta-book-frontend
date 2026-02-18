import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient, UseQueryOptions, type QueryFunctionContext } from '@tanstack/react-query';
import { instabook, Post } from '@/api';

const queryKey = (postId: number) => ['post', String(postId)] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = ({ queryKey: [, postId] }: QueryFunctionContext<QueryKey>) =>
  instabook.get<Post, AxiosResponse<Post>>(`/posts/${postId}`).then(res => res.data);

export const usePostQuery = (
  postId: number,
  options?: Omit<UseQueryOptions<Post, Error, Post, QueryKey>, 'queryKey' | 'queryFn'>,
) => useQuery({ ...options, queryKey: queryKey(postId), queryFn });

export const useInvalidatePostQuery = (postId: number) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: queryKey(postId) });
};

export const useSetPostQueryData = () => {
  const queryClient = useQueryClient();

  return (postId: number, post: Post) => queryClient.setQueryData(queryKey(postId), post);
};

usePostQuery.queryKey = queryKey;
usePostQuery.queryFn = queryFn;
