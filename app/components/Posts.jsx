import React, { Component, PropTypes } from 'react';
import { branch } from '../baobab-helper';
import * as actions from '../actions';
import { POST_SHAPE } from '../constants/shapes';

import Post from './Post';
import Loader from './Loader';
import s from './Posts.styl';

class Posts extends Component {
    static fetchData() {
        actions.loadPosts();
        actions.loadUsers();
    }

    render() {
        const { usersById, children, userId } = this.props;
        const posts = !userId ? this.props.posts : this.props.posts.filter(post => post.userId === userId);

        return (
            <div className={s.Posts}>
                {posts ?
                    posts.map(post => <Post key={post.id} post={post} user={usersById[post.userId]} />) :
                    <Loader />
                }
                {children}
            </div>
        );
    }

    static propTypes = {
        posts: PropTypes.arrayOf(POST_SHAPE),
        usersById: PropTypes.object,
        children: React.PropTypes.element,
        userId: React.PropTypes.number
    };
}

export default branch({
    posts: ['posts'],
    usersById: ['usersById']
}, Posts);
