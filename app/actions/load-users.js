import API from '../api-client';
import stateTree from '../state-tree';
import isEmptyObject from '../lib/is-empty-object';

async function loadUsers() {
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

export default loadUsers;
