import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { locationShape } from 'react-router/lib/PropTypes';
import { branch } from 'lib/baobab-helper';
import * as actions from 'actions';
import { ALBUM_SHAPE } from 'constants/shapes';

import Loader from 'common/Loader';
import Album from './components/Album';
import s from './Albums.styl';

class Albums extends Component {
  static fetchData() {
    actions.loadAlbums();
    actions.loadUsers();
  }

  render() {
    const { usersById, children, userId } = this.props;
    const albums = !userId ?
      this.props.albums :
      this.props.albums.filter(album => album.userId === userId);

    return (
      <div className={s.Album}>
        {albums.length ? (
          albums.map(album => <Album key={album.id} album={album} user={usersById[album.userId]} />)
        ) : (
          <Loader />
        )}
        {children}
      </div>
    );
  }

  static propTypes = {
    albums: PropTypes.arrayOf(ALBUM_SHAPE),
    usersById: PropTypes.object,
    userId: PropTypes.number,
    children: PropTypes.element,
    returnLocation: locationShape,
  };
}

export default branch(
  {
    albums: ['albums'],
    usersById: ['usersById'],
  },
  Albums,
);
