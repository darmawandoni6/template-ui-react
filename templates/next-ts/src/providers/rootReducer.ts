import type { ReducerAction, TState } from './type';

export const initialState: TState = {
  show: '',
  list: {
    data: [],
    detail: null,
    error: '',
    loading: false,
  },
  user: {
    data: [],
    error: '',
    loading: false,
  },
};

export const rootReducer = (state = initialState, action: ReducerAction<TState>) => {
  switch (action.type) {
    case 'list':
      state.list = {
        ...state.list,
        ...action.payload,
      };
      return {
        ...state,
      };

    default:
      return state;
  }
};
