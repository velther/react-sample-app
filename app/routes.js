import App from 'components/App';
import Posts from 'components/Posts';
import Comments from 'components/Comments';
import Albums from 'components/Albums';
import Photos from 'components/Photos';
import Users from 'components/Users';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Posts,
      },
      {
        path: '/albums',
        component: Albums,
        routes: [{ path: '/albums/:albumId', component: Photos }],
      },
      {
        path: '/users/:userId',
        component: Users,
      },
      {
        path: '/posts',
        component: Posts,
        routes: [{ path: '/posts/comments/:postId', component: Comments }],
      },
    ],
  },
];

export default routes;
