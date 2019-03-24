
import BaseService from './BaseService';

class MapService extends BaseService {

    constructor() {
        super();
    }

    getMaps(pagination) {
        let p = pagination
        return this.get(`maps?page=${p.page}&sort=${p.sort}&order=${p.order}`);
    }

    getMap(id) {
        return this.get(`maps/${id}`);
    }

    deleteMap(id) {
        return this.delete(`maps/${id}`);
    }

    createMap(data) {
        return this.post(`maps`, data);
    }

    updateMap(id, data) {
        return this.patch(`maps/${id}`, data);
    }
}

export default new MapService();
