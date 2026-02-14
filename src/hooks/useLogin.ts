'use client';

import { useRouter } from 'next/navigation';

import { getSearchParams } from '@/lib/helpers';
import { useInvalidateMeQuery, useMeQuery } from './useMeQuery';

export const useLogin = () => {
  const router = useRouter();

  const meQuery = useMeQuery();
  const invalidateMeQuery = useInvalidateMeQuery();

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
