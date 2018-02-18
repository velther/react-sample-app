import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'react-router/lib/PropTypes';
import * as actions from 'actions';
import { branch } from 'lib/baobab-helper';

import Posts from 'components/Posts';
import Albums from 'components/Albums';
import UserProfile from './components/UserProfile';

import s from './Users.styl';

class Users extends Component {
  static fetchData() {
    actions.loadUsers();
    actions.loadPosts();
    actions.loadAlbums();
  }

  render() {
    const { params, usersById } = this.props;
    const { router: { location } } = this.context;
    const user = usersById[params.userId];

    return (
      <div className={s.Users}>
        <UserProfile user={user} />
        {!!user && (
          <React.Fragment>
            <div className={s.Section}>
              <div className={s.SectionTitle}>User posts</div>
              <Posts userId={user.id} returnLocation={location} />
            </div>

            <div className={s.Section}>
              <div className={s.SectionTitle}>User albums</div>
              <Albums userId={user.id} returnLocation={location} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  static contextTypes = {
    router: routerShape,
  };

  static propTypes = {
    usersById: PropTypes.object,
    params: PropTypes.object.isRequired,
  };
}

export default branch(
  {
    usersById: ['usersById'],
  },
  Users,
);
