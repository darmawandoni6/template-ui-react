import axios, { type AxiosError } from 'axios';

import { env } from './config';

const httpService = axios.create({
  baseURL: env.BASE_URL,
});

httpService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default httpService;
