/* eslint-disable no-console */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;

    gtag?: () => void;
  }

  interface NodeModule {
    hot: any;
  }
}

import './styles/global.scss';

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {HistoryRouter as Router} from 'redux-first-history/rr6';

import {history, store} from './store';

import {App} from 'app/components';
import {Loading} from 'common/components';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <Provider store={store}>
    <React.Suspense
      fallback={
        <div className="extend">
          <Loading/>
        </div>
      }
    >
      <Router history={history}>
        <App/>
      </Router>
    </React.Suspense>
  </Provider>
);

console.log('%c HOT', 'background: yellow; color: black', module.hot);

// if (module.hot) {
//     module.hot.accept('./rootReducer', () => {
//         const nextReducer = combineReducers({
//             ...require('./rootReducer').default,
//             router: connectRouter(history)
//         });
//         // @ts-ignore
//         store.replaceReducer(nextReducer);
//     });
//
//     module.hot.dispose(data => {
//         data.store = store;
//     });
// }

if (navigator.serviceWorker && process.env.IGNORE_SERVICE_WORKER !== 'true') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => console.log('SW registered: ', registration))
      .catch(error => console.log('SW registration failed: ', error));
  });
}
