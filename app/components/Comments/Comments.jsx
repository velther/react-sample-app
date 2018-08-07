import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { branch } from 'lib/baobab-helper';
import * as actions from 'actions';

import Popup from 'common/Popup';
import Loader from 'common/Loader';
import Comment from './components/Comment';
import s from './Comments.styl';

class Comments extends Component {
  static fetchData = ({ params: { postId } }) => {
    return actions.loadComments(postId);
  };

  render() {
    const {
      commentsByPostId,
      match: {
        params: { postId },
      },
    } = this.props;
    const comments = commentsByPostId && commentsByPostId[postId];

    return (
      <Popup className={s.Comments} onClose={this.handlePopupClose}>
        <div className={s.Title}>Commentaries</div>

        {comments ? (
          comments.map(comment => <Comment key={comment.id} comment={comment} />)
        ) : (
          <Loader />
        )}
      </Popup>
    );
  }

  handlePopupClose = () => {
    const { location, history } = this.props;
    const returnLocation = (location.state && location.state.returnLocation) || '/';

    history.push(returnLocation);
  };

  static propTypes = {
    commentsByPostId: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
}

export default branch({
  commentsByPostId: ['commentsByPostId'],
})(Comments);
