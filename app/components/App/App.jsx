import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './components/Navigation';
import styles from './App.styl';

const App = ({ children }) => (
  <div className={styles.Page}>
    <Navigation />
    {children}
  </div>
);

App.prototype.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
