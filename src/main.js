import Vue from 'vue';
import Toasted from "vue-toasted";
import App from './App.vue';
import './components.js';
import './filters';
import './mixins';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const toastOptions = {
    position: "top-right",
    duration: 1500
};

Vue.use(Toasted, toastOptions);

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
      this.$store.commit('initStore');
  }
}).$mount('#app');
