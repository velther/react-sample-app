import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import s from './Slider.styl';

const SLIDE_CHANGE_TIMEOUT = 5000;

class Slider extends Component {
  state = {
    selectedIndex: 0,
    enter: true,
  };

  changeTimer = null;

  componentWillMount() {
    this.getSelectedPhotoIndex();
    this.setChangeTimer();
  }

  componentWillReceiveProps({ selectedId }) {
    if (selectedId !== this.props.selectedId) {
      this.getSelectedPhotoIndex(selectedId);
      this.setChangeTimer();
    }
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
        <TransitionGroup>
          <CSSTransition
            classNames={{
              enter: s.SlideChangeEnter,
              enterActive: s.SlideChangeEnterActive,
              exit: s.SlideChangeLeave,
              exitActive: s.SlideChangeLeaveActive,
            }}
            timeout={{ enter: 500, exit: 450 }}
            key={photo.id}
          >
            <div className={s.PhotoWrap}>
              <img className={s.Photo} src={photo.url} />
              {nextPhoto && <img className={s.Preload} src={nextPhoto.url} />}
              {prevPhoto && <img className={s.Preload} src={prevPhoto.url} />}
            </div>
          </CSSTransition>
        </TransitionGroup>
        {selectedIndex !== 0 && <div className={s.Prev} onClick={this.handlePrevClick} />}
        {selectedIndex !== photos.length - 1 && (
          <div className={s.Next} onClick={this.handleNextClick} />
        )}
      </div>
    );
  }

  getWrapperRef = ref => (this.thumbsWrapper = ref);

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
    }, SLIDE_CHANGE_TIMEOUT);
  }

  handleNextClick = () => {
    const nextIndex = this.state.selectedIndex + 1;
    const nextPhoto = this.props.photos[nextIndex];
    this.props.onPhotoChange(nextPhoto.id);
    this.setState({ enter: false });
  };
  handlePrevClick = () => {
    const nextIndex = this.state.selectedIndex - 1;
    const nextPhoto = this.props.photos[nextIndex];
    this.props.onPhotoChange(nextPhoto.id);
  };
}

Slider.propTypes = {
  photos: PropTypes.array,
  onPhotoChange: PropTypes.func.isRequired,
  selectedId: PropTypes.number.isRequired,
};

export default Slider;
