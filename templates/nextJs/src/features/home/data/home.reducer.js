import homeType from './home.type';

// COUNTER REDUCER
export const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case homeType.INCREMENT:
      return state + 1;
    case homeType.DECREMENT:
      return state - 1;
    case homeType.RESET:
      return 0;
    default:
      return state;
  }
};

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
};

// TIMER REDUCER
export const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case homeType.TICK:
      return {
        lastUpdate: payload.ts,
        light: !!payload.light,
      };
    default:
      return state;
  }
};
