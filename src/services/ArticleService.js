
import Article from '@/models/Article';
import Pagination from '@/models/Pagination';
import BaseService from './BaseService';

class ArticleService extends BaseService {

    constructor() {
        super();
    }

    getArticles(pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(`articles?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let articles = response.data.map(a => new Article(a));
                        let pagination = new Pagination(response);

                        return { articles, pagination };
                    });
    }

    getPublishedArticles(pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(`articles/published?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                   .then(response => response.data)
                   .then(response => {
                       let articles = response.data.map(a => new Article(a));
                       let pagination = new Pagination(response);

                       return { articles, pagination };
                   });
    }

    getArticle(id) {
        return this.get(`articles/${id}`)
                   .then(response => new Article(response.data));
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
