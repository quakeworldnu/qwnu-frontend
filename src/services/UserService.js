import BaseService from './BaseService';

class UserService extends BaseService {
    constructor() {
      super();
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
}

export default new UserService();