
import BaseService from './BaseService';

class ForumService extends BaseService {

    constructor() {
        super();
    }

    getForums(pagination) {
        let p = pagination
        return this.get(`forums?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getForum(id) {
        return this.get(`forums/${id}`);
    }

    deleteForum(id) {
        return this.delete(`forums/${id}`);
    }

    createForum(data) {
        return this.post(`forums`, data);
    }

    updateForum(id, data) {
        return this.patch(`forums/${id}`, data);
    }

    getForumCategories(pagination = false) {
        if (pagination) {
            let p = pagination;
            return this.get(`forum-categories?page=${p.page}&sort=${p.sort}&order=${p.order}`);
        } else {
            return this.get(`forum-categories?page=1&sort=name&order=ASC`);
        }
    }

    getForumCategory(id) {
        return this.get(`forum-categories/${id}`);
    }

    deleteForumCategory(id) {
        return this.delete(`forum-categories/${id}`);
    }

    createForumCategory(data) {
        return this.post(`forum-categories`, data);
    }

    updateForumCategory(id, data) {
        return this.patch(`forum-categories/${id}`, data);
    }
}

export default new ForumService();
