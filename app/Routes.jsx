import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Posts from './components/Posts';
import Comments from './components/Comments';
import Albums from './components/Albums';
import Photos from './components/Photos';

export default (
    <Route path="/" component={App}>
        <Route path="posts" component={Posts} >
            <Route path="comments/:postId" component={Comments} />
        </Route>
        <Route path="albums" component={Albums}>
            <Route path=":albumId" component={Photos}/>
        </Route>
        <Route path="user/:userId" />
        <IndexRoute component={Posts} />
    </Route>
);
