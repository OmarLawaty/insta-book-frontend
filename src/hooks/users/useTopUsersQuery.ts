import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { instabook, TopUser } from '@/api';

const queryKey = ['top-users'] as const;

const queryFn = () => instabook.get<TopUser[], AxiosResponse<TopUser[]>>('/users/top/8').then(res => res.data);

export const useTopUsersQuery = () => useQuery({ queryKey, queryFn });

useTopUsersQuery.queryKey = queryKey;
useTopUsersQuery.queryFn = queryFn;
