import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './rootReducerasd';
import thunk from 'redux-thunk';

let middlewares = [
  applyMiddleware(thunk),
];

if (typeof (window as any) === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares = middlewares.concat((window as any).__REDUX_DEVTOOLS_EXTENSION__({
    serialize: {
      options: true,
    }
  }));
}

export const store = createStore(
  rootReducer,
  {},
  compose(...middlewares),
);
