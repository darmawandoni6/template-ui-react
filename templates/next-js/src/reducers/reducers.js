import { combineReducers } from 'redux';

import home from './home/home.reducer';

// COMBINED REDUCERS
const reducers = {
  home,
};

export default combineReducers(reducers);
