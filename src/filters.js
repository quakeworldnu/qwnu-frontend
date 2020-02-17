import Vue from 'vue';

Vue.filter('formatTimestamp', function (value, format = 'YYYY-MM-DD HH:mm') {
  if (value) {
    if (format === 'fromNow') {
      return value.fromNow();
    } else {
      return value.format(format);
    }
  }
});
