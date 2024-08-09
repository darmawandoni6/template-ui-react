import type { AxiosError } from 'axios';
import axios from 'axios';

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
  (error: AxiosError<{ message: string }>) => {
    const { response, message } = error;

    let msg = message;

    if (response?.data?.message) {
      msg = response.data.message;
    }

    return Promise.reject(msg);
  },
);

export default httpService;
