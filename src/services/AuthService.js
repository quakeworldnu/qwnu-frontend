import Role from '@/models/Role';
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

    getRoles() {
        return this.get('roles')
                    .then(response => response.data)
                    .then(response => {
                        let roles = response.data.map(r => new Role(r));
                        return roles;
                    });
    }

    sendPasswordResetRequest(data) {
        return this.post('password-reset', data);
    }

    resetPassword(data) {
        return this.put('password-reset', data);
    }
}

export default new AuthService();