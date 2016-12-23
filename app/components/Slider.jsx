import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import s from './Slider.styl';

export default class Slider extends Component {
    state = {
        selectedIndex: 0
    };

    changeTimer = null;

    componentWillMount() {
        this.getSelectedPhotoIndex();
        this.setChangeTimer();
    }

    componentWillReceiveProps({ selectedId }) {
        this.getSelectedPhotoIndex(selectedId);
        this.setChangeTimer();
    }

    componentWillUnmount() {
        clearTimeout(this.changeTimer);
    }

    render() {
        const { photos } = this.props;
        const { selectedIndex } = this.state;
        const photo = photos[selectedIndex];
        const nextPhoto = photos[selectedIndex + 1];
        const prevPhoto = photos[selectedIndex - 1];

        return (
            <div className={s.Slider}>
                <ReactCSSTransitionGroup transitionName="slideChange" transitionEnterTimeout={500} transitionLeaveTimeout={450}>
                    <div key={photo.id} className={s.PhotoWrap}>
                        <img className={s.Photo} src={photo.url} />
                        {nextPhoto && <img className={s.Preload} src={nextPhoto.url} />}
                        {prevPhoto && <img className={s.Preload} src={prevPhoto.url} />}
                    </div>
                </ReactCSSTransitionGroup>
                {selectedIndex !== 0 && <div className={s.Prev} onClick={this.handlePrevClick}></div>}
                {selectedIndex !== photos.length - 1 && <div className={s.Next} onClick={this.handleNextClick}></div>}
            </div>
        );
    }

    getWrapperRef = ref => this.thumbsWrapper = ref;

    getSelectedPhotoIndex(nextSelectedId) {
        const { photos, selectedId } = this.props;
        if (selectedId === nextSelectedId) {
            return;
        }
        nextSelectedId = nextSelectedId || selectedId;

        const selectedIndex = photos.findIndex(photo => photo.id === nextSelectedId);
        if (selectedIndex === -1) {
            return;
        }
        this.setState({ selectedIndex });
    }

    setChangeTimer() {
        clearTimeout(this.changeTimer);
        this.changeTimer = setTimeout(() => {
            if (this.state.selectedIndex < this.props.photos.length - 1) {
                this.handleNextClick();
            } else {
                this.props.onPhotoChange(this.props.photos[0].id);
            }
        }, 5000);
    }

    handleNextClick = () => {
        const nextIndex = this.state.selectedIndex + 1;
        const nextPhoto = this.props.photos[nextIndex];
        this.props.onPhotoChange(nextPhoto.id);
    };
    handlePrevClick = () => {
        const nextIndex = this.state.selectedIndex - 1;
        const nextPhoto = this.props.photos[nextIndex];
        this.props.onPhotoChange(nextPhoto.id);
    };

    static propTypes = {
        photos: PropTypes.array,
        onPhotoChange: PropTypes.func.isRequired,
        selectedId: PropTypes.number.isRequired
    };
}
