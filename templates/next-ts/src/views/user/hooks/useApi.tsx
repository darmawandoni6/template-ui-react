import type { AxiosError } from 'axios';

import httpService from '@src/helpers/httpService';
import useProviders from '@src/providers/useProviders';

const useApi = () => {
  const { state, dispatch } = useProviders();

  const fetch = async () => {
    const payload = { ...state.user };
    payload.loading = true;
    dispatch({ type: 'user', payload });

    try {
      const res = await httpService.get('https://jsonplaceholder.typicode.com/users');
      payload.data = res.data;
    } catch (error) {
      const e = error as AxiosError;

      payload.error = e.message;
    }
    payload.loading = false;
    dispatch({ type: 'user', payload });
  };

  return { fetch };
};

export default useApi;
