import { createStore } from './store';

interface State {
  counter: number;
  get: number;
}

describe('createStore', () => {
  let store: ReturnType<typeof createStore<State>>;

  beforeEach(() => {
    store = createStore<State>({ counter: 0, get: 0 });
  });

  test('initial state is set correctly', () => {
    expect(store.StoreProvider).toBeDefined();
    expect(store.useStore).toBeDefined();
    expect(store.useSetStore).toBeDefined();

    // Accessing underlying store directly
    const { getState } = store['StoreProvider'].type.prototype.value ?? store;
    expect(getState()).toEqual({ counter: 0, get: 0 });
  });

  test('setState updates state correctly', () => {
    const { getState, setState } = store['StoreProvider'].type.prototype.value ?? store;

    // Partial update
    setState({ counter: 5 });
    expect(getState().counter).toBe(5);

    // Functional update
    setState(prev => ({ counter: prev.counter + 10 }));
    expect(getState().counter).toBe(15);
  });

  test('subscribe notifies listeners', () => {
    const { subscribe, setState } = store['StoreProvider'].type.prototype.value ?? store;
    const listener = jest.fn();

    const unsubscribe = subscribe(listener);
    setState({ counter: 1 });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    setState({ counter: 2 });
    expect(listener).toHaveBeenCalledTimes(1); // listener removed
  });
});
