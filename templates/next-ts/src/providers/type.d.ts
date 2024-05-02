import type { Dispatch, ReactNode } from 'react';

type ReducerAction<T> = {
  [Key in keyof T]: {
    type: Key;
    payload: T[Key];
  };
}[keyof T];

export type TStateList = {
  data: Post[];
  detail: Post | null;
  error: string;
};
export type TStateUser = {
  data: Users[];
  error: string;
  loading: boolean;
};

export type TState = {
  show: string;
  list: TStateList;
  user: TStateUser;
};

export type TContext = {
  state: TState;
  dispatch: Dispatch<ReducerAction<TState>>;
};

export type TContexProvider = {
  children: ReactNode;
};
