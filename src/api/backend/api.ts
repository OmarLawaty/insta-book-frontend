import axios from 'axios';

import { getAccessToken } from './helpers';

export const instabook = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3030' });

// On the server, automatically forward the incoming request cookies to the backend.
instabook.interceptors.request.use(async config => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
