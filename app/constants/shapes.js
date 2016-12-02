import { PropTypes } from 'react';

export const POST_SHAPE = PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number
});

export const USER_SHAPE = PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
    phone: PropTypes.string,
    website: PropTypes.string,
    company: PropTypes.object
});

export const ALBUM_SHAPE = PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number
});
