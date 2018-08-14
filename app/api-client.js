const API_URL = 'http://localhost:9000/api';

const fetchOptions = {
  method: 'get',
  mode: 'cors',
  credentials: 'include',
  headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }),
};

async function request({ method, id = '', query }) {
  let url = `${API_URL}/${method}/${id}`;

  if (query !== undefined) {
    const searchParams = Object.entries(query).reduce((result, [key, value]) => {
      result.append(key, value);
      return result;
    }, new URLSearchParams());
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, fetchOptions);

  // eslint-disable-next-line no-return-await
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
  },
};

export default API;
