import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { branch } from 'lib/baobab-helper';
import * as actions from 'actions';

import { PHOTO_SHAPE, LOCATION_SHAPE, HISTORY_SHAPE } from 'constants/shapes';

import Loader from 'common/Loader';
import Popup from 'common/Popup';
import Slider from './components/Slider';

import s from './Photos.styl';

class Photos extends Component {
  static fetchData = ({ params: { albumId } }) => actions.loadPhotos(albumId);

  handlePopupClose = () => {
    const { location, history } = this.props;
    const returnLocation = (location.state && location.state.returnLocation) || {
      ...location,
      pathname: '/albums',
    };

    history.push({ ...returnLocation, search: qs.stringify({}) });
  };

  handlePhotoChange = (index) => {
    const { location, history } = this.props;
    history.push({ ...location, search: qs.stringify({ photoId: index }) });
  };

  render() {
    const {
      photosByAlbumId,
      match: {
        params: { albumId },
      },
      location: { search },
    } = this.props;
    const photos = photosByAlbumId && photosByAlbumId[albumId];
    const query = qs.parse(search.substr(1));
    const selectedId = query && query.photoId ? Number(query.photoId) : 1;

    return (
      <Popup className={s.Photos} onClose={this.handlePopupClose}>
        {photos ? (
          <Slider photos={photos} onPhotoChange={this.handlePhotoChange} selectedId={selectedId} />
        ) : (
          <Loader />
        )}
      </Popup>
    );
  }
}

Photos.propTypes = {
  photosByAlbumId: PropTypes.objectOf(PHOTO_SHAPE),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  location: LOCATION_SHAPE.isRequired,
  history: HISTORY_SHAPE.isRequired,
};

export default branch({
  photosByAlbumId: ['photosByAlbumId'],
})(Photos);
