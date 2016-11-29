import React, { PropTypes } from 'react';
import s from './Comment.styl';

export default function Comment({ comment }) {
    return (
        <div className={s.Container}>
            <div className={s.Title}>{comment.name}</div>
            <div className={s.Content}>{comment.body}</div>
            <div className={s.Author}>
                <a className={s.AuthorLink} href={`mailto:${comment.email}`}>{comment.email}</a>
            </div>
        </div>
    );
}

Comment.prototype.propTypes = {
    comment: PropTypes.object.isRequired
};
