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
        return this.get("my/permissions");
    }

    sendPasswordResetRequest(data) {
        return this.post("password-reset", data);
    }

    resetPassword(data) {
        return this.put("password-reset", data);
    }
}

export default new AuthService();