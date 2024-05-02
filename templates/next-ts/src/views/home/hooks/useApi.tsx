import type { AxiosError } from 'axios';

import httpService from '@src/helpers/httpService';
import useProviders from '@src/providers/useProviders';

const useApi = () => {
  const { state, dispatch } = useProviders();

  const fetch = async () => {
    const payload = { ...state.list };
    try {
      const res = await httpService.get('https://jsonplaceholder.typicode.com/posts');
      payload.data = res.data;
    } catch (error) {
      const e = error as AxiosError;

      payload.error = e.message;
    }
    dispatch({ type: 'list', payload });
  };
  const fetchID = async (id: string) => {
    const payload = { ...state.list };
    try {
      const res = await httpService.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      payload.detail = res.data;
    } catch (error) {
      const e = error as AxiosError;

      payload.error = e.message;
    }
    dispatch({ type: 'list', payload });
  };

  return { fetch, fetchID };
};

export default useApi;
