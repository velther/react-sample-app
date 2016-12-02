import Baobab from 'baobab';

const store = new Baobab({
    error: null,
    posts: [],
    usersById: {},
    commentsByPostId: {},
    albums: []
});

export default store;
