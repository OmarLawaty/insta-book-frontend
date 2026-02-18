import cookies from 'js-cookie';

import { isClient } from '@/helpers';

export const setAccessToken = (token: string) => {
  if (!isClient()) return;

  cookies.set('authToken', token, { expires: 30, secure: true, sameSite: 'Lax' });
};

export const getAccessToken = async () => {
  if (!isClient()) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();

    return cookieStore.get('authToken')?.value;
  }

  return cookies.get('authToken');
};

export const removeAccessToken = () => {
  if (!isClient()) return;

  cookies.remove('authToken');
};
