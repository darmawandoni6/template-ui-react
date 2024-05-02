'use client';

import { type FC, createContext, useReducer } from 'react';

import { initialState, rootReducer } from './rootReducer';
import type { TContexProvider, TContext } from './type';

export const Context = createContext<TContext | null>(null);

const ContexProvider: FC<TContexProvider> = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export default ContexProvider;
