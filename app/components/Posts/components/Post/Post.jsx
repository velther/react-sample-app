import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';

import User from 'common/User';

import { POST_SHAPE, USER_SHAPE } from 'constants/shapes';

import s from './Post.styl';

const makeCommentLocation = (post, router) => ({
  ...router.location,
  pathname: `/posts/comments/${post.id}`,
  state: {
    returnLocation: router.location,
  },
});

class Post extends PureComponent {
  state = {
    commentsLocation: makeCommentLocation(this.props.post, this.context.router),
  };

  render() {
    const { post, user } = this.props;
    const { router } = this.context;

    return (
      <div className={s.Container}>
        <Link className={s.Title} to={makeCommentLocation(post, router)}>
          {post.title}
        </Link>
        <div className={s.Content}>{post.body}</div>
        {user && <User user={user} />}
      </div>
    );
  }
}

Post.contextTypes = {
  router: routerShape,
};

Post.propTypes = {
  post: POST_SHAPE.isRequired,
  user: USER_SHAPE,
};

export default Post;
