import React, { Component, PureComponent, Children } from 'react';
import Baobab from 'baobab';
import PropTypes from 'prop-types';

export class Provider extends Component {
  static childContextTypes = {
    tree: PropTypes.instanceOf(Baobab).isRequired,
  };

  static propTypes = {
    tree: PropTypes.instanceOf(Baobab).isRequired,
    children: PropTypes.element.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.tree = props.tree;

    // simple baobab state logger
    if (process.env.NODE_ENV !== 'production') {
      this.tree.on('update', (e) => {
        console.log(e); // eslint-disable-line no-console
      });
    }
  }

  getChildContext() {
    return {
      tree: this.tree,
    };
  }

  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}

export const branch = cursors => (WrappedComponent) => {
  // eslint-disable-next-line react/no-multi-comp
  class BranchedComponent extends PureComponent {
    static contextTypes = {
      tree: PropTypes.instanceOf(Baobab).isRequired,
    };

    watcher = null;

    constructor(props, context) {
      super(props, context);

      this.watcher = context.tree.watch(cursors);
      this.watcher.on('update', this.handleCursorUpdate);
      this.state = this.watcher.get();
    }

    componentWillUnmount() {
      this.watcher.off('update', this.handleCursorUpdate);
    }

    handleCursorUpdate = () => {
      this.setState(this.watcher.get());
    };

    render() {
      // eslint-disable-next-line react/jsx-filename-extension
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }
  BranchedComponent.wrappedComponent = WrappedComponent;

  return BranchedComponent;
};
