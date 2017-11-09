import API from '../api-client';
import stateTree from '../state-tree';

async function loadAlbums() {
    if (stateTree.get('albums').length) {
        return;
    }
    try {
        const albums = await API.loadAlbums();
        stateTree.set('albums', albums);
    } catch (error) {
        stateTree.set('error', error);
    }
}

export default loadAlbums;
