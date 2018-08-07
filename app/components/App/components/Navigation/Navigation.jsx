import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import s from './Navigation.styl';

export default function Navigation() {
  return (
    <div className={s.Navigation}>
      <Link className={s.Item} activeClassName={s.Item_isActive} to="/" exact>
        Posts
      </Link>
      <Link className={s.Item} activeClassName={s.Item_isActive} to="/albums">
        Albums
      </Link>
    </div>
  );
}
