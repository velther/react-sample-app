import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { branch } from 'lib/baobab-helper';
import * as actions from 'actions';
import { POST_SHAPE, USER_SHAPE } from 'constants/shapes';

import Loader from 'common/Loader';

import Post from './components/Post';
import s from './Posts.styl';

class Posts extends Component {
  static fetchData() {
    actions.loadPosts();
    actions.loadUsers();
  }

  render() {
    const { usersById, userId, route, posts } = this.props;
    const postsToShow = !userId ? posts : posts.filter(post => post.userId === userId);

    return (
      <div className={s.Posts}>
        {postsToShow ? (
          postsToShow.map(post => <Post key={post.id} post={post} user={usersById[post.userId]} />)
        ) : (
          <Loader />
        )}
        {route && renderRoutes(route.routes)}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(POST_SHAPE),
  usersById: PropTypes.objectOf(USER_SHAPE),
  userId: PropTypes.number,
  route: PropTypes.shape({ routes: PropTypes.array }),
};

export default branch({
  posts: ['posts'],
  usersById: ['usersById'],
})(Posts);
