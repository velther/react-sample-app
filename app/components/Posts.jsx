import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import * as actions from '../actions';

import Post from './Post';
import s from './Posts.styl';

class Posts extends Component {
    componentDidMount() {
        this.props.dispatch(actions.loadPosts);
        this.props.dispatch(actions.loadUsers);
    }

    render() {
        const { posts, usersById, children } = this.props;
        return (
            <div className={s.Posts}>
                <div className={s.Title}>Posts</div>
                {posts.map(post => <Post key={post.id} post={post} user={usersById[post.userId]} />)}
                {children}
            </div>
        );
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,
        usersById: PropTypes.object.isRequired,
        children: React.PropTypes.element
    };
}

export default branch({
    posts: ['posts'],
    usersById: ['usersById']
}, Posts);
