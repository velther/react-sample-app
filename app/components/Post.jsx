import React from 'react';
import s from './Post.styl';

export default function Post({ post, user }) {
    return (
        <div key={post.id} className={s.Container}>
            <div className={s.Title}>{post.title}</div>
            <div className={s.Content}>{post.body}</div>
            <div className={s.Author}>by {user && user.name}</div>
        </div>
    );
}