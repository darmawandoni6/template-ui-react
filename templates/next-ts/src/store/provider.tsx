'use client';

import { createStore } from './store';
import { type InitialState } from './type';

const initialState: InitialState = {
  counter: 0,
  get: 0,
};

export const { StoreProvider, useStore, useSetStore } = createStore(initialState);
