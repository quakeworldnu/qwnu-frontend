import BaseService from './BaseService';

class AuthService extends BaseService {
    constructor() {
      super();
    }
    login(username, password) {
        var data = { username: username, password: password };
        return this.post("login", data);
    }

    getMyPermissions() {
        return this.get('my/permissions');
    }
}

export default new AuthService();