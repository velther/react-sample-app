import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router';
import { USER_SHAPE } from '../constants/shapes';

import s from './User.styl';

export default function User({ user, className }) {
    return (
        <div className={cn(s.User, className)}>
            by <Link className={s.Name} to={`/users/${user.id}`}>{user.name}</Link>
        </div>
    );
}

User.prototype.propTypes = {
    user: USER_SHAPE.isRequired,
    className: PropTypes.string
};
