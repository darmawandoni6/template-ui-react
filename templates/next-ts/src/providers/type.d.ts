import type { Dispatch, ReactNode } from 'react';

type Action = ReducerAction<TState>;

type ReducerAction<T> = {
  [Key in keyof T]: {
    type: Key;
    payload: Partial<T[Key]>;
  };
}[keyof T];

type TStateList = {
  loading: boolean;
  data: Post[];
  detail: Post | null;
  error: string;
};
type TStateUser = {
  data: Users[];
  error: string;
  loading: boolean;
};

type TState = {
  show: string;
  list: TStateList;
  user: TStateUser;
};

type TContext = {
  state: TState;
  dispatch: (asyncAction: (dispatch: Dispatch<Action>) => Promise<void> | Action) => void;
};
