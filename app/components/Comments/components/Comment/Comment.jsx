import React from 'react';

import { COMMENT_SHAPE } from 'constants/shapes';
import s from './Comment.styl';

const Comment = ({ comment }) => (
  <div className={s.Container}>
    <div className={s.Title}>{comment.name}</div>
    <div className={s.Content}>{comment.body}</div>
    <div className={s.Author}>
      <a className={s.AuthorLink} href={`mailto:${comment.email}`}>
        {comment.email}
      </a>
    </div>
  </div>
);

Comment.propTypes = {
  comment: COMMENT_SHAPE.isRequired,
};

export default Comment;
