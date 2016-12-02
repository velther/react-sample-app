import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from './baobab-helper';
import routes from './Routes';

import stateTree from './state-tree';

function dataFetcher() {
    return {
        renderRouterContext(child, { components, params }) {
            components.forEach(({ wrappedComponent }) => {
                if (wrappedComponent && typeof wrappedComponent.fetchData === 'function') {
                    wrappedComponent.fetchData(params);
                }
            });
            return child;
        }
    };
}
const ConnectedApp = (
    <Provider tree={stateTree}>
        <Router history={browserHistory} routes={routes} render={applyRouterMiddleware(dataFetcher())} />
    </Provider>
);
ReactDOM.render(ConnectedApp, document.querySelector('.react-app'));
