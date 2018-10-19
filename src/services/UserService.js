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
}

export default new UserService();