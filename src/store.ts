import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {createReduxHistoryContext} from 'redux-first-history';
import {createBrowserHistory} from 'history';
import thunk from 'redux-thunk';

import reducers from './rootReducer';

const {createReduxHistory, routerMiddleware, routerReducer} = createReduxHistoryContext({
  history: createBrowserHistory()
  //other options if needed
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancer(
    applyMiddleware(thunk, routerMiddleware)
  )
);

export const history = createReduxHistory(store);

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextReducer = combineReducers({
      ...require('./rootReducer').default,
      router: routerReducer
    });
    // @ts-ignore
    store.replaceReducer(nextReducer);
  });

  module.hot.dispose(data => {
    data.store = store;
  });
}
