import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation';
import styles from './App.styl';

export default class App extends Component {
    render() {
        return (
            <div className={styles.Page}>
                <Navigation />
                {this.props.children}
            </div>
        );
    }

    static propTypes = {
        children: PropTypes.element.isRequired
    }
}
