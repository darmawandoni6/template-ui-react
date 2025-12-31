import { redirect } from 'next/navigation';

import axios, { type AxiosError } from 'axios';

export const http = axios.create({
  baseURL: '/api',
});

http.interceptors.response.use(
  response => response,
  error => {
    const err = error as AxiosError<{ message: string }>;

    if (err.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.replace('/login');
      } else {
        redirect('/login');
      }
      err.message = 'Unauthorized';
    } else if (err.response?.data) {
      err.message = err.response?.data?.message || 'Something error';
    }

    return Promise.reject(error);
  },
);
