import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import styles from './App.styl';

export default function App({ children }) {
    return (
        <div className={styles.Page}>
            <Navigation />
            {children}
        </div>
    );
}

App.prototype.propTypes = {
    children: PropTypes.element.isRequired
};
