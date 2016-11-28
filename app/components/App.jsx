import React, { Component } from 'react';
import styles from './App.styl';

export default class App extends Component {
    render() {
        return (
            <div className={styles.Page}>
                {this.props.children}
            </div>
        );
    }
}
