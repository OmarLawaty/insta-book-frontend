'use client';

import { getSearchParams } from '@/helpers';
import { useIsLoggedInQuery } from './auth/useIsLoggedInQuery';
import { removeAccessToken, setAccessToken } from '@/api/backend/helpers';
import { useRouter } from 'nextjs-toploader/app';
import { useInvalidateMeQuery } from './useMeQuery';

export const useLogin = () => {
  const router = useRouter();

  const isLoggedInQuery = useIsLoggedInQuery();
  const invalidateMeQuery = useInvalidateMeQuery();

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

    router.replace('/login');
  };

  return {
    login,
    logout,
    isLoggedIn,
  };
};
