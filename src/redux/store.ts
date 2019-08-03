import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './rootReducerasd';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

let middlewares = [
  applyMiddleware(thunk),
];

// if (typeof (window as any) === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
//   middlewares = middlewares.concat((window as any).__REDUX_DEVTOOLS_EXTENSION__({
//     serialize: {
//       options: true,
//     }
//   }));
// }

if (process.env.NODE_ENV === `development`) {
  middlewares = middlewares.concat(applyMiddleware(logger));
}


export const store = createStore(
  rootReducer,
  compose(...middlewares),
);
