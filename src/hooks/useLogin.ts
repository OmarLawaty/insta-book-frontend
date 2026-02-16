'use client';

import { useRouter } from 'next/navigation';

import { getSearchParams } from '@/helpers';
import { useInvalidateIsLoggedInQuery, useIsLoggedInQuery } from './auth/useIsLoggedInQuery';

export const useLogin = () => {
  const router = useRouter();

  const isLoggedInQuery = useIsLoggedInQuery();
  const invalidateMeQuery = useInvalidateIsLoggedInQuery();

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
    isLoggedIn: isLoggedInQuery.data ?? false,
  };
};
