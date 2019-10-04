import moment from 'moment';
import Vue from 'vue';

Vue.filter('formatUnixTimestamp', function (value, format = 'YYYY-MM-DD HH:mm') {
  if (value) {
    if (format === 'fromNow') {
      return moment.unix(value).fromNow();
    } else {
      return moment.unix(value).format(format);
    }
  }
});
