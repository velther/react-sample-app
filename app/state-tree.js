import Baobab from 'baobab';

const store = new Baobab({
  error: null,
  posts: [],
  usersById: {},
  commentsByPostId: {},
  albums: [],
  photosByAlbumId: {},
});

export default store;
