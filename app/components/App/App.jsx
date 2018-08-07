import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './components/Navigation';
import DataFetcher from 'lib/data-fetcher';
import styles from './App.styl';

const App = ({ route, location }) => (
  <div className={styles.Page}>
    <Navigation />
    <DataFetcher routes={route.routes} location={location} />
  </div>
);

App.prototype.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default App;
