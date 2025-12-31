import { act } from 'react-dom/test-utils';

import { createStore } from './store';

interface State {
  counter: number;
  get: number;
}

describe('Custom Store', () => {
  let store: ReturnType<typeof createStore<State>>;

  beforeEach(() => {
    store = createStore<State>({ counter: 0, get: 0 });
  });

  test('initial state is correct', () => {
    const { StoreProvider, useStore, useSetStore } = store;
    expect(store.StoreProvider).toBeDefined();
    const initialState = store.StoreProvider ? { counter: 0, get: 0 } : null;
    expect(initialState).toEqual({ counter: 0, get: 0 });
  });

  test('setState updates state correctly', () => {
    const { getState, setState } = store['StoreProvider'].type.prototype.value ?? store; // accessing underlying store

    // update using partial
    setState({ counter: 5 });
    expect(getState().counter).toBe(5);

    // update using functional set
    setState(prev => ({ counter: prev.counter + 10 }));
    expect(getState().counter).toBe(15);
  });

  test('subscribe notifies listeners', () => {
    const { subscribe, setState, getState } = store['StoreProvider'].type.prototype.value ?? store;
    const listener = jest.fn();

    const unsubscribe = subscribe(listener);
    setState({ counter: 1 });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    setState({ counter: 2 });
    expect(listener).toHaveBeenCalledTimes(1); // should not be called again
  });
});
