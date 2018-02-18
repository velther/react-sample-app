import React from 'react';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'lib/baobab-helper';
import dataFetcher from 'lib/data-fetcher';
import routes from './Routes';

import stateTree from './state-tree';

export default function ConnectedApp() {
  return (
    <Provider tree={stateTree}>
      <Router
        history={browserHistory}
        routes={routes}
        render={applyRouterMiddleware(dataFetcher())}
      />
    </Provider>
  );
}
