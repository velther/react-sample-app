import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { USER_SHAPE, ALBUM_SHAPE, LOCATION_SHAPE } from 'constants/shapes';

import User from 'common/User';

import s from './Album.styl';

class Album extends PureComponent {
  state = {};

  static getDerivedStateFromProps = ({ album, location }) => ({
    photosLocation: {
      ...location,
      pathname: `/albums/${album.id}`,
      state: {
        returnLocation: location,
      },
    },
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
  // eslint-disable-next-line react/no-unused-prop-types
  location: LOCATION_SHAPE.isRequired,
};

export default withRouter(Album);
