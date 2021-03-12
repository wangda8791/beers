import { combineReducers } from 'redux';

import beerReducer from './beer';

export default combineReducers({
  beer: beerReducer,
});
