import React from 'react';
import { Link } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import s from './Post.styl';
import { POST_SHAPE, USER_SHAPE } from '../constants/shapes';
import User from './User';

export default function Post({ post, user }, { router }) {
    const commentsLocation = {
        ...router.location,
        pathname: `/posts/comments/${post.id}`,
        state: {
            returnLocation: router.location
        }
    };
    return (
        <div className={s.Container}>
            <Link className={s.Title} to={commentsLocation}>{post.title}</Link>
            <div className={s.Content}>{post.body}</div>
            {user && <User user={user} />}
        </div>
    );
}

Post.contextTypes = {
    router: routerShape
};

Post.prototype.propTypes = {
    post: POST_SHAPE.isRequired,
    user: USER_SHAPE.isRequired
};
