import axios from 'axios';

export const instabook = axios.create({ baseURL: 'http://localhost:3030' });
