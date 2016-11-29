import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import s from './Popup.styl';

export default class Comments extends Component {
    componentDidMount() {
        this.popup = document.createElement('div');
        this.popupOverlay = document.createElement('div');
        this.popupOverlay.className = s.Overlay;
        const app = document.querySelector('.react-app');

        this.popupOverlay.appendChild(this.popup, app);
        this.popupOverlay.addEventListener('click', this.handlePopupClose);
        document.body.appendChild(this.popupOverlay, app);
        document.body.classList.add('blurry', 'no-scroll');

        this.renderPopupContent(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.renderPopupContent(newProps);
    }

    componentWillUnmount() {
        this.popupOverlay.removeChild(this.popup);
        this.popupOverlay.removeEventListener('click', this.handlePopupClose);
        document.body.removeChild(this.popupOverlay);
        document.body.classList.remove('blurry', 'no-scroll');
    }

    render() {
        return null;
    }

    renderPopupContent(props) {
        const { className, children } = props;
        this.popup.className = cn(s.Popup, className);
        ReactDOM.render(
            <div className={s.Content}>
                <i className={s.Close} ref={this.saveCloseRef} onClick={this.handlePopupClose}></i>
                {children}
            </div>,
            this.popup
        );
    }

    saveCloseRef = (ref) => this.closeRef = ref;

    handlePopupClose = (event) => {
        if (event.target !== this.popupOverlay && event.target !== this.closeRef) {
            return;
        }
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
    }

    static propTypes = {
        onClose: PropTypes.func
    };
}
