import Vue from 'vue';
import App from './App.vue';
import './components.js';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
      this.$store.commit('initStore');
  }
}).$mount('#app');
