import AuthService from '@/services/AuthService';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    permissions: []
  },
  mutations: {
    init_store(state) {
        if (localStorage.getItem('token')) {
            state.token = JSON.parse(localStorage.getItem('token'));
            axios.defaults.headers.common['Authorization'] = 'Bearer '+ state.token;
        }
        if (localStorage.getItem('user')) {
            state.user = JSON.parse(localStorage.getItem('user'));
        }
        if (localStorage.getItem('permissions')) {
            state.permissions = JSON.parse(localStorage.getItem('permissions'));
        }
    },
    auth_request(state) {
        state.status = 'loading';
    },
    auth_success(state, {token, user}) {
        state.status = 'success';
        state.token = token;
        state.user = user;
    },
    auth_error(state){
        state.status = 'error';
    },
    logout(state){
        state.status = '';
        state.token = '';
        state.user = '';
        state.permissions = [];
    },
    get_permissions_success(state, {permissions}) {
        state.permissions = permissions;
    }
  },
  actions: {
    login({commit, dispatch}, credentials) {
        commit('auth_request');
        return AuthService.login(credentials.username, credentials.password)
            .then(response => {
                const token = response.data.token;
                const user = response.data.user;

                axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('user', JSON.stringify(user));

                commit('auth_success', {token, user});
                dispatch('get_my_permissions');
            }).catch(error => {
                commit('auth_error');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            });
    },
    logout({commit}) {
        commit('logout');
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
    },
    get_my_permissions({commit}) {
        console.log("fetching permissions...");
        return AuthService.getMyPermissions().then(response => {
            let permissions = response.data;
            localStorage.setItem('permissions', JSON.stringify(permissions));
            commit('get_permissions_success', {permissions});
        });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    permissions: state => state.permissions
  }
});
