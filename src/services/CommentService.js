import BaseService from './BaseService';

class CommentService extends BaseService {

    constructor() {
        super();
    }

    createCommentOnArticle(id, data) {
        return this.post(`articles/${id}/comments`, data);
    }

    createCommentOnBlogPost(id, data) {
        return this.post(`blog-posts/${id}/comments`, data);
    }

    createCommentOnForumTopic(id, data) {
        return this.post(`forum-topics/${id}/comments`, data);
    }

    deleteComment(id) {
        return this.delete(`comments/${id}`);
    }

    getCommentsByArticle(id, pagination) {
        let p = pagination;
        return this.get(`articles/${id}/comments?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getCommentsByBlogPost(id, pagination) {
        let p = pagination;
        return this.get(`blog-posts/${id}/comments?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getCommentsByForumTopic(id, pagination) {
        let p = pagination;
        return this.get(`forum-topics/${id}/comments?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getComment(id) {
        return this.get(`comments/${id}`);
    }

    getComments(pagination) {
        let p = pagination;
        return this.get(`comments?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getLatestComments() {
        return this.get(`comments/latest`);
    }

    updateComment(id, data) {
        return this.patch(`comments/${id}`, data);
    }
}

export default new CommentService();
