import React, { Component, PropTypes } from 'react';
import { branch } from '../baobab-helper';
import * as actions from '../actions';
import { ALBUM_SHAPE } from '../constants/shapes';

import Album from './Album';
import Loader from './Loader';
import s from './Albums.styl';

class Posts extends Component {
    static fetchData() {
        actions.loadAlbums();
        actions.loadUsers();
    }

    render() {
        const { albums, usersById, children } = this.props;

        return (
            <div className={s.Album}>
                {albums ?
                    albums.map(album => <Album key={album.id} album={album} user={usersById[album.userId]} />) :
                    <Loader />
                }
                {children}
            </div>
        );
    }

    static propTypes = {
        albums: PropTypes.arrayOf(ALBUM_SHAPE),
        usersById: PropTypes.object,
        children: React.PropTypes.element
    };
}

export default branch({
    albums: ['albums'],
    usersById: ['usersById']
}, Posts);
