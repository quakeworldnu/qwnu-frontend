import Comment from '@/models/Comment';
import Pagination from '@/models/Pagination';
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

    createCommentOnConfig(id, data) {
        return this.post(`configs/${id}/comments`, data);
    }

    createCommentOnForumTopic(id, data) {
        return this.post(`forum-topics/${id}/comments`, data);
    }

    deleteComment(id) {
        return this.delete(`comments/${id}`);
    }

    getCommentsByArticle(id, pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(
            `articles/${id}/comments?page=${p.page}&per_page=${p.pageSize}&sort=${s.sort}&order=${s.order}`
        )
            .then(response => response.data)
            .then(response => {
                let comments = response.data.map(c => new Comment(c));
                let pagination = new Pagination(response);

                return { comments, pagination };
            });
    }

    getCommentsByBlogPost(id, pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(
            `blog-posts/${id}/comments?page=${p.page}&per_page=${p.pageSize}&sort=${s.sort}&order=${s.order}`
        )
            .then(response => response.data)
            .then(response => {
                let comments = response.data.map(c => new Comment(c));
                let pagination = new Pagination(response);

                return { comments, pagination };
            });
    }

    getCommentsByConfig(id, pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(
            `configs/${id}/comments?page=${p.page}&per_page=${p.pageSize}&sort=${s.sort}&order=${s.order}`
        )
            .then(response => response.data)
            .then(response => {
                let comments = response.data.map(c => new Comment(c));
                let pagination = new Pagination(response);

                return { comments, pagination };
            });
    }

    getCommentsByForumTopic(id, pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(
            `forum-topics/${id}/comments?page=${p.page}&per_page=${p.pageSize}&sort=${s.sort}&order=${s.order}`
        )
            .then(response => response.data)
            .then(response => {
                let comments = response.data.map(c => new Comment(c));
                let pagination = new Pagination(response);

                return { comments, pagination };
            });
    }

    getComment(id) {
        return this.get(`comments/${id}`)
                    .then(response => new Comment(response.data));
    }

    getComments(pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(
            `comments?page=${p.page}&per_page=${p.pageSize}&sort=${s.sort}&order=${s.order}`
        )
            .then(response => response.data)
            .then(response => {
                let comments = response.data.map(c => new Comment(c));
                let pagination = new Pagination(response);

                return { comments, pagination };
            });
    }

    getLatestComments() {
        return this.get(`comments/latest`)
                    .then(response => response.data)
                    .then(response => {
                        let comments = response.data.map(c => new Comment(c));
                        let pagination = new Pagination(response);

                        return { comments, pagination }
                    });
    }

    updateComment(id, data) {
        return this.patch(`comments/${id}`, data);
    }
}

export default new CommentService();
