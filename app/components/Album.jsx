import React from 'react';
import { Link } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { USER_SHAPE, ALBUM_SHAPE } from '../constants/shapes';

import User from './User';

import s from './Album.styl';

export default function Album({ album, user }, { router }) {
    const photosLocation = {
        ...router.location,
        pathname: `/albums/${album.id}`,
        state: {
            returnLocation: router.location
        }
    };

    return (
        <div className={s.Container}>
            <Link className={s.Title} to={photosLocation}>{album.title}</Link>
            {user && <User className={s.Author} user={user} />}
        </div>
    );
}

Album.contextTypes = {
    router: routerShape
};

Album.prototype.propTypes = {
    album: ALBUM_SHAPE.isRequired,
    user: USER_SHAPE.isRequired
};
