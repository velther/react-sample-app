import React, { PropTypes } from 'react';
import cn from 'classnames';
import { USER_SHAPE } from '../constants/shapes';

import s from './User.styl';

export default function User({ user, className }) {
    return (
        <div className={cn(s.User, className)}>by <span className={s.Name}>{user.name}</span></div>
    );
}

User.prototype.propTypes = {
    user: USER_SHAPE.isRequired,
    className: PropTypes.string
};
