import React, { Component, PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

export class Provider extends Component {
  getChildContext() {
    return {
      tree: this.tree,
    };
  }

  constructor(props, context) {
    super(props, context);

    this.tree = this.props.tree;

    // simple baobab state logger
    if (process.env.NODE_ENV !== 'production') {
      this.tree.on('update', e => {
        console.log(e); // eslint-disable-line no-console
      });
    }
  }

  render() {
    return Children.only(this.props.children);
  }

  static propTypes = {
    tree: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    tree: PropTypes.object.isRequired,
  };
}

export const branch = cursors => Component => {
  class BranchedComponent extends PureComponent {
    watcher = null;

    constructor(props, context) {
      super(props, context);

      this.watcher = this.context.tree.watch(cursors);
      this.watcher.on('update', this.handleCursorUpdate);
      this.state = this.watcher.get();
    }

    componentWillUnmount() {
      this.watcher.off('update', this.handleCursorUpdate);
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }

    handleCursorUpdate = () => {
      this.setState(this.watcher.get());
    };

    static contextTypes = {
      tree: PropTypes.object,
    };
  }
  BranchedComponent.wrappedComponent = Component;

  return BranchedComponent;
};
