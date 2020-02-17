import Category from '../models/Category';
import BaseService from './BaseService';

class CategoryService extends BaseService {
    constructor() {
        super();
    }

    getCategories() {
        return this.get(`categories`).then(response => response.data.map(c => new Category(c)));
    }
}

export default new CategoryService();