import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import User from 'common/User';

import { POST_SHAPE, USER_SHAPE } from 'constants/shapes';

import s from './Post.styl';

const makeCommentLocation = (post, location) => ({
  ...location,
  pathname: `/posts/comments/${post.id}`,
  state: {
    returnLocation: location,
  },
});

class Post extends PureComponent {
  state = {};

  static getDerivedStateFromProps = props => ({
    commentsLocation: makeCommentLocation(props.post, props.location),
  });

  render() {
    const { post, user } = this.props;
    const { commentsLocation } = this.state;

    return (
      <div className={s.Container}>
        <Link className={s.Title} to={commentsLocation}>
          {post.title}
        </Link>
        <div className={s.Content}>{post.body}</div>
        {user && <User user={user} />}
      </div>
    );
  }
}

Post.propTypes = {
  post: POST_SHAPE.isRequired,
  user: USER_SHAPE,
};

export default Post;
