
import BaseService from './BaseService';

class ArticleService extends BaseService {

  constructor() {
    super();
  }
    getArticles(page, pageSize) {
      return this.get('articles?page='+ page);
    }
}

export default new ArticleService();
