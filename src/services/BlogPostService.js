
import BaseService from './BaseService';

class BlogPostService extends BaseService {

    constructor() {
        super();
    }

    getBlogPosts(pagination) {
        let p = pagination
        return this.get(`blog-posts?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getPublishedBlogPosts(pagination) {
        let p = pagination
        return this.get(`blog-posts/published?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getBlogPost(id) {
        return this.get(`blog-posts/${id}`);
    }

    deleteBlogPost(id) {
        return this.delete(`blog-posts/${id}`);
    }

    createBlogPost(data) {
        return this.post(`blog-posts`, data);
    }

    updateBlogPost(id, data) {
        return this.patch(`blog-posts/${id}`, data);
    }
}

export default new BlogPostService();
