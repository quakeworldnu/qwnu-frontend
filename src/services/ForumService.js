import Forum from '@/models/Forum';
import ForumCategory from '@/models/ForumCategory';
import ForumTopic from '@/models/ForumTopic';
import Pagination from '@/models/Pagination';
import BaseService from './BaseService';

class ForumService extends BaseService {
    constructor() {
        super();
    }

    createForumTopicForForum(id, data) {
        return this.post(`forums/${id}/topics`, data);
    }

    getForumTopicsForForum(id, pagination, sorting) {
        let p = pagination
        let s = sorting
        return this.get(`forums/${id}/topics?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let forumTopics = response.data.map(ft => new ForumTopic(ft))
                        let pagination = new Pagination(response);
                        return { forumTopics, pagination };
                    });
    }

    getForumTopic(id) {
        return this.get(`forum-topics/${id}`);
    }

    getForums(pagination, sorting) {
        let p = pagination
        let s = sorting
        return this.get(`forums?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let forums = response.data.map(a => new Forum(a));
                        let pagination = new Pagination(response);
                        return { forums, pagination };
                    });
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

    getForumCategories(pagination = false, sorting) {
        let s = sorting;
        let action;
        if (pagination) {
            let p = pagination;
            action = this.get(`forum-categories?page=${p.page}&sort=${s.sort}&order=${s.order}`);
        } else {
            action = this.get(`forum-categories?page=1&sort=${s.sort}&order=${s.order}`);
        }

        return action.then(response => response.data)
                        .then(response => {
                            let forumCategories = response.data.map(fc => new ForumCategory(fc));
                            let pagination = new Pagination(response);
                            return { forumCategories, pagination };
                        });
    }

    getPublicForumCategories(pagination = false, sorting) {
        let s = sorting;
        let action;
        if (pagination) {
            let p = pagination;
            action = this.get(`forum-categories/public?page=${p.page}&sort=${s.sort}&order=${s.order}`);
        } else {
            action = this.get(`forum-categories/public?page=1&sort=${s.sort}&order=${s.order}`);
        }

        return action.then(response => response.data)
            .then(response => {
                let forumCategories = response.data.map(fc => new ForumCategory(fc));
                let pagination = new Pagination(response);
                return { forumCategories, pagination };
            });
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
