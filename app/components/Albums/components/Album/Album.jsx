import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { USER_SHAPE, ALBUM_SHAPE } from 'constants/shapes';

import User from 'common/User';

import s from './Album.styl';

const makePhotosLocation = (album, router) => ({
  ...router.location,
  pathname: `/albums/${album.id}`,
  state: {
    returnLocation: router.location,
  },
});

class Album extends PureComponent {
  state = {
    photosLocation: makePhotosLocation(this.props.album, this.context.router),
  };

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

Album.contextTypes = {
  router: routerShape,
};

Album.propTypes = {
  album: ALBUM_SHAPE.isRequired,
  user: USER_SHAPE.isRequired,
};

export default Album;
