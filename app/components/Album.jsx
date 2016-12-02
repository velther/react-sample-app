import React from 'react';
import { Link } from 'react-router';
import { USER_SHAPE, ALBUM_SHAPE } from '../constants/shapes';

import User from './User';

import s from './Album.styl';

export default function Album({ album, user }) {
    return (
        <div className={s.Container}>
            <Link className={s.Title} to={`/albums/${album.id}`}>{album.title}</Link>
            {user && <User className={s.Author} user={user} />}
        </div>
    );
}

Album.prototype.propTypes = {
    album: ALBUM_SHAPE.isRequired,
    user: USER_SHAPE.isRequired
};
