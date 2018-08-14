import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { branch } from 'lib/baobab-helper';
import * as actions from 'actions';
import { ALBUM_SHAPE, USER_SHAPE } from 'constants/shapes';

import Loader from 'common/Loader';
import Album from './components/Album';
import s from './Albums.styl';

class Albums extends Component {
  static fetchData() {
    actions.loadAlbums();
    actions.loadUsers();
  }

  render() {
    const { usersById, route, userId, albums } = this.props;
    const albumsToShow = !userId ? albums : albums.filter(album => album.userId === userId);

    return (
      <div className={s.Album}>
        {albumsToShow.length ? (
          albumsToShow.map(album => (
            <Album key={album.id} album={album} user={usersById[album.userId]} />
          ))
        ) : (
          <Loader />
        )}
        {route && renderRoutes(route.routes)}
      </div>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(ALBUM_SHAPE).isRequired,
  usersById: PropTypes.objectOf(USER_SHAPE).isRequired,
  userId: PropTypes.number,
  route: PropTypes.shape({ route: PropTypes.array }),
};

export default branch({
  albums: ['albums'],
  usersById: ['usersById'],
})(Albums);
