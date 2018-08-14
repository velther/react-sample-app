import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { PHOTO_SHAPE } from 'constants/shapes';

import s from './Slider.styl';

const SLIDE_CHANGE_TIMEOUT = 5000;

class Slider extends Component {
  state = {
    selectedIndex: 0,
    // eslint-disable-next-line react/no-unused-state
    selectedId: null,
  };

  changeTimer = null;

  static getDerivedStateFromProps = ({ photos, selectedId }, state) => {
    if (selectedId === state.selectedId) {
      return null;
    }

    const nextSelectedId = selectedId || state.selectedId;

    const selectedIndex = photos.findIndex(photo => photo.id === nextSelectedId);
    if (selectedIndex === -1) {
      return null;
    }
    return { selectedIndex, selectedId };
  };

  componentWillMount() {
    this.getSelectedPhotoIndex();
    this.setChangeTimer();
  }

  componentDidUpdate(prevProps) {
    const { selectedId } = this.props;
    if (selectedId !== prevProps.selectedId) {
      this.getSelectedPhotoIndex(selectedId);
      this.setChangeTimer();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.changeTimer);
  }

  getWrapperRef = (ref) => {
    this.thumbsWrapper = ref;
  };

  setChangeTimer() {
    clearTimeout(this.changeTimer);
    this.changeTimer = setTimeout(() => {
      const { photos, onPhotoChange } = this.props;
      const { selectedIndex } = this.state;

      if (selectedIndex < photos.length - 1) {
        this.handleNextClick();
      } else {
        onPhotoChange(photos[0].id);
      }
    }, SLIDE_CHANGE_TIMEOUT);
  }

  handleNextClick = () => {
    const { photos, onPhotoChange } = this.props;
    const { selectedIndex } = this.state;

    const nextIndex = selectedIndex + 1;
    const nextPhoto = photos[nextIndex];

    onPhotoChange(nextPhoto.id);
  };

  handlePrevClick = () => {
    const { photos, onPhotoChange } = this.props;
    const { selectedIndex } = this.state;

    const nextIndex = selectedIndex - 1;
    const nextPhoto = photos[nextIndex];

    onPhotoChange(nextPhoto.id);
  };

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
              <img className={s.Photo} src={photo.url} alt={photo.title} />
              {nextPhoto && <img className={s.Preload} src={nextPhoto.url} alt={nextPhoto.title} />}
              {prevPhoto && <img className={s.Preload} src={prevPhoto.url} alt={prevPhoto.title} />}
            </div>
          </CSSTransition>
        </TransitionGroup>
        {selectedIndex !== 0 && (
          <button type="button" className={s.Prev} onClick={this.handlePrevClick} />
        )}
        {selectedIndex !== photos.length - 1 && (
          <button type="button" className={s.Next} onClick={this.handleNextClick} />
        )}
      </div>
    );
  }
}

Slider.propTypes = {
  photos: PropTypes.arrayOf(PHOTO_SHAPE).isRequired,
  onPhotoChange: PropTypes.func.isRequired,
  selectedId: PropTypes.number.isRequired,
};

export default Slider;
