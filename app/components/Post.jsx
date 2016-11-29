import React, { PropTypes } from 'react';
import Link from 'found/lib/Link';
import s from './Post.styl';

export default function Post({ post, user }) {
    return (
        <div className={s.Container}>
            <Link className={s.Title} to={`/posts/comments/${post.id}`}>{post.title}</Link>
            <div className={s.Content}>{post.body}</div>
            <div className={s.Author}>by <span className={s.AuthorName}>{user && user.name}</span></div>
        </div>
    );
}

Post.prototype.propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
