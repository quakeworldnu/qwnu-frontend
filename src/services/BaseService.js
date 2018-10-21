
import axios from 'axios';

class BaseService {

  constructor() {
    this.apiUrl = 'http://qwnu-backend.localhost/api/v1/';
  }

  post(endpoint, data = null) {
    return axios.post(this.apiUrl + endpoint, data);
  }

  get(endpoint) {
    return axios.get(this.apiUrl + endpoint);
  }

  delete(endpoint) {
    return axios.get(this.apiUrl + endpoint);
  }

  patch(endpoint, data) {
    return axios.patch(this.apiUrl + endpoint, data);
  }

  put(endpoint, data) {
    return axios.put(this.apiUrl + endpoint, data);
  }
}

export default BaseService;