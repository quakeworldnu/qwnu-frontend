import BaseService from './BaseService';

class UserService extends BaseService {
    constructor() {
      super();
    }
    register(data) {
        return this.post("register", data);
    }
}

export default new UserService();