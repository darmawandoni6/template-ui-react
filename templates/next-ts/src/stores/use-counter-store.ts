import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (count: number) => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  devtools(
    set => ({
      count: 0,
      increment: () => set(state => ({ count: state.count + 1 }), false, 'counter/increment'),
      decrement: () => set(state => ({ count: state.count - 1 }), false, 'counter/decrement'),
      setCount: count => set({ count }, false, 'counter/setCount'),
      reset: () => set({ count: 0 }, false, 'counter/reset'),
    }),
    { name: 'counter-store' },
  ),
);
