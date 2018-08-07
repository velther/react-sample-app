import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { matchRoutes, renderRoutes } from 'react-router-config';

class DataFetcher extends Component {
  componentDidMount() {
    this.fetchRoutes();
  }

  componentDidUpdate(prevProps) {
    if (!shallowEqual(this.props.location, prevProps.location)) {
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
          component &&
          component.wrappedComponent &&
          typeof component.wrappedComponent.fetchData === 'function'
        ) {
          result.push(component.wrappedComponent.fetchData(match, location));
        }

        return result;
      }, []);
    }
  }

  render() {
    return renderRoutes(this.props.routes);
  }
}

DataFetcher.propTypes = {
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
};

export default DataFetcher;
