import Config from '@/models/Config';
import Pagination from '@/models/Pagination';
import BaseService from './BaseService';

class ConfigService extends BaseService {
    constructor() {
      super();
    }

    getConfig(id) {
        return this.get(`configs/${id}`).then(
            response => new Config(response.data)
        );
    }

    createConfig(data) {
        return this.post(`configs`, data)
                   .then(response => new Config(response.data));
    }

    updateConfig(id, data) {
        return this.patch(`configs/${id}`, data);
    }

    deleteConfig(id) {
        return this.delete(`configs/${id}`);
    }

    getConfigs(pagination, sorting) {
        let p = pagination;
        let s = sorting;
        return this.get(`configs?page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let configs = response.data.map(c => new Config(c));
                        let pagination = new Pagination(response);

                        return { configs, pagination };
                    });
    }

    getConfigsBySearch(keyword, pagination, sorting) {
        let p = pagination
        let s = sorting
        return this.get(`configs/search?keyword=${keyword}&page=${p.page}&sort=${s.sort}&order=${s.order}`)
                    .then(response => response.data)
                    .then(response => {
                        let configs = response.data.map(c => new Config(c));
                        let pagination = new Pagination(response);

                        return { configs, pagination };
                    });
    }
}

export default new ConfigService();