import Permission from "@/models/Permission";
import Role from '@/models/Role';
import BaseService from './BaseService';

class RoleService extends BaseService {
    constructor() {
        super();
    }

    getMyPermissions() {
        return this.get("my/permissions");
    }

    getPermissions() {
        return this.get("permissions")
                   .then(response => response.data.map(p => new Permission(p)));
    }

    getRoles() {
        return this.get("roles")
            .then(response => response.data)
            .then(response => {
                let roles = response.data.map(r => new Role(r));
                return roles;
            });
    }

    getRole(id) {
        return this.get(`roles/${id}`).then(
            response => new Role(response.data)
        );
    }

    deleteRole(id) {
        return this.delete(`roles/${id}`);
    }

    createRole(data) {
        return this.post(`roles`, data).then(
            response => new Role(response.data)
        );
    }

    updateRole(id, data) {
        return this.patch(`roles/${id}`, data).then(
            response => new Role(response.data)
        );
    }
}

export default new RoleService();