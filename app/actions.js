import API from './api-client';
import stateTree from './state-tree';

function isEmptyObject(obj) {
    return !!Object.keys(obj).length;
}

export async function loadPosts() {
    try {
        const posts = await API.loadPosts();
        stateTree.set('posts', posts);
    } catch (error) {
        stateTree.set('error', error);
    }
}

export async function loadUsers() {
    if (isEmptyObject(stateTree.get('usersById'))) {
        return;
    }
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

export async function loadComments(postId) {
    if (isEmptyObject(stateTree.get('commentsByPostId', postId))) {
        return;
    }
    try {
        const comments = await API.loadComments(postId);
        stateTree.merge('commentsByPostId', { [postId]: comments });
    } catch (error) {
        stateTree.set('error', error);
    }
}

export async function loadAlbums() {
    try {
        const albums = await API.loadAlbums();
        stateTree.set('albums', albums);
    } catch (error) {
        stateTree.set('error', error);
    }
}
