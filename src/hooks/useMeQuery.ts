import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { instabook, User } from '@/api';

type Response = User | null;

const queryKey = ['me'] as const;

const queryFn = () => instabook.get<Response, AxiosResponse<Response>>('/auth/me').then(res => res.data);

export const useMeQuery = () => useQuery({ queryKey, queryFn });

useMeQuery.queryKey = queryKey;
useMeQuery.queryFn = queryFn;
