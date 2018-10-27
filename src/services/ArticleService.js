
import BaseService from './BaseService';

class ArticleService extends BaseService {

    constructor() {
        super();
    }

    getArticles(pagination) {
        let p = pagination
        return this.get(`articles?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getPublishedArticles(pagination) {
        let p = pagination
        return this.get(`articles/published?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getArticle(id) {
        return this.get(`articles/${id}`);
    }

    deleteArticle(id) {
        return this.delete(`articles/${id}`);
    }

    createArticle(data) {
        return this.post(`articles`, data);
    }

    updateArticle(id, data) {
        return this.patch(`articles/${id}`, data);
    }
}

export default new ArticleService();
