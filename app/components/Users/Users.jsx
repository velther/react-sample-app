import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
    const {
      match: { params },
      location,
      usersById,
    } = this.props;
    const user = usersById[params.userId];

    return (
      <div className={s.Users}>
        <UserProfile user={user} />
        {!!user && (
          <Fragment>
            <div className={s.Section}>
              <div className={s.SectionTitle}>User posts</div>
              <Posts userId={user.id} returnLocation={location} />
            </div>

            <div className={s.Section}>
              <div className={s.SectionTitle}>User albums</div>
              <Albums userId={user.id} returnLocation={location} />
            </div>
          </Fragment>
        )}
      </div>
    );
  }

  static propTypes = {
    usersById: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  };
}

export default branch({
  usersById: ['usersById'],
})(Users);
