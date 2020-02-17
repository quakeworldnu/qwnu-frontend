import Pagination from '@/models/Pagination';
import User from '@/models/User';
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
        return this.get(`users/${id}`).then(
            response => new User(response.data)
        );
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

    getUsers(pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(`users?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let users = response.data.map(u => new User(u));
                        let pagination = new Pagination(response);

                        return { users, pagination };
                    });
    }

    getUsersBySearch(keyword, pagination, sorting) {
        let p = pagination
        let s = sorting
        return this.get(`users/search?keyword=${keyword}&page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let users = response.data.map(u => new User(u));
                        let pagination = new Pagination(response);

                        return { users, pagination };
                    });
    }
}

export default new UserService();