import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import * as actions from '../actions';

import Popup from './Popup';
import Comment from './Comment';
import s from './Comments.styl';

class Comments extends Component {
    componentDidMount() {
        this.props.dispatch(actions.loadComments, this.props.params.postId);
    }

    render() {
        const { commentsByPostId, params: { postId } } = this.props;
        const comments = commentsByPostId[postId];
        return (
            <Popup className={s.Comments} onClose={this.handlePopupClose}>
                <div className={s.Title}>Commentaries</div>
                {comments && comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </Popup>
        );
    }

    handlePopupClose = () => {
        this.props.router.push('/posts');
    };

    static propTypes = {
        commentsByPostId: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    };
}

export default branch({
    commentsByPostId: ['commentsByPostId']
}, Comments);
