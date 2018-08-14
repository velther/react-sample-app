import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import s from './Popup.styl';

export default class Popup extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  componentWillMount() {
    this.popup = document.createElement('div');
    this.popupOverlay = document.createElement('div');
    this.popupOverlay.className = s.Overlay;

    const app = document.querySelector('.react-app');
    this.popupOverlay.appendChild(this.popup, app);
    this.popupOverlay.addEventListener('click', this.handlePopupClose);
    document.body.appendChild(this.popupOverlay, app);
    document.body.classList.add('blurry', 'no-scroll');
  }

  componentWillUnmount() {
    this.popupOverlay.removeChild(this.popup);
    this.popupOverlay.removeEventListener('click', this.handlePopupClose);
    document.body.removeChild(this.popupOverlay);
    document.body.classList.remove('blurry', 'no-scroll');
  }

  handlePopupClose = (event) => {
    if (event.target !== this.popupOverlay && event.target !== this.closeRef) {
      return;
    }
    if (event.target === this.closeRef) {
      event.stopPropagation();
    }
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  saveCloseRef = (ref) => {
    this.closeRef = ref;
  };

  render() {
    const { className, children } = this.props;
    this.popup.className = cn(s.Popup, className);

    return ReactDOM.createPortal(
      <div className={s.Content}>
        <button
          type="button"
          className={s.Close}
          ref={this.saveCloseRef}
          onClick={this.handlePopupClose}
        />
        {children}
      </div>,
      this.popup,
    );
  }
}
