'use client';

import type { Dispatch, FC, ReactNode } from 'react';
import { createContext, useContext, useReducer } from 'react';

import { initialState, rootReducer } from './rootReducer';
import type { Action, TContext } from './type';

export const Context = createContext<TContext>({ state: initialState, dispatch: () => null });
const useProviders = () => useContext(Context);

export const useDispatch = () => useProviders().dispatch;
export const useStateValue = () => useProviders().state;

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, reducer] = useReducer(rootReducer, initialState);

  const asyncDispatch = (asyncAction: (dispatch: Dispatch<Action>) => Promise<void> | Action) => {
    if (typeof asyncAction === 'function') {
      asyncAction(reducer);
    } else {
      reducer(asyncAction);
    }
  };

  return <Context.Provider value={{ state, dispatch: asyncDispatch }}>{children}</Context.Provider>;
};

export default Providers;
