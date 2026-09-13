import { useCounterStore } from '@/stores/use-counter-store';

describe('useCounterStore', () => {
  beforeEach(() => {
    useCounterStore.getState().reset();
  });

  it('should initialize with count = 0', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('should increment count', () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(2);
  });

  it('should decrement count', () => {
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(-1);
  });

  it('should set specific count value', () => {
    useCounterStore.getState().setCount(42);
    expect(useCounterStore.getState().count).toBe(42);
  });

  it('should reset count back to 0', () => {
    useCounterStore.getState().setCount(100);
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
  });
});
