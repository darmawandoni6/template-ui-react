import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import { env } from './env';

export class ApiError extends Error {
  public statusCode?: number;
  public data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Pre-configured Axios instance with request and response interceptors
 */
export const http: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Attach token if available on client-side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response Interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const status = error.response?.status;
    const responseData = error.response?.data;
    const message = responseData?.message || error.message || 'An unexpected error occurred';

    // Handle 401 Unauthorized safely
    if (status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        // If navigating to login, preserve current path if needed
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(new ApiError(message, status, responseData));
  },
);

export default http;
