import { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { LOCATION_SHAPE } from 'constants/shapes';

class DataFetcher extends Component {
  componentDidMount() {
    this.fetchRoutes();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (!shallowEqual(location, prevProps.location)) {
      this.fetchRoutes();
    }
  }

  fetchRoutes() {
    const { routes, location } = this.props;

    const matched = matchRoutes(routes, location.pathname);
    if (matched.length) {
      matched.reduce((result, { route, match }) => {
        const { component } = route;

        if (
          component
          && component.wrappedComponent
          && typeof component.wrappedComponent.fetchData === 'function'
        ) {
          result.push(component.wrappedComponent.fetchData(match, location));
        }

        return result;
      }, []);
    }
  }

  render() {
    const { routes } = this.props;
    return renderRoutes(routes);
  }
}

DataFetcher.propTypes = {
  location: LOCATION_SHAPE.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataFetcher;
