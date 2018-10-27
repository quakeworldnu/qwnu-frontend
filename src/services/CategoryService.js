import BaseService from './BaseService';

class CategoryService extends BaseService {
    constructor() {
        super();
    }

    getCategories() {
        return this.get(`categories`);
    }
}

export default new CategoryService();