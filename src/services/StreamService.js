import BaseService from './BaseService';

class StreamService extends BaseService {
    constructor() {
        super();
    }
    getStreams() {
        return this.get('streams');
    }
}

export default new StreamService();