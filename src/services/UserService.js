import BaseService from './BaseService';

class UserService extends BaseService {
    constructor() {
      super();
    }

    activateUser(email, token) {
        return this.post(`users/activate`, {'email': email, 'token': token});
    }

    register(data) {
        return this.post(`register`, data);
    }

    updateProfile(data) {
        return this.patch(`my/profile`, data);
    }

    getUser(id) {
        return this.get(`users/${id}`);
    }

    createUser(data) {
        return this.post(`users`, data);
    }

    updateUser(id, data) {
        return this.patch(`users/${id}`, data);
    }

    deleteUser(id) {
        return this.delete(`users/${id}`);
    }

    getUsers(pagination) {
        let p = pagination;
        return this.get(`users?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getUsersBySearch(keyword, pagination) {
        let p = pagination
        return this.get(`users/search?keyword=${keyword}&page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }
}

export default new UserService();