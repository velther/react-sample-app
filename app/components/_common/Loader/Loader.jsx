import React from 'react';
import s from './Loader.styl';

const Loader = () => {
  return (
    <div className={s.Loader}>
      <div className={s.Inner}>Loading</div>
    </div>
  );
};

export default Loader;
