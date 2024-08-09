import type { Dispatch } from 'react';

import httpService from '@src/helpers/httpService';
import type { Action } from '@src/providers/type';

export const jsonplaceholder = {
  fetch: () => {
    return async (dispatch: Dispatch<Action>) => {
      try {
        dispatch({
          type: 'list',
          payload: { loading: true, error: '' },
        });
        const res = await httpService.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
          type: 'list',
          payload: {
            loading: false,
            data: res.data,
          },
        });
      } catch (error) {
        dispatch({
          type: 'list',
          payload: { loading: false, error: JSON.stringify(error) },
        });
      }
    };
  },
  fetchDetail: (id: string) => {
    return async (dispatch: Dispatch<Action>) => {
      try {
        dispatch({
          type: 'list',
          payload: { loading: true, error: '' },
        });
        const res = await httpService.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        dispatch({
          type: 'list',
          payload: {
            loading: false,
            detail: res.data,
          },
        });
      } catch (error) {
        dispatch({
          type: 'list',
          payload: { loading: false, error: JSON.stringify(error) },
        });
      }
    };
  },
};
