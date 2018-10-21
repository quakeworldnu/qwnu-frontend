import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import ArticleView from './views/ArticleView.vue';
import EditProfileView from './views/EditProfileView.vue';
import ForgotPasswordView from './views/ForgotPasswordView.vue';
import HomeView from './views/HomeView.vue';
import PasswordResetView from './views/PasswordResetView';
import RegisterView from './views/RegisterView.vue';

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
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPasswordView,
    },
    {
        path: '/password-reset',
        name: 'passwordReset',
        component: PasswordResetView,
    },
    {
      path: '/articles/:id',
      name: 'articles',
      component: ArticleView
    },
    {
      path: '/profile/edit',
      name: 'editProfile',
      component: EditProfileView,
      meta: {permissionRequired: 'edit_user_profile'},
      beforeEnter: checkPermission
    }
  ],
});
