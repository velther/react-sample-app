import Baobab from 'baobab';

const store = new Baobab({
    error: null,
    posts: [],
    usersById: {},
    commentsByPostId: {}
});

export default store;
