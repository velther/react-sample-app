import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { USER_SHAPE } from 'constants/shapes';

import s from './User.styl';

class User extends PureComponent {
  render() {
    const { user, className } = this.props;

    return (
      <div className={cn(s.User, className)}>
        by{' '}
        <Link className={s.Name} to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </div>
    );
  }
}

User.propTypes = {
  user: USER_SHAPE.isRequired,
  className: PropTypes.string,
};

export default User;
