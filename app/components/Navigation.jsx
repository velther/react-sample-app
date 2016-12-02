import React from 'react';
import { Link } from 'react-router';
import s from './Navigation.styl';

export default function Navigation() {
    return (
        <div className={s.Navigation}>
            <Link className={s.Item} activeClassName={s.Item_isActive} to="/" onlyActiveOnIndex>Posts</Link>
            <Link className={s.Item} activeClassName={s.Item_isActive} to="/albums">Albums</Link>
            <Link className={s.Item} activeClassName={s.Item_isActive} to="/users">Users</Link>
        </div>
    );
}
