
import Map from '@/models/Map';
import Pagination from '@/models/Pagination';
import BaseService from './BaseService';

class MapService extends BaseService {

    constructor() {
        super();
    }

    getMaps(pagination) {
        let p = pagination;
        return this.get(
            `maps?page=${p.page}&per_page=${p.pageSize}&sort=${p.sort}&order=${p.order}`
        );
    }

    getMapsBySearch(keyword, pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(
            `maps/search?keyword=${keyword}&page=${p.page}&per_page=${p.pageSize}&sort=${s.sort}&order=${s.order}`
        )
            .then(response => response.data)
            .then(response => {
                let maps = response.data.map(m => new Map(m));
                let pagination = new Pagination(response);

                return { maps, pagination };
            });
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
