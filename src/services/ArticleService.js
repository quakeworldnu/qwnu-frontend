
import BaseService from './BaseService';

class ArticleService extends BaseService {

  constructor() {
    super();
  }
    getArticles(page) {
      return this.get('articles?page='+ page);
    }
    getArticle(id) {
      return this.get('articles/'+ id);
    }
}

export default new ArticleService();
