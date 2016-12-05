import React, { Component, PropTypes } from 'react';
import { routerShape, locationShape } from 'react-router/lib/PropTypes';
import { branch } from '../baobab-helper';
import * as actions from '../actions';

import Popup from './Popup';
import Slider from './Slider.jsx';
import Loader from './Loader';
import s from './Photos.styl';

class Photos extends Component {
    static fetchData = ({ albumId }) => {
        return actions.loadPhotos(albumId);
    };

    render() {
        const { photosByAlbumId, params: { albumId }, location: { query } } = this.props;
        const photos = photosByAlbumId && photosByAlbumId[albumId];
        const selectedId = query && query.photoId ? Number(query.photoId) : 1;

        return (
            <Popup className={s.Photos} onClose={this.handlePopupClose}>
                {photos ?
                    <Slider photos={photos}
                        onPhotoChange={this.handlePhotoChange}
                        selectedId={selectedId} /> :
                    <Loader />
                }
            </Popup>
        );
    }

    handlePopupClose = () => {
        const { router } = this.context;
        const { location } = router;
        this.context.router.push({ ...location, pathname: '/albums', query: {} });
    };

    handlePhotoChange = (index) => {
        const { router } = this.context;
        const { location } = router;
        this.context.router.push({ ...location, query: { photoId: index } });
    };

    static contextTypes = {
        router: routerShape
    };

    static propTypes = {
        photosByAlbumId: PropTypes.object,
        params: PropTypes.object.isRequired,
        location: locationShape.isRequired
    };
}

export default branch({
    photosByAlbumId: ['photosByAlbumId']
}, Photos);
