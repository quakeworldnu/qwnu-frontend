
import BaseService from './BaseService';

class ArticleService extends BaseService {

    constructor() {
        super();
    }

    getArticles(pagination) {
        let p = pagination
        return this.get(`articles?page=${p.page}&sort=${p.sort}&order=${p.order}`);
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
}

export default new ArticleService();
