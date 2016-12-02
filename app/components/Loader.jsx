import React from 'react';
import s from './Loader.styl';

export default function Loader() {
    return (
        <div className={s.Loader}>
            <div className={s.Inner}>Loading</div>
        </div>
    );
}
