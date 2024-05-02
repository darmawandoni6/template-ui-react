import type { ReducerAction, TState, TStateList } from '../type';

export const listState: TStateList = {
  data: [],
  detail: null,
  error: '',
};

export const list = ({ type, payload }: ReducerAction<{ list: TState['list'] }>) => {
  if (type === 'list') {
    return payload;
  }

  return listState;
};
