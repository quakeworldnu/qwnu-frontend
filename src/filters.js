import moment from 'moment';
import Vue from 'vue';

Vue.filter('formatUnixTimestamp', function(value) {
  if (value) {
    return moment.unix(value).format('YYYY-MM-DD hh:mm')
  }
});