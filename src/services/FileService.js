import File from '../models/File';
import BaseService from './BaseService';

class FileService extends BaseService {
    constructor() {
        super();
    }

    getFiles() {
        return this.get(`files`).then(response => response.data.map(f => new File(f)));
    }

    createFile(data) {
        // Send as formdata because we have a file attached
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }

        return this.post(`files`, formData).then(response => new File(response.data));
    }
}

export default new FileService();