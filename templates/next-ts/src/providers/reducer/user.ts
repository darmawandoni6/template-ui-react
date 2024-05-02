import type { ReducerAction, TState, TStateUser } from '../type';

export const userState: TStateUser = {
  data: [],
  error: '',
  loading: false,
};

export const user = ({ type, payload }: ReducerAction<{ user: TState['user'] }>) => {
  if (type === 'user') {
    return payload;
  }
  return userState;
};
