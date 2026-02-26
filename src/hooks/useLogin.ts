'use client';

import { useRouter } from 'next/navigation';

import { getSearchParams } from '@/helpers';
import { useInvalidateIsLoggedInQuery, useIsLoggedInQuery } from './auth/useIsLoggedInQuery';
import { removeAccessToken, setAccessToken } from '@/api/backend/helpers';

export const useLogin = () => {
  const router = useRouter();

  const isLoggedInQuery = useIsLoggedInQuery();
  const invalidateMeQuery = useInvalidateIsLoggedInQuery();

  const isLoggedIn = isLoggedInQuery.data ?? false;

  const login = async (accessToken: string) => {
    setAccessToken(accessToken);

    if (isLoggedIn) await invalidateMeQuery();

    const fromEncodedPath = getSearchParams().get('from');
    if (fromEncodedPath) return router.replace(decodeURIComponent(fromEncodedPath));

    router.replace('/');
  };

  const logout = async () => {
    removeAccessToken();

    if (isLoggedIn) await invalidateMeQuery();

    router.replace('/login');
  };

  return {
    login,
    logout,
    isLoggedIn,
  };
};
