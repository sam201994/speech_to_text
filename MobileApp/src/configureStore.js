import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
// import {composeWithDevTools} from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import rootSaga from './sagas';

export default function configureStore(initialState, middlewareOptions) {
  const sagaMiddleware = createSagaMiddleware(middlewareOptions);
  const loggerMiddleware = createLogger({
    predicate: () => __DEV__,
  });
  const middlewares = [sagaMiddleware, loggerMiddleware];

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  // sagaMiddleware.run(rootSaga);
  let task = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      // we do this so the reducer is reloaded on each hot reload
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);

      // we do this so the saga is reloaded on each hot reload
      // eslint-disable-next-line global-require
      const nextRootSaga = require('./sagas').default;

      task.cancel();
      task.done.then(() => {
        task = sagaMiddleware.run(nextRootSaga);
      });

      // const nextRootSaga = require("NumeroExhibitorApp/core/sagas").default;
      // sagasManager.cancel();
      // sagasManager.done.then(() => {
      //   sagasManager = sagaMiddleware.run(nextRootSaga);
      // });
    });
  }

  return {store, task, sagaMiddleware};
}
