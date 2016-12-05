import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { USER_SHAPE } from '../constants/shapes';

import s from './User.styl';

export default function User({ user, className }) {
    return (
        <div className={cn(s.User, className)}>
            by <Link className={s.Name} to={`/user/${user.id}`}>{user.name}</Link>
        </div>
    );
}

User.prototype.propTypes = {
    user: USER_SHAPE.isRequired,
    className: PropTypes.string
};
