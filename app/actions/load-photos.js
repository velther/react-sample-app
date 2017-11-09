import API from '../api-client';
import stateTree from '../state-tree';

async function loadPhotos(albumId) {
    if (stateTree.get('photosByAlbumId', albumId)) {
        return;
    }
    try {
        const photos = await API.loadPhotos(albumId);
        stateTree.merge('photosByAlbumId', { [albumId]: photos });
    } catch (error) {
        stateTree.set('error', error);
    }
}

export default loadPhotos;

