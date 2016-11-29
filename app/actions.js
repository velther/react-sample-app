import API from './api-client';

export async function loadPosts(stateTree) {
    try {
        const posts = await API.loadPosts();
        stateTree.set('posts', posts);
    } catch (error) {
        stateTree.set('error', error);
    }
}

export async function loadUsers(stateTree) {
    try {
        const users = await API.loadUsers();
        const usersById = users.reduce((result, user) => {
            result[user.id] = user;
            return result;
        }, {});
        stateTree.set('usersById', usersById);
    } catch (error) {
        stateTree.set('error', error);
    }
}

export async function loadComments(stateTree, postId) {
    try {
        const comments = await API.loadComments(postId);
        stateTree.merge('commentsByPostId', { [postId]: comments });
    } catch (error) {
        stateTree.set('error', error);
    }
}
