'use client';

import { useRouter } from 'next/navigation';

import { getSearchParams } from '@/helpers';
import { useInvalidateCurrentUserQuery, useCurrentUserQuery } from './auth/useCurrentUserQuery';

export const useLogin = () => {
  const router = useRouter();

  const meQuery = useCurrentUserQuery();
  const invalidateMeQuery = useInvalidateCurrentUserQuery();

  const isLoggedIn = !!meQuery.data;

  const login = async () => {
    await invalidateMeQuery();

    const fromEncodedPath = getSearchParams().get('from');
    if (fromEncodedPath) return router.replace(decodeURIComponent(fromEncodedPath));

    router.replace('/');
  };

  const logout = async () => {
    await invalidateMeQuery();

    router.replace('/login');
  };

  return {
    login,
    logout,
    isLoggedIn,
  };
};
