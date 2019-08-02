import { combineReducers } from 'redux';
import { reducer as studio } from '../features/Studio';

export const rootReducer = combineReducers({
  studio,
});
