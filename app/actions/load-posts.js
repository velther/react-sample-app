import API from '../api-client';
import stateTree from '../state-tree';

async function loadPosts() {
    if (stateTree.get('posts').length) {
        return;
    }
    try {
        const posts = await API.loadPosts();
        stateTree.set('posts', posts);
    } catch (error) {
        stateTree.set('error', error);
    }
}

export default loadPosts;
