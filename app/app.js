import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'lib/baobab-helper';
import routes from './routes';

import stateTree from './state-tree';

export default function ConnectedApp() {
  return (
    <Provider tree={stateTree}>
      <Router>{renderRoutes(routes)}</Router>
    </Provider>
  );
}
