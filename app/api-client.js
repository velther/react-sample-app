const API_URL = 'http://localhost:9000/api';

async function request({ method, id = '', query }) {
    let url = `${API_URL}/${method}/${id}`;

    if (query !== undefined) {
        const searchParams = new URLSearchParams();
        for (let key in query) {
            if (query.hasOwnProperty(key)) {
                searchParams.append(key, query[key]);
            }
        }
        url += `?${searchParams.toString()}`;
    }

    const response = await fetch(
        url,
        {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' })
        }
    );

    return await response.json();
}

const API = {
    loadPosts() {
        return request({ method: 'posts' });
    },

    loadUsers() {
        return request({ method: 'users' });
    },

    loadComments(postId) {
        return request({ method: 'comments', query: { postId } });
    },

    loadAlbums() {
        return request({ method: 'albums' });
    },

    loadPhotos(albumId) {
        return request({ method: 'photos', query: { albumId } });
    }
};

export default API;
