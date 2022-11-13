import { counterReducer, timerReducer } from '@features/home/data/home.reducer';
import { combineReducers } from 'redux';

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
};

export default combineReducers(reducers);
