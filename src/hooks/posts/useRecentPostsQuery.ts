import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { instabook, Post } from '@/api';

const queryKey = ['recent-posts'] as const;

const queryFn = () => instabook.get<Post[], AxiosResponse<Post[]>>('/posts/recent').then(res => res.data);

export const useRecentPostsQuery = () => useQuery({ queryKey, queryFn });

useRecentPostsQuery.queryKey = queryKey;
useRecentPostsQuery.queryFn = queryFn;
