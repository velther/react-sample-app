import React from 'react';
import PropTypes from 'prop-types';

import { LOCATION_SHAPE } from 'constants/shapes';

import DataFetcher from 'lib/data-fetcher';
import Navigation from './components/Navigation';

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
  location: LOCATION_SHAPE.isRequired,
};

export default App;
