import API from '../api-client';
import stateTree from '../state-tree';

async function loadComments(postId) {
    if (stateTree.get('commentsByPostId', postId)) {
        return;
    }
    try {
        const comments = await API.loadComments(postId);
        stateTree.merge('commentsByPostId', { [postId]: comments });
    } catch (error) {
        stateTree.set('error', error);
    }
}

export default loadComments;

