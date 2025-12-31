'use client';

import { type ReactNode, createContext, useContext, useSyncExternalStore } from 'react';

export function createStore<T extends object>(initialState: T) {
  // ===== External store =====
  let state = initialState;
  const listeners = new Set<() => void>();

  const getState = () => state;

  const setState = (update: Partial<T> | ((prev: T) => Partial<T>)) => {
    const newState = typeof update === 'function' ? update(state) : update;

    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // ===== Context hanya menyimpan referensi store =====
  const StoreContext = createContext<{
    getState: () => T;
    setState: typeof setState;
    subscribe: typeof subscribe;
  } | null>(null);

  const StoreProvider = ({ children }: { children: ReactNode }) => (
    <StoreContext.Provider value={{ getState, setState, subscribe }}>{children}</StoreContext.Provider>
  );

  // ===== Selector =====
  function useStore<S>(selector: (s: T) => S): S {
    const store = useContext(StoreContext);
    if (!store) throw new Error('useStore harus di dalam StoreProvider');

    return useSyncExternalStore(
      store.subscribe,
      () => selector(store.getState()), // client snapshot
      () => {
        return selector(store.getState());
      }, // server snapshot for SSR
    );
  }

  const useSetStore = () => {
    const store = useContext(StoreContext);
    if (!store) throw new Error('useSetStore harus di dalam StoreProvider');
    return store.setState;
  };

  return { StoreProvider, useStore, useSetStore };
}
