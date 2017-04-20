import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'react-router/lib/PropTypes';
import { branch } from '../baobab-helper';
import * as actions from '../actions';

import Popup from './Popup';
import Comment from './Comment';
import Loader from './Loader';
import s from './Comments.styl';

class Comments extends Component {
    static fetchData = ({ postId }) => {
        return actions.loadComments(postId);
    };

    render() {
        const { commentsByPostId, params: { postId } } = this.props;
        const comments = commentsByPostId && commentsByPostId[postId];

        return (
            <Popup className={s.Comments} onClose={this.handlePopupClose}>
                <div className={s.Title}>Commentaries</div>

                {comments ?
                    comments.map(comment => <Comment key={comment.id} comment={comment} />) :
                    <Loader />
                }
            </Popup>
        );
    }

    handlePopupClose = () => {
        const { router } = this.context;
        const locationState = router.location.state;
        const returnLocation = locationState && locationState.returnLocation || '/';

        router.push(returnLocation);
    };

    static contextTypes = {
        router: routerShape
    };

    static propTypes = {
        commentsByPostId: PropTypes.object,
        params: PropTypes.object.isRequired
    };
}

export default branch({
    commentsByPostId: ['commentsByPostId']
}, Comments);
