import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import Article from './views/Article.vue';
import EditProfile from './views/EditProfile.vue';
import Home from './views/Home.vue';
import Register from './views/Register.vue';

Vue.use(Router);


/*
Perhaps support multiple guards?
https://github.com/vuejs/vue-router/issues/721#issuecomment-252181948
*/

function hasPermission(permission) {
    if (store.getters.permissions === null || store.getters.permissions === undefined) {
        return false;
    }

    for (let i = 0; i < store.getters.permissions.length; i++) {
        if (store.getters.permissions[i].name === permission) {
            return true;
        }
    }

    return false;
}

function checkPermission(to, from, next) {
    let permissionRequired = to.meta.permissionRequired;

    if (hasPermission(permissionRequired)) {
        next(true);
    } else {
        next({
            path: '/',
            query: {
                redirect: to.fullPath
            }
        })
    }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/articles/:id',
      name: 'articles',
      component: Article
    },
    {
      path: '/profile/edit',
      name: 'editProfile',
      component: EditProfile,
      meta: {permissionRequired: 'edit_user_profile'},
      beforeEnter: checkPermission
    }
  ],
});
