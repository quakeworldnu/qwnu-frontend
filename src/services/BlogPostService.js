
import BlogPost from '../models/BlogPost';
import Pagination from '../models/Pagination';
import BaseService from './BaseService';

class BlogPostService extends BaseService {

    constructor() {
        super();
    }

    getBlogPosts(pagination) {
        let p = pagination
        return this.get(`blog-posts?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getPublishedBlogPosts(pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(`blog-posts/published?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let blogPosts = response.data.map(b => new BlogPost(b));
                        let pagination = new Pagination(response);

                        return { blogPosts, pagination }
                    });
    }

    getPublishedBlogPostsByAuthor(authorId, pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(`users/${authorId}/blog-posts/published?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let blogPosts = response.data.map(b => new BlogPost(b));
                        let pagination = new Pagination(response);

                        return { blogPosts, pagination }
                    });
    }

    getBlogPost(id) {
        return this.get(`blog-posts/${id}`)
                   .then(response => new BlogPost(response.data));
    }

    deleteBlogPost(id) {
        return this.delete(`blog-posts/${id}`);
    }

    createBlogPost(data) {
        return this.post(`blog-posts`, data).then(
            response => new BlogPost(response.data)
        );
    }

    updateBlogPost(id, data) {
        return this.patch(`blog-posts/${id}`, data);
    }
}

export default new BlogPostService();
