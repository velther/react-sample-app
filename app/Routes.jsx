import React from 'react';
import { createBrowserRouter } from 'found';
import { makeRouteConfig, Route } from 'found/lib/jsx';

import App from './components/App';
import Posts from './components/Posts';

const dataFetcher = () => {
    console.log('DataFetcher args', arguments);
}

export default createBrowserRouter({
    routeConfig: makeRouteConfig(
        <Route path="/" Component={App} getData={dataFetcher}>
            <Route path="posts" Component={Posts} />
            <Route path="photos" />
            <Route path="user/:userId" />
            <Route Component={Posts} />
        </Route>
    )
});
