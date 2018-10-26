import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import AdminUsersView from './views/AdminUsersView.vue';
import AdminUserView from './views/AdminUserView.vue';
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

    function proceed() {
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

    // we must wait for the store to be initialized
    if (!store.state.initiated) {
        console.debug('[router] waiting for store to be initialized...')
        store.watch(
            (state) => state.initiated,
            (value) => {
            console.debug('[router] ok store initialization state changed', value)
            if (value === true)
                proceed();
            }
        )
    } else {
        proceed();
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
        },
        {
            path: '/admin/users',
            name: 'adminUsers',
            component: AdminUsersView,
            meta: {permissionRequired: 'list_users'},
            beforeEnter: checkPermission
        },
        {
            path: '/admin/user/:id?',
            name: 'adminUser',
            component: AdminUserView,
            meta: {permissionRequired: 'edit_user'},
            beforeEnter: checkPermission
        },
    ],
});
