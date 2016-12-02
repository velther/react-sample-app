import React from 'react';
import { Link } from 'react-router';
import s from './Post.styl';
import { POST_SHAPE, USER_SHAPE } from '../constants/shapes';
import User from './User';

export default function Post({ post, user }) {
    return (
        <div className={s.Container}>
            <Link className={s.Title} to={`/posts/comments/${post.id}`}>{post.title}</Link>
            <div className={s.Content}>{post.body}</div>
            {user && <User user={user} />}
        </div>
    );
}

Post.prototype.propTypes = {
    post: POST_SHAPE.isRequired,
    user: USER_SHAPE.isRequired
};
