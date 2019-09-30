import moment from 'moment';
import Vue from 'vue';

Vue.filter('formatUnixTimestamp', function (value, format = 'YYYY-MM-DD HH:mm') {
  if (value) {
    return moment.unix(value).format(format);
  }
});
