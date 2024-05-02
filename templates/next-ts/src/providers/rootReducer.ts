import { list, listState } from './reducer/list';
import { user, userState } from './reducer/user';
import type { ReducerAction, TState } from './type';

export const initialState: TState = {
  show: '',
  list: listState,
  user: userState,
};

export const rootReducer = (state = initialState, { type, payload }: ReducerAction<TState>) => {
  return {
    ...state,
    list: list({ type: 'list', payload: payload as TState['list'] }),
    user: user({ type: 'user', payload: payload as TState['user'] }),
  };
};
