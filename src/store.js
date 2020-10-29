import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: '',
    user: {},
    permissions: [],
    initiated: false
  },
  mutations: {
    initStore(state) {
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
        state.initiated = true;
    },
    authRequest(state) {
        state.status = 'loading';
    },
    authSuccess(state, {token, user}) {
        state.status = 'success';
        state.token = token;
        state.user = user;
    },
    authError(state){
        state.status = 'error';
    },
    logout(state){
        state.status = '';
        state.token = '';
        state.user = '';
        state.permissions = [];
    },
    getPermissionsSuccess(state, {permissions}) {
        state.permissions = permissions;
    },
    updateProfileSuccess(state, {user}) {
        state.user = user;
    }
  },
  actions: {
    login({commit, dispatch}, credentials) {
        commit('authRequest');
        return AuthService.login(credentials.username, credentials.password)
            .then(response => {
                const token = response.data.token;
                const user = response.data.user;

                axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('user', JSON.stringify(user));

                commit('authSuccess', {token, user});
                dispatch('getMyPermissions');
            }).catch(error => {
                commit('authError');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            });
    },
    logout({commit}) {
        // TODO: Send logout request to backend so we delete the token server-side
        AuthService.logout();
        commit('logout');
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
    },
    getMyPermissions({commit}) {
        return AuthService.getMyPermissions().then(response => {
            let permissions = response.data;
            localStorage.setItem('permissions', JSON.stringify(permissions));
            commit('getPermissionsSuccess', {permissions});
        });
    },
    updateProfile({commit}, data) {
        return UserService.updateProfile(data).then(response => {
            let user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            commit('updateProfileSuccess', {user});
            return user;
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
