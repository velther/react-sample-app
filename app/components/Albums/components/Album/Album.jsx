import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { USER_SHAPE, ALBUM_SHAPE } from 'constants/shapes';

import User from 'common/User';

import s from './Album.styl';

const makePhotosLocation = (album, location) => ({
  ...location,
  pathname: `/albums/${album.id}`,
  state: {
    returnLocation: location,
  },
});

class Album extends PureComponent {
  state = {};

  static getDerivedStateFromProps = props => ({
    photosLocation: makePhotosLocation(props.album, props.location),
  });

  render() {
    const { album, user } = this.props;
    const { photosLocation } = this.state;

    return (
      <div className={s.Container}>
        <Link className={s.Title} to={photosLocation}>
          {album.title}
        </Link>
        {user && <User className={s.Author} user={user} />}
      </div>
    );
  }
}

Album.propTypes = {
  album: ALBUM_SHAPE.isRequired,
  user: USER_SHAPE,
  location: PropTypes.object,
};

export default withRouter(Album);
