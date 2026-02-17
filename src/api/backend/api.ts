import axios from 'axios';

import { isClient } from '@/helpers';

export const instabook = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3030',
  withCredentials: true,
});

// On the server, automatically forward the incoming request cookies to the backend.
instabook.interceptors.request.use(async config => {
  if (isClient()) return config;

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  if (cookieHeader) config.headers.set('Cookie', cookieHeader);

  return config;
});
