const dataFetcher = () => ({
  renderRouterContext(child, { components, params }) {
    components.forEach(({ wrappedComponent }) => {
      if (wrappedComponent && typeof wrappedComponent.fetchData === 'function') {
        wrappedComponent.fetchData(params);
      }
    });
    return child;
  },
});

export default dataFetcher;
