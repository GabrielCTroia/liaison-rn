import { combineReducers } from 'redux';

const dummyReducer = (state = {}, action: string) => {
  return state;
}

export const reducers = combineReducers({
  dummyReducer,
});
