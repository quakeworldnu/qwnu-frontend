
import BaseService from './BaseService';

class CommentService extends BaseService {

    constructor() {
        super();
    }

    createCommentOnArticle(id, data) {
        return this.post(`articles/${id}/comments`, data);
    }

    deleteComment(id) {
        return this.delete(`comments/${id}`);
    }

    getCommentsByArticle(id, pagination) {
        let p = pagination;
        return this.get(`articles/${id}/comments?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getComment(id) {
        return this.get(`comments/${id}`);
    }

    getComments(pagination) {
        let p = pagination;
        return this.get(`comments?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    updateComment(id, data) {
        return this.patch(`comments/${id}`, data);
    }
}

export default new CommentService();
