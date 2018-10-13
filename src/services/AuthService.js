
import axios from 'axios';

export default {
    getUsers() {
      return axios
      .get('http://localhost:')
      //.get('https://api.coindesk.com/v1/bpi/currentpriceGG.json')

      //.then(responseHandler)
      //.catch(errorHandler)
      //.finally(() => this.loading = false);
      /*
        axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
          this.info = response.data.bpi
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false);
        */
    }
}
