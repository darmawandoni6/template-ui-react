import httpService from '@helpers/httpService';

import homeType from './home.type';

export default {
  getExample: () => {
    return async (dispatch) => {
      dispatch({ type: homeType.LOADING });
      try {
        const res = await httpService.get('/users');
        dispatch({ type: homeType.HOME, payload: res.data });
      } catch (error) {
        dispatch({ type: homeType.LOADING });
        return error;
      }
    };
  },
};
