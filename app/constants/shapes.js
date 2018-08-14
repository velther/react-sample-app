import PropTypes from 'prop-types';

export const POST_SHAPE = PropTypes.shape({
  body: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  userId: PropTypes.number,
});

export const USER_SHAPE = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.object,
  phone: PropTypes.string,
  website: PropTypes.string,
  company: PropTypes.object,
});

export const ALBUM_SHAPE = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  userId: PropTypes.number,
});

export const LOCATION_SHAPE = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string,
});

export const PHOTO_SHAPE = PropTypes.shape({
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export const COMMENT_SHAPE = PropTypes.shape({
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
});

export const HISTORY_SHAPE = PropTypes.shape({
  push: PropTypes.func.isRequired,
});
