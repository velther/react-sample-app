const API_URL = 'http://localhost:9000/api'

async function request(method, id = '') {
    const response = await fetch(
        `${API_URL}/${method}/${id}`,
        {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' })
        }
    );

    return await response.json();
}

const API = {
    loadPosts() {
        return request('posts');
    },

    loadUsers() {
        return request('users');
    }
}

export default API
